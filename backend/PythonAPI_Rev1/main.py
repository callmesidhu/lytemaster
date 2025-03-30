from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, status, Query, Path, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import cast, Integer, or_, and_, exists, func, select
from sqlalchemy.orm import Session
from Models.models import Category, Family, Product, ProductWattage, Base
import database
from database import engine, SessionLocal
from typing import List, AsyncIterator
from ResponseModels.responses import CategoryWithCountResponse
import os

# Lifespan manager
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handles startup and shutdown events"""
    # Startup: Create tables
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")
    yield
    # Shutdown: Clean up resources
    print("🛑 Application shutting down")

app = FastAPI(
    title="Lytemaster API",
    version="1.0.0",
    lifespan=lifespan  # Use lifespan instead of on_event
)

# Mount static files directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Add CORS middleware
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://lytemaster.vercel.app",
    "*"  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"], 
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# FUNCTIONS -H1
def parse_wattage_range(wattage_str: str):
    """Extract min and max wattage from a range string like '3W-40W'"""
    try:
        min_w, max_w = wattage_str.replace("W", "").split("-")
        return int(min_w), int(max_w)
    except (ValueError, AttributeError):
        return None, None

def parse_color_temp(color_temp_str: str):
    """Extract individual color temperatures from a string like '4000K,5000K,6000K'"""
    try:
        return [int(temp.replace("K", "")) for temp in color_temp_str.split(",")]
    except (ValueError, AttributeError):
        return []

# API ENDPOINTS -H1

# (1) GET categories along with their id, name, and the number of products in them
@app.get("/categories", response_model=List[CategoryWithCountResponse])
def get_categories_with_product_counts(db: Session = Depends(get_db)):
    stmt = (
        select(
            Category.category_id,
            Category.category_name,
            func.count(Product.product_id).label("product_count")
        )
        .outerjoin(Family, Category.families)
        .outerjoin(Product, Family.products)
        .group_by(Category.category_id, Category.category_name)
    )
    result = db.execute(stmt).all()
    return [
        {
            "category_id": category_id,
            "category_name": category_name,
            "product_count": product_count
        }
        for category_id, category_name, product_count in result
    ]

# (2) GET number of products by category (cta_button)
@app.get("/home/products/products_button/{category_id}")
async def get_product_counts_by_category(
    category_id: int = Path(..., description="ID of the category to count products for"),
    db: Session = Depends(get_db)
):
    try:
        product_count = db.query(
            func.count(Product.product_id).label("product_count")
        ).join(Family, Family.family_id == Product.product_family) \
         .filter(Family.category == category_id) \
         .scalar()
        if product_count is None:
            return 0
        return product_count
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch product count: {str(e)}"
        )

# (3) GET products by category
@app.get("/categories/{category_id}/products")
async def get_category_products(category_id: int, request: Request, db: Session = Depends(get_db)):
    base_url = str(request.base_url) + "static/product_images/"

    category_products = (
        db.query(Product)
        .join(Family)
        .filter(Family.category == category_id)
        .all()
    )

    for product in category_products:
        if product.product_image:  
            product.product_image = base_url + product.product_image

    return category_products

# (4) GET search products using filters (LVL 1 Search)
@app.get("/products/searchbar/products_search")
async def search_products(
    query: str = Query(..., description="Search term for product name, category, or family"),
    skip: int = Query(0, description="Number of items to skip"),
    limit: int = Query(10, description="Maximum number of items to return"),
    db: Session = Depends(get_db)
):
    search_query_db = db.query(Product).join(Family).join(Category).filter(
        or_(
            Product.product_name.ilike(f"%{query}%"),
            Family.family_name.ilike(f"%{query}%"),
            Category.category_name.ilike(f"%{query}%")
        )
    ).offset(skip).limit(limit)
    return search_query_db.all()

# (5) Detailed Object Level Filter
@app.get("/products/product_details/filter")
async def filtering_products(
    search_query: str = Query(None, description="Search term for product name or description"),
    category: str = Query(None, description="Filter by category"),
    min_wattage: int = Query(None, description="Minimum wattage"),
    color_temp: int = Query(None, description="Filter by color temperature in Kelvin"),
    db: Session = Depends(get_db)
):
    try:
        search_query_db = db.query(Product)
        if search_query:
            search_query_db = search_query_db.filter(
                Product.product_name.ilike(f"%{search_query}%")
            )
        if category:
            search_query_db = search_query_db.join(Family).join(Category).filter(
                Category.category_name.ilike(f"%{category}%")
            )
        if min_wattage:
            search_query_db = search_query_db.filter(
                or_(
                    *[
                        and_(
                            parse_wattage_range(Product.product_wattage)[0] <= min_wattage,
                            parse_wattage_range(Product.product_wattage)[1] >= min_wattage
                        )
                        for product in search_query_db
                        if parse_wattage_range(Product.product_wattage) != (None, None)
                    ]
                )
            )
        if color_temp:
            search_query_db = search_query_db.filter(
                or_(
                    *[
                        color_temp in parse_color_temp(Product.product_color_temp)
                        for product in search_query_db
                        if parse_color_temp(Product.product_color_temp)
                    ]
                )
            )
        results = search_query_db.all()
        return results
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Search failed: {str(e)}"
        )

# (6) GET Products Category specific family list (LVL 2 Search and Filter)
@app.get("/products/category/{category_id}/families")
async def get_filtered_families_by_category(
    request: Request,
    category_id: int = Path(..., description="ID of the category to fetch families for"),
    mounting_type: str = Query(None, description="Filter by mounting type (e.g., Ceiling recessed)"),
    light_distribution: str = Query(None, description="Filter by light distribution (e.g., A10-A32 wide 100% direct)"),
    lamp_type: str = Query(None, description="Filter by lamp type (e.g., LED)"),
    db: Session = Depends(get_db)
):
    """Get families belonging to a specific category, where at least one product matches the filters"""
    try:
        family_query = db.query(Family).filter(
            Family.category == category_id
        )
        if mounting_type or light_distribution or lamp_type:
            family_query = family_query.filter(
                exists().where(
                    and_(
                        Product.product_family == Family.family_id,
                        *(  
                            (Product.product_mounting.ilike(f"%{mounting_type}%")) if mounting_type else True,
                            (Product.product_light_distribution.ilike(f"%{light_distribution}%")) if light_distribution else True,
                            (Product.product_lamp_type.ilike(f"%{lamp_type}%")) if lamp_type else True,
                        )
                    )
                )
            )
        families = family_query.all()
        if not families:
            raise HTTPException(
                status_code=404,
                detail=f"No families found for category ID {category_id} with the specified filters"
            )
        # Use the current request's base URL to build the image URL dynamically
        base_url = str(request.base_url) + "static/product_images/"
        for family in families:
            if family.image:
                family.image = base_url + family.image
        return families
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch families: {str(e)}"
        )

# (7) GET Filter products within a specific category and specific family and other filters (LVL 3 Search and Filter)
@app.get("/products/category/{category_id}/{family_id}/filter")
async def filter_products_in_category(
    category_id: int = Path(..., description="ID of the category to filter products in"),
    family_id: int = Path(..., description="ID of the family to filter products in"),
    mounting_type: str = Query(None, description="Filter by mounting type (e.g., Ceiling recessed)"),
    light_distribution: str = Query(None, description="Filter by light distribution (e.g., A10-A32 wide 100% direct)"),
    ip_rating: str = Query(None, description="Filter by IP ratings (e.g., IP20)"),
    lamp_type: str = Query(None, description="Filter by lamp type (e.g., LED)"),
    skip: int = Query(0, description="Number of items to skip"),
    limit: int = Query(10, description="Maximum number of items to return"),
    db: Session = Depends(get_db)
):
    try:
        filter_query = db.query(Product).join(Family).filter(
            Family.category == category_id,
            Product.product_family == family_id
        )
        if mounting_type:
            filter_query = filter_query.filter(
                Product.product_mounting.ilike(f"%{mounting_type}%")
            )
        if light_distribution:
            filter_query = filter_query.filter(
                Product.product_light_distribution.ilike(f"%{light_distribution}%")
            )
        if lamp_type:
            filter_query = filter_query.filter(
                Product.product_lamp_type.ilike(f"%{lamp_type}%")
            )
        if ip_rating:
            filter_query = filter_query.filter(
                Product.product_ip_rating.ilike(f"%{ip_rating}%")
            )
        results = filter_query.offset(skip).limit(limit).all()
        return results
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Filtering failed: {str(e)}"
        )

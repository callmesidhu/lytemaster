'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

function ObjectsContent() {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [lightingProducts, setLightingProducts] = useState([]);
  const searchParams = useSearchParams();
  
  // Get family_id, category_id from the URL
  const category_id = searchParams.get('category_id');
  const family_id = searchParams.get('family_id');
  const family_name = searchParams.get('family_name');
  
  // Fetch lighting products when category_id and family_id are available
  useEffect(() => {
    if (category_id) {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/${category_id}/products`)
        .then(response => {
          setLightingProducts(response.data);  // Assuming the response has a 'data' array with products
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
  }, [category_id]);

  // Filter products based on product_family and family_id
  const filteredProducts = lightingProducts.filter(product => product.product_family == family_id);

  const toggleFilters = () => setShowFilters(prev => !prev);

  return (
    <div className="flex flex-col md:flex-row p-8 min-h-screen mt-44 relative">
      {/* Breadcrumb */}
      <div className="p-4 text-sm absolute -top-12 lg:left-20">
        <div className="max-w-6xl mx-auto"><Link href='/'>HOME</Link> / <Link href='/products'>PRODUCTS</Link> / <Link href='/products/category'>CATEGORY</Link> / OBJECTS</div>
      </div>

      {/* Filter Icon for Mobile */}
      <button
        onClick={toggleFilters}
        className="lg:hidden absolute top-[4.5rem] right-14 z-50 p-2 bg-white rounded shadow border border-black"
      >
        <FiFilter size={24} />
      </button>

      {/* Mobile Filters Sidebar */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: showFilters ? 0 : '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="lg:hidden fixed top-0 left-0 w-72 p-4 bg-white h-full z-40 overflow-y-auto shadow-lg pt-20"
      >
        <h2 className="text-xl font-semibold mb-2">Mounting type</h2>
        {['Ceiling recessed', 'Recessed Suspended', 'Surface Mounted', 'Suspended', 'Surface Suspended Recessed'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-2">Light Distribution</h2>
        {['A10-A32 wide 100% direct', 'A40-A44 medium 100% direct', 'A50-A80 narrow 100% direct', 'B41-B63 narrow direct'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}
      </motion.aside>

      {/* Desktop Filters Sidebar */}
      <aside className="hidden lg:block w-full md:w-72 p-4 mt-12 lg:ml-16">
        <h2 className="text-xl font-semibold mb-2">Mounting type</h2>
        {['Ceiling recessed', 'Recessed Suspended', 'Surface Mounted', 'Suspended', 'Surface Suspended Recessed'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}
      </aside>

      <h1 className="absolute top-0 left-10 lg:left-24 lg:text-5xl sm:text-4xl font-bold text-3xl">{family_name}</h1>
      <div className="hidden md:block w-px bg-black mx-4 relative mt-8"></div>

      {/* Lighting Products Grid */}
      <main className="w-full md:w-3/4 p-4 mt-8">
        <p className="text-gray-600 mb-4">{filteredProducts.length} Results</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-2">
          {filteredProducts.map((product, index) => (
            <Link
              href={`/products/category/objects/item?product_name=${product.product_name}&family_name=${family_name}&product_family=${product.product_family}&product_id=${product.product_id}&category_id=${category_id}`}
              key={index}
            >
              <div className="p-1">
                <img
                  src={product.product_image || '/assets/products/sample_bulb.png' }
                  alt={product.product_name}
                  className="w-50 aspect-square object-cover mb-2 border-2 border-solid border-black bg-gray-300 rounded-lg"
                />
                <h3 className="text-lg font-medium">{product.product_name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function Objects() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ObjectsContent />
    </Suspense>
  );
}

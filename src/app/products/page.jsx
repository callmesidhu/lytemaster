"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        data.forEach((product) => {
          // Fetch product count for each category based on category_id
          const fetchData = async () => {
            try {
              const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/home/products/products_button/${product.category_id}`);
              setCount((prevCount) => ({
                ...prevCount,
                [product.category_id]: response.data,
              }));
            } catch (err) {
              setError(err.message);
            }
          };

          fetchData();
        });
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (<div>
      <div className="flex items-center justify-center absolute inset-0">
      Error: {error}
      </div>
      </div>);
  }

if (products.length === 0) {
  return (
    <div className="flex items-center justify-center absolute inset-0">
      <div className="text-center">Loading...</div>
    </div>
  );
}

  return (
    <div className="min-h-screen flex flex-col mt-28">
      {/* Breadcrumb */}
      <div className="p-4 text-sm">
        <div className="max-w-6xl mx-auto lg:mx-28"><Link href='/'>HOME</Link> / PRODUCTS</div>
      </div>

      {/* Main Content */}
      <h2 className="text-5xl font-bold lg:mx-32 mx-5">Our Products</h2>
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {products.map((product) => (
            <a href={`/products/category?category_id=${product.category_id}`} key={product.category_id}>
              <div 
                className="h-[460px] rounded-2xl shadow-md overflow-hidden flex flex-col justify-between" 
                style={{ backgroundImage: `url(${product.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="py-12 p-6 bg-gradient-to-b from-black via-transparent to-transparent">
                  <h3 className="text-3xl text-white font-bold mb-4">{product.title}</h3>
                  <p className="text-white mb-4 m-3">{product.description}</p>
                </div>

                {/* Dynamic Products button */}
                <div className="flex items-center justify-evenly gap-2 text-lg font-medium text-white bg-blur rounded-full mx-14 p-2 text-center shadow-md shadow-black backdrop-blur-md m-4">
                  <Image src="/assets/products/light_bulb_products.png" width={20} height={20} alt="Bulb" />
                  {count[product.category_id] ? `${count[product.category_id]} Products` : 'Loading...'}
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

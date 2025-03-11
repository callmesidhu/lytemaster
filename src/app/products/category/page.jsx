'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';

const lightingProducts = [
  { name: 'Spot Down Series', image: 'https://png.pngtree.com/element_pic/16/12/06/5d79b5dd066400e188713f7dd417a3f4.png' },
  { name: 'Tracks System', image: 'https://png.pngtree.com/element_pic/16/12/06/5d79b5dd066400e188713f7dd417a3f4.png' },
  { name: 'Modular Series', image: 'https://png.pngtree.com/element_pic/16/12/06/5d79b5dd066400e188713f7dd417a3f4.png' },
  { name: 'Panel & General Lighting', image: 'https://png.pngtree.com/element_pic/16/12/06/5d79b5dd066400e188713f7dd417a3f4.png' },
  { name: 'Pendant Series', image: 'https://png.pngtree.com/element_pic/16/12/06/5d79b5dd066400e188713f7dd417a3f4.png' },
  { name: 'Ceiling Surface Series', image: 'https://png.pngtree.com/element_pic/16/12/06/5d79b5dd066400e188713f7dd417a3f4.png' },
  { name: 'Profile Series', image: 'https://png.pngtree.com/element_pic/16/12/06/5d79b5dd066400e188713f7dd417a3f4.png' },
];

export default function Category() {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => setShowFilters(prev => !prev);

  return (
    <div className="flex flex-col md:flex-row p-8 min-h-screen mt-44 relative">
      <div className="p-4 text-sm absolute -top-12 lg:left-20">
        <div className="max-w-6xl mx-auto">HOME / PRODUCTS / CATEGORY</div>
      </div>

      {/* Filter Icon for Mobile */}
      <button
        onClick={toggleFilters}
        className="lg:hidden absolute top-16 right-14 z-50 p-2 bg-white rounded shadow border border-black"
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
        <h2 className="text-xl font-semibold mb-4">Mounting type</h2>
        {['Ceiling recessed', 'Recessed Suspended', 'Surface Mounted', 'Suspended', 'Surface Suspended Recessed'].map((item) => (
          <label key={item} className="block text-gray-700 mb-2">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-4">Light distribution</h2>
        {['A10-A32 wide 100% direct', 'A40-A44 medium 100% direct', 'A50-A80 narrow 100% direct', 'B41-B63 narrow direct'].map((item) => (
          <label key={item} className="block text-gray-700 mb-2">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-4">Lamp Type</h2>
        {['LED', 'CONLGB'].map((item) => (
          <label key={item} className="block text-gray-700 mb-2">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}
      </motion.aside>

      {/* Sidebar Filters for Desktop */}
      <aside className="hidden lg:block w-full md:w-72 p-4 rounded-lg mt-16 lg:ml-20">
        <h2 className="text-xl font-semibold mb-4">Mounting type</h2>
        {['Ceiling recessed', 'Recessed Suspended', 'Surface Mounted', 'Suspended', 'Surface Suspended Recessed'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-4">Light distribution</h2>
        {['A10-A32 wide 100% direct', 'A40-A44 medium 100% direct', 'A50-A80 narrow 100% direct', 'B41-B63 narrow direct'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-4">Lamp Type</h2>
        {['LED', 'CONLGB'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}
      </aside>

      <h1 className="absolute top-0 left-10 lg:left-24 md:text-5xl text-4xl font-bold">COMMERCIAL LIGHTING</h1>
      <div className="hidden md:block w-px bg-black mx-4 relative mt-8"></div>

      {/* Lighting Products Grid */}
      <main className="w-full md:w-3/4 p-4 mt-8">
        <p className="text-gray-600 mb-4">{lightingProducts.length} Results</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lightingProducts.map((product, index) => (
            <a href="/products/category/objects/" key={index}>
              <div className="p-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-50 h-52 object-cover mb-2 border-2 border-solid border-black bg-gray-300 rounded-lg"
                />
                <h3 className="text-lg font-medium">{product.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

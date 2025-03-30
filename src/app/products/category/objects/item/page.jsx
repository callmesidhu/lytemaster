'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Parameters from '@/components/products/parameters';
import Download from '@/components/products/download';
import Link from 'next/link';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function Item() {
  const [standardOpen, setStandardOpen] = useState(false);
  const [extendedOpen, setExtendedOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showDownloads, setShowDownloads] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const searchParams = useSearchParams();
  const productName = searchParams.get('product_name'); 
  const familyName = searchParams.get('family_name'); 
  const category_id = searchParams.get('category_id');
  const product_id = searchParams.get('product_id');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (category_id) {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/${category_id}/products`)
        .then(response => {
          const product = response.data.find(item => item.product_id == product_id);
          setCurrentProduct(product);  // Set the current product data
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
  }, [category_id, product_id]);

  if (!isClient || !currentProduct) return null;

  // Utility function to handle missing data
  const getField = (field, fallback = 'Not Available') => {
    return currentProduct[field] || fallback;
  };

  return (
    <div className="container mx-auto p-6 md:p-12 mt-32 overflow-hidden">
      {/* Breadcrumb */}
      <div className="p-4 text-sm absolute top-32 left-5 md:left-20">
        <div className="max-w-6xl mx-auto">
          <Link href='/'>HOME</Link> / <Link href='/products'>PRODUCTS</Link> / <Link href='/products/category'>CATEGORY</Link> / <Link href='/products/category/objects'>OBJECTS</Link> / ITEM
        </div>
      </div>

      {/* Title */}
      <div className="md:mx-12 mx-3">
        <h1 className="text-5xl font-bold my-4">{currentProduct.product_name}</h1>
        <p className="text-gray-500">{getField('product_codes')} | {familyName}</p>
      </div>

      {/* Images Section */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col md:flex-row lg:gap-6 gap-6 mt-6 md:px-10 px-0 justify-center items-center">
          <img
            src={currentProduct.product_image}
            alt="Dazzle Light"
            className="md:w-96 w-80 aspect-square rounded-2xl border-2 border-black"
          />
          <img
            src='/assets/products/sample_bulb_cutout.png'
            alt="Cutout Diagram"
            className="md:w-96 w-80 aspect-square rounded-2xl border-2 border-black"
          />
          <img
            src='/assets/products/sample_bulb_watt.png'
            alt="Cutout Diagram"
            className="md:h-96 w-full lg:w-auto rounded-2xl border-2 border-black"
          />
        </div>
      </div>

      {/* Specifications */}
      <div className="flex flex-col lg:flex-row flex-1 justify-evenly lg:mx-40 w-full overflow-hidden mt-8 mb-8 px-5">
        <div className="flex flex-col gap-8 w-full">
          <div>
            <h2 className="text-xl font-semibold">General</h2>
            <p>{getField('product_mounting')}</p>
            <p>{getField('product_wattage')}</p>
            <p>{getField('product_lifetime')}</p>
            <p>CRI: {getField('product_cri')}</p>
            <p>SDCM: {getField('product_sdcm')}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Electrical</h2>
            <p>{getField('product_control')}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Physical</h2>
            <p>{getField('product_material')}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Optical</h2>
            <p>{getField('product_light_distribution', 'Not Available')}</p>
            <p>Beam Angle: {getField('product_optical_angle', 'Not Available')}</p>
          </div>
        </div>

        {/* Expandable Configurations */}
        <div className="mt-8 lg:ml-12 w-full">
          {/* Standard Configuration */}
          <div className="border-b w-96 border-black">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setStandardOpen(!standardOpen)}
                className="w-full text-left text-lg font-semibold py-2 px-4"
              >
                Standard Configuration
              </button>
              <div>
                {standardOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </div>
            {standardOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                {showDownloads ? (
                  <div className="mb-4 mx-5">
                    <p className="font-semibold">Color Temperature</p>
                    {getField('product_color_temp', 'Not Available').split(',').map((temp) => (
                      <div key={temp} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`std-temp-${temp}`}
                          name="std-temp"
                          value={temp}
                        />
                        <label htmlFor={`std-temp-${temp}`}>{temp}</label>
                      </div>
                    ))}
                    <p className="font-semibold">Optical</p>
                    {getField('product_optical_angle', 'Not Available').split(',').map((angle) => (
                      <div key={angle} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`std-optical-${angle}`}
                          name="std-optical"
                          value={angle}
                        />
                        <label htmlFor={`std-optical-${angle}`}>{angle}</label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-md">
                    <p>
                      <strong>COLOUR TEMPERATURE:</strong> {getField('product_color_temp', 'Not Available')}
                    </p>
                    <p>
                      <strong>CONTROL:</strong> {getField('product_control')}
                    </p>
                    <p>
                      <strong>OPTICAL:</strong> {getField('product_optical_angle', 'Not Available')}
                    </p>
                    <p>
                      <strong>COLOUR (Housing):</strong> {getField('product_housing_color')}
                    </p>
                    <p>
                      <strong>COLOUR (Reflector):</strong> {getField('product_reflector_color')}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Extended Configuration */}
          <div className="border-b w-96 border-black">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setExtendedOpen(!extendedOpen)}
                className="w-full text-left text-lg font-semibold py-2 px-4 mt-4"
              >
                Extended Configuration
              </button>
              <div>
                {extendedOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </div>
            {extendedOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden my-4"
              >
                {showDownloads ? (
                  <div className="mb-4 mx-4">
                    <p className="font-semibold">Color Temperature</p>
                    {getField('product_color_extended', 'Not Available').split(',').map((temp) => (
                      <div key={temp} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`ext-temp-${temp}`}
                          name="ext-temp"
                          value={temp}
                        />
                        <label htmlFor={`ext-temp-${temp}`}>{temp}</label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-md">
                    <p>
                      <strong>COLOUR TEMPERATURE:</strong> {getField('product_color_extended', 'Not Available')}
                    </p>
                    <p>
                      <strong>CONTROL:</strong> {getField('product_control_extended', 'Not Available')}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Conditionally render Parameters or Downloads */}
      {!showDownloads ? (
        <Parameters onRowClick={() => setShowDownloads(true)} />
      ) : (
        <Download />
      )}
    </div>
  );
}

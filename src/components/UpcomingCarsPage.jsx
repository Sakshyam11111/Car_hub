import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import carData from '../data/cars.json';

const brands = Array.from(new Set(carData.cars.map(c => c.name.split(' ')[0])))
  .map(brand => ({
    name: brand,
    logo: `https://via.placeholder.com/80?text=${brand.charAt(0)}`,
  }));

const priceRanges = [
  { range: '1 - 5 Lakh', min: 1, max: 5 },
  { range: '5 - 10 Lakh', min: 5, max: 10 },
  { range: '10 - 15 Lakh', min: 10, max: 15 },
  { range: '15 - 20 Lakh', min: 15, max: 20 },
  { range: '20 - 35 Lakh', min: 20, max: 35 },
  { range: '35 - 50 Lakh', min: 35, max: 50 },
  { range: '50 Lakh - 1 Crore', min: 50, max: 100 },
  { range: 'Above 1 Crore', min: 100, max: Infinity },
];

export default function NewCarsPage() {
  const [selectedPrice, setSelectedPrice] = useState(null); // null = all

  // Filter by price only
  const filteredCars = useMemo(() => {
    if (!selectedPrice) return carData.cars;

    const range = priceRanges.find(p => p.range === selectedPrice);
    if (!range) return carData.cars;

    return carData.cars.filter(car => {
      const priceStr = car.price.split(' ')[0].replace('₹', '').replace('Lakh*', '');
      const minPrice = parseFloat(priceStr);
      return minPrice >= range.min && (range.max === Infinity || minPrice < range.max);
    });
  }, [selectedPrice]);

  // Get top 3 cars for description
  const topCars = filteredCars.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Explore New Cars</h1>
          <p className="text-gray-600 mt-2">
            Choose from {filteredCars.length}+ new models across {brands.length} brands
          </p>
        </motion.div>

        {/* Price Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Filter by Price</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedPrice(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                !selectedPrice
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Prices
            </button>
            {priceRanges.map(pr => (
              <button
                key={pr.range}
                onClick={() => setSelectedPrice(pr.range)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedPrice === pr.range
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {pr.range}
              </button>
            ))}
          </div>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredCars.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-10">
              No cars found for the selected filters.
            </p>
          ) : (
            filteredCars.map((car, i) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={car.image || 'https://via.placeholder.com/300x200'}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg">{car.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{car.price}</p>
                  {car.launchDate && (
                    <p className="text-xs text-orange-600 mt-2">
                      Launch: {new Date(car.launchDate).toLocaleDateString()}
                    </p>
                  )}
                  <button className="mt-4 w-full py-2 border border-orange-600 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-50 transition">
                    Get On-Road Price
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Brands Section */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Explore New Cars by Brand</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer text-center"
              >
                <div className="w-16 h-16 mx-auto bg-gray-200 border-2 border-dashed rounded-xl" />
                <p className="text-xs font-medium text-gray-700 mt-2">{brand.name}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/brands" className="inline-flex items-center text-orange-600 font-medium text-sm hover:underline">
              View All Brands <FiArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mb-16">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 md:p-12">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Buying your dream car?<br />
                <span className="text-orange-200">Check Now!</span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button className="px-6 py-3 bg-white text-orange-600 rounded-lg font-medium hover:bg-gray-100 transition">
                  BY BUDGET
                </button>
                <button className="px-6 py-3 bg-orange-700 text-white rounded-lg font-medium hover:bg-orange-800 transition">
                  BY MODEL
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <select className="px-4 py-3 bg-white text-gray-700 rounded-lg">
                  <option>Select Budget</option>
                </select>
                <select className="px-4 py-3 bg-white text-gray-700 rounded-lg">
                  <option>All Vehicle Types</option>
                </select>
                <button className="px-8 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition">
                  Search
                </button>
              </div>
              <a href="#" className="inline-block mt-4 text-sm underline hover:text-orange-200">
                Advance Search <FiChevronRight className="inline ml-1" />
              </a>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-3">New Cars</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            CarHub brings you the latest new cars in Nepal for 2025 with updated prices. There are around{' '}
            <strong>{filteredCars.length} new car models</strong> available across{' '}
            <strong>{brands.length} brands</strong>. Popular brands like Tata, Maruti, Hyundai offer
            budget-friendly and fuel-efficient cars, making them top choices for buyers. The new car
            market is dominated by SUVs and hatchbacks. Some of the top models include:
          </p>
          <ul className="mt-3 text-sm text-gray-600 list-disc list-inside">
            {topCars.map(car => (
              <li key={car.id}>
                <strong>{car.name}</strong> ({car.price})
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            You can explore cars by applying filters such as price, brand, fuel type,
            transmission type, and more to find the perfect match for your needs. Stay updated with
            new car launches, upcoming cars, electric cars, brand offers, compare cars in your price
            range, and stay tuned to the latest car news.
          </p>
        </section>

      </div>
    </div>
  );
}
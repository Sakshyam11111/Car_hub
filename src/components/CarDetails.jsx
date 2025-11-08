import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiHeart,
  FiShare2,
  FiCalendar,
  FiTrendingUp
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import carData from '../data/cars.json';

const CarDetails = () => {
  const { id } = useParams();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const car = carData.cars.find(c => c.id === Number(id));

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); // Re-run if ID changes (optional, but good for SPA)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7 }
    }
  };

  if (!car) {
    return (
      <motion.div 
        className="container mx-auto px-4 py-12 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-3xl font-bold text-red-600"
          variants={itemVariants}
        >
          Car not found
        </motion.h1>
        <motion.div variants={itemVariants}>
          <Link to="/" className="mt-4 inline-block text-orange-600 underline">
            Back to listings
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  const toggleSave = () => setSaved(s => !s);

  return (
    <motion.div 
      className="bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div 
          className="mb-6"
          variants={itemVariants}
        >
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md text-orange-600 hover:text-orange-700 transition-all font-medium group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Listings
          </Link>
        </motion.div>

        {/* Main Hero Section: Image Left | Text Right */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row">
            {/* Left: Image with Controls */}
            <motion.div 
              className="flex-1 relative h-[300px] md:h-auto overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group"
              variants={imageVariants}
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Navigation Arrows */}
              <motion.button 
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button 
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>

              {/* Bottom Media Controls */}
              <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                {[
                  { icon: 'photo', text: '126 Photos' },
                  { icon: 'color', text: '5 Colors' },
                  { icon: 'video', text: 'Videos' },
                  { icon: 'shorts', text: 'Shorts' },
                  { icon: '360', text: '360° View' }
                ].map((item, i) => (
                  <motion.button
                    key={i}
                    className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg hover:bg-white transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Icon would go here based on item.icon */}
                    <span className="text-sm font-semibold text-gray-900">{item.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Right: Text & Details */}
            <motion.div 
              className="flex-1 p-8 border-t md:border-t-0 md:border-l border-gray-100"
              variants={itemVariants}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-3 text-gray-900">
                      {car.name}
                    </h1>

                    <div className="flex items-center gap-4 flex-wrap mb-4">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-900 mr-2">{car.rating}</span>
                        <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="text-sm text-gray-600 ml-2">{car.reviews} Reviews</span>
                      </div>

                      <motion.div 
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded border border-blue-200"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FiTrendingUp className="text-blue-600 w-4 h-4" />
                        <span className="text-sm font-semibold text-blue-700">
                          Rate & Win ₹1000
                        </span>
                      </motion.div>
                    </div>

                    <div className="mb-1">
                      <p className="text-gray-700 text-base leading-relaxed">
                        {car.description.substring(0, 150)}...{' '}
                        <button className="text-blue-600 font-semibold hover:underline">more</button>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {car.price}<span className="text-xl">*</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">*Ex-Showroom Price in</span>
                      <button className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1">
                        Kathmandu
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <motion.button 
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Get On-Road Price
                  </motion.button>
                </div>

                <motion.button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-bold text-lg transition-all hover:shadow-lg"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  View November Offers
                </motion.button>

                <div className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">Hurry up to lock festive offers!</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden mt-8"
          variants={itemVariants}
        >
          <div className="border-b border-gray-200 bg-gray-50/50 px-8">
            <nav className="flex space-x-2 overflow-x-auto">
              {['overview', 'specifications', 'features', 'variants', 'reviews'].map(t => (
                <motion.button
                  key={t}
                  className={`py-4 px-6 font-semibold text-sm capitalize whitespace-nowrap transition-all relative ${activeTab === t ? 'text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab(t)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t}
                  {activeTab === t && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-t-full" 
                      layoutId="activeTab"
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">{car.description}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <motion.div 
                      className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                        <span className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-3" />
                        Key Specifications
                      </h3>
                      <div className="space-y-3">
                        {[
                          { label: 'Engine', value: car.engine },
                          { label: 'Power', value: car.power },
                          { label: 'Transmission', value: car.transmission.join(', ') },
                          { label: 'Fuel Type', value: car.fuel.join(', ') },
                          { label: 'Mileage', value: car.mileage }
                        ].map((s, i) => (
                          <motion.div 
                            key={i} 
                            className="flex justify-between p-3 bg-white rounded-xl shadow-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * i }}
                          >
                            <span className="text-gray-600 font-medium">{s.label}</span>
                            <span className="font-bold text-gray-900">{s.value}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                        <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3" />
                        Highlights
                      </h3>
                      <ul className="space-y-3">
                        {car.highlights.map((h, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start p-3 bg-white rounded-xl shadow-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * i }}
                          >
                            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-700 font-medium">{h}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div 
                      className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-xl font-bold mb-4 text-green-700 flex items-center">
                        <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        Things We Like
                      </h3>
                      <ul className="space-y-2">
                        {car.pros.map((p, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start p-3 bg-white rounded-xl"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * i }}
                          >
                            <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">{p}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-xl font-bold mb-4 text-red-700 flex items-center">
                        <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </span>
                        Things We Don't Like
                      </h3>
                      <ul className="space-y-2">
                        {car.cons.map((c, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start p-3 bg-white rounded-xl"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * i }}
                          >
                            <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">{c}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'specifications' && (
                <motion.div
                  key="specifications"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div 
                      className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                        <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full mr-3" />
                        Engine & Transmission
                      </h3>
                      <div className="space-y-3">
                        {[
                          { label: 'Engine', value: car.engine },
                          { label: 'Power', value: car.power },
                          { label: 'Transmission', value: car.transmission.join(', ') },
                          { label: 'Fuel Type', value: car.fuel.join(', ') },
                          { label: 'Mileage', value: car.mileage }
                        ].map((s, i) => (
                          <motion.div 
                            key={i} 
                            className="flex justify-between p-4 bg-white rounded-xl shadow-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * i }}
                          >
                            <span className="text-gray-600 font-medium">{s.label}</span>
                            <span className="font-bold text-gray-900">{s.value}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                        <span className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full mr-3" />
                        Dimensions & Capacity
                      </h3>
                      <div className="space-y-3">
                        {[
                          { label: 'Ground Clearance', value: car.groundClearance },
                          { label: 'Boot Space', value: car.bootSpace },
                          { label: 'Safety Rating', value: car.safetyRating }
                        ].map((s, i) => (
                          <motion.div 
                            key={i} 
                            className="flex justify-between p-4 bg-white rounded-xl shadow-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * i }}
                          >
                            <span className="text-gray-600 font-medium">{s.label}</span>
                            <span className="font-bold text-gray-900">{s.value}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {car.features.map((f, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100 hover:shadow-md transition-all group"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * i }}
                        whileHover={{ scale: 1.03, y: -5 }}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-800">{f}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'variants' && (
                <motion.div
                  key="variants"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Available Variants</h3>
                  <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gradient-to-r from-orange-500 to-red-600">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Variant</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Price</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Fuel</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Transmission</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Waiting Period</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {car.variants.map((v, i) => (
                          <motion.tr 
                            key={i} 
                            className="hover:bg-orange-50 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * i }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{v.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-600">{v.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{v.fuel}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{v.transmission}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                <FiCalendar className="w-3 h-3 mr-1" />
                                {v.waitingPeriod}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div 
                    className="text-center py-12 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 mb-8"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                      {car.rating}
                    </div>
                    <div className="flex justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <motion.svg
                          key={i}
                          className={`w-8 h-8 ${i < Math.floor(car.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                          initial={{ rotate: -180, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          transition={{ delay: 0.1 * i, duration: 0.3 }}
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </motion.svg>
                      ))}
                    </div>
                    <p className="text-gray-600 font-medium">
                      Based on <span className="font-bold text-gray-900">{car.reviews}</span> reviews
                    </p>
                  </motion.div>

                  <div className="mt-8 space-y-6">
                    {[1, 2, 3].map(i => (
                      <motion.div
                        key={i}
                        className="p-6 bg-gradient-to-br from-gray-50 to-orange-50 rounded-2xl border border-gray-200 hover:shadow-lg transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * i }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mr-4 flex items-center justify-center text-white font-bold text-lg shadow-md">
                            U{i}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">User {i}</div>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, j) => (
                                <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          This is a sample review for the {car.name}. Great car with excellent features and mileage. Highly recommended!
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-gray-200">
              <motion.button 
                className="flex-1 px-8 py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white rounded-xl hover:shadow-2xl transition-all font-bold text-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Get On-Road Price
              </motion.button>
              <motion.button 
                className="flex-1 px-8 py-4 border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 transition-all font-bold text-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Book a Test Drive
              </motion.button>
              <motion.button 
                className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold text-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Download Brochure
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CarDetails;
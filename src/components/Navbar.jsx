import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiHeart, FiChevronDown, FiMenu, FiX, FiMapPin } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [selectedCity, setSelectedCity] = useState('Select City');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({
        category: false,
        language: false,
        city: false,
        newCars: false,
        usedCars: false,
        newsReviews: false,
        videos: false
    });

    const newCarsRef = useRef(null);
    const usedCarsRef = useRef(null);
    const newsReviewsRef = useRef(null);
    const videosRef = useRef(null);

    const navigate = useNavigate();

    const categories = ['All', 'New Cars', 'Used Cars', 'Bikes', 'Scooters'];
    const languages = ['English', 'Nepali'];
    const cities = ['Kathmandu', 'Pokhara', 'Bharatpur', 'Biratnagar', 'Birgunj', 'Dharan'];

    const newCarsContent = [
        { 
            title: 'Find New Cars', 
            items: [
                { name: 'Upcoming Cars', path: '/upcoming-cars' }, 
                'Latest Cars', 
                'Popular Cars' 
            ]
        },
        { title: 'By Brand', items: ['Toyota', 'Honda', 'Hyundai', 'Tata', 'Maruti Suzuki'] },
        { title: 'By Budget', items: ['Under 10 Lakhs', '10-20 Lakhs', '20-40 Lakhs', 'Above 40 Lakhs'] }
    ];

    const usedCarsContent = [
        { title: 'Find Used Cars', items: ['Certified Cars', 'Inspected Cars', 'By Owner'] },
        { title: 'By Brand', items: ['Toyota', 'Honda', 'Hyundai', 'Tata', 'Maruti Suzuki'] },
        { title: 'By Budget', items: ['Under 5 Lakhs', '5-10 Lakhs', '10-20 Lakhs', 'Above 20 Lakhs'] }
    ];

    const newsReviewsContent = [
        { title: 'Latest News', items: ['Industry News', 'Launch News', 'Electric Vehicles'] },
        { title: 'Reviews', items: ['Expert Reviews', 'User Reviews', 'Video Reviews'] },
        { title: 'Comparisons', items: ['Car Comparisons', 'Bike Comparisons'] }
    ];

    const videosContent = [
        { title: 'Video Reviews', items: ['Test Drive Videos', 'Walkaround Videos'] },
        { title: 'Expert Talks', items: ['Industry Experts', 'Maintenance Tips'] },
        { title: 'Latest Videos', items: ['New Launches', 'Feature Explainers'] }
    ];

    const toggleDropdown = (dropdown) => {
        setDropdownOpen(prev => ({
            ...prev,
            [dropdown]: !prev[dropdown]
        }));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (newCarsRef.current && !newCarsRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, newCars: false }));
            }
            if (usedCarsRef.current && !usedCarsRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, usedCars: false }));
            }
            if (newsReviewsRef.current && !newsReviewsRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, newsReviews: false }));
            }
            if (videosRef.current && !videosRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, videos: false }));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
        exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } }
    };

    const mobileMenuVariants = {
        closed: { height: 0, opacity: 0 },
        open: { height: 'auto', opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const staggerItem = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <header className="bg-white shadow-md">
            {/* Top Navigation Bar */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo with Navigation to Home */}
                    <motion.div
                        className="flex items-center cursor-pointer"
                        onClick={() => navigate('/')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                            <span className="text-white font-bold text-2xl">C</span>
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">CarHub</h1>
                    </motion.div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex items-center flex-1 max-w-lg mx-6">
                        <div className="relative w-full flex">
                            {/* Category Dropdown */}
                            <div className="relative">
                                <motion.button
                                    className="flex items-center px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 border border-r-0 border-gray-300 rounded-l-lg focus:outline-none hover:from-gray-100 hover:to-gray-200 transition-all font-medium text-gray-700"
                                    onClick={() => toggleDropdown('category')}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {selectedCategory}
                                    <FiChevronDown className={`ml-2 transition-transform duration-200 ${dropdownOpen.category ? 'rotate-180' : ''}`} />
                                </motion.button>

                                <AnimatePresence>
                                    {dropdownOpen.category && (
                                        <motion.div
                                            className="absolute top-full left-0 mt-2 w-44 bg-white shadow-xl rounded-lg z-10 border border-gray-100 overflow-hidden"
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <ul className="py-2">
                                                {categories.map((category) => (
                                                    <motion.li
                                                        key={category}
                                                        className="px-4 py-2.5 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 cursor-pointer transition-all duration-200 text-gray-700 hover:text-orange-600 font-medium"
                                                        onClick={() => {
                                                            setSelectedCategory(category);
                                                            toggleDropdown('category');
                                                        }}
                                                        whileHover={{ x: 4 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {category}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Search Input */}
                            <motion.input
                                type="text"
                                placeholder="Search Cars, Brands and More..."
                                className="flex-1 px-4 py-2.5 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                whileFocus={{ scale: 1.01 }}
                            />

                            {/* Search Button */}
                            <motion.button
                                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white rounded-r-lg hover:from-orange-600 hover:via-orange-700 hover:to-red-700 focus:outline-none transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiSearch className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Language */}
                        <div className="hidden md:block relative">
                            <motion.button
                                className="flex items-center text-gray-700 hover:text-orange-500 focus:outline-none transition-colors font-medium"
                                onClick={() => toggleDropdown('language')}
                                whileHover={{ scale: 1.05 }}
                            >
                                {selectedLanguage}
                                <FiChevronDown className={`ml-1 transition-transform ${dropdownOpen.language ? 'rotate-180' : ''}`} />
                            </motion.button>

                            <AnimatePresence>
                                {dropdownOpen.language && (
                                    <motion.div
                                        className="absolute top-full right-0 mt-2 w-28 bg-white shadow-xl rounded-lg z-10 border border-gray-100 overflow-hidden"
                                        variants={dropdownVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <ul className="py-2">
                                            {languages.map((language) => (
                                                <motion.li
                                                    key={language}
                                                    className="px-4 py-2.5 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 cursor-pointer transition-all text-gray-700 hover:text-orange-600 font-medium"
                                                    onClick={() => {
                                                        setSelectedLanguage(language);
                                                        toggleDropdown('language');
                                                    }}
                                                    whileHover={{ x: 4 }}
                                                >
                                                    {language}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Login */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/login"
                                className="hidden md:block px-5 py-2.5 text-orange-600 border-2 border-orange-500 rounded-lg hover:bg-orange-50 focus:outline-none transition-all font-semibold hover:shadow-md"
                            >
                                Login / Register
                            </Link>
                        </motion.div>

                        {/* Favorites */}
                        <motion.button
                            className="text-gray-700 hover:text-orange-500 focus:outline-none transition-all"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FiHeart size={22} />
                        </motion.button>

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            className="md:hidden text-gray-700 focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            whileTap={{ scale: 0.9 }}
                        >
                            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden mt-4">
                    <div className="flex">
                        <div className="relative">
                            <motion.button
                                className="flex items-center px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-sm hover:from-gray-100 hover:to-gray-200 transition-all font-medium"
                                onClick={() => toggleDropdown('category')}
                                whileHover={{ scale: 1.02 }}
                            >
                                {selectedCategory}
                                <FiChevronDown className={`ml-1 transition-transform ${dropdownOpen.category ? 'rotate-180' : ''}`} />
                            </motion.button>

                            <AnimatePresence>
                                {dropdownOpen.category && (
                                    <motion.div
                                        className="absolute top-full left-0 mt-2 w-40 bg-white shadow-xl rounded-lg z-10 border border-gray-100 overflow-hidden"
                                        variants={dropdownVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <ul className="py-2">
                                            {categories.map((category) => (
                                                <motion.li
                                                    key={category}
                                                    className="px-4 py-2 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 cursor-pointer text-sm transition-all text-gray-700 hover:text-orange-600 font-medium"
                                                    onClick={() => {
                                                        setSelectedCategory(category);
                                                        toggleDropdown('category');
                                                    }}
                                                    whileHover={{ x: 4 }}
                                                >
                                                    {category}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.input
                            type="text"
                            placeholder="Search Cars..."
                            className="flex-1 px-3 py-2 border-t border-b border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            whileFocus={{ scale: 1.02 }}
                        />

                        <motion.button
                            className="px-4 py-2 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white rounded-r-lg hover:from-orange-600 hover:via-orange-700 hover:to-red-700 transition-all shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiSearch />
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="md:hidden mt-4 py-4 border-t border-gray-200 overflow-hidden"
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <div className="flex flex-col space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium">Language:</span>
                                    <motion.select
                                        className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                                        value={selectedLanguage}
                                        onChange={(e) => setSelectedLanguage(e.target.value)}
                                        whileHover={{ scale: 1.03 }}
                                    >
                                        {languages.map((language) => (
                                            <option key={language} value={language}>{language}</option>
                                        ))}
                                    </motion.select>
                                </div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        to="/login"
                                        className="px-4 py-2.5 text-orange-600 border-2 border-orange-500 rounded-lg hover:bg-orange-50 transition-all font-semibold self-start"
                                    >
                                        Login / Register
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Main Navigation */}
            <nav className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex space-x-8">
                            {/* NEW CARS */}
                            <div className="relative" ref={newCarsRef}>
                                <motion.button
                                    className="flex items-center py-4 text-gray-700 hover:text-orange-600 font-semibold transition-colors"
                                    onClick={() => toggleDropdown('newCars')}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    NEW CARS
                                    <FiChevronDown className={`ml-1 transition-transform duration-200 ${dropdownOpen.newCars ? 'rotate-180' : ''}`} />
                                </motion.button>

                                <AnimatePresence>
                                    {dropdownOpen.newCars && (
                                        <motion.div
                                            className="absolute top-full left-0 mt-0 w-96 bg-white shadow-2xl rounded-lg z-10 p-6 border border-gray-100"
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <motion.div
                                                className="grid grid-cols-3 gap-6"
                                                variants={staggerContainer}
                                                initial="hidden"
                                                animate="visible"
                                            >
                                                {newCarsContent.map((section, index) => (
                                                    <motion.div key={index} variants={staggerItem}>
                                                        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">{section.title}</h3>
                                                        <ul className="space-y-2">
                                                            {section.items.map((item, idx) => (
                                                                <motion.li
                                                                    key={idx}
                                                                    className="text-sm text-gray-600 hover:text-orange-600 cursor-pointer py-1 transition-all hover:translate-x-1 font-medium"
                                                                    whileHover={{ x: 6, color: '#ea580c' }}
                                                                    onClick={() => {
                                                                        // Check if item is an object with a path property
                                                                        if (typeof item === 'object' && item.path) {
                                                                            navigate(item.path);
                                                                            toggleDropdown('newCars');
                                                                        } else {
                                                                            // Handle other items as before
                                                                            console.log(item);
                                                                        }
                                                                    }}
                                                                >
                                                                    {typeof item === 'object' ? item.name : item}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* USED CARS */}
                            <div className="relative" ref={usedCarsRef}>
                                <motion.button
                                    className="flex items-center py-4 text-gray-700 hover:text-orange-600 font-semibold transition-colors"
                                    onClick={() => toggleDropdown('usedCars')}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    USED CARS
                                    <FiChevronDown className={`ml-1 transition-transform duration-200 ${dropdownOpen.usedCars ? 'rotate-180' : ''}`} />
                                </motion.button>

                                <AnimatePresence>
                                    {dropdownOpen.usedCars && (
                                        <motion.div
                                            className="absolute top-full left-0 mt-0 w-96 bg-white shadow-2xl rounded-lg z-10 p-6 border border-gray-100"
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-3 gap-6">
                                                {usedCarsContent.map((section, index) => (
                                                    <motion.div key={index} variants={staggerItem}>
                                                        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">{section.title}</h3>
                                                        <ul className="space-y-2">
                                                            {section.items.map((item, idx) => (
                                                                <motion.li
                                                                    key={idx}
                                                                    className="text-sm text-gray-600 hover:text-orange-600 cursor-pointer py-1 transition-all hover:translate-x-1 font-medium"
                                                                    whileHover={{ x: 6, color: '#ea580c' }}
                                                                >
                                                                    {item}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* NEWS & REVIEWS */}
                            <div className="relative" ref={newsReviewsRef}>
                                <motion.button
                                    className="flex items-center py-4 text-gray-700 hover:text-orange-600 font-semibold transition-colors"
                                    onClick={() => toggleDropdown('newsReviews')}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    NEWS & REVIEWS
                                    <FiChevronDown className={`ml-1 transition-transform duration-200 ${dropdownOpen.newsReviews ? 'rotate-180' : ''}`} />
                                </motion.button>

                                <AnimatePresence>
                                    {dropdownOpen.newsReviews && (
                                        <motion.div
                                            className="absolute top-full left-0 mt-0 w-96 bg-white shadow-2xl rounded-lg z-10 p-6 border border-gray-100"
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-3 gap-6">
                                                {newsReviewsContent.map((section, index) => (
                                                    <motion.div key={index} variants={staggerItem}>
                                                        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">{section.title}</h3>
                                                        <ul className="space-y-2">
                                                            {section.items.map((item, idx) => (
                                                                <motion.li
                                                                    key={idx}
                                                                    className="text-sm text-gray-600 hover:text-orange-600 cursor-pointer py-1 transition-all hover:translate-x-1 font-medium"
                                                                    whileHover={{ x: 6, color: '#ea580c' }}
                                                                >
                                                                    {item}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* VIDEOS */}
                            <div className="relative" ref={videosRef}>
                                <motion.button
                                    className="flex items-center py-4 text-gray-700 hover:text-orange-600 font-semibold transition-colors"
                                    onClick={() => toggleDropdown('videos')}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    VIDEOS
                                    <FiChevronDown className={`ml-1 transition-transform duration-200 ${dropdownOpen.videos ? 'rotate-180' : ''}`} />
                                </motion.button>

                                <AnimatePresence>
                                    {dropdownOpen.videos && (
                                        <motion.div
                                            className="absolute top-full left-0 mt-0 w-96 bg-white shadow-2xl rounded-lg z-10 p-6 border border-gray-100"
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-3 gap-6">
                                                {videosContent.map((section, index) => (
                                                    <motion.div key={index} variants={staggerItem}>
                                                        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">{section.title}</h3>
                                                        <ul className="space-y-2">
                                                            {section.items.map((item, idx) => (
                                                                <motion.li
                                                                    key={idx}
                                                                    className="text-sm text-gray-600 hover:text-orange-600 cursor-pointer py-1 transition-all hover:translate-x-1 font-medium"
                                                                    whileHover={{ x: 6, color: '#ea580c' }}
                                                                >
                                                                    {item}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* City Selector */}
                        <div className="hidden md:block relative">
                            <motion.button
                                className="flex items-center py-4 text-gray-700 hover:text-orange-600 focus:outline-none transition-colors font-semibold"
                                onClick={() => toggleDropdown('city')}
                                whileHover={{ scale: 1.05 }}
                            >
                                <FiMapPin className="w-4 h-4 mr-2" />
                                {selectedCity}
                                <FiChevronDown className="ml-1" />
                            </motion.button>

                            <AnimatePresence>
                                {dropdownOpen.city && (
                                    <motion.div
                                        className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl rounded-lg z-10 border border-gray-100 overflow-hidden"
                                        variants={dropdownVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <ul className="py-2">
                                            {cities.map((city) => (
                                                <motion.li
                                                    key={city}
                                                    className="px-4 py-2.5 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 cursor-pointer transition-all text-gray-700 hover:text-orange-600 font-medium"
                                                    onClick={() => {
                                                        setSelectedCity(city);
                                                        toggleDropdown('city');
                                                    }}
                                                    whileHover={{ x: 4 }}
                                                >
                                                    {city}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
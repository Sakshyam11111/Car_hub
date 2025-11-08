import React, { useState, useEffect, useMemo } from 'react';
import {
  FiSearch, FiFilter, FiHeart, FiShare2, FiChevronDown,
  FiX, FiSliders
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import carData from '../data/cars.json';

const ITEMS_PER_PAGE = 6;

const CarListing = () => {
  const navigate = useNavigate();

  // ---------- State ----------
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('Relevance');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedFuel, setSelectedFuel] = useState('All Fuel Types');
  const [selectedTransmission, setSelectedTransmission] = useState('All Transmission');
  const [priceRange, setPriceRange] = useState([0, 120000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [savedCars, setSavedCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ---------- Data ----------
  const cars = carData.cars;

  const brands = ['All Brands', ...new Set(cars.map(c => c.name.split(' ')[0]))];
  const fuelTypes = ['All Fuel Types', ...new Set(cars.flatMap(c => c.fuel))];
  const transmissions = ['All Transmission', ...new Set(cars.flatMap(c => c.transmission))];
  const sortOptions = [
    'Relevance',
    'Price - Low to High',
    'Price - High to Low',
    'Rating - High to Low',
    'Most Popular'
  ];

  // ---------- Price Parser ----------
  const parsePrice = (priceStr) => {
    const match = priceStr.match(/₹([\d.]+)\s*(Lakh|Crore)/);
    if (!match) return 0;
    const value = parseFloat(match[1]);
    const unit = match[2];
    return unit === 'Crore' ? value * 10000000 : value * 100000;
  };

  const getMinMaxPrices = () => {
    const prices = cars.map(car => {
      const range = car.price.split(' - ');
      const min = parsePrice(range[0]);
      const max = range[1] ? parsePrice(range[1].replace('*', '').trim()) : min;
      return { min, max };
    });
    return {
      min: Math.min(...prices.map(p => p.min)),
      max: Math.max(...prices.map(p => p.max))
    };
  };

  const { min: globalMin, max: globalMax } = getMinMaxPrices();

  useEffect(() => {
    setPriceRange([globalMin, globalMax]);
  }, [globalMin, globalMax]);

  // ---------- Filtering & Sorting ----------
  const filteredAndSorted = useMemo(() => {
    let list = cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
        car.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBrand = selectedBrand === 'All Brands' || car.name.startsWith(selectedBrand);
      const matchesFuel = selectedFuel === 'All Fuel Types' || car.fuel.includes(selectedFuel);
      const matchesTrans = selectedTransmission === 'All Transmission' || car.transmission.includes(selectedTransmission);

      const range = car.price.split(' - ');
      const minPrice = parsePrice(range[0]);
      const maxPrice = range[1] ? parsePrice(range[1].replace('*', '').trim()) : minPrice;

      const matchesPrice = minPrice >= priceRange[0] && maxPrice <= priceRange[1];

      return matchesSearch && matchesBrand && matchesFuel && matchesTrans && matchesPrice;
    });

    // Sorting
    if (selectedSort === 'Price - Low to High') {
      list.sort((a, b) => parsePrice(a.price.split(' - ')[0]) - parsePrice(b.price.split(' - ')[0]));
    } else if (selectedSort === 'Price - High to Low') {
      list.sort((a, b) => parsePrice(b.price.split(' - ')[1] || b.price.split(' - ')[0]) - parsePrice(a.price.split(' - ')[1] || a.price.split(' - ')[0]));
    } else if (selectedSort === 'Rating - High to Low') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === 'Most Popular') {
      list.sort((a, b) => b.reviews - a.reviews);
    }

    return list;
  }, [
    cars,
    searchQuery,
    selectedBrand,
    selectedFuel,
    selectedTransmission,
    priceRange,
    selectedSort
  ]);

  // ---------- Pagination ----------
  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const paginatedCars = filteredAndSorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setLoading(false);
    }, 100);
  };

  // ---------- Save Car ----------
  const toggleSaveCar = (e, id) => {
    e.stopPropagation();
    setSavedCars(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search by brand, model, features..."
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Sort + Filter */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiSliders className="mr-2" />
                Filters
              </button>

              <div className="relative">
                <select
                  className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-lg bg-white focus:outline-none cursor-pointer"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                >
                  {sortOptions.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          {(showFilters || window.innerWidth >= 768) && (
            <aside className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 fixed md:static inset-0 z-40 md:z-auto overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button
                  className="md:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Budget */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Budget Range</h4>
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={globalMin}
                  max={globalMax}
                  step={100000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-orange-500"
                />
              </div>

              {/* Brand */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Brand</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map(b => (
                    <label key={b} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="brand"
                        checked={selectedBrand === b}
                        onChange={() => setSelectedBrand(b)}
                        className="mr-2 text-orange-500"
                      />
                      <span className="text-sm">{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fuel */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Fuel Type</h4>
                <div className="space-y-2">
                  {fuelTypes.map(f => (
                    <label key={f} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="fuel"
                        checked={selectedFuel === f}
                        onChange={() => setSelectedFuel(f)}
                        className="mr-2 text-orange-500"
                      />
                      <span className="text-sm">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Transmission */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Transmission</h4>
                <div className="space-y-2">
                  {transmissions.map(t => (
                    <label key={t} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="transmission"
                        checked={selectedTransmission === t}
                        onChange={() => setSelectedTransmission(t)}
                        className="mr-2 text-orange-500"
                      />
                      <span className="text-sm">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </button>
            </aside>
          )}

          {/* Listings */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredAndSorted.length} of {cars.length} cars
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedCars.map(car => (
                    <div
                      key={car.id}
                      // Removed onClick – card is no longer clickable
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-48 object-cover"
                        />
                        {car.isPopular && (
                          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                            Popular
                          </div>
                        )}
                        <button
                          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                          onClick={(e) => toggleSaveCar(e, car.id)}
                        >
                          <FiHeart
                            className={savedCars.includes(car.id) ? 'text-red-500 fill-current' : 'text-gray-600'}
                            size={20}
                          />
                        </button>
                      </div>

                      {/* Details */}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{car.name}</h3>
                          <button
                            className="text-gray-600 hover:text-orange-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiShare2 size={18} />
                          </button>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(car.rating) ? 'fill-current' : ''}`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-1">
                            {car.rating} ({car.reviews} reviews)
                          </span>
                        </div>

                        <div className="text-xl font-bold text-orange-500 mb-3">{car.price}</div>

                        {/* Quick specs */}
                        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {car.fuel.join(', ')}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            {car.transmission.join(', ')}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                            {car.engine}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            {car.mileage}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {car.features.slice(0, 3).map((f, i) => (
                            <span
                              key={i}
                              className="text-xs bg-gray-100 px-2 py-1 rounded"
                            >
                              {f}
                            </span>
                          ))}
                          {car.features.length > 3 && (
                            <span className="text-xs text-gray-500">+{car.features.length - 3} more</span>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <button
                            className="text-orange-500 text-sm font-medium hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {car.offers}
                          </button>

                          {/* Only this button navigates to the detail page */}
                          <Link
                            to={`/car/${car.id}`}
                            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm"
                            // No need for stopPropagation – the card has no click handler
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                        .map((p, idx, arr) => (
                          <React.Fragment key={p}>
                            {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-2">...</span>}
                            <button
                              className={`px-3 py-2 border rounded-md ${
                                currentPage === p
                                  ? 'bg-orange-500 text-white border-orange-500'
                                  : 'border-gray-300 hover:bg-gray-100'
                              }`}
                              onClick={() => handlePageChange(p)}
                            >
                              {p}
                            </button>
                          </React.Fragment>
                        ))}

                      <button
                        className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListing;
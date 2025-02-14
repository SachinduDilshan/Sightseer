import React, { useState, useEffect, useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { fetchDestinationsData } from '../models/DestinationApi';
import BackButton from './BackButton';

const DestinationPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const { darkMode } = useContext(DarkModeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('sri lanka');

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDestinationsData(searchLocation);
        setDestinations(data);
      } catch (err) {
        setError('Failed to load destinations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Debounce the API call
    const timeoutId = setTimeout(() => {
      loadDestinations();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchLocation]);

  const filterCategories = ['All', 'Cities', 'Beach', 'Wildlife', 'Cultural', 'Mountains'];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchLocation(searchQuery);
  };

  const filteredDestinations = destinations.filter(dest => {
    const matchesFilter = activeFilter === 'All' || dest.category === activeFilter;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 p-4">

        <div className="p-4 flex justify-between items-center bg-transparent text-gray-900 dark:text-white">
          <BackButton className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" />
        </div>
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              placeholder="Search destinations..."
              className="flex-1 p-3 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Filter Pills */}
        <div className="max-w-4xl mx-auto mb-8 flex flex-wrap gap-2">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm ${activeFilter === category
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* Destinations Grid */}
        {loading ? (
          <div className="text-center dark:text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            Loading destinations...
          </div>
        ) : (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
              >
                <div className="relative h-48">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 rounded-full">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-gray-600 dark:text-gray-300">{destination.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold dark:text-white">{destination.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {destination.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 rounded-full text-sm">
                      {destination.category}
                    </span>
                    <button className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors">
                      Explore →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DestinationPage;
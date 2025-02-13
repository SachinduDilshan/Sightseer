import React, { useState, useEffect, useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { fetchHotelsData } from '../models/HotelApi';
import BackButton from './BackButton';

const HotelPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState('all');
  const { darkMode } = useContext(DarkModeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('colombo');

  useEffect(() => {
    const loadHotels = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchHotelsData(searchLocation);
        setHotels(data);
      } catch (err) {
        setError('Failed to load hotels. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Debounce the API call
    const timeoutId = setTimeout(() => {
      loadHotels();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchLocation]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchLocation(searchQuery);
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesPrice = priceRange === 'all' ||
      (priceRange === 'budget' && hotel.price < 100) ||
      (priceRange === 'mid' && hotel.price >= 100 && hotel.price < 200) ||
      (priceRange === 'luxury' && hotel.price >= 200);
    return matchesPrice;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Navbar />

      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 p-4">

        <div className="p-4 flex justify-between items-center bg-transparent text-gray-900 dark:text-white">
          <BackButton className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" />
        </div>
        {/* Search and Filters */}
        <div className="max-w-6xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search location..."
              className="flex-1 p-3 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Search
            </button>
            <select
              className="p-3 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="budget">Budget ($)</option>
              <option value="mid">Mid-Range ($$)</option>
              <option value="luxury">Luxury ($$$)</option>
            </select>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-6xl mx-auto mb-8 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* Hotels Grid */}
        {loading ? (
          <div className="text-center dark:text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
            Loading hotels...
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold dark:text-white">{hotel.name}</h3>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-gray-600 dark:text-gray-300">{hotel.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{hotel.location}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities?.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-teal-500">${hotel.price}</span>
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors">
                      Book Now
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

export default HotelPage;
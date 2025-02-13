export const fetchHotelsData = async (query = 'Colombo, Sri Lanka') => {
  // Using the correct endpoint for location search
  const locationUrl = `https://travel-advisor.p.rapidapi.com/locations/search?query=${encodeURIComponent(query)}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`;
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
    },
  };

  try {
    // Get location data
    const locationResponse = await fetch(locationUrl, options);
    
    if (!locationResponse.ok) {
      throw new Error(`Location search failed: ${locationResponse.status}`);
    }

    const locationData = await locationResponse.json();
    console.log("Location Search Response:", locationData);
    
    // Find the first location result that represents a city or hotel
    const location = locationData.data.find(item => 
      item.result_type === "geos" || 
      item.result_type === "hotels"
    );

    if (!location) {
      throw new Error('No valid location found for the search query');
    }

    const locationId = location.result_object.location_id;

    // Use the correct endpoint for hotel list
    const hotelsUrl = `https://travel-advisor.p.rapidapi.com/hotels/list?location_id=${locationId}&adults=1&rooms=1&nights=2&offset=0&currency=USD&order=asc&limit=30&sort=recommended&lang=en_US`;

    const hotelResponse = await fetch(hotelsUrl, options);

    if (!hotelResponse.ok) {
      throw new Error(`Hotel search failed: ${hotelResponse.status}`);
    }

    const hotelData = await hotelResponse.json();
    console.log("Hotels Response:", hotelData);

    if (!hotelData.data || hotelData.data.length === 0) {
      throw new Error('No hotels found in the response');
    }

    return hotelData.data.map(hotel => ({
      id: hotel.location_id || 'N/A',
      name: hotel.name || 'Unknown Hotel',
      rating: hotel.rating || 'N/A',
      price: hotel.price_level || hotel.price || 'Price not available',
      location: hotel.location_string || 'Sri Lanka',
      amenities: 
        hotel.amenities?.slice(0, 5) || 
        hotel.property_amenities?.slice(0, 5) || 
        ['Basic amenities'],
      image: 
        hotel.photo?.images?.large?.url || 
        hotel.photo?.images?.original?.url || 
        '/api/placeholder/400/250',
      description: hotel.description || ''
    }));

  } catch (error) {
    console.error('❌ Error fetching hotels:', error);
    throw error;
  }
};
const RAPID_API_KEY = 'c390c4dc43msh0c78e39a8ef2870p1f3f92jsn05dd395bc8d1'; // Get a new key if needed
const RAPID_API_HOST = 'hotels4.p.rapidapi.com';

export const fetchHotelsData = async (query = 'Colombo') => {
  const url = `https://travel-advisor.p.rapidapi.com/hotels/list`;

  const options = {
    method: 'POST',  // 🔹 Most hotel APIs use POST instead of GET
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST,
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({
      currency: "USD",
      locale: "en_US",
      destination: {
        regionId: query, // 🔹 If 'query' is the regionId, use it here
      },
      checkInDate: { day: 15, month: 3, year: 2025 },  // 🔹 Sample check-in date
      checkOutDate: { day: 20, month: 3, year: 2025 }, // 🔹 Sample check-out date
      rooms: [{ adults: 2 }], // 🔹 Sample request for 2 adults
      resultsSize: 30, 
    }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (!data || !data.data || !data.data.propertySearch || !Array.isArray(data.data.propertySearch.properties)) {
      throw new Error('Invalid API response structure');
    }

    return data.data.propertySearch.properties.map(hotel => ({
      id: hotel.id || 'N/A',
      name: hotel.name || 'Unknown Hotel',
      rating: hotel.reviews?.score || 4.5,
      price: hotel.price?.lead?.amount || 'N/A',
      location: hotel.destinationInfo?.distanceFromDestination?.value || 'Unknown Location',
      amenities: hotel.amenities || ['WiFi', 'Pool'],
      image: hotel.propertyImage?.image?.url || '/api/placeholder/400/250',
    }));
  } catch (error) {
    console.error('❌ Error fetching hotels:', error);
    throw error;
  }
};

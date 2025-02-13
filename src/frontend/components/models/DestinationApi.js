export const fetchDestinationsData = async (query = 'Sri Lanka') => {
  const url = 'https://travel-advisor.p.rapidapi.com/locations/search';

  const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
  };

  try {
      const response = await fetch(`${url}?query=${encodeURIComponent(query)}&limit=30&currency=USD&sort=relevance&lang=en_US`, options);
      
      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (!data || !data.data || !Array.isArray(data.data)) {
          throw new Error('Invalid response structure');
      }

      return data.data
          .filter(place => place.result_type === 'geos')
          .map(place => {
              const { result_object } = place;

              return {
                  id: result_object.location_id || 'N/A',
                  name: result_object.name || 'Unknown Location',
                  rating: result_object.rating || 4.0,
                  description: result_object.geo_description || 'Explore this beautiful place!',
                  category: 'Destination', // 🔹 General category for destinations
                  image: result_object.photo?.images?.large?.url || '/api/placeholder/400/250',
                  reviews: result_object.num_reviews || 0,
                  type: result_object.timezone || 'N/A',
              };
          });
  } catch (error) {
      console.error('❌ Error fetching destinations:', error);
      throw error;
  }
};

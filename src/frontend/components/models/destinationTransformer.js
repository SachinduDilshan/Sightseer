// destinationTransformer.js
export const transformDestinationData = (apiData) => {
    return apiData.map(location => {
      // Generate a category based on the location type or name
      const determineCategory = (location) => {
        const name = location.name.toLowerCase();
        if (name.includes('beach') || location.type === 'BEACH') return 'Beach';
        if (name.includes('wildlife') || name.includes('national park')) return 'Wildlife';
        if (name.includes('temple') || name.includes('fort')) return 'Cultural';
        if (name.includes('mountain') || name.includes('peak')) return 'Mountains';
        return 'Cities';
      };
  
      // Generate a description based on available data
      const generateDescription = (location) => {
        const parts = [];
        if (location.detailedName) parts.push(location.detailedName);
        if (location.iataCode) parts.push(`Airport code: ${location.iataCode}`);
        if (location.location?.cityName) parts.push(`Located in ${location.location.cityName}`);
        if (location.pointsOfInterest?.length > 0) {
          parts.push(`Nearby attractions: ${location.pointsOfInterest.map(poi => poi.name).join(', ')}`);
        }
        return parts.join('. ') || 'Explore this beautiful destination in Sri Lanka';
      };
  
      // Generate a placeholder rating based on location data
      const generateRating = () => {
        return ((Math.random() * 2) + 3).toFixed(1); // Random rating between 3.0 and 5.0
      };
  
      return {
        id: location.id || Math.random().toString(36).substr(2, 9),
        name: location.name,
        description: generateDescription(location),
        category: determineCategory(location),
        rating: generateRating(),
        image: `/api/placeholder/800/600?text=${encodeURIComponent(location.name)}`, // Placeholder image
        type: location.type,
        coordinates: location.location ? {
          latitude: location.location.latitude,
          longitude: location.location.longitude
        } : null,
        pointsOfInterest: location.pointsOfInterest || [],
        safetyInfo: location.safetyInfo || null
      };
    });
  };
// DestinationApi.js
import { transformDestinationData } from './destinationTransformer.js';

const getAmadeusAccessToken = async () => {
    const authUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";
    const clientId = "PIzvkZWBGl3pFKAZtDBtAGZLgmrEHLVC";
    const clientSecret = "VNzJGp15ZIiq9Vtt";
    
    try {
        const response = await fetch(authUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
        });
        
        if (!response.ok) {
            throw new Error(`Failed to get access token: ${response.status}`);
        }
        
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("❌ Error fetching Amadeus access token:", error);
        throw error;
    }
};

export const fetchDestinationsData = async (query = 'Colombo') => {
    try {
        console.log('🔍 Starting destination fetch for query:', query);
        
        const accessToken = await getAmadeusAccessToken();
        console.log('✅ Got access token:', accessToken.substring(0, 10) + '...');
        
        // Using only valid subType values: CITY for cities/locations
        const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${encodeURIComponent(query)}&page[limit]=20`;
        console.log('📡 Fetching from URL:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        const rawData = await response.text();
        console.log('📦 Raw API response:', rawData);
        
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} - ${rawData}`);
        }
        
        const data = JSON.parse(rawData);
        console.log('✨ Parsed API data:', data);
        
        if (!data || !data.data || !Array.isArray(data.data)) {
            throw new Error('Invalid response structure');
        }
        
        const transformedData = data.data.map(place => ({
            id: place.id || `generated-${Math.random()}`,
            name: place.name || 'Unknown Location',
            description: place.detailedName || `Explore this beautiful destination in ${place.address?.cityName || 'Sri Lanka'}`,
            category: determineCategory(place),
            rating: generateRating(),
            image: `/api/placeholder/800/600?text=${encodeURIComponent(place.name)}`,
            type: place.subType || 'N/A',
        }));
        
        console.log('🎯 Transformed data:', transformedData);
        return transformedData;
        
    } catch (error) {
        console.error('❌ Error fetching destinations:', error);
        throw error;
    }
};

// Helper function to determine category
const determineCategory = (place) => {
    const name = (place.name || '').toLowerCase();
    
    if (name.includes('beach')) return 'Beach';
    if (name.includes('wildlife') || name.includes('national') || name.includes('park')) return 'Wildlife';
    if (name.includes('temple') || name.includes('fort') || name.includes('museum')) return 'Cultural';
    if (name.includes('mountain') || name.includes('peak') || name.includes('hill')) return 'Mountains';
    return 'Cities';
};

// Helper function to generate a rating
const generateRating = () => {
    return (Math.floor(Math.random() * 15) + 35) / 10;
};
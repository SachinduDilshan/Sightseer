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

export const fetchDestinationsData = async (query = 'Sri Lanka') => {
    const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${encodeURIComponent(query)}&countryCode=LK`;

    try {
        const accessToken = await getAmadeusAccessToken();
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        if (!data || !data.data || !Array.isArray(data.data)) {
            throw new Error('Invalid response structure');
        }

        return data.data.map((place, index) => ({
            id: place.id || `generated-${index}`,  // Ensuring unique keys
            name: place.name || 'Unknown Location',
            iataCode: place.iataCode || 'N/A',
            category: 'Destination',
            countryCode: place.address?.countryCode || 'N/A',
            type: place.subType || 'N/A',
        }));

    } catch (error) {
        console.error('❌ Error fetching destinations:', error);
        throw error;
    }
};

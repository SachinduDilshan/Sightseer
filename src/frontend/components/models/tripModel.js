import { useState } from "react";

// Data mapping for interests to districts
export const interestToDistrictMap = {
    "Cultural Heritage": ["Kandy", "Polonnaruwa", "Anuradhapura", "Kurunegala"],
    "Tea Plantations": ["Nuwara Eliya", "Badulla", "Kandy"],
    "Wildlife Explore": ["Yala", "Wilpattu", "Udawalawe"],
    "Hiking & Trekking": ["Ella", "Knuckles", "Adam's Peak"],
    "City Exploration": ["Colombo", "Galle", "Jaffna"],
    "Beach Life": ["Unawatuna", "Arugam Bay", "Mirissa", "Trincomalee", "Matara"],
    "Travel Photography": ["Sigiriya", "Horton Plains", "Nine Arches Bridge"],
    "Local Cuisine": ["Negombo", "Colombo", "Jaffna"],
    "Camping Activities": ["Riverston", "Meemure", "Belihuloya"],
};

// Date handling utilities
export const dateUtils = {
    formatDate: (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    },
    
    parseDate: (dateString) => {
        if (!dateString) return null;
        return new Date(dateString);
    },
    
    getMonthDays: (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    },
    
    getMonthFirstDay: (year, month) => {
        return new Date(year, month, 1).getDay();
    }
};

// TripPlan model
export const useTripPlanModel = () => {
    const [interests, setInterests] = useState([]);
    const [budget, setBudget] = useState("");
    const [travelStyle, setTravelStyle] = useState("");
    const [needAgent, setNeedAgent] = useState(false);
    const [dateRange, setDateRange] = useState({ from: "", to: "" });
    const [tripPlan, setTripPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const handleInterestToggle = (interest) => {
        setInterests((prev) =>
            prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
        );
    };
    
    const fetchTripPlan = async () => {
        setLoading(true);
        setError(null);
        
        // Extract relevant districts based on interests
        const selectedDistricts = interests.flatMap((interest) => interestToDistrictMap[interest] || []);
        
        // Match the expected fields in the backend UserPreferences model
        const requestData = {
            interests: interests,
            budget: budget,
            travel_style: travelStyle,
            travel_agent: Boolean(needAgent),
            // Include optional fields that backend now supports
            districts: [...new Set(selectedDistricts)],
            date_range: dateRange
        };
        
        console.log("Sending request:", requestData);
        
        try {
            const response = await fetch("http://127.0.0.1:8000/recommend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });
            
            console.log("Response status:", response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("API error:", errorText);
                throw new Error(`Failed to fetch recommendations: ${response.status} ${errorText}`);
            }
            
            const data = await response.json();
            console.log("Received data:", data);
            
            setTripPlan(data.trip_plan);
            return data.trip_plan;
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    
    return {
        // State
        interests,
        budget,
        travelStyle,
        needAgent,
        dateRange,
        tripPlan,
        loading,
        error,
        
        // Actions
        setInterests,
        setBudget,
        setTravelStyle,
        setNeedAgent,
        setDateRange,
        setTripPlan,
        setError,
        handleInterestToggle,
        fetchTripPlan
    };
};
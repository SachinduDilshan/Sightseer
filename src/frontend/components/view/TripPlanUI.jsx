import { useContext, useState } from "react";
import { DarkModeContext } from "./DarkModeContext";
import Navbar from "./Navbar";
import { FaCalendarAlt } from "react-icons/fa";
import BackButton from "./BackButton";

const TripPlanUI = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [step, setStep] = useState(1);
    const [interests, setInterests] = useState([]);
    const [budget, setBudget] = useState("");
    const [travelStyle, setTravelStyle] = useState("");
    const [needAgent, setNeedAgent] = useState(null);
    const [dateRange, setDateRange] = useState({ from: "", to: "" });
    const [tripPlan, setTripPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInterestToggle = (interest) => {
        setInterests((prev) =>
            prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
        );
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        const requestData = {
            interests,
            budget,
            travel_style: travelStyle,
            travel_agent: Boolean(needAgent),
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/recommend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });
            

            if (!response.ok) {
                throw new Error("Failed to fetch recommendations");
            }

            const data = await response.json();
            setTripPlan(data.trip_plan);
            setStep(3);
            console.log("API Response:", data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen p-6">
                <div className={`w-full max-w-3xl p-6 rounded-2xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                    <BackButton />

                    {/* Step 1: Interests & Budget */}
                    {step === 1 && (
                        <div>
                            <h2 className="text-3xl font-bold text-emerald-400 mb-6 text-center">Start Planning</h2>
                            <p className="mb-3 text-lg font-medium">What are your interests?</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {["Cultural Heritage", "Tea Plantations", "Wildlife Explore", "Hiking & Trekking", "City Exploration", "Beach Life", "Travel Photography", "Local Cuisine", "Camping Activities"].map((interest) => (
                                    <button
                                        key={interest}
                                        onClick={() => handleInterestToggle(interest)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition border 
                                      ${interests.includes(interest)
                                                ? "bg-teal-500 text-white border-teal-500 dark:hover:bg-teal-400 hover:bg-teal-600"
                                                : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-gray-400 dark:hover:bg-gray-600 hover:bg-gray-300"}`}
                                    >
                                        {interest}
                                    </button>
                                ))}
                            </div>

                            <p className="mt-6 mb-3 text-lg font-medium">Your budget?</p>
                            <div className="flex gap-3">
                                {["Budget Friendly", "Comfort", "Luxury"].map((b) => (
                                    <button
                                        key={b}
                                        onClick={() => setBudget(b)}
                                        className={`px-5 py-2 rounded-lg text-sm font-medium transition border 
                                      ${budget === b
                                                ? "bg-teal-500 text-white border-teal-500 dark:hover:bg-teal-400 hover:bg-teal-600"
                                                : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-gray-400 dark:hover:bg-gray-600 hover:bg-gray-300"}`}
                                    >
                                        {b}
                                    </button>
                                ))}
                            </div>

                            <button
                                className="mt-8 w-full py-3 bg-emerald-600 text-white text-lg font-semibold rounded-lg hover:bg-emerald-700 transition"
                                onClick={() => setStep(2)}
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {/* Step 2: Date & Travel Style */}
                    {step === 2 && (
                        <div>
                            <h2 className="text-3xl font-bold text-emerald-400 mb-6 text-center">Date, Style & Agents</h2>
                            <p className="mb-3 text-lg font-medium">When are you planning to travel?</p>
                            <div className="flex gap-4">
                                <div className="flex items-center border px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700">
                                    <FaCalendarAlt className="text-gray-500 mr-2" />
                                    <input
                                        type="date"
                                        className="bg-transparent outline-none text-gray-900 dark:text-gray-300"
                                        value={dateRange.from}
                                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-center border px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700">
                                    <FaCalendarAlt className="text-gray-500 mr-2" />
                                    <input
                                        type="date"
                                        className="bg-transparent outline-none text-gray-900 dark:text-gray-300"
                                        value={dateRange.to}
                                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                                    />
                                </div>
                            </div>

                            <p className="mt-6 mb-3 text-lg font-medium">Your travel style?</p>
                            <div className="flex gap-3">
                                {["Solo", "Couple", "Friends", "Family"].map((style) => (
                                    <button
                                        key={style}
                                        onClick={() => setTravelStyle(style)}
                                        className={`px-5 py-2 rounded-lg text-sm font-medium transition border 
                                            ${travelStyle === style ? "bg-emerald-500 text-white border-emerald-500" : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-gray-400"}`}
                                    >
                                        {style}
                                    </button>
                                ))}
                            </div>

                            <button className="mt-8 w-full py-3 bg-emerald-600 text-white text-lg font-semibold rounded-lg hover:bg-emerald-700 transition" onClick={handleSubmit}>
                                Get Recommendations
                            </button>
                        </div>
                    )}

                    {/* Step 3: Display Recommendations */}
                    {step === 4 && (
                        <div>
                            <h2 className="text-3xl font-bold text-emerald-400 mb-6 text-center">Your Trip Plan</h2>

                            {loading && <p className="text-center text-lg">Loading recommendations...</p>}
                            {error && <p className="text-center text-red-500">{error}</p>}

                            {tripPlan && (
                                <div>
                                    {Object.entries(tripPlan).map(([category, items]) => (
                                        <div key={category} className="mb-6">
                                            <h3 className="text-xl font-bold text-emerald-500">{category}</h3>
                                            <ul className="mt-2">
                                                {items.map((item, index) => (
                                                    <li key={index} className="text-gray-700 dark:text-gray-300">
                                                        - {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TripPlanUI;

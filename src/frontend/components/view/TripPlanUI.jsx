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

    const handleInterestToggle = (interest) => {
        setInterests((prev) =>
            prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
        );
    };

    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen p-6">
                <div className={`w-full max-w-3xl p-6 rounded-2xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                    {step > 1 && (
                        <button
                            className="flex items-center text-emerald-500 hover:text-emerald-400 mb-4"
                            onClick={() => setStep(step - 1)}
                        >
                            <BackButton />
                        </button>
                    )}

                    {/* Step 1: Interests & Budget */}
                    {step === 1 && (
                        <div>
                            <h2 className="text-3xl font-bold text-emerald-400 mb-6 text-center">Start Planning</h2>
                            <p className="mb-3 text-lg font-medium">What are your interests?</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {["Cultural Heritage", "Tea Plantations", "Wildlife Explore", "Hiking & Trekking", "City Exploration", "Beach Life", "Travel Photography", "Local Cuisine", "Camping Activities"].map((interest) => (
                                    <button
                                        onClick={() => handleInterestToggle(interest)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition border 
                                      ${interests.includes(interest)
                                                ? "bg-teal-500 text-white border-teal-500 dark:hover:bg-teal-400 hover:bg-teal-600"
                                                : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-gray-400 dark:hover:bg-gray-600 hover:bg-gray-300"}
                                    `}
                                    >
                                        {interest}
                                    </button>
                                ))}
                            </div>

                            <p className="mt-6 mb-3 text-lg font-medium">Your budget?</p>
                            <div className="flex gap-3">
                                {["Budget Friendly", "Comfort", "Luxury"].map((b) => (
                                    <button
                                        onClick={() => setBudget(b)}
                                        className={`px-5 py-2 rounded-lg text-sm font-medium transition border 
                                      ${budget === b
                                                ? "bg-teal-500 text-white border-teal-500 dark:hover:bg-teal-400 hover:bg-teal-600"
                                                : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-gray-400 dark:hover:bg-gray-600 hover:bg-gray-300"}
                                    `}
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
                                        className={`px-5 py-2 rounded-lg text-sm font-medium transition border ${travelStyle === style
                                            ? "bg-emerald-500 text-white border-emerald-500"
                                            : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-gray-400"
                                            } hover:bg-emerald-400 hover:text-white`}
                                    >
                                        {style}
                                    </button>
                                ))}
                            </div>

                            <p className="mt-6 mb-3 text-lg font-medium">Do you need a travel agent?</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setNeedAgent(true)}
                                    className={`px-6 py-2 rounded-lg text-sm font-medium transition border ${needAgent === true
                                        ? "bg-emerald-500 text-white border-emerald-500"
                                        : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-gray-400"
                                        } hover:bg-emerald-400 hover:text-white`}
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => setNeedAgent(false)}
                                    className={`px-6 py-2 rounded-lg text-sm font-medium transition border ${needAgent === false
                                        ? "bg-red-500 text-white border-red-500"
                                        : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-gray-400"
                                        } hover:bg-red-400 hover:text-white`}
                                >
                                    No
                                </button>
                            </div>

                            <div className="flex justify-between mt-8">
                                <button
                                    className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </button>
                                <button
                                    className="px-6 py-3 bg-emerald-600 text-white text-lg font-semibold rounded-lg hover:bg-emerald-700 transition"
                                    onClick={() => setStep(3)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TripPlanUI;

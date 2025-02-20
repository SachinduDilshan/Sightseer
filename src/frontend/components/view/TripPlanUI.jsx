// Main View component - integrates the controller and UI components
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";
import Navbar from "./Navbar";
import BackButton from "./BackButton";
import { useTripPlanController } from "../controllers/triPlanController";
import { interestToDistrictMap } from "../models/tripModel";
import {
    DatePicker,
    InterestsSelector,
    BudgetSelector,
    TravelStyleSelector,
    AgentSelector,
    TripSummary,
    TripPlanResult
} from "./tripPlanComponents";

const TripPlanUI = () => {
    const { darkMode } = useContext(DarkModeContext);
    const {
        // State
        interests,
        budget,
        travelStyle,
        needAgent,
        dateRange,
        tripPlan,
        loading,
        error,
        step,
        
        // Actions
        setBudget,
        setTravelStyle,
        setNeedAgent,
        setDateRange,
        handleInterestToggle,
        handleStepOneNext,
        handleSubmit,
        resetTripPlan
    } = useTripPlanController();

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
                            
                            {/* Interests Selector */}
                            <InterestsSelector 
                                interests={interestToDistrictMap}
                                selectedInterests={interests}
                                onToggle={handleInterestToggle}
                            />

                            {/* Budget Selector */}
                            <div className="mt-8">
                                <BudgetSelector 
                                    selectedBudget={budget} 
                                    onSelect={setBudget} 
                                />
                            </div>

                            {/* Date Range Selector */}
                            <div className="mt-8">
                                <p className="mb-3 text-lg font-medium">When are you planning to travel?</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <DatePicker
                                        selectedDate={dateRange.from}
                                        onDateSelect={(date) => setDateRange({...dateRange, from: date})}
                                        label="From"
                                        darkMode={darkMode}
                                    />
                                    <DatePicker
                                        selectedDate={dateRange.to}
                                        onDateSelect={(date) => setDateRange({...dateRange, to: date})}
                                        minDate={dateRange.from}
                                        label="To"
                                        darkMode={darkMode}
                                    />
                                </div>
                            </div>
                            
                            <button
                                className="mt-8 w-full py-3 bg-emerald-600 text-white text-lg font-semibold rounded-lg hover:bg-emerald-700 transition"
                                onClick={handleStepOneNext}
                                disabled={!budget || !dateRange.from || !dateRange.to || interests.length === 0}
                            >
                                Next
                            </button>
                        </div>
                    )}
                    
                    {/* Step 2: Travel Style */}
                    {step === 2 && (
                        <div>
                            <h2 className="text-3xl font-bold text-emerald-400 mb-6 text-center">Travel Preferences</h2>
                            
                            {/* Travel Style Selector */}
                            <TravelStyleSelector
                                selectedStyle={travelStyle}
                                onSelect={setTravelStyle}
                            />

                            {/* Agent Selector */}
                            <div className="mt-6">
                                <AgentSelector 
                                    needAgent={needAgent} 
                                    onSelect={setNeedAgent} 
                                />
                            </div>

                            {/* Trip Summary */}
                            <TripSummary 
                                interests={interests}
                                budget={budget}
                                travelStyle={travelStyle}
                                dateRange={dateRange}
                            />

                            <button 
                                className="mt-8 w-full py-3 bg-emerald-600 text-white text-lg font-semibold rounded-lg hover:bg-emerald-700 transition" 
                                onClick={handleSubmit}
                                disabled={!travelStyle || needAgent === null || loading}
                            >
                                {loading ? "Getting Recommendations..." : "Get Recommendations"}
                            </button>
                            
                            {error && (
                                <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg dark:bg-red-900 dark:text-red-200">
                                    {error}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Results */}
                    {step === 3 && tripPlan && (
                        <div>
                            <h2 className="text-3xl font-bold text-emerald-400 mb-6 text-center">Your Trip Plan</h2>
                            
                            {/* Trip Plan Result */}
                            <TripPlanResult tripPlan={tripPlan} />
                            
                            <button
                                className="mt-8 w-full py-3 bg-emerald-600 text-white text-lg font-semibold rounded-lg hover:bg-emerald-700 transition"
                                onClick={resetTripPlan}
                            >
                                Plan Another Trip
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TripPlanUI;
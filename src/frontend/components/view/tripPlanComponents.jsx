// View components - UI elements for the trip planner
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import { dateUtils } from "../models/tripModel";
import { useState } from "react";

export const DatePicker = ({ selectedDate, onDateSelect, minDate, label, darkMode }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [viewDate, setViewDate] = useState(() => {
        return selectedDate ? new Date(selectedDate) : new Date();
    });
    
    const handlePrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };
    
    const handleNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };
    
    const handleDateClick = (day) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        if (minDate && newDate < new Date(minDate)) return;
        
        onDateSelect(dateUtils.formatDate(newDate));
        setShowCalendar(false);
    };
    
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const monthDays = dateUtils.getMonthDays(year, month);
    const monthFirstDay = dateUtils.getMonthFirstDay(year, month);
    
    const daysArray = [];
    for (let i = 0; i < monthFirstDay; i++) {
        daysArray.push(null);
    }
    for (let i = 1; i <= monthDays; i++) {
        daysArray.push(i);
    }
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const isDateDisabled = (day) => {
        if (!day || !minDate) return false;
        const date = new Date(year, month, day);
        return date < new Date(minDate);
    };
    
    return (
        <div className="relative">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <div 
                className={`relative flex items-center p-2 rounded-lg border cursor-pointer ${
                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                }`}
                onClick={() => setShowCalendar(true)}
            >
                <span className={`flex-1 ${selectedDate ? "" : "text-gray-400"}`}>
                    {selectedDate ? new Date(selectedDate).toLocaleDateString() : "Select date"}
                </span>
                <FaCalendarAlt className="text-gray-400" />
            </div>
            
            {showCalendar && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="relative w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="p-2 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                            <button 
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                                onClick={handlePrevMonth}
                            >
                                &lt;
                            </button>
                            <span className="font-medium">
                                {monthNames[month]} {year}
                            </span>
                            <button 
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                                onClick={handleNextMonth}
                            >
                                &gt;
                            </button>
                            <button 
                                onClick={() => setShowCalendar(false)}
                                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className="p-2">
                            <div className="grid grid-cols-7 gap-1 mb-1">
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
                                    <div key={i} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {daysArray.map((day, i) => (
                                    <div 
                                        key={i}
                                        className={`
                                            h-8 flex items-center justify-center text-sm rounded-full
                                            ${!day ? "" : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"}
                                            ${isDateDisabled(day) ? "opacity-30 cursor-not-allowed" : ""}
                                            ${selectedDate && day === dateUtils.parseDate(selectedDate)?.getDate() && month === dateUtils.parseDate(selectedDate)?.getMonth() && year === dateUtils.parseDate(selectedDate)?.getFullYear() 
                                                ? "bg-emerald-500 text-white hover:bg-emerald-600 dark:hover:bg-emerald-600" 
                                                : ""}
                                        `}
                                        onClick={() => day && !isDateDisabled(day) && handleDateClick(day)}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                            <button 
                                className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
                                onClick={() => {
                                    onDateSelect(dateUtils.formatDate(new Date()));
                                    setShowCalendar(false);
                                }}
                            >
                                Today
                            </button>
                            <button 
                                className="text-sm text-red-500 hover:underline"
                                onClick={() => {
                                    onDateSelect("");
                                    setShowCalendar(false);
                                }}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const InterestsSelector = ({ interests, selectedInterests, onToggle }) => {
    return (
        <div>
            <p className="mb-3 text-lg font-medium">What are your interests?</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.keys(interests).map((interest) => (
                    <button
                        key={interest}
                        onClick={() => onToggle(interest)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition border 
                        ${selectedInterests.includes(interest)
                            ? "bg-teal-500 text-white border-teal-500 dark:hover:bg-teal-400 hover:bg-teal-600"
                            : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-gray-400 dark:hover:bg-gray-600 hover:bg-gray-300"}`}
                    >
                        {interest}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const BudgetSelector = ({ selectedBudget, onSelect }) => {
    return (
        <div>
            <p className="mb-3 text-lg font-medium">Your budget preference?</p>
            <div className="flex gap-3">
                {["Budget", "Comfort", "Luxury"].map((budgetType) => (
                    <button
                        key={budgetType}
                        onClick={() => onSelect(budgetType)}
                        className={`px-5 py-2 rounded-lg text-sm font-medium transition border flex-1 
                        ${selectedBudget === budgetType 
                            ? "bg-teal-500 text-white border-teal-500" 
                            : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-gray-400"}`}
                    >
                        {budgetType}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const TravelStyleSelector = ({ selectedStyle, onSelect }) => {
    return (
        <div>
            <p className="mb-3 text-lg font-medium">Your travel style?</p>
            <div className="flex gap-3">
                {["Solo", "Couple", "Friends", "Family"].map((style) => (
                    <button
                        key={style}
                        onClick={() => onSelect(style)}
                        className={`px-5 py-2 rounded-lg text-sm font-medium transition border 
                        ${selectedStyle === style ? "bg-emerald-500 text-white border-emerald-500" : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-gray-400"}`}
                    >
                        {style}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const AgentSelector = ({ needAgent, onSelect }) => {
    return (
        <div>
            <p className="mb-3 text-lg font-medium">Need a travel agent?</p>
            <div className="flex gap-3">
                <button
                    onClick={() => onSelect(true)}
                    className={`flex-1 px-5 py-2 rounded-lg text-sm font-medium transition border 
                    ${needAgent === true ? "bg-emerald-500 text-white border-emerald-500" : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-gray-400"}`}
                >
                    Yes
                </button>
                <button
                    onClick={() => onSelect(false)}
                    className={`flex-1 px-5 py-2 rounded-lg text-sm font-medium transition border 
                    ${needAgent === false ? "bg-red-500 text-white border-red-500" : "bg-red-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-gray-400"}`}
                >
                    No
                </button>
            </div>
        </div>
    );
};

export const TripSummary = ({ interests, budget, travelStyle, dateRange }) => {
    return (
        <div className="mt-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
            <h3 className="font-medium mb-2">Trip Summary</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                    <span className="text-gray-500 dark:text-gray-400">Dates:</span> 
                    <span className="ml-1 font-medium">
                        {dateRange.from && dateRange.to 
                            ? `${new Date(dateRange.from).toLocaleDateString()} to ${new Date(dateRange.to).toLocaleDateString()}` 
                            : 'Not selected'}
                    </span>
                </div>
                <div>
                    <span className="text-gray-500 dark:text-gray-400">Budget:</span> 
                    <span className="ml-1 font-medium">{budget}</span>
                </div>
                <div>
                    <span className="text-gray-500 dark:text-gray-400">Travel Style:</span> 
                    <span className="ml-1 font-medium">{travelStyle || 'Not selected'}</span>
                </div>
                <div>
                    <span className="text-gray-500 dark:text-gray-400">Interests:</span> 
                    <span className="ml-1 font-medium">{interests.slice(0, 2).join(', ')}{interests.length > 2 ? ` +${interests.length - 2} more` : ''}</span>
                </div>
            </div>
        </div>
    );
};

export const TripPlanResult = ({ tripPlan }) => {
    return (
        <div className="prose dark:prose-invert max-w-none">
            {typeof tripPlan === 'string' ? (
                <p>{tripPlan}</p>
            ) : (
                <pre className="whitespace-pre-wrap">
                    {JSON.stringify(tripPlan, null, 2)}
                </pre>
            )}
        </div>
    );
};
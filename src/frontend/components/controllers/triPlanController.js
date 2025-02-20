// Controller - handles the state management and user interactions
import { useState } from 'react';
import { useTripPlanModel } from '../models/tripModel';

export const useTripPlanController = () => {
    const model = useTripPlanModel();
    const [step, setStep] = useState(1);
    
    // Step 1 to 2
    const handleStepOneNext = () => {
        if (!model.budget || !model.dateRange.from || !model.dateRange.to || model.interests.length === 0) {
            return;
        }
        setStep(2);
    };

    // Step 2 submit
    const handleSubmit = async () => {
        if (!model.travelStyle || model.needAgent === null || model.loading) {
            return;
        }
        try {
            await model.fetchTripPlan();
            setStep(3);
        } catch (error) {
            // Error is already handled in the model
        }
    };

    // Reset and start over
    const resetTripPlan = () => {
        setStep(1);
    };

    return {
        ...model,
        step,
        handleStepOneNext,
        handleSubmit,
        resetTripPlan
    };
};
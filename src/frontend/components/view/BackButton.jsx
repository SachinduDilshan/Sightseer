import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ className }) => {
    const navigate = useNavigate();

    return (
        <button 
            onClick={() => navigate(-1)} 
            className={`flex items-center  p-2 rounded-lg hover:text-teal-500 transition-all duration-300 ${className}`}
        >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
        </button>
    );
};

export default BackButton;

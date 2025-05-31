import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateSessionForm = () => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
        setError("");
    };

    const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus, description } = formData;

    if (!role || !experience || !topicsToFocus || !description) {
        setError("Please fill in all fields.");
        return;
    }

    setError("");
    setIsLoading(true);

    try {
        // Step 1: Call AI API to generate questions
        const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
            role,
            experience,
            topicsToFocus,
            numberOfQuestions: 5,
        });

        console.log("AI response:", aiResponse.data);

        const generateQuestions = aiResponse.data.result;

        // Step 2: Create the interview session with questions
        const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
            ...formData,
            questions: generateQuestions,
        });

        if (response.data?.session?._id) {
            // Fix typo here: 'interview-prep' (not 'interview-perp')
            navigate(`/interview-prep/${response.data.session._id}`);
        }
    } catch (error) {
        if (error.response?.data?.message) {
            setError(error.response.data.message);
        } else {
            setError("An error occurred. Please try again.");
        }
    } finally {
        setIsLoading(false);
    }
};


    return (
        <div className="w-full max-w-xl mx-auto p-8 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-black mb-1">
                Start a New Interview Journey
            </h3>
            <p className="text-sm text-gray-600 mb-6">
                Fill out a few quick details and unlock your personalized set of interview questions!
            </p>

            <form onSubmit={handleCreateSession} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
                    <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                        placeholder="e.g. Frontend Developer, UI/UX Designer, etc."
                        className="w-full p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <input
                        type="text"
                        value={formData.experience}
                        onChange={(e) => handleChange("experience", e.target.value)}
                        placeholder="e.g. 1 year, 3 years, 5+ years"
                        className="w-full p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Topics to Focus On</label>
                    <input
                        type="text"
                        value={formData.topicsToFocus}
                        onChange={(e) => handleChange("topicsToFocus", e.target.value)}
                        placeholder="Comma-separated, e.g. React, Node.js, MongoDB"
                        className="w-full p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        placeholder="Any specific goals or notes for this session"
                        className="w-full p-3 bg-gray-100 rounded-md border border-gray-300 resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white text-sm py-3 rounded-md hover:bg-gray-900 transition"
                >
                    {isLoading ? <SpinnerLoader /> : "Create Session"}
                </button>
            </form>
        </div>
    );
};

export default CreateSessionForm;
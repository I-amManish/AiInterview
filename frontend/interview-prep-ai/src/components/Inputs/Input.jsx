import React, { useState } from 'react';
import { FaLeaf, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, label, placeholder, type, className = '' }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {label}
                </label>
            )}

            <div className='relative'>
                <input
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    className={`
                        w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                        transition-all duration-200 ease-in-out
                        ${type === "password" ? 'pr-10' : ''}
                        hover:border-gray-400
                    `}
                    value={value}
                    onChange={(e) => onChange(e)}
                />
                
                {type === "password" && (
                    <button
                        type="button"
                        className='
                            absolute right-3 top-1/2 transform -translate-y-1/2
                            text-gray-500 hover:text-black
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/20
                            rounded-full p-1
                        '
                        onClick={toggleShowPassword}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <FaRegEyeSlash size={18} />
                        ) : (
                            <FaRegEye size={18} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;
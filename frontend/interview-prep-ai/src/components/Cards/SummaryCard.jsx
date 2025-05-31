import React from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';

const SummaryCard = ({
    colors,
    role,
    topicsToFocus,
    experience,
    questions,
    description,
    lastUpdated,
    onSelect,
    onDelete,
}) => {
    return (
        <div
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer relative group"
            onClick={onSelect}
        >
            {/* Card Header */}
            <div
                className="rounded-lg p-4 mb-3"
                style={{ backgroundColor: colors?.bgcolor || '#f0fdf4' }}
            >
                <div className="flex items-start">
                    <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4 font-semibold text-black">
                        {getInitials(role)}
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-lg font-semibold text-gray-800">{role}</h2>
                        <p className="text-sm text-gray-600">{topicsToFocus}</p>
                    </div>
                </div>
            </div>

            {/* Delete Button */}
            <button
                className="hidden group-hover:flex items-center text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded border border-rose-100 hover:border-rose-200 absolute top-2 right-2"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
            >
                <LuTrash2 />
            </button>

            {/* Info Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                    Experience: {experience} {experience === 1 ? 'Year' : 'Years'}
                </span>
                <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                    {questions} Q&A
                </span>
                <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                    Last Updated: {lastUpdated}
                </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    );
};

export default SummaryCard;

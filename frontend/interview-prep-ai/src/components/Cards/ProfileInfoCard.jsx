import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext.jsx';

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        clearUser();
        navigate("/");
    };

    const getInitials = (name) => {
        if (!name) return 'U'; // Default to 'U' if no name
        return name.split(' ')
            .filter(part => part.length > 0) // Filter out empty parts
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .slice(0, 2); // Limit to 2 initials
    };

    // Check if we should show image or initials
    const shouldShowImage = user?.profileImageUrl &&
        user.profileImageUrl !== '' &&
        !user.profileImageUrl.includes('undefined');

    return  user && (
        <div className='flex items-center'>
            {shouldShowImage ? (
                <img
                    src={user.profileImageUrl}
                    alt={`${user?.name || 'User'} profile`}
                    className='w-11 h-11 bg-gray-300 rounded-full mr-3 object-cover'
                    onError={(e) => {
                        // If image fails to load, show initials instead
                        e.target.style.display = 'none';
                    }}
                />
            ) : null}

            {/* Always render initials container - shows if no image or image fails */}
            <div
                className={`w-11 h-11 rounded-full mr-3 flex items-center justify-center text-xs font-bold
                    ${shouldShowImage ? 'hidden' : 'bg-gray-300'}`}
            >
                {getInitials(user?.name)}
            </div>

            <div>
                <div className='text-[15px] text-black font-black leading-3'>
                    {user?.name || "User"}
                </div>

                <button
                    className='text-amber-600 text-sm font-semibold cursor-pointer hover:underline focus:outline-none'
                    onClick={handleLogout}
                    aria-label="Logout"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileInfoCard;
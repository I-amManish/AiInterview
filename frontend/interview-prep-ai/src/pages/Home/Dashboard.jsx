import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import { LuPlus } from 'react-icons/lu';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const deleteSession = async (sessionData) => {
    // Implement your delete logic here
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className='container mx-auto pt-4 pb-20'> {/* Increased padding-bottom for mobile */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-1 px-4 md:px-0'>
          {/* Your session cards/content will go here */}
        </div>
        
        {/* Improved Floating Action Button */}
        <button
          className={`
            fixed bottom-6 right-6 md:bottom-8 md:right-8
            h-12 w-12 md:h-14 md:w-14
            flex items-center justify-center
            bg-gradient-to-r from-[#FF9324] to-[#E99A4B]
            text-white rounded-full
            shadow-lg hover:shadow-xl
            transition-all duration-300
            hover:bg-black hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50
            z-50
          `}
          onClick={() => setOpenCreateModel(true)}
          aria-label="Add new session"
        >
          <LuPlus className='text-2xl' />
          <span className='sr-only'>Add New</span> {/* Hidden text for accessibility */}
        </button>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
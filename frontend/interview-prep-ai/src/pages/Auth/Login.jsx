import React, { useContext, useState } from 'react';
import { FaTimes } from 'react-icons/fa'; 
import Input from '../../components/Inputs/Input.jsx';
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext.jsx';

const Login = ({ setShowLogin, setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate(); // Added missing hook

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error
    setError("");

    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if(!password) {
      setError("Password cannot be empty.");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if(token) {
        localStorage.setItem("token", token);
        updateUser(response.data)
        navigate("/dashboard");
        setShowLogin(false); // Close the login modal on success
      } else {
        setError("Login failed. No token received.");
      }
    } catch (error) {
      if(error.response) {
        // The request was made and the server responded with a status code
        setError(error.response.data.message || "Login failed. Please try again.");
      } else if(error.request) {
        // The request was made but no response was received
        setError("Network error. Please check your connection.");
      } else {
        // Something happened in setting up the request
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center relative bg-white rounded shadow-md'>
      {/* Close (X) Button */}
      <button
        onClick={() => setShowLogin(false)}
        className='absolute top-4 right-4 text-gray-500 hover:text-black focus:outline-none'
        aria-label='Close login form'
      >
        <FaTimes size={18} />
      </button>

      <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Please enter your details to login.
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          required
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
          required
        />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>
          Login
        </button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Don't have an account?{" "}
          <button
            type="button" // Added type to prevent form submission
            className='text-primary underline cursor-pointer'
            onClick={() => setCurrentPage("signup")}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
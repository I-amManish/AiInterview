import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; 
import Input from '../../components/Inputs/Input.jsx';

const Login = ({ setShowLogin, setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
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
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>
          Login
        </button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Don't have an account?{" "}
          <button
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
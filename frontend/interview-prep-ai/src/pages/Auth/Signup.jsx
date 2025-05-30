import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input.jsx';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector.jsx';
import { validateEmail } from '../../utils/helper.js';
import { UserContext } from '../../context/userContext.jsx';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import uploadImage from '../../utils/uploadImage.js';

const Signup = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [previewImage, setPreviewImage] = useState(null); // Add this state for preview
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    try {
      // Upload image if selected
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        console.log("Image upload response:", imageUploadRes);
        profileImageUrl = imageUploadRes.url || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Signup error:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  // Add this handler for image selection
  const handleImageChange = (file) => {
    setProfilePic(file);
    // Create preview URL
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Create an Account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Join us today by entering your details below
      </p>

      <form onSubmit={handleSignUp}>
        {/* Pass previewImage instead of profilePic for display */}
        <ProfilePhotoSelector 
          image={previewImage} 
          setImage={handleImageChange} 
        />

        <div className='grid grid-cols-1 gap-2'>
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
          />
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />
        </div>

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>SIGN UP</button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Already have an account?{" "}
          <button
            className='font-medium text-primary underline cursor-pointer'
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
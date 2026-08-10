import React, { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { saveTokens } from "../utils/token";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import useBackendStatus from '../hooks/useBackendStatus';


const Login = () => {
  const navigate = useNavigate();

  const backendReady = useBackendStatus();

  const [formData, setFormData] = useState({
    username:"",
    password: "",
  })
  

  const handleChange = (e)=>{
    const {name, value} = e.target;

    setFormData((prev)=>({
      ...prev,
      [name] : value,
    }));
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    try {
      const response = await loginUser(formData);
      
      saveTokens(
        response.data.access,
        response.data.refresh
      );

      toast.success("Login successful");

      navigate("/dashboard");
    }

    catch (error){
      toast.error(
        error.response?.data?.detail || "Something went wrong"
      );
    }
  };
  

  if (!backendReady) {
    return(
      <div className='min-h-screen flex items-center justify-center bg-gray-900 text-white'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <h2 className='text-xl font-semibold mb-2'>
              Waking up server...
          </h2>
          <p className='text-gray-200'>
            Please wait a few seconds
          </p>
        </div>
      </div>
    )
  }

  return (
    <AuthLayout
      title= "Welcome Back 👋"
      subtitle= "Sign in to continue your AI interview journey."
    >
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={formData.username}
          onChange={handleChange}
          className='w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500'
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
        />

        <button
          type='submit'
          disabled = {!backendReady}
          className='mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95'
        >
          {backendReady ? "Sign In" : "Starting server..."}
        </button>

            
        <p className="mt-6 text-center text-sm text-slate-400">
            Don't  have an account?{" "}
            <Link
                to="/register"
                className="font-semibold text-blue-400 transition-colors duration-300 hover:text-blue-300"
            >
                Register
            </Link>
        </p>

      </form>
    </AuthLayout>
  )
}

export default Login;
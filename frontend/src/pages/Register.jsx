import React, { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { saveTokens } from "../utils/token";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username:"",
    email: "",
    password: "",
    confirmPassword: "",
  })
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e)=>{
    const {name, value} = e.target;

    setFormData((prev)=>({
      ...prev,
      [name] : value,
    }));
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    setLoading(true);
    
    try {

      
        await registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        });
        
      toast.success("Account created successfully");

      navigate("/login");
    }

    catch (error){
      toast.error(
        error.response?.data?.username?.[0] ||
        error.response?.data?.email?.[0] ||
        error.response?.data?.password?.[0] ||
        error.response?.data?.detail ||
        "Registration failed"
      );

      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }))
    }

    finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthLayout
      title= "Create Account"
      subtitle= "Create your account to start AI interviews."
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
          type='email'
          name='email'
          placeholder='example@gmail.com'
          value={formData.email}
          onChange={handleChange}
          className='w-full mt-5 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500'
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
        />
        
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
        />

        <button
          type='submit'
          className='mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70'
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
                to="/login"
                className="font-semibold text-blue-400 transition-colors duration-300 hover:text-blue-300"
            >
                Sign In
            </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default Register;
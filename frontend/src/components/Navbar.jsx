import React from 'react'
import { Zap, User, ChevronDown, Menu  } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef,} from "react";
import { removeTokens } from '../utils/token';
import { toast } from 'sonner';

const Navbar = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {

            const handleClickOutside = (event) => {

                if (
                    dropdownRef.current &&
                    !dropdownRef.current.contains(event.target)
                ) {
                    setIsOpen(false);
                }

            };

            document.addEventListener("mousedown", handleClickOutside);

            const handleEscape = (event) => {

                if (event.key === "Escape") {
                    setIsOpen(false);
                }

            };

            document.addEventListener("keydown", handleEscape);
            
            return () => {

                document.removeEventListener("mousedown", handleClickOutside);

                document.removeEventListener("keydown", handleEscape);

            };

    }, []);

    
    
    const navItems = [
        {
            name:"Dashboard",
            path:"/dashboard",
        },
        {
            name:"Interviews",
            path:"/interviews",
        },
    ]


    const handleLogout = ()=>{
        removeTokens();
        setIsOpen(false);
        toast.success("Logged out successfully");
        navigate("/login", {replace: true});
        setIsMobileMenuOpen(false);
    }
    
return (
    <header className='border-b border-slate-800 bg-slate-950'>
        <div className='relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-4 lg:px-8'>
            <Link
                to="/dashboard"
                className="flex items-center gap-3"
            >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 ring-1 ring-blue-500/20 transition-all duration-300 hover:bg-blue-600/20">
                        <Zap
                            size={24}
                            className="text-blue-500"
                        />
                </div>

                <div>
                    <h1 className="text-lg font-bold tracking-tight text-white">
                        AI Interview Coach
                    </h1>

                    <p className="hidden text-xs font-medium tracking-wide text-slate-400 sm:block">
                        Practice • Evaluate • Improve
                    </p>
                </div>
            </Link>

            <nav className='hidden items-center gap-4 md:flex'>
                {
                    navItems.map((item) => (
                        <NavLink
                            key={item.path} 
                            to={item.path}
                        >
                            {({ isActive }) => (
                                <span
                                    className={`group relative pb-1 text-sm font-medium transition-colors duration-300 ${
                                        isActive
                                            ? "text-white"
                                            : "text-slate-300 hover:text-white"
                                    }`}
                                >
                                    {item.name}
                                    <span
                                        className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                                            isActive
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                        }`}
                                    />
                                </span>
                            )}
                        </NavLink>
                    ))
                }
            </nav>
            


            <button
                type='button'
                onClick={()=> setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800 md:hidden'
            >
                <Menu size={24} />
            </button>
            <div ref={dropdownRef} className="relative hidden md:block">

                <button
                    type="button"
                    onClick={()=>setIsOpen(!isOpen)}
                    className="flex items-center gap-3 rounded-lg p-2 transition-colors duration-300 hover:bg-slate-800"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800">
                        <User
                            size={18}
                            className="text-slate-300"
                        />
                    </div>

                    <div className="hidden text-left sm:block">
                        <p className="text-sm font-medium text-white">
                            {user ? user.username : "Loading..."}
                        </p>

                        <p className="text-xs text-slate-400">
                            Welcome back
                        </p>
                    </div>
                    
                    <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>

                
                {isOpen && (
                    <div className="absolute right-0 top-16 z-50 w-52 rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-xl">

                        <button
                            type="button"
                            onClick={()=>setIsOpen(false)}
                            className="w-full rounded-lg px-4 py-2 text-left text-sm text-slate-300 transition-colors duration-300 hover:bg-slate-800 hover:text-white"
                        >
                            Profile
                        </button>

                        
                        
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="mt-1 w-full rounded-lg px-4 py-2 text-left text-sm text-red-400 transition-colors duration-300 hover:bg-red-500/10"
                        >
                            Logout
                        </button>

                    </div>
                )}
                
            </div>
        </div>

        {
            isMobileMenuOpen && (
                <div className='flex flex-col items-center border-t border-slate-800 bg-slate-950 px-4 py-3 md:hidden'>
                    <div className='flex w-full max-w-xs flex-col gap-2'>
                        {
                            navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={()=>setIsMobileMenuOpen(false)}
                                    className="w-full rounded-lg px-4 py-2 text-center text-slate-300 hover:bg-slate-800 hover:text-white"
                                >
                                    {item.name}
                                </NavLink>
                            ))
                            
                        }

                        <button
                            type='button'
                            onClick={handleLogout}
                            className='block w-full rounded-lg px-4 py-2 text-center text-red-400 hover:bg-red-500/10'
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )
        }
    </header>
)
}

export default Navbar;
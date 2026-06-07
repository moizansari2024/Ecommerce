import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, LogOut, User, Plus, ChevronDown, ShoppingBag } from 'lucide-react';
import useAuthStore from '../Store/useAuthStore';

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <nav className="bg-slate-100 border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
  
        <Link to="/" className="text-2xl font-black text-slate-900 tracking-wider hover:opacity-80">
          OLX
        </Link>

      
        <div className="hidden md:flex flex-grow max-w-2xl relative items-center">
          <input 
            type="text" 
            placeholder="Find Cars, Mobile Phones and more..." 
            className="w-full border-2 border-slate-950 bg-white h-10 px-4 pr-10 text-sm rounded focus:outline-none"
          />
          <button className="absolute right-0 bg-slate-950 text-white h-10 w-12 flex items-center justify-center rounded-r hover:bg-slate-800 transition-colors">
            <Search size={18} />
          </button>
        </div>

    
        <div className="flex items-center gap-5">
          
          {isAuthenticated && user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-1.5 focus:outline-none group p-1 rounded-md hover:bg-slate-200 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center shadow-sm text-sm uppercase">
                  {user.firstName ? user.firstName[0] : <User size={16} />}
                </div>
                <ChevronDown size={14} className={`text-slate-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-100">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">Hello,</p>
                    <p className="text-sm font-bold text-slate-800 truncate">
                      {user.firstName ? `${user.firstName} ${user.lastName || ''}` : 'User'}
                    </p>
                  </div>

                  <Link 
                    to="/my-ads" 
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <ShoppingBag size={16} className="text-slate-400" /> My Ads
                  </Link>

                  <button 
                    onClick={handleLogoutClick}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left border-t border-slate-100 transition-colors font-medium"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className="text-sm font-bold text-slate-900 hover:underline decoration-2 underline-offset-4 transition-all"
            >
              Login
            </Link>
          )}

          <Link 
            to={isAuthenticated ? "/create" : "/login"} 
            className="bg-white border-4 border-t-cyan-400 border-r-blue-500 border-b-yellow-400 border-l-green-400 hover:border-slate-950 text-slate-900 font-bold h-10 px-4 rounded-full flex items-center justify-center gap-1.5 shadow-sm text-sm tracking-wide uppercase transition-all"
          >
            <Plus size={16} className="stroke-[3]" />
            <span>Sell</span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
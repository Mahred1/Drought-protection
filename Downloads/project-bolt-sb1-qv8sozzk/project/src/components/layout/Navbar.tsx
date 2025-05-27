import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Droplet, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Droplet className="h-8 w-8 text-science-700" />
            <span className="font-bold text-xl text-gray-900">DroughtWatch</span>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/predictions" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
              Predictions
            </NavLink>
            <NavLink to="/researchers" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
              Researchers
            </NavLink>
            <NavLink to="/news" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
              News
            </NavLink>
            <NavLink to="/events" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
              Events
            </NavLink>
            {isAuthenticated ? (
              <div className="flex items-center ml-4 space-x-3">
                <Link to="/admin" className="btn btn-primary py-1.5">
                  Dashboard
                </Link>
                <button 
                  onClick={logout} 
                  className="btn btn-secondary py-1.5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/admin/login" className="ml-4 btn btn-primary py-1.5">
                Admin Login
              </Link>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-800" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 bg-white shadow-md' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-4 pb-4 space-y-2">
          <NavLink to="/" className={({isActive}) => `p-2 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-800'}`}>
            Home
          </NavLink>
          <NavLink to="/predictions" className={({isActive}) => `p-2 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-800'}`}>
            Predictions
          </NavLink>
          <NavLink to="/researchers" className={({isActive}) => `p-2 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-800'}`}>
            Researchers
          </NavLink>
          <NavLink to="/news" className={({isActive}) => `p-2 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-800'}`}>
            News
          </NavLink>
          <NavLink to="/events" className={({isActive}) => `p-2 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-800'}`}>
            Events
          </NavLink>
          {isAuthenticated ? (
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
              <Link to="/admin" className="btn btn-primary text-center">
                Dashboard
              </Link>
              <button 
                onClick={logout} 
                className="btn btn-secondary text-center"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/admin/login" className="btn btn-primary text-center mt-2">
              Admin Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
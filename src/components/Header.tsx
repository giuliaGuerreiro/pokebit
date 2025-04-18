import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import pokebitLogo from '../assets/pokebit_logo.png';

const navLinks = [
  { name: 'Pokémons', path: '/' },
  { name: 'My Pokémons', path: '/pokemons' },
  { name: '404', path: '/about' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-gradient-to-b  from-yellow-500  bg-pokebit-yellow py-3">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/">
          <img src={pokebitLogo} className="h-10 w-auto" alt="PokéBit Logo" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              onClick={closeMenu}
              className={`font-medium text-sm relative ${
                location.pathname === path ? 'text-blue-500' : 'text-gray-700 hover:text-gray-500'
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="hidden pl-1 py-1 sm:flex items-center gap-3 bg-white rounded-3xl pr-5">
              <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-gray-400 font-medium text-lg">
                A
              </span>
              <div>
                <p className="font-medium">Ash Ketchum</p>
                <p className="text-xs text-gray-500">Trainer</p>
              </div>
            </div>
          </div>

          <div className="block sm:hidden">
            <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-gray-400 font-medium text-lg">
              A
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-gray-200 text-gray-700"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div
            id="mobile-nav"
            role="menu"
            aria-label="Mobile navigation"
            className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl w-64 md:hidden z-50 overflow-hidden border border-gray-100"
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-medium text-lg">
                  A
                </span>
                <div>
                  <p className="font-medium">Ash Ketchum</p>
                  <p className="text-xs text-gray-500">Trainer</p>
                </div>
              </div>
            </div>
            <div className="py-2">
              {navLinks.map(({ name, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={closeMenu}
                  role="menuitem"
                  className={`flex items-center px-4 py-3 text-sm
                    ${
                      location.pathname === path
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

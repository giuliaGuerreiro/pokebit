import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import pokebitLogo from '../assets/pokebit_logo.png';

const navLinks = [
  { name: 'Pokémons', path: '/' },
  { name: 'My Wallet', path: '/wallet' }, // TODO: Create page
  { name: 'Learn More', path: '/about' }, // TODO: Create page
];

const Header: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-pokebit-yellow text-black  shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <Link
          to="/"
          className="font-retro text-sm sm:text-base tracking-widest focus-visible:outline focus-visible:outline-2"
          aria-label="PokéBit homepage"
        >
          <img src={pokebitLogo} className="w-46 h-12" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden sm:flex gap-4" role="navigation" aria-label="Main navigation">
          {navLinks.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              onClick={closeMenu}
              className={`font-sans text-sm hover:underline focus-visible:outline focus-visible:outline-2 ${
                location.pathname === path ? 'font-bold underline' : ''
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Avatar */}
        <span
          className="w-8 h-8 rounded-full bg-gray-400  flex items-center justify-center font-bold text-xs"
          role="img"
          aria-label="User avatar"
        >
          A
        </span>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="sm:hidden ml-4 text-xl focus-visible:outline focus-visible:outline-2"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div
            id="mobile-nav"
            role="menu"
            aria-label="Mobile navigation"
            className="absolute top-full right-0 mt-2 bg-white  border rounded shadow-md w-40 sm:hidden z-50"
          >
            {navLinks.map(({ name, path }) => (
              <Link
                key={path}
                to={path}
                onClick={closeMenu}
                role="menuitem"
                aria-current={location.pathname === path ? 'page' : undefined}
                className={`block px-4 py-2 font-sans text-sm hover:bg-gray-100  focus-visible:outline focus-visible:outline-2 ${
                  location.pathname === path ? 'font-bold' : ''
                }`}
              >
                {name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

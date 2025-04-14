import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Pokémons', path: '/' },
  { name: 'My Wallet', path: '/wallet' },
  { name: 'Learn More', path: '/about' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-pokebit-yellow text-black dark:bg-zinc-800 dark:text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <Link
          to="/"
          className="font-retro text-sm sm:text-base tracking-widest focus:outline-none focus:ring"
          aria-label="PokéBit homepage"
        >
          PokéBit
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden sm:flex gap-4" role="navigation" aria-label="Main navigation">
          {navLinks.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              onClick={closeMenu}
              className={`font-sans text-sm hover:underline focus:outline-none focus:ring ${
                location.pathname === path ? 'font-bold underline' : ''
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center font-bold text-xs">
          A
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="sm:hidden ml-4 text-xl focus:outline-none focus:ring"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-zinc-800 border rounded shadow-md w-40 sm:hidden z-50">
            {navLinks.map(({ name, path }) => (
              <Link
                key={path}
                to={path}
                onClick={closeMenu}
                className={`block px-4 py-2 font-sans text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 ${
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

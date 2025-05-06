import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import rumaksaLogo from '../assets/rumaksalogos.png';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'; // Import ikon panah

interface HeaderProps {
  loggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ loggedIn }) => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', path: '/' },
    {
      name: 'About',
      path: '/about',
      dropdown: ['Company', 'Our Vision & Mission', 'Organization Structure'],
    },
    {
      name: 'Services',
      path: '/services',
      dropdown: ['Cyber Security', 'Digital Business', 'Multimedia'],
    },
    { name: 'Courses', path: '/courses' },
    { name: 'Partner', path: '/partner' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (menuName: string) => {
    setOpenDropdown((prev) => (prev === menuName ? null : menuName));
  };

  const handleMenuItemClick = (path: string) => {
    // Scroll ke atas setelah klik
    window.scrollTo(0, 0);
    navigate(path);
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    // Menangani scroll ke atas setelah navigasi menggunakan useEffect
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.header
      className="font-gotham-rounded-bold fixed top-0 z-50 w-full shadow-lg h-[56px] md:h-[64px] bg-[var(--header-bg)]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 z-10">
          <img src={rumaksaLogo} alt="Rumaksa Logo" className="w-12 h-12 md:w-10 md:h-10" />
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold text-[var(--header-text)]">RUMAKSA</span>
            <p className="text-xs text-primary">PT Rumah Karya Semesta</p>
          </div>
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden md:flex items-center space-x-4 absolute left-1/2 transform -translate-x-1/2">
          {menuItems.map((item) => (
            <li key={item.name} className="relative text-primary">
              {(item.name === 'About' || item.name === 'Services') && item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="flex items-center space-x-1 hover:text-[var(--header-hover)] cursor-pointer"
                  >
                    <span>{item.name}</span>
                    <span>
                      {openDropdown === item.name ? (
                        <BsChevronUp className="text-sm" />
                      ) : (
                        <BsChevronDown className="text-sm" />
                      )}
                    </span>
                  </button>

                  {openDropdown === item.name && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md z-50 py-2">
                      {item.dropdown.map((subItem, idx) => (
                        <Link
                          key={idx}
                          to={`${item.path}/${subItem.toLowerCase().replace(/ /g, '-')}`}
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                          onClick={() =>
                            handleMenuItemClick(`${item.path}/${subItem.toLowerCase().replace(/ /g, '-')}`)
                          }
                        >
                          {subItem}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-[var(--header-hover)] cursor-pointer"
                  onClick={() => handleMenuItemClick(item.path)}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Admin/Login Button */}
        <motion.div
          style={{ right: '2rem', marginRight: '20px' }}
          className="px-3 py-1 rounded-full fixed top-4 text-xs md:text-base font-medium text-[var(--header-text)]"
        >
          {loggedIn ? (
            <button
              onClick={() => navigate(pathname === '/admin' ? '/' : '/admin')}
              className="flex items-center focus:outline-none font-sans hover:bg-[var(--header-button-bg)] px-3 py-1 rounded-full cursor-pointer"
            >
              Hi, Admin
            </button>
          ) : (
            <span className="font-sans">Hi there!</span>
          )}
        </motion.div>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="h-6 w-6 fill-[var(--header-hover)]" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="absolute top-16 right-0 w-40 backdrop-blur-sm flex flex-col space-y-4 p-4 rounded-lg bg-white shadow-md font-gotham-rounded-bold">
            {menuItems.map((item) => (
              <React.Fragment key={item.name}>
                {(item.name === 'About' || item.name === 'Services') && item.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center space-x-1 text-base text-black font-semibold w-full text-left"
                      style={{ textShadow: '1px 1px 2px white' }}
                    >
                      <span>{item.name}</span>
                      <span>
                        {openDropdown === item.name ? (
                          <BsChevronUp className="text-sm" />
                        ) : (
                          <BsChevronDown className="text-sm" />
                        )}
                      </span>
                    </button>
                    {openDropdown === item.name && (
                      <div className="ml-4 flex flex-col space-y-2 mt-2">
                        {item.dropdown.map((subItem, idx) => (
                          <Link
                            key={idx}
                            to={`${item.path}/${subItem.toLowerCase().replace(/ /g, '-')}`}
                            className="text-sm text-gray-600"
                            onClick={() =>
                              handleMenuItemClick(`${item.path}/${subItem.toLowerCase().replace(/ /g, '-')}`)
                            }
                          >
                            - {subItem}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="text-base text-black font-semibold w-full"
                    onClick={() => handleMenuItemClick(item.path)}
                  >
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;

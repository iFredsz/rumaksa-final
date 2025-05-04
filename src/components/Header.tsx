import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import rumaksaLogo from '../assets/rumaksalogo.png';

interface HeaderProps {
  loggedIn: boolean;
  homeRef: React.RefObject<HTMLElement>;
  aboutRef: React.RefObject<HTMLElement>;
  servicesRef: React.RefObject<HTMLElement>;
  blogRef: React.RefObject<HTMLElement>;
  contactRef: React.RefObject<HTMLElement>;
  partnerRef: React.RefObject<HTMLElement>;
  scrollSection: (hash: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  loggedIn,
  homeRef,
  aboutRef,
  servicesRef,
  blogRef,
  contactRef,
  partnerRef,
  scrollSection
}) => {
  const { pathname, hash } = useLocation();
  const firstRender = useRef(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', id: '/', ref: homeRef },
    { name: 'About', id: 'about', ref: aboutRef },
    { name: 'Services', id: 'services', ref: servicesRef },
    { name: 'Partner', id: 'partner', ref: partnerRef },
    { name: 'Blog', id: 'blog', ref: blogRef },
    { name: 'Contact', id: 'contact', ref: contactRef }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (item: any) => {
    const newHash = item.id === '/' ? '' : `#${item.id}`;
    if (pathname === '/') {
      if (item.ref.current) {
        item.ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/${newHash}`);
    }
    scrollSection(newHash);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!firstRender.current && pathname !== '/') {
      setIsMenuOpen(false);
    }
    if (hash) {
      scrollSection(hash);
    }
  }, [pathname, hash, scrollSection]);

  return (
<motion.header
  className="fixed top-0 z-50 w-full shadow-lg h-[56px] md:h-[64px] bg-[var(--header-bg)]"
  initial={{ y: -100 }}
  animate={{ y: 0 }}
>

      <div className="container mx-auto px-4 py-2 flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 z-10">
          <img src={rumaksaLogo} alt="Rumaksa Logo" className="w-6 h-6 md:w-8 md:h-8" />
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold text-[var(--header-text)]">RUMAKSA</span>
            <p className="text-xs text-[var(--header-text)]">PT Rumah Karya Semesta</p>
          </div>
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden md:flex items-center space-x-4 absolute left-1/2 transform -translate-x-1/2">
          {menuItems.map((item) => (
            <motion.li
              key={item.name}
              whileHover={{ scale: 1.1 }}
              className="hover:text-[var(--header-hover)] cursor-pointer text-[var(--header-text)]"
            >
              <Link
                to={item.id === '/' ? '/' : `/#${item.id}`}
                className="cursor-pointer"
                onClick={() => handleMenuItemClick(item)}
              >
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Admin/Login Button (kanan atas) */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ right: '2rem', marginRight: '20px' }}
          className="px-3 py-1 hover:bg-[var(--header-button-bg)] rounded-full text-[var(--header-text)] font-medium fixed top-4 text-xs md:text-base"
        >
        <button
          onClick={() => {
            if (loggedIn) {
              // Kalau sekarang di '/admin', pindah ke '/'
              // Kalau sedang tidak di '/admin', pindah ke '/admin'
              navigate(pathname === '/admin' ? '/' : '/admin');
            } else if (pathname !== '/') {
              navigate('/');
            }
            // Kalau user biasa dan sudah di '/', tidak lakukan apa-apa
          }}
          className="flex items-center focus:outline-none font-sans"
        >
          {loggedIn ? 'Hi, Admin' : 'Hi there!'}
        </button>


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
          <div className="absolute top-16 right-0 w-40 backdrop-blur-sm flex flex-col space-y-4 p-4 rounded-lg">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.id === '/' ? '/' : `/#${item.id}`}
                className="text-base text-black font-semibold"
                style={{ textShadow: '1px 1px 2px white' }} // Menambahkan efek stroke hitam pada teks
                onClick={() => handleMenuItemClick(item)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;

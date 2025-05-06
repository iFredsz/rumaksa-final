import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from '../assets/rumaksalogos.png';
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Cyber Security", to: "/#services" },
    { label: "Digital Business", to: "/#services" },
    { label: "Multimedia", to: "/#services" },
    { label: "About Us", to: "/#about" },
    { label: "Blog", to: "/#blog" },
    { label: "Contact", to: "/#contact" },
  ];

  const handleMenuItemClick = (to: string) => {
    if (location.pathname !== "/") {
      navigate("/"); 
      setTimeout(() => window.location.replace(to), 0); 
    } else {
      window.location.replace(to); 
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/"); 
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" }); 
    }
  };

  return (
    <footer className="pt-8 pb-6 bg-[var(--header-bg)] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">

          {/* Logo dan Deskripsi */}
          <div className="space-y-2">
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={handleLogoClick}
            >
              <img src={logo} alt="Rumaksa Logo" className="w-10 h-auto" />
              <div>
                <h1 className="text-white text-xl">RUMAKSA</h1>
                <p className="text-slate-400 text-xs">PT Rumah Karya Semesta</p>
              </div>
            </div>
            <p className="text-slate-400">
              Secure your digital future by leading the way in secure, smart, and creative digital solutions.
            </p>
          </div>

          {/* Services & Company */}
          <div className="flex flex-row gap-8">
            <div className="w-1/2">
              <h4 className="text-base font-semibold mb-2 text-white">Services</h4>
              <ul className="space-y-1 text-slate-400">
                {menuItems.slice(0, 3).map((item, index) => (
                  <li
                    key={index}
                    className="hover:text-sky-500 cursor-pointer"
                    onClick={() => handleMenuItemClick(item.to)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/2">
              <h4 className="text-base font-semibold mb-2 text-white">Company</h4>
              <ul className="space-y-1 text-slate-400">
                {menuItems.slice(3, 6).map((item, index) => (
                  <li
                    key={index}
                    className="hover:text-sky-500 cursor-pointer"
                    onClick={() => handleMenuItemClick(item.to)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Connect</h4>
            <div className="flex space-x-4">
              {[{ icon: Facebook, href: 'https://www.facebook.com/ifredsz' },
                { icon: Twitter, href: 'https://twitter.com/nih_zef' },
                { icon: Linkedin, href: 'https://id.linkedin.com/in/fredsz' },
                { icon: Instagram, href: 'https://www.instagram.com/fredsz_' }].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="p-2 rounded-full hover:bg-sky-500/20 hover:text-sky-400"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-2">
          <p className="text-center text-sm text-gray-500 mt-10">
            © {new Date().getFullYear()} RUMAKSA. Created by <span className="font-semibold">@fredsz_</span>
          </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from '../assets/rumaksalogos.png';
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="pt-8 bg-primary text-white w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 items-start">

          {/* Kolom 1: Logo dan Deskripsi */}
          <div className="space-y-4">
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={handleLogoClick}
            >
              <img src={logo} alt="Rumaksa Logo" className="w-12 h-auto" />
              <div>
                <h1 className="text-white text-xl font-semibold">RUMAKSA</h1>
                <p className="text-gray-400 text-xs">PT Rumah Karya Semesta</p>
              </div>
            </div>
            <p className="text-gray-400">
              Secure your digital future by leading the way in secure, smart, and creative digital solutions.
            </p>
          </div>

          {/* Kolom Tengah: Kosong (untuk spasi atau isi tambahan di masa depan) */}
          <div></div>

          {/* Kolom 3: Follow Us */}
          <div className="space-y-4 text-right md:ml-auto">
            <h4 className="text-lg font-semibold mb-2 text-white">Follow Us</h4>
            <div className="flex justify-end space-x-4">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/' },
                { icon: Twitter, href: 'https://twitter.com/' },
                { icon: Linkedin, href: 'https://id.linkedin.com/in/' },
                { icon: Instagram, href: 'https://www.instagram.com/' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className="p-2 rounded-full hover:bg-sky-500/20 hover:text-sky-400 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Footer Copyright */}
      <div className="bg-gray-800 pt-4 pb-4">
        <div className="flex justify-center items-center w-full">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} RUMAKSA. All right reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

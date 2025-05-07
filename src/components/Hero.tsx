import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Users, Globe, Lock, Headphones, ShieldCheck, Megaphone, Image } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    {
      src: "https://www.qiscus.com/id/wp-content/uploads/sites/2/2022/04/Kumpulan-kata-kata-promosi.png",
      path: "/services/multimedia",
    },
    {
      src: "https://img.freepik.com/free-vector/glitched-cyber-monday-effect-sales_52683-46757.jpg?semt=ais_hybrid&w=740",
      path: "/services/cyber-security",
    },
    {
      src: "https://storage.googleapis.com/fastwork-static/5b92d5a6-8239-4f67-9deb-1bdcad4c2b65.jpg",
      path: "/services/digital-business",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* HERO Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center bg-background overflow-hidden pt-20"
      >
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-[120px] bg-yellow-400 rounded-b-[60px] z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 mt-10">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-4xl md:text-5xl font-bold font-poppins leading-tight text-primary mb-4">
                SECURE YOUR DIGITAL FUTURE
              </h1>
              <p className="text-base md:text-lg font-poppins mb-6 text-yellow-600">
                Leading the Way in Secure, Smart, and Creative Digital Solutions
              </p>
            </motion.div>

            {/* Right: Image Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center md:flex-col items-center"
            >
              <div className="relative w-full max-w-[650px] h-[200px] md:h-[350px] overflow-hidden rounded-xl">
                <motion.div
                  className="flex w-full h-full"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    transition: "transform 0.5s ease",
                  }}
                >
                  {images.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-full h-full">
                      {/* Link wrapping the image */}
                      <Link to={image.path} className="w-full h-full block">
                        <img
                          src={image.src}
                          alt={`Slide ${index}`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </Link>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Dots */}
              <div className="mt-4 flex space-x-3">
                {images.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      currentSlide === index ? "bg-yellow-500" : "bg-gray-400"
                    } cursor-pointer`}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


{/* What Our Clients Say */}
<section className="py-16 bg-white text-center">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold font-poppins text-primary mb-12">
      What Our Clients Say
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-yellow-100 p-6 rounded-xl shadow-md">
        <p className="text-gray-700 italic mb-4">
          "PT Rumaksa helped us transform our digital infrastructure securely and efficiently. Highly recommended!"
        </p>
        <h4 className="font-semibold text-primary">Andi Saputra</h4>
        <span className="text-sm text-gray-500">CEO, FintechPro</span>
      </div>
      <div className="bg-yellow-100 p-6 rounded-xl shadow-md">
        <p className="text-gray-700 italic mb-4">
          "The team is extremely knowledgeable and always ready to support. We feel safe with Rumaksa."
        </p>
        <h4 className="font-semibold text-primary">Lisa Hartanto</h4>
        <span className="text-sm text-gray-500">CTO, Meditech Asia</span>
      </div>
      <div className="bg-yellow-100 p-6 rounded-xl shadow-md">
        <p className="text-gray-700 italic mb-4">
          "Their creative solutions and timely delivery exceeded our expectations!"
        </p>
        <h4 className="font-semibold text-primary">Rizky Ramadhan</h4>
        <span className="text-sm text-gray-500">Founder, Kreativo Studio</span>
      </div>
    </div>
  </div>
</section>



<section id="services" className="py-16 bg-gray-50">
  <div className="container mx-auto text-center px-4">
    <h2 className="text-3xl font-bold font-poppins mb-10 text-primary">Our Core Services</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Cybersecurity */}
      <Link to="/services/cyber-security" className="block">
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="h-10 w-10 text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-primary">Cybersecurity</h3>
          <p className="text-gray-600">Protect your systems and data with our secure and up-to-date security services.</p>
        </div>
      </Link>

      {/* Digital Business */}
      <Link to="/services/digital-business" className="block">
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="flex justify-center mb-4">
            <Megaphone className="h-10 w-10 text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-primary">Digital Marketing</h3>
          <p className="text-gray-600">Reach your audience more effectively with data-driven digital campaigns.</p>
        </div>
      </Link>

      {/* Multimedia */}
      <Link to="/services/multimedia" className="block">
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="flex justify-center mb-4">
            <Image className="h-10 w-10 text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-primary">Multimedia</h3>
          <p className="text-gray-600">Create stunning visuals and creative content for your brand or business.</p>
        </div>
      </Link>
    </div>
  </div>
</section>


<section className="py-16 bg-yellow-400 text-white">
  <div className="container mx-auto text-center px-4">
    <h2 className="text-3xl font-bold font-poppins mb-12">
      Why Choose PT Rumah Karya Semesta?
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Expert Team */}
      <div className="bg-white text-primary p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="flex justify-center mb-3">
          <Users className="h-10 w-10 text-yellow-500" />
        </div>
        <h4 className="text-xl font-semibold mb-2">Expert Team</h4>
        <p>50+ certified security professionals ready to secure your digital world.</p>
      </div>
      {/* Global Reach */}
      <div className="bg-white text-primary p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="flex justify-center mb-3">
          <Globe className="h-10 w-10 text-yellow-500" />
        </div>
        <h4 className="text-xl font-semibold mb-2">Global Reach</h4>
        <p>Serving clients in over 20 countries with global expertise.</p>
      </div>
      {/* Security First */}
      <div className="bg-white text-primary p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="flex justify-center mb-3">
          <Lock className="h-10 w-10 text-yellow-500" />
        </div>
        <h4 className="text-xl font-semibold mb-2">Security First</h4>
        <p>We guarantee maximum security on this website.</p>
      </div>
      {/* 24/7 Support */}
      <div className="bg-white text-primary p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="flex justify-center mb-3">
          <Headphones className="h-10 w-10 text-yellow-500" />
        </div>
        <h4 className="text-xl font-semibold mb-2">24/7 Support</h4>
        <p>We are available round the clock to assist you whenever needed.</p>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default Hero;

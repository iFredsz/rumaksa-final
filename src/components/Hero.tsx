import { motion } from "framer-motion";
import { Shield, Briefcase, LayoutGrid } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-background"
    >
      <div className="container mx-auto px-4 relative z-10">
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0, marginTop: "5rem" }}
  transition={{ duration: 0.8 }}
  className="text-center max-w-[100%] mx-auto mt-8 md:mt-0"
>


          <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            SECURE YOUR DIGITAL FUTURE
          </h1>

          <p className="text-sm md:text-base text-description mb-4 mt-2">
            Leading the Way in Secure, Smart, and Creative Digital Solutions
          </p>


          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="flex flex-wrap justify-center gap-4 mt-4"
>
  <a href="#services">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-[200px] px-6 py-3 rounded-full font-medium text-white bg-[var(--header-bg)] border-2 border-header-bg transition-all duration-300 hover:bg-primary/80 shadow-md"
    >
      Explore Services
    </motion.button>
  </a>
  <a href="#contact">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-[200px] px-6 py-3 rounded-full font-medium text-white bg-accent border-2 border-accent transition-all duration-300 hover:bg-accent/80 shadow-md"
    >
      Contact Us
    </motion.button>
  </a>
</motion.div>




          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: Shield, title: "Cyber Security", description: "Advanced threat protection and security monitoring" },
              { icon: Briefcase, title: "Digital Business", description: "Digital transformation and business innovation" },
              { icon: LayoutGrid, title: "Multimedia", description: "Comprehensive multimedia solutions" },
            ].map((feature, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} className="p-6 hero-column backdrop-blur-sm rounded-xl hover:glow transition-all duration-300">
  <feature.icon className="w-10 h-10 icon-color mb-4 mx-auto" />
  <h3 className="text-xl font-semibold mb-2 text-header-text">{feature.title}</h3>
  <p className="text-description">{feature.description}</p> {/* Gunakan kelas baru */}
</motion.div>

            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

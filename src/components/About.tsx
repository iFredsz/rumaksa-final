import { motion } from 'framer-motion';
import { Users, Target, MessageSquare, Shield } from 'lucide-react';
import { useState, ReactNode } from 'react';
import { useParallax } from 'react-scroll-parallax';

const About = () => {
  const parallax = useParallax<HTMLDivElement>({ speed: -10 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sections = [
    {
      title: "Our Vision",
      content:
        "To be the leading force in cybersecurity and digital transformation, creating a secure and innovative digital future for businesses worldwide.",
    },
    {
      title: "Our Mission",
      content:
        "To provide state-of-the-art security solutions and digital transformation services that protect and empower organizations in their digital journey.",
    },
    {
      title: "Organization Structure",
      content: (
        <ul className="list-disc ml-5 space-y-1">
          <li>Chief Executive Officer</li>
          <li>Cyber Security Division</li>
          <li>Digital Business Division</li>
          <li>Multimedia & Creative Division</li>
          <li>Support & Customer Service Team</li>
        </ul>
      ),
    },
  ];

  const renderContent = (content: string | ReactNode) => {
    if (typeof content === "string") {
      return <p>{content}</p>;
    }
    return content;
  };

  return (
    <section id="about" className="section-padding relative overflow-hidden bg-background text-description">
      <div className="container mx-auto px-4">
        {/* Judul */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-[90%] md:max-w-[80%] mx-auto text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            About Rumaksa
          </h2>
          <p className="text-base text-description mt-2">
            Empowering businesses with cutting-edge cybersecurity solutions and digital transformation strategies since 2025.
          </p>
        </motion.div>

        {/* Grid Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Kiri: Deskripsi + Accordion */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 mb-16 max-w-[600px] mx-auto text-description"
          >
            <p>
              PT Rumah Karya Semesta is a digital solutions company that empowers organizations through cybersecurity, digital business, and multimedia. We help clients thrive in the digital era with secure, innovative, and creative solutions.
            </p>

            <div className="space-y-4">
              {sections.map((item, index) => (
                <div key={index} className="border-b border-slate-700 pb-2">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex justify-between items-center text-left text-primary font-semibold text-lg"
                  >
                    {/* Menggunakan kelas text-primary untuk warna judul */}
                    {item.title}
                  </button>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm mt-2 overflow-hidden text-description"
                    >
                      {renderContent(item.content)}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Kanan: Fitur */}
          <div
            ref={parallax.ref}
            className="grid grid-cols-2 gap-5 max-w-[600px] mx-auto"
          >
            {[{
              icon: Users,
              title: "Expert Team",
              description: "50+ certified security professionals",
            },
            {
              icon: Target,
              title: "Global Reach",
              description: "Serving clients in 20+ countries",
            },
            {
              icon: Shield,
              title: "Security First",
              description: "99.9% threat detection rate",
            },
            {
              icon: MessageSquare,
              title: "24/7 Support",
              description: "Round-the-clock assistance",
            }]
              .map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="hero-column p-4 rounded-xl hover:glow"
                >
                  <item.icon className="w-6 h-6 icon-color mb-2" />
                  <h4 className="text-base font-semibold mb-1 text-header-text">{item.title}</h4>
                  <p className="text-sm text-description">{item.description}</p>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

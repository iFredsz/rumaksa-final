import { motion } from 'framer-motion';
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
          <li>Director: John Thomas Edward M, BA., S.IP., MA</li>
          <li>Chief Executive Officer: Adit, Alfian, Arya</li>
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
    <section id="about" className="section-padding relative overflow-hidden bg-background text-gray-400 py-20 font-poppins">
      <div className="container mx-auto px-4">
        {/* Judul */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-[90%] md:max-w-[80%] mx-auto text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            About Rumaksa
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mt-4">
            Empowering businesses with cutting-edge solutions since 2024.
          </p>
        </motion.div>

        {/* Grid Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Kiri: Deskripsi + Accordion */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 mb-16 max-w-[600px] mx-auto text-gray-400"
          >
            <p className="text-lg md:text-xl leading-relaxed">
              PT Rumah Karya Semesta is a forward-thinking company that blends cutting-edge cybersecurity, digital business solutions, and multimedia innovation. We cater to businesses looking to thrive in an increasingly digital world. Our team is dedicated to providing secure, efficient, and creative solutions, ensuring that clients can confidently face the challenges of the modern digital landscape.
            </p>

            <p className="text-lg md:text-xl leading-relaxed">
              Our services extend to a variety of sectors, offering tailored solutions that address the unique needs of each client. Whether it is strengthening your organization's cybersecurity defenses, helping you adapt to the digital economy, or creating captivating multimedia content, PT Rumah Karya Semesta is your trusted partner.
            </p>

            <div className="space-y-4">
              {sections.map((item, index) => (
                <div key={index} className="border-b border-slate-200 pb-4">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex justify-between items-center text-left text-primary font-semibold text-xl hover:text-accent transition-all"
                  >
                    <span>{item.title}</span>
                    <span className="text-2xl">{openIndex === index ? '-' : '+'}</span>
                  </button>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm mt-4 overflow-hidden text-gray-400"
                    >
                      {renderContent(item.content)}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Kanan: Menambahkan Gambar / Konten Lain */}
          <div className="flex justify-center items-center md:block" ref={parallax.ref}>
            <motion.img
              src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/24/2023/07/26/salatiga-3570143903.png"
              alt="PT Rumah Karya Semesta"
              className="w-full md:w-[600px] lg:w-[700px] h-auto rounded-lg shadow-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

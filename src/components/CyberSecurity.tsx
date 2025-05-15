import { motion } from 'framer-motion';
import { Shield, Lock, Database, MessageCircle } from 'lucide-react';

const CyberSecurity = () => {
  const services = [
    {
      icon: Lock,
      name: 'Security Operations Center (SOC)',
      description: '24/7 real-time monitoring and threat detection to protect your business with proactive system and infrastructure oversight.',
      details: `Our SOC service provides 24/7 real-time threat analysis and response using advanced tools, minimizing disruptions. It also includes detailed reporting, threat intelligence, and incident management to strengthen your security.`,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaz9SnzlNIVtWDiIRM-Begh4P6wCY5F2VAIA&s',
      backgroundColor: '#E5F5FF',
    },
    {
      icon: Shield,
      name: 'Penetration Testing',
      description: 'Comprehensive security assessments simulate real-world attacks to identify system vulnerabilities and weaknesses.',
      details: `Penetration Testing identifies and exploits system vulnerabilities before attackers can. Our experts simulate real attacks on your network and applications, then deliver a detailed report with findings and recommendations to strengthen your IT security.`,
      image: 'https://www.linknet.id/files/photos/shares/article/penetration%20test.jpg',
      backgroundColor: '#FFF4E6',
    },
    {
      icon: Database,
      name: 'Data Security',
      description: 'Advanced data security solutions that safeguard your sensitive information from breaches, unauthorized access, and malicious threats.',
      details: `We provide data protection through encryption, masking, and secure access controls. Our service helps meet regulatory standards and prevents unauthorized access or data breaches using advanced technologies.`,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZKIaTrauYwso2s7cgZMNacRshaICJXulo9A&s',
      backgroundColor: '#FFF8E0',
    },
  ];

  return (
    <section id="cybersecurity" className="section-padding relative overflow-hidden bg-background/80 pt-10 pb-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 mt-6"
        >
          <h2 className="text-4xl font-poppins font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Cyber Security Services
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Comprehensive cybersecurity solutions to safeguard your business from threats. We offer cutting-edge technology and expertise to keep your digital assets safe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.4 }}
              className="flex flex-col h-full rounded-xl shadow-xl bg-white hover:shadow-2xl transition-all duration-500"
              style={{ backgroundColor: service.backgroundColor }}
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
              />

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <service.icon className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-semibold text-header-text">{service.name}</h3>
                  </div>

                  <p className="text-foreground/70">{service.description}</p>

                  <div className="text-foreground/80">
                    <p>{service.details}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Engaging Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
            Why Choose Our Cyber Security Solutions?
          </h3>
          <p className="text-lg text-foreground/70 mb-6 max-w-3xl mx-auto">
            Our cybersecurity solutions provide your business with the protection it deserves. We ensure proactive defense, real-time monitoring, and expert response to keep your assets secure.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary">Comprehensive Coverage</h4>
              <p className="text-foreground/70">
                We provide end-to-end security solutions that cover everything from real-time threat detection to secure data management.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary">Expert Team</h4>
              <p className="text-foreground/70">
                Our team consists of experienced cybersecurity professionals who are always up-to-date with the latest threats and best practices.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-8">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary">Proactive Monitoring</h4>
              <p className="text-foreground/70">
                With 24/7 monitoring, we can identify and neutralize threats before they cause significant damage.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary">Customized Solutions</h4>
              <p className="text-foreground/70">
                Our services are tailored to meet the unique needs of your business, ensuring that you receive the most effective protection.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Us Button */}
      <div className="text-center mt-16">
        <a
          href="https://wa.me/+6285640167388"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-all text-sm font-semibold shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          <span>
          Contact Us for a Consultation </span>
        </a>
      </div>
    </section>
  );
};

export default CyberSecurity;

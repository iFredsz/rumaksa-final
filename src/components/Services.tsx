import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Briefcase,
  Code,
  Cloud,
  Database,
  LineChart,
  LayoutGrid,
  Image,
  Film,
  Palette
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      category: 'Cyber Security',
      icon: Shield,
      services: [
        {
          icon: Lock,
          name: 'Security Operations Center (SOC)',
          description: '24/7 monitoring and threat detection'
        },
        {
          icon: Shield,
          name: 'Penetration Testing',
          description: 'Comprehensive security assessments'
        },
        {
          icon: Database,
          name: 'Data Security',
          description: 'Advanced data security solutions'
        }
      ]
    },
    {
      category: 'Digital Business',
      icon: Briefcase,
      services: [
        {
          icon: Cloud,
          name: 'Cloud Transformation',
          description: 'Secure cloud migration and management'
        },
        {
          icon: Code,
          name: 'Digital Innovation',
          description: 'Custom digital solutions development'
        },
        {
          icon: LineChart,
          name: 'Business Intelligence',
          description: 'Data-driven decision making'
        }
      ]
    },
    {
      category: 'Multimedia',
      icon: LayoutGrid,
      services: [
        {
          icon: Image,
          name: 'Desain Grafis',
          description: 'Graphic design for various needs'
        },
        {
          icon: Film,
          name: 'Video Editing',
          description: 'High quality video editing'
        },
        {
          icon: Palette,
          name: 'Creative Multimedia Solutions',
          description: 'Creative solutions for your digital needs'
        }
      ]
    }
  ];

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-background/80 pt-10 ">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16  mt-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Our Services
          </h2>
          <p className="text-description text-foreground/80 max-w-2xl mx-auto">
            Comprehensive cybersecurity and digital transformation solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 md:grid-rows-1 gap-4">
  {services.map((category, index) => (
    <motion.div
      key={index}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="space-y-2 flex flex-col"
    >
      <div className="flex items-center space-x-2">
        <category.icon className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
  {category.category}
</h3>

      </div>

      <div className="gap-4 flex flex-col">
        {category.services.map((service, serviceIndex) => (
          <motion.div
            key={serviceIndex}
            className="p-4 backdrop-blur-sm rounded-xl hover:glow"
            style={{ backgroundColor: 'var(--header-bg)' }}
          >
            <div className="flex items-start space-x-2">
              <service.icon className="w-5 h-5 text-accent" />
              <div>
                <h4 className="text-base font-semibold mb-1 text-header-text">
                  {service.name}
                </h4>
                <p className="text-foreground/70">{service.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  ))}
</div>

      </div>
    </section>
  );
};

export default Services;

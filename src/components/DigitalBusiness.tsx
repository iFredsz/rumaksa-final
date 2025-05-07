import { motion } from 'framer-motion';
import { Cloud, Code, LineChart, CheckCircle, MessageCircle } from 'lucide-react';

const DigitalBusiness = () => {
  const services = [
    {
      icon: Cloud,
      name: 'Cloud Transformation',
      description: 'Secure and scalable cloud migration with full-stack support.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKkO5rAIEEV5yOoICA3Jhu-K6XIlbASv_68g&s', // Example image URL
      detail: 'Our cloud transformation services help you migrate your infrastructure to the cloud, ensuring scalability, security, and cost-effectiveness.',
    },
    {
      icon: Code,
      name: 'Digital Innovation',
      description: 'End-to-end software solutions tailored to your business needs.',
      image: 'https://cdn.prod.website-files.com/65e7297194523c404b923b44/66506688da6bdf1ec3244152_8cb8a0ae-0c6d-4e26-bed2-931b94bcd73c.webp', // Example image URL
      detail: 'We offer custom software development that enables your business to thrive in the digital age. From mobile apps to enterprise-level solutions, we build it all.',
    },
    {
      icon: LineChart,
      name: 'Business Intelligence',
      description: 'Data analytics to empower smarter, faster decisions.',
      image: 'https://cdn.prod.website-files.com/6100d0111a4ed76bc1b9fd54/62bc08b38f7bf500fb43d460_business%20intelligence%20tools%202.png', // Example image URL
      detail: 'Our business intelligence services use data to drive insights, providing you with the tools to make informed decisions and enhance operational efficiency.',
    },
  ];

  const reasons = [
    'Expert team with professional experience across industries',
    'Solutions based on the latest data and technologies',
    'Personalized approach to meet your business needs',
    'Ongoing support after implementation',
  ];

  return (
    <section id="digitalbusiness" className="section-padding relative bg-background/80 pt-16 pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
            Digital Business Services
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Empowering your business through innovative, cloud-first, and intelligent digital solutions.
          </p>
        </motion.div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/90 dark:bg-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm border border-white/20 hover:scale-[1.02] transition-all"
            >
              <div className="flex items-center space-x-3 mb-4">
                <service.icon className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">
                  {service.name}
                </h3>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{service.description}</p>
              <img src={service.image} alt={service.name} className="w-full h-48 object-cover rounded-lg mt-4" />
              <p className="text-foreground/70 mt-4">{service.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
            Why Choose Us?
          </h3>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
            We don’t just build technology, we build trust and long-term success.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
            {reasons.map((reason, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <CheckCircle className="text-primary w-6 h-6 mt-1" />
                <span className="text-foreground">{reason}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional Section: Our Process */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Our Process
          </h3>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto mb-6">
            We follow a streamlined process to deliver optimal solutions tailored to your business needs:
          </p>

          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary">Consultation</h4>
              <p className="text-foreground/70">
                We begin with a thorough consultation to understand your unique business challenges and requirements.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary">Development</h4>
              <p className="text-foreground/70">
                Our experts design and build customized digital solutions using the latest technologies.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary">Deployment</h4>
              <p className="text-foreground/70">
                After testing, we deploy the solution and ensure smooth integration with your existing processes.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Us Button */}
        <div className="text-center mt-16">
        <a
  href="https://wa.me/+6285640167388"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-all text-sm font-semibold shadow-lg"
>
  <MessageCircle className="w-4 h-4" />
  
Contact Us for a Consultation
</a>
        </div>
      </div>
    </section>
  );
};

export default DigitalBusiness;

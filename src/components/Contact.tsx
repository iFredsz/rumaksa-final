import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      emailjs
        .send(
          'service_foyi2qj', // Service ID
          'template_ubdsqtg', // Template ID
          formData,
          'Jp8clH2zr4eHdtL9J' // Public Key
        )
        .then(() => {
          toast.success('Message Sent', {
            className:
              'font-semibold text-lg text-header-text bg-[var(--accent)] shadow-2xl shadow-slate-700 rounded-lg',
          });
          setFormData({ name: '', email: '', subject: '', message: '' });
          setErrors({});
        })
        .catch(() => {
          toast.error('Message Failed', {
            className:
              'font-bold text-lg text-header-text bg-[var(--accent)] shadow-2xl shadow-slate-700 rounded-lg',
          });
        });
    }
  };

  return (
    
    <section id="contact" className="section-padding pt-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
            Get in Touch
          </h2>
          <p className="text-primary max-w-2xl mx-auto">
            Ready to secure your digital future? Contact us for a consultation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[var(--accent)]">Contact Information</h3>
              <div className="space-y-2">
                {[
                  { icon: Phone, text: '+62 856-4016-7388' },
                  { icon: Mail, text: 'contact@rumaksa.com' },
                  { icon: MapPin, text: 'Salatiga City, Central Java 50732, Indonesia' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <item.icon className="w-5 h-5 icon-color" />
                    <span className="text-primary">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[var(--accent)]">Office Hours</h3>
              <div className="text-base text-primary">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6  mb-8"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-medium text-primary mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-slate-700 focus:border-[var(--accent)] focus:ring focus:ring-[var(--accent)]/20"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="text-red-500 text-base">{errors.name}</div>}
              </div>
              <div>
                <label className="block text-base font-medium text-primary mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-700 focus:border-[var(--accent)] focus:ring focus:ring-[var(--accent)]/20"
                />
                {errors.email && <div className="text-red-500 text-base">{errors.email}</div>}
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-primary mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-700 focus:border-[var(--accent)] focus:ring focus:ring-[var(--accent)]/20"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-primary mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-slate-700 focus:border-[var(--accent)] focus:ring focus:ring-[var(--accent)]/20"
              ></textarea>
            </div>

            <motion.button
  type="submit"
  whileHover={{ scale: 1.02 }}
  className="w-full px-4 py-2 bg-[var(--accent)] hover:bg-sky-600 rounded-lg font-medium text-white flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-[var(--accent)]"
>
  <span className="text-white">Send Message</span>
  <Send className="w-5 h-5 text-white" />
</motion.button>


          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

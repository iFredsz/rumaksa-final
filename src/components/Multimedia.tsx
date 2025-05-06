import { motion } from 'framer-motion';
import { Image, Film, Palette, Sparkles, MessageCircle } from 'lucide-react';

const Multimedia = () => {
  const services = [
    {
      icon: Image,
      name: 'Desain Grafis',
      description: 'Brand identity, social media, dan kebutuhan visual lainnya.',
    },
    {
      icon: Film,
      name: 'Video Editing',
      description: 'Editing cinematic dan konten digital berkualitas tinggi.',
    },
    {
      icon: Palette,
      name: 'Creative Multimedia Solutions',
      description: 'Strategi kreatif untuk mendukung kampanye digital Anda.',
    },
  ];

  const benefits = [
    'Kreatif dan responsif',
    'Dikerjakan oleh tim berpengalaman',
    'Terintegrasi dengan strategi digital',
    'Visual yang memikat dan profesional',
  ];

  return (
    <section
      id="multimedia"
      className="section-padding relative overflow-hidden bg-background/80 py-20"
    >
      {/* Decorative Background Icon */}
      <div className="absolute -top-10 -left-10 opacity-10 pointer-events-none">
        <Sparkles className="w-60 h-60 text-primary" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Multimedia Services
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Inovasi multimedia yang membantu merek Anda menonjol secara visual dan digital.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-6 rounded-2xl border border-border/30 bg-white/80 dark:bg-black/40 shadow-sm backdrop-blur-md hover:shadow-xl transition-all transform hover:scale-[1.03] hover:ring-2 hover:ring-primary/30"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary shadow-inner">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-header-text">{service.name}</h3>
              </div>
              <p className="text-sm text-foreground/70 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-primary">Kenapa Memilih Kami?</h3>
          <ul className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto text-foreground/80">
            {benefits.map((benefit, i) => (
              <motion.li
                key={i}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="bg-primary/10 px-4 py-2 rounded-full text-sm shadow-sm"
              >
                {benefit}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
         <a
  href="https://wa.me/+6285640167388"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-all text-sm font-semibold shadow-lg"
>
  <MessageCircle className="w-4 h-4" />
  Hubungi Kami untuk Konsultasi 
</a>
        </motion.div>
      </div>
    </section>
  );
};

export default Multimedia;

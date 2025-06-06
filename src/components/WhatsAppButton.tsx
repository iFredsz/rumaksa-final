import { motion } from 'framer-motion';
import contactUsIcon from '../assets/contactus.svg'; // Sesuaikan path

const WhatsAppButton = () => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-8 right-8 z-50"
        >
            <motion.a
                href="https://wa.me/+6281338883795"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                className="block w-20 h-20" // Ukuran bisa disesuaikan
            >
                <img
                    src={contactUsIcon}
                    alt="Contact Us"
                    className="w-full h-full object-cover"
                />
            </motion.a>
        </motion.div>
    );
};

export default WhatsAppButton;

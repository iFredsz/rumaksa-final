import { motion } from 'framer-motion';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Menambahkan font untuk bootstrap-icons

const WhatsAppButton = () => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-8 right-8 z-50 flex items-center px-2"
        >
            <motion.div
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-white text-gray-700 px-3 py-1.5 text-sm rounded-lg shadow-md mr-3 whitespace-nowrap"
            >
                <span>Contact Us</span>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-white" />
            </motion.div>

            <motion.a
                href="https://wa.me/+6285640167388"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                className="bg-green-500 rounded-full text-white hover:glow shadow-lg flex items-center justify-center w-10 h-10"
            >
                <i className="bi bi-whatsapp text-white text-lg leading-none"></i>
            </motion.a>
        </motion.div>
    );
};

export default WhatsAppButton;

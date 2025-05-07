import { motion } from "framer-motion";
import { FaBuilding, FaGlobeAsia, FaCogs } from "react-icons/fa";

const CompanyProfile = () => {
  return (
    <section className="py-16 px-4 md:px-20 bg-white text-gray-800">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-poppins font-bold text-primary mb-4">Mengenai PT Rumah Karya Semesta</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          PT Rumah Karya Semesta (RUMAKSA) adalah perusahaan yang bergerak dalam bidang solusi digital, keamanan siber, dan teknologi multimedia. Didirikan untuk menjembatani kebutuhan jasa digital kreatif dan teknis di Indonesia. 
          RUMAKSA berperan sebagai platform penghubung antara talenta mahasiswa dan kebutuhan industri digital modern.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <motion.div
          className="bg-gray-100 p-6 rounded-xl shadow"
          whileHover={{ scale: 1.05 }}
        >
          <FaBuilding className="text-4xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Platform Kolaboratif</h3>
          <p className="text-sm text-gray-700">
            Menghubungkan profesional muda dan mahasiswa dengan peluang kerja berbasis proyek digital.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-100 p-6 rounded-xl shadow"
          whileHover={{ scale: 1.05 }}
        >
          <FaGlobeAsia className="text-4xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Layanan Berbasis Digital</h3>
          <p className="text-sm text-gray-700">
            Fokus pada pengembangan website, keamanan siber, desain grafis, dan digital branding.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-100 p-6 rounded-xl shadow"
          whileHover={{ scale: 1.05 }}
        >
          <FaCogs className="text-4xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Inovasi Berkelanjutan</h3>
          <p className="text-sm text-gray-700">
            Mendorong inovasi dalam teknologi dan kreativitas melalui SDLC dan pendekatan berbasis solusi.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyProfile;

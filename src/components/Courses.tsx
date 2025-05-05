import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase"; // Import konfigurasi Firebase
import { Link } from 'react-router-dom'; // Import Link dari react-router-dom

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);

  // Mengambil data kursus dari Firestore
  const fetchCourses = async () => {
    const coursesCollection = collection(db, 'courses');
    const coursesSnapshot = await getDocs(coursesCollection);
    const coursesList = coursesSnapshot.docs.map(doc => doc.data());
    setCourses(coursesList);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <section id="courses" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-center text-transparent bg-gradient-to-r from-primary to-accent">
            Our Courses
          </h2>

        {/* Grid Courses dengan pengaturan kolom responsif */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.slice(0, 3).map((course, index) => (
            <motion.div
              key={index}
              className="bg-[var(--card-bg)] text-[var(--card-text)] p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-black"

              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-sm">{course.description}</p>
              <a
                href={`https://wa.me/${course.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Enroll Now
              </a>
            </motion.div>
          ))}
        </div>

        {/* Tombol Show All menuju halaman all-course */}
        {courses.length > 3 && (
          <div className="text-center mt-10">
            <Link
              to="/all-course"
              className="px-4 py-1 text-sm bg-slate-700 text-white rounded hover:bg-slate-600"
            >
              Show All Courses
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;

import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  phone: string;
  price?: number;          // Harga diskon / harga sekarang
  originalPrice?: number;  // Harga asli sebelum diskon (boleh kosong)
}

const AddEditCourse: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');

  const fetchCourses = async () => {
    const querySnapshot = await getDocs(collection(db, 'courses'));
    const courseList: Course[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      courseList.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        image: data.image,
        phone: data.phone,
        price: data.price ?? null,
        originalPrice: data.originalPrice ?? null,
      });
    });
    setCourses(courseList);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (courseId) {
      const fetchCourse = async () => {
        const docRef = doc(db, 'courses', courseId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title ?? '');
          setDescription(data.description ?? '');
          setImage(data.image ?? '');
          setPhone(data.phone ?? '');
          setPrice(data.price?.toString() ?? '');
          setOriginalPrice(data.originalPrice?.toString() ?? '');
        }
      };
      fetchCourse();
    } else {
      // Reset semua field form
      setTitle('');
      setDescription('');
      setImage('');
      setPhone('');
      setPrice('');
      setOriginalPrice('');
    }
  }, [courseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi harga: harus angka positif atau kosong (boleh free)
    const priceNum = price.trim() === '' ? null : Number(price);
    const originalPriceNum = originalPrice.trim() === '' ? null : Number(originalPrice);

    if ((priceNum !== null && isNaN(priceNum)) || (originalPriceNum !== null && isNaN(originalPriceNum))) {
      toast.error('Harga harus berupa angka yang valid');
      return;
    }

    const courseData = {
      title,
      description,
      image,
      phone,
      price: priceNum,
      originalPrice: originalPriceNum,
    };

    try {
      if (courseId) {
        await setDoc(doc(db, 'courses', courseId), courseData);
        toast.success('Course updated successfully!');
      } else {
        const newDocRef = doc(db, 'courses', `${Date.now()}`);
        await setDoc(newDocRef, courseData);
        toast.success('New course added!');
        // Reset form
        setTitle('');
        setDescription('');
        setImage('');
        setPhone('');
        setPrice('');
        setOriginalPrice('');
      }
      setCourseId(null);
      await fetchCourses();
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  const handleDelete = (id: string) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p className="text-sm">Apakah Anda yakin ingin menghapus course ini?</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={async () => {
                await deleteDoc(doc(db, 'courses', id));
                toast.success('Course berhasil dihapus!');
                if (id === courseId) setCourseId(null);
                await fetchCourses();
                closeToast && closeToast();
              }}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Ya
            </button>
            <button
              onClick={() => closeToast && closeToast()}
              className="px-3 py-1 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };

  return (
    <section className="py-16  dark:bg-gray-900">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Daftar Courses */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Courses Setting</h2>
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{course.description}</p>
                <div className="mt-2 flex gap-2">
                  {course.originalPrice && course.price && course.originalPrice > course.price && (
                    <span className="text-xs line-through text-gray-400">
                      Rp {course.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {course.price ? (
                    <span className="text-sm font-bold text-primary">
                      Rp {course.price.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-primary">Free</span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => setCourseId(course.id)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Tambah / Edit */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            {courseId ? 'Edit Course' : 'Add New Course'}
          </h2>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
            <input
              type="text"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-md"
              required
            />
            <textarea
              placeholder="Course Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Course Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-3 border rounded-md"
              required
            />
            <input
              type="tel"
              placeholder="WhatsApp Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-md"
              required
            />
            <input
              type="number"
              placeholder="Current Price (Rp)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border rounded-md"
              min="0"
            />
            <input
              type="number"
              placeholder="Original Price (Rp)"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full p-3 border rounded-md"
              min="0"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
            >
              {courseId ? 'Update Course' : 'Add Course'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default AddEditCourse;

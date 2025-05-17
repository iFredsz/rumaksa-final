import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { Loader2, Edit2, Check, Trash2 } from "lucide-react";

type Slide = {
  id: string;
  src: string;
  path: string;
};

type Testimonial = {
  id: string;
  message: string;
  name: string;
  role: string;
  photo: string;
  rating: number | null;
};


const EditHeroContent = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingSlides, setEditingSlides] = useState<Record<string, boolean>>({});
  const [savingSlides, setSavingSlides] = useState<Record<string, boolean>>({});
  const [deletingSlides, setDeletingSlides] = useState<Record<string, boolean>>({});

  const [editingTestimonials, setEditingTestimonials] = useState<Record<string, boolean>>({});
  const [savingTestimonials, setSavingTestimonials] = useState<Record<string, boolean>>({});
  const [deletingTestimonials, setDeletingTestimonials] = useState<Record<string, boolean>>({});

  const [newSlide, setNewSlide] = useState<Slide>({ id: "", src: "", path: "" });
const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
  id: "",
  message: "",
  name: "",
  role: "",
  photo: "",
  rating: null,
});

  const fetchData = async () => {
    setLoading(true);
    try {
      const slidesSnapshot = await getDocs(collection(db, "hero_slides"));
      const testimonialsSnapshot = await getDocs(collection(db, "testimonials"));

      setSlides(
        slidesSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            src: data.src ?? "",
            path: data.path ?? "",
          };
        })
      );

setTestimonials(
  testimonialsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      message: data.message ?? "",
      name: data.name ?? "",
      role: data.role ?? "",
      photo: data.photo ?? "",
      rating: data.rating ?? 5,
    };
  })
);


      setEditingSlides({});
      setEditingTestimonials({});
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Gagal mengambil data!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSlideChange = (id: string, field: keyof Slide, value: string) => {
    setSlides((prev) =>
      prev.map((slide) => (slide.id === id ? { ...slide, [field]: value } : slide))
    );
  };

const handleTestimonialChange = (id: string, field: keyof Testimonial, value: string | number | null) => {
  setTestimonials((prev) =>
    prev.map((testi) => (testi.id === id ? { ...testi, [field]: value } : testi))
  );
};


  const saveSlide = async (id: string) => {
    setSavingSlides((prev) => ({ ...prev, [id]: true }));
    try {
      const slide = slides.find((s) => s.id === id);
      if (!slide) throw new Error("Slide tidak ditemukan");

      const slideRef = doc(db, "hero_slides", id);
      await updateDoc(slideRef, {
        src: slide.src,
        path: slide.path,
      });

      setEditingSlides((prev) => ({ ...prev, [id]: false }));
      alert("Slide berhasil disimpan!");
    } catch (error) {
      console.error("Gagal menyimpan slide:", error);
      alert("Gagal menyimpan slide!");
    }
    setSavingSlides((prev) => ({ ...prev, [id]: false }));
  };

  const deleteSlide = async (id: string) => {
    if (!confirm("Yakin ingin menghapus slide ini?")) return;
    setDeletingSlides((prev) => ({ ...prev, [id]: true }));
    try {
      await deleteDoc(doc(db, "hero_slides", id));
      setSlides((prev) => prev.filter((slide) => slide.id !== id));
      alert("Slide berhasil dihapus!");
    } catch (error) {
      console.error("Gagal menghapus slide:", error);
      alert("Gagal menghapus slide!");
    }
    setDeletingSlides((prev) => ({ ...prev, [id]: false }));
  };

  const saveTestimonial = async (id: string) => {
    setSavingTestimonials((prev) => ({ ...prev, [id]: true }));
    try {
      const testi = testimonials.find((t) => t.id === id);
      if (!testi) throw new Error("Testimonial tidak ditemukan");

      const testiRef = doc(db, "testimonials", id);
await updateDoc(testiRef, {
  message: testi.message,
  name: testi.name,
  role: testi.role,
  photo: testi.photo,
  rating: testi.rating,
});


      setEditingTestimonials((prev) => ({ ...prev, [id]: false }));
      alert("Testimonial berhasil disimpan!");
    } catch (error) {
      console.error("Gagal menyimpan testimonial:", error);
      alert("Gagal menyimpan testimonial!");
    }
    setSavingTestimonials((prev) => ({ ...prev, [id]: false }));
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Yakin ingin menghapus testimonial ini?")) return;
    setDeletingTestimonials((prev) => ({ ...prev, [id]: true }));
    try {
      await deleteDoc(doc(db, "testimonials", id));
      setTestimonials((prev) => prev.filter((testi) => testi.id !== id));
      alert("Testimonial berhasil dihapus!");
    } catch (error) {
      console.error("Gagal menghapus testimonial:", error);
      alert("Gagal menghapus testimonial!");
    }
    setDeletingTestimonials((prev) => ({ ...prev, [id]: false }));
  };

  const addSlide = async () => {
    if (!newSlide.src || !newSlide.path) return alert("Isi semua field slide");
    try {
      const docRef = await addDoc(collection(db, "hero_slides"), {
        src: newSlide.src,
        path: newSlide.path,
      });
      setSlides([...slides, { ...newSlide, id: docRef.id }]);
      setNewSlide({ id: "", src: "", path: "" });
      alert("Slide berhasil ditambahkan!");
    } catch (error) {
      console.error("Gagal menambahkan slide:", error);
      alert("Gagal menambahkan slide!");
    }
  };

  const addTestimonial = async () => {
  const { message, name, role, photo, rating } = newTestimonial;
  if (!message || !name || !role || !photo || !rating)
    return alert("Isi semua field testimonial");

  try {
    const docRef = await addDoc(collection(db, "testimonials"), {
      message,
      name,
      role,
      photo,
      rating,
    });
    setTestimonials([...testimonials, { ...newTestimonial, id: docRef.id }]);
    setNewTestimonial({ id: "", message: "", name: "", role: "", photo: "", rating: null });
    alert("Testimonial berhasil ditambahkan!");
  } catch (error) {
    console.error("Gagal menambahkan testimonial:", error);
    alert("Gagal menambahkan testimonial!");
  }
};

  return (
    <div className="container mx-auto px-4 py-10 pt-20">
{/* Suggested code may be subject to a license. Learn more: ~LicenseLog:2922252263. */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Home Setting</h2>

      {/* SLIDES */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Slides</h2>

        {/* Tambah Slide */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            className="border p-2 rounded"
            value={newSlide.src}
            onChange={(e) => setNewSlide({ ...newSlide, src: e.target.value })}
            placeholder="URL Gambar"
          />
          <input
            className="border p-2 rounded"
            value={newSlide.path}
            onChange={(e) => setNewSlide({ ...newSlide, path: e.target.value })}
            placeholder="Path Link (contoh: /courses)"
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 col-span-1 md:col-span-2"
            onClick={addSlide}
          >
            Tambah Slide
          </button>
        </div>

        {slides.length === 0 && <p>Tidak ada slide untuk diedit.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slides.map((slide) => {
            const isEditing = editingSlides[slide.id] || false;
            return (
              <div key={slide.id} className="border rounded p-4 shadow relative">
                <input
                  className="w-full border p-2 rounded mb-2"
                  value={slide.src}
                  onChange={(e) => handleSlideChange(slide.id, "src", e.target.value)}
                  disabled={!isEditing}
                />
                <input
                  className="w-full border p-2 rounded mb-2"
                  value={slide.path}
                  onChange={(e) => handleSlideChange(slide.id, "path", e.target.value)}
                  disabled={!isEditing}
                />
                <div className="flex gap-2">
                  {!isEditing ? (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
                      onClick={() => setEditingSlides((prev) => ({ ...prev, [slide.id]: true }))}
                    >
                      <Edit2 className="mr-1" size={16} /> Edit
                    </button>
                  ) : (
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded flex items-center disabled:opacity-60"
                      onClick={() => saveSlide(slide.id)}
                      disabled={savingSlides[slide.id]}
                    >
                      {savingSlides[slide.id] ? (
                        <Loader2 className="animate-spin mr-1" size={16} />
                      ) : (
                        <>
                          <Check className="mr-1" size={16} /> Simpan
                        </>
                      )}
                    </button>
                  )}
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded flex items-center disabled:opacity-60"
                    onClick={() => deleteSlide(slide.id)}
                    disabled={deletingSlides[slide.id]}
                  >
                    {deletingSlides[slide.id] ? (
                      <Loader2 className="animate-spin mr-1" size={16} />
                    ) : (
                      <Trash2 className="mr-1" size={16} />
                    )}
                    Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Testimonials</h2>

        {/* Tambah Testimonial */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            className="border p-2 rounded"
            value={newTestimonial.message}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, message: e.target.value })}
            placeholder="Message"
          />
          <input
            className="border p-2 rounded"
            value={newTestimonial.name}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
            placeholder="Nama"
          />
          <input
            className="border p-2 rounded"
            value={newTestimonial.role}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
            placeholder="Jabatan / Perusahaan"
          />
          <input
  className="border p-2 rounded"
  value={newTestimonial.photo}
  onChange={(e) => setNewTestimonial({ ...newTestimonial, photo: e.target.value })}
  placeholder="URL Foto"
/>
<input
  type="number"
  min={1}
  max={5}
  className="border p-2 rounded"
  value={newTestimonial.rating ?? ""}
  onChange={(e) =>
    setNewTestimonial({
      ...newTestimonial,
      rating: e.target.value ? Number(e.target.value) : null,
    })
  }
  placeholder="Rating (1-5)"
/>


          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 col-span-1 md:col-span-2"
            onClick={addTestimonial}
          >
            Tambah Testimonial
          </button>
        </div>

        {testimonials.length === 0 && <p>Tidak ada testimonial untuk diedit.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testi) => {
            const isEditing = editingTestimonials[testi.id] || false;
            return (
              <div key={testi.id} className="border rounded p-4 shadow relative">
                <input
                  className="w-full border p-2 rounded mb-2"
                  value={testi.message}
                  onChange={(e) => handleTestimonialChange(testi.id, "message", e.target.value)}
                  disabled={!isEditing}
                />
                <input
                  className="w-full border p-2 rounded mb-2"
                  value={testi.name}
                  onChange={(e) => handleTestimonialChange(testi.id, "name", e.target.value)}
                  disabled={!isEditing}
                />
                <input
                  className="w-full border p-2 rounded mb-2"
                  value={testi.role}
                  onChange={(e) => handleTestimonialChange(testi.id, "role", e.target.value)}
                  disabled={!isEditing}
                />
                <input
  className="w-full border p-2 rounded mb-2"
  value={testi.photo}
  onChange={(e) => handleTestimonialChange(testi.id, "photo", e.target.value)}
  disabled={!isEditing}
/>
<input
  type="number"
  min={1}
  max={5}
  className="w-full border p-2 rounded mb-2"
  value={testi.rating !== null && testi.rating !== undefined ? testi.rating : ""}
  onChange={(e) =>
    handleTestimonialChange(
      testi.id,
      "rating",
      e.target.value !== "" ? Number(e.target.value) : null
    )
  }
  disabled={!isEditing}
/>


                <div className="flex gap-2">
                  {!isEditing ? (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
                      onClick={() => setEditingTestimonials((prev) => ({ ...prev, [testi.id]: true }))}
                    >
                      <Edit2 className="mr-1" size={16} /> Edit
                    </button>
                  ) : (
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded flex items-center disabled:opacity-60"
                      onClick={() => saveTestimonial(testi.id)}
                      disabled={savingTestimonials[testi.id]}
                    >
                      {savingTestimonials[testi.id] ? (
                        <Loader2 className="animate-spin mr-1" size={16} />
                      ) : (
                        <>
                          <Check className="mr-1" size={16} /> Simpan
                        </>
                      )}
                    </button>
                  )}
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded flex items-center disabled:opacity-60"
                    onClick={() => deleteTestimonial(testi.id)}
                    disabled={deletingTestimonials[testi.id]}
                  >
                    {deletingTestimonials[testi.id] ? (
                      <Loader2 className="animate-spin mr-1" size={16} />
                    ) : (
                      <Trash2 className="mr-1" size={16} />
                    )}
                    Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditHeroContent;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot
} from "firebase/firestore";
import SkeletonBlog from "./SkeletonBlog";

// Fungsi untuk menghapus tag HTML
function stripHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

// Format tanggal
const formatDate = (date: any) => {
  if (!date) return "-";
  const timestamp = date.toDate ? date.toDate() : date;
  return timestamp.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Optimasi gambar
const optimizedImageUrl = (url: string, format?: string) => {
  if (format === 'webp') {
    return `${url}?auto=format&fit=max&fm=webp`;
  }
  return `${url}?auto=format&fit=max`;
};

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const postsPerPage = 3; // Hanya 3 post per halaman

  const fetchPosts = async () => {
    if (!hasMore) return; // Hentikan jika sudah tidak ada post

    setLoading(true);

    try {
      let q = query(
        collection(db, "blogs"),
        orderBy("date", "desc"),
        limit(postsPerPage)
      );

      if (lastDoc) {
        q = query(
          collection(db, "blogs"),
          orderBy("date", "desc"),
          startAfter(lastDoc),
          limit(postsPerPage)
        );
      }

      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Cegah duplikasi post
      setPosts(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const newPosts = fetchedPosts.filter(p => !existingIds.has(p.id));
        return [...prev, ...newPosts];
      });

      if (querySnapshot.docs.length < postsPerPage) {
        setHasMore(false); // Sudah tidak ada post berikutnya
      }

      // Menyimpan dokumen terakhir untuk pagination berikutnya
      if (querySnapshot.docs.length > 0) {
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } else {
        setHasMore(false); // Jika tidak ada post lagi
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="section-padding relative overflow-hidden pt-4 pb-0">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-2"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Latest Insights
          </h2>
          <p className="text-description max-w-2xl mx-auto mb-4">
  Stay updated with the latest trends in cybersecurity and digital transformation
</p>

        </motion.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {loading && [...Array(postsPerPage)].map((_, index) => (
            <SkeletonBlog key={index} />
          ))}

          {posts.map((post, index) => (
            <motion.article
            key={post.id}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="rounded-lg overflow-hidden transition-all duration-300 p-2 sm:p-3 flex flex-col"
          >
            {/* Hanya tampilkan gambar pada tampilan mobile */}
            {post.imageUrl && (
              <img
                src={optimizedImageUrl(post.imageUrl, "webp")}
                alt={post.title}
                loading="lazy"
                className="w-full h-32 sm:h-48 md:h-56 object-cover rounded-lg"
              />
            )}
          
            <div className="pt-2 flex flex-col flex-grow">
              <Link to={`/blog/${post.id}`}>
                {/* Judul tetap tampil di semua ukuran layar */}
                <h3 className="text-sm sm:text-lg md:text-lg font-semibold mb-1 hover:text-sky-400 transition-colors">
  {post.title}
</h3>

              </Link>
          
              {/* Konten, author, dan tanggal hanya tampil pada layar md ke atas */}
              <div className="hidden md:block">
                <p className="text-sm text-slate-400 mb-2">
                  {post.content ? `${stripHtml(post.content).substring(0, 60)}...` : "-"}
                </p>
              </div>
          
              <div className="mt-auto flex flex-col items-start text-xs text-slate-500">
                {/* Author dan Tanggal disembunyikan pada mobile */}
                <div className="hidden md:flex items-center space-x-2 mb-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="hidden md:flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
          
                {/* Flex container untuk tombol Read More */}
                <div className="flex justify-between items-center w-full">
                  <div></div> {/* Tambahkan div kosong di kiri untuk mendorong tombol ke kanan */}
                  <Link to={`/blog/${post.id}`}>
                    <button className="mt-2 flex items-center text-xs text-sky-400 hover:text-sky-300 transition-colors">
                      Read More <ArrowRight className="w-3 h-3 ml-1" /> {/* Ukuran panah diperbesar */}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
          


          ))}
        </div>

        
        <div className="flex justify-center mt-4 space-x-4 mb-12">
  <Link to="/all-posts">
    <button className="px-4 py-1 text-sm bg-slate-700 text-white rounded hover:bg-slate-600">
      Show All Posts
    </button>
  </Link>
</div>

      </div>
    </section>
  );
};

export default Blog;

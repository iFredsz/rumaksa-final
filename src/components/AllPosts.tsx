import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Optimasi gambar
const optimizedImageUrl = (url: string, format?: string) => {
  if (format === 'webp') {
    return `${url}?auto=format&fit=max&fm=webp`;
  }
  return `${url}?auto=format&fit=max`;
};

// Format tanggal Indonesia
const formatDate = (date: any) => {
  if (!date) return "-";
  const timestamp = date.toDate ? date.toDate() : date;
  return timestamp.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Menghapus HTML dari konten
const stripHtml = (html: string): string => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const AllPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getAllPosts = async () => {
      const q = query(collection(db, "blogs"), orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      const result = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(result);
      setLoading(false);
    };
    getAllPosts();
  }, []);

  return (
    <div className="container mx-auto px-2 pt-20 pb-10" id="allposts">
<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
  All Posts
</h2>


      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 xl:grid-cols-3">
        {loading ? (
          <p className="text-center text-slate-400 col-span-full">Loading posts...</p>
        ) : (
          posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="rounded-lg border border-black hover:border-sky-500 overflow-hidden transition-all duration-300 p-1 sm:p-2 flex flex-col bg-white"
            >
              {/* Gambar proporsional */}
              {post.imageUrl && (
                <div className="w-full aspect-[5/3] sm:aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-md">

                  <img
                    src={optimizedImageUrl(post.imageUrl, "webp")}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="pt-1 flex flex-col flex-grow">
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-xs sm:text-sm font-semibold mb-1 text-[#111827] hover:text-sky-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <div className="hidden md:block">
                  <p className="text-xs text-slate-400 mb-2">
                    {post.content ? `${stripHtml(post.content).substring(0, 60)}...` : "-"}
                  </p>
                </div>

                <div className="mt-auto flex flex-col items-start text-[10px] sm:text-xs text-slate-500">
                  <div className="hidden md:flex items-center space-x-2 mb-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="hidden md:flex items-center space-x-2 mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.date)}</span>
                  </div>

                  <div className="flex justify-between items-center w-full">
                    <div></div>
                    <Link to={`/blog/${post.id}`}>
                      <button className="mt-1 flex items-center text-[11px] text-sky-400 hover:text-sky-300 transition-colors">
                        Read More <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </div>
  );
};

export default AllPosts;

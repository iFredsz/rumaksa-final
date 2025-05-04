import { useState, useEffect, FC, ReactNode } from 'react';
import { motion } from 'framer-motion';


import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  DocumentData,
  limit,
  query,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Editor from './Editor';
export interface AdminProps {
  onLogout: (value: boolean) => void;
}


const stripHtml = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};


const Admin: FC<AdminProps> = ({ onLogout }): ReactNode => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [blogs, setBlogs] = useState<DocumentData[]>([]);
  const [title, setTitle] = useState(''); 
  const [imageUrl, setImageUrl] = useState(''); 
  const [author, setAuthor] = useState(''); 
  const [editorContent, setEditorContent] = useState(''); 
  const [editId, setEditId] = useState<string | null>(null);


  const auth = getAuth();
  const navigate = useNavigate();

  
  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setImageUrl('');
    setEditorContent('');
    setEditId(null);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isLoggedIn = !!user;
      setLoggedIn(isLoggedIn)
          if (!isLoggedIn) navigate('/login');
      });
    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    if (editId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [editId]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const blogsRef = collection(db, 'blogs');
      const q = query(blogsRef, limit(10));
      const querySnapshot = await getDocs(q);
      const fetched = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const date = data.date instanceof Timestamp 
          ? data.date.toDate().toLocaleDateString('en-GB')
          : data.date;

        return { id: doc.id, ...data, date };
      });
      setBlogs(fetched);
    } catch (error) {
      console.error('Fetch blogs error:', error);
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAddBlog = async () => {
    if (!title || !author || !imageUrl || !editorContent) {
      toast.error('Pastikan semua kolom diisi');
      return;
    }

    if (!isValidUrl(imageUrl)) {
      toast.error('URL Gambar tidak valid');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        content: editorContent,
        author,
        date: serverTimestamp(),
        imageUrl,
      });
      toast.success('Blog berhasil ditambahkan');
      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error('Add blog error:', error);
      toast.error('Gagal menambahkan blog');
    } finally {
      setLoading(false);
    }
  };

  const handleEditBlog = (blog: DocumentData) => {
    setTitle(blog.title);
    setAuthor(blog.author);
    setImageUrl(blog.imageUrl);
    setEditorContent(blog.content || '');
    setEditId(blog.id);
  };

  const handleSaveChange = async () => {
    if (!editId) {
      toast.error('ID tidak ditemukan');
      return;
    }

    if (!editorContent) {
      toast.error('Konten tidak boleh kosong');
      return;
    }

    setLoading(true);
    try {
      const blogRef = doc(db, 'blogs', editId);
      await setDoc(blogRef, {
        title,
        content: editorContent,
        author,
        date: serverTimestamp(),
        imageUrl,
      });
      toast.success('Perubahan berhasil disimpan');
      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Gagal menyimpan perubahan');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string): Promise<void> => {
      toast((t) => (
      <div className="flex items-center justify-between" key={t.id}>
        <span>Yakin ingin menghapus blog ini?</span>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              setLoading(true);

              try {
                await deleteDoc(doc(db, 'blogs', id));
                toast.success('Blog berhasil dihapus');
                fetchBlogs();
              } catch (error) {
                console.error('Delete blog error:', error);
                toast.error('Gagal menghapus blog');
              } finally {
                setLoading(false);
                toast.dismiss(t.id);  // Close the toast after completion
              }
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)} // Close the toast without doing anything
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            No
          </button>  
        </div>
      </div> 
      ));
  };
  
  
  
  if (!loggedIn) return <div>Loading...</div>;

  return (
    <motion.div className="pt-20 px-4 md:px-10 pb-10">
      <h2 className="admin-title">Add/Edit Blog</h2>

  
      {/* Form Input */}
      <div className="grid md:grid-cols-3 gap-4 mb-4">
      <div>
        <label className="admin-subtitle">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-3 w-full text-black"
        />
      </div>

      <div>
        <label className="admin-subtitle">Author</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          className="border p-3 w-full text-black"
        />
      </div>

      <div>
        <label className="admin-subtitle">Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          className="border p-3 w-full text-black"
        />
      </div>

      <div className="md:col-span-3 border text-black">
        <Editor value={editorContent} onEditorChange={setEditorContent} />
      </div>
    </div>

  
      {/* Tombol Aksi */}
      <div className="flex flex-wrap gap-3 mb-6">
        {editId ? (
          <button
            onClick={handleSaveChange}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        ) : (
          <button
            onClick={handleAddBlog}
            disabled={loading}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? 'Adding...' : 'Add Blog'}
          </button>
        )}
        <button
          onClick={() => onLogout(false)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
  
      {/* Tabel Blog */}
      <h3 className="admin-subtitle">Existing Blogs</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-black border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Author</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Content</th>
              <th className="py-2 px-4 border">Image URL</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-t">
                <td className="py-2 px-4 border">{blog.title || '-'}</td>
                <td className="py-2 px-4 border">{blog.author || '-'}</td>
                <td className="py-2 px-4 border">{blog.date || '-'}</td>
                <td className="py-2 px-4 border">
                  {blog.content ? stripHtml(blog.content).slice(0, 80) + '...' : '-'}
                </td>
                <td className="py-2 px-4 border break-words max-w-[200px]">
                  {blog.imageUrl?.length > 50
                    ? blog.imageUrl.slice(0, 50) + '...'
                    : blog.imageUrl || '-'}
                </td>
                <td className="py-2 px-4 border">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleEditBlog(blog)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
  
}; 

export default Admin;

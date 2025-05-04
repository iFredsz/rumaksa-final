import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { Timestamp } from 'firebase/firestore';
import { doc, getDoc, collection } from 'firebase/firestore';
import { Calendar, User } from 'lucide-react';
import React from 'react';
import SkeletonBlog from './SkeletonBlog';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const docRef = doc(collection(db, 'blogs'), id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPost({
            id: docSnap.id,
            title: data.title,
            content: data.content,
            author: data.author,
            date:
              data.date instanceof Timestamp
                ? data.date.toDate().toLocaleDateString('en-GB')
                : data.date,
            imageUrl: data.imageUrl,
          } as Post);
        } else {
          setError('Postingan tidak ditemukan');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat memuat postingan');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <section className="section-padding relative overflow-hidden">
        <div className="container mx-auto px-4">
          <SkeletonBlog />
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="text-center">Post not Found</div>;
  }

  return (
    <section className="section-padding relative overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4">
      <article className="bg-white rounded-xl shadow-md overflow-hidden p-6 mt-14">

          {post.imageUrl && (
            <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-52 sm:h-60 md:h-64 object-cover mb-6 rounded-lg"
          loading="lazy"
/>

          )}
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-2 mr-4">
              <User className="w-5 h-5 text-gray-500" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>{post.date}</span>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="space-y-4 text-gray-700"
          ></div>
        </article>
      </div>
    </section>
  );
};

export default BlogDetail;

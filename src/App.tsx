import React, { useRef, useEffect, useState, useCallback, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  BrowserRouter
} from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

// Lazy loading components
const BlogDetail = React.lazy(() => import('./components/BlogDetail'));
const Header = React.lazy(() => import('./components/Header'));
const Hero = React.lazy(() => import('./components/Hero'));
const About = React.lazy(() => import('./components/About'));
const Services = React.lazy(() => import('./components/Services'));
const Blog = React.lazy(() => import('./components/Blog'));
const Contact = React.lazy(() => import('./components/Contact'));
const Courses = React.lazy(() => import('./components/Courses'));
const Partner = React.lazy(() => import('./components/Partner'));
const Login = React.lazy(() => import('./components/Login'));
const Admin = React.lazy(() => import('./components/Admin'));
const AddEditCourse = React.lazy(() => import('./components/AddEditCourse'));
const Footer = React.lazy(() => import('./components/Footer'));
const WhatsAppButton = React.lazy(() => import('./components/WhatsAppButton'));
const Editor = React.lazy(() => import('./components/Editor'));
const AllPosts = React.lazy(() => import('./components/AllPosts'));
const AllCourses = React.lazy(() => import('./components/AllCourses')); // Import halaman AllCourses

const App: React.FC = (): JSX.Element => {
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const coursesRef = useRef<HTMLElement>(null);
  const blogRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const partnerRef = useRef<HTMLElement>(null);

  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    try {
      const storedValue = localStorage.getItem('isAdmin');
      return storedValue ? JSON.parse(storedValue) : false;
    } catch (error) {
      console.error("Error parsing localStorage 'isAdmin':", error);
      return false;
    }
  });

  useEffect(() => {
    if (!loggedIn) localStorage.removeItem('isAdmin');
  }, [loggedIn]);

  const handleScrollSection = useCallback((hash: string) => {
    if (hash) {
      const section = document.getElementById(hash.slice(1));
      section?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (location.pathname === '/' && el) {
        setTimeout(() => {
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">
      <Suspense fallback={null}>

        <Header
          loggedIn={loggedIn}
          homeRef={homeRef}
          aboutRef={aboutRef}
          servicesRef={servicesRef}
          coursesRef={coursesRef}
          blogRef={blogRef}
          contactRef={contactRef}
          partnerRef={partnerRef}
          scrollSection={handleScrollSection}
        />
        <Routes>
          <Route path="/admin" element={loggedIn ? <Admin onLogout={setLoggedIn} /> : <Navigate to="/login" />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/courses/manage" element={<AddEditCourse />} />
          <Route path="/login" element={!loggedIn ? <Login onLogin={setLoggedIn} /> : <Navigate to="/" />} />
          <Route path="/" element={
            <>
              <section id="hero" ref={homeRef} className="py-5"><Hero /></section>
              <section id="about" ref={aboutRef} className="py-15"><About /></section>
              <section id="services" ref={servicesRef} className="py-15"><Services /></section>
              <section id="courses" ref={coursesRef} className="py-15"><Courses /></section>
              <section id="partner" ref={partnerRef} className="py-15"><Partner /></section>
              <section id="blog" ref={blogRef} className="py-16"><Blog /></section>
              <section id="contact" ref={contactRef} className="py-15"><Contact /></section>
            </>
          } />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/all-course" element={<AllCourses />} />
        </Routes>
  
        {/* ⬇⬇ Tambahkan di sini! Dalam Suspense ⬇⬇ */}
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        <Footer />
        <WhatsAppButton />
      </Suspense>
    </div>
  );
  
};

const AppWrapper: React.FC = () => (
  <ParallaxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ParallaxProvider>
);

export default AppWrapper;

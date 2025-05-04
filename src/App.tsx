import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  BrowserRouter
} from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Toaster } from 'react-hot-toast';

import BlogDetail from './components/BlogDetail';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Partner from './components/Partner';
import Login from './components/Login';
import Admin from './components/Admin';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Editor from './components/Editor';
import AllPosts from './components/AllPosts';

const App: React.FC = (): JSX.Element => {
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
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
      <Header
        loggedIn={loggedIn}
        homeRef={homeRef}
        aboutRef={aboutRef}
        servicesRef={servicesRef}
        blogRef={blogRef}
        contactRef={contactRef}
        partnerRef={partnerRef}
        scrollSection={handleScrollSection}
      />
      <Routes>
        <Route path="/admin" element={loggedIn ? <Admin onLogout={setLoggedIn} /> : <Navigate to="/login" />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/login" element={!loggedIn ? <Login onLogin={setLoggedIn} /> : <Navigate to="/" />} />
        <Route path="/" element={
          <>
            <section id="hero" ref={homeRef} className="py-5"><Hero /></section>
            <section id="about" ref={aboutRef} className="py-15"><About /></section>
            <section id="services" ref={servicesRef} className="py-15"><Services /></section>
            <section id="partner" ref={partnerRef} className="py-15"><Partner /></section>
            <Blog />
            <section id="contact" ref={contactRef} className="py-15"><Contact /></section>
          </>
        } />
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <Toaster position="bottom-right" />
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

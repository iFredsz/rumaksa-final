import React, { useEffect, useState, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter
} from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

// Lazy loaded components
const BlogDetail = React.lazy(() => import('./components/BlogDetail'));
const Header = React.lazy(() => import('./components/Header'));
const Hero = React.lazy(() => import('./components/Hero'));
// const About = React.lazy(() => import('./components/About'));
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
const AllCourses = React.lazy(() => import('./components/AllCourses'));
const CompanyProfile = React.lazy(() => import('./components/company'));

// Dropdown Pages
const VisionMission = React.lazy(() => import('./components/VisionMission'));
const OrganizeStructure = React.lazy(() => import('./components/OrganizeStructure'));
const CyberSecurity = React.lazy(() => import('./components/CyberSecurity'));
const DigitalBusiness = React.lazy(() => import('./components/DigitalBusiness'));
const Multimedia = React.lazy(() => import('./components/Multimedia'));

// New edit hero content page
const EditHeroContent = React.lazy(() => import('./components/EditHeroContent'));

const App: React.FC = (): JSX.Element => {
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

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Suspense
  fallback={
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  }
>

        <Header loggedIn={loggedIn} />

        <Routes>
          {/* Auth routes */}
          <Route path="/admin" element={loggedIn ? <Admin onLogout={setLoggedIn} /> : <Navigate to="/login" />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/courses/manage" element={<AddEditCourse />} />
          <Route path="/hero/edit" element={<EditHeroContent />} />
          <Route path="/login" element={!loggedIn ? <Login onLogin={setLoggedIn} /> : <Navigate to="/" />} />

          {/* Public routes */}
          <Route path="/" element={<Hero />} />
          <Route path="/home" element={<Hero />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/services" element={<Services />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* Dropdown submenu routes */}
          <Route path="/about/company" element={<CompanyProfile />} />
          <Route path="/about/our-vision-&-mission" element={<VisionMission />} />
          <Route path="/about/organization-structure" element={<OrganizeStructure />} />
          <Route path="/services/cyber-security" element={<CyberSecurity />} />
          <Route path="/services/digital-business" element={<DigitalBusiness />} />
          <Route path="/services/multimedia" element={<Multimedia />} />

          {/* Detail content */}
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/all-course" element={<AllCourses />} />
        </Routes>

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

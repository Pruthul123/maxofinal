import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Search } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import ArchitectContact from './components/ArchitectContact';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import OurWork from './components/OurWork';
import News from './components/News';
import FutureThinking from './components/FutureThinking';
import AboutModern from './components/AboutModern';
import WorkGallery from './components/WorkGallery';
import DomeGallery from './components/DomeGallery';
import Footer from './components/Footer';
import SharedHeader from './components/SharedHeader';
import WorkCategoryPage from './components/work/WorkCategoryPage';
import WorkProjectPage from './components/work/WorkProjectPage';
import ResearchInsightPage from './components/ResearchInsightPage';
import NotFound from './components/NotFound';



export function MaxoLanding() {
  const [isPreloading, setIsPreloading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Trigger transition when assets are loaded
  useEffect(() => {
    // Pause video initially to "freeze" until loaded
    if (videoRef.current) {
      videoRef.current.pause();
    }

    // 1. Wait for Video to be ready
    const videoPromise = new Promise((resolve) => {
      const video = videoRef.current;
      if (!video) {
        resolve(true);
        return;
      }
      if (video.readyState >= 3) {
        resolve(true);
      } else {
        const handleCanPlay = () => resolve(true);
        video.addEventListener('canplaythrough', handleCanPlay, { once: true });
        video.addEventListener('error', () => resolve(true), { once: true });
      }
    });

    // 2. Wait for Window load (images, scripts, etc.)
    const windowLoadPromise = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve(true);
      } else {
        window.addEventListener('load', () => resolve(true), { once: true });
      }
    });

    // Wait for assets to load
    Promise.all([videoPromise, windowLoadPromise]).then(() => {
      // Once loaded, play video and start the 5s timer (configured with video)
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Handle autoplay block if necessary
        });
      }
      
      setTimeout(() => {
        setIsPreloading(false);
      }, 5000);
    });

  }, []);

  // Detect mobile to switch to side-drawer behavior
  useEffect(() => {
    const update = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Block scroll during preload
  useEffect(() => {
    if (isPreloading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPreloading]);

  return (
    <div style={{ position: 'relative', width: '100%', backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      
      {/* Main Landing Container - Full Screen */}
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
      {/* ----------------------------------------------------
          LAYER 1: The Video
          Use INLINE STYLES to force object-cover
      ----------------------------------------------------- */}
      <video
        ref={videoRef}
        muted
        playsInline
        src={isMobile ? "https://maxo-architecture.cdn.prismic.io/maxo-architecture/aYTkbt0YXLCxVd4O_IMG_6217.MOV" : "/MAXO_1.mp4"}
        style={{
          position: 'fixed',
          top: isMobile ? '-10%' : 0,
          left: 0,
          width: '100%',
          height: isMobile ? '120%' : '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      />

      {/* Persistent dark overlay above video for contrast */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 'calc(-1 * var(--sm-safe-gutter-left, 0px))',
          width: 'calc(100% + var(--sm-safe-gutter-left, 0px))',
          height: '100%',
          backgroundColor: isPreloading ? 'transparent' : 'rgba(0,0,0,0.35)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Full-screen preloader dark overlay */}
      <AnimatePresence>
        {isPreloading && (
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.6)',
              zIndex: 40,
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

      {/* ----------------------------------------------------
          LAYER 3: The "MAXO" Logo & Navbar (Shared Header)
      ----------------------------------------------------- */}
      <SharedHeader isMobile={isMobile} isPreloading={isPreloading} />

      {/* ----------------------------------------------------
          LAYER 4: Main Content
      ----------------------------------------------------- */}
      {!isPreloading && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            position: 'relative',
            zIndex: 20,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingBottom: '80px',
            paddingLeft: '40px'
          }}
        >
        </motion.div>
      )}
    </div>

    {/* Second Section: Modern About Section */}
    <div style={{ position: 'relative', backgroundColor: '#e8e8e8', width: '100%' }}>
      <div style={{ position: 'relative' }}>
        <AboutModern isMobile={isMobile} />
      </div>
    </div>

    {/* Third Section: Work Gallery */}
    <div style={{ width: '100%' }}>
      <WorkGallery />
    </div>

    {/* Fourth Section: Dome Gallery */}
    <div style={{ height: '800px', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
      <DomeGallery overlayBlurColor="#000" />
    </div>

    {/* Fifth Section: Footer */}
    <Footer isMobile={isMobile} />

    </div>
  );
}

// Main App component with router
function AppRoutes() {
  // Disable browser scroll restoration and force manual scroll control
  useEffect(() => {
    // Prevent browser from automatically restoring scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Ensure page starts at top on mount
    window.scrollTo(0, 0);
  }, []);

  // Helper wrapper to include SharedHeader on non-landing pages
  function PageWrapper({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
    
    useEffect(() => {
      // Scroll to top when page loads
      window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
      const update = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }, []);

    return (
      <>
        <SharedHeader isMobile={isMobile} />
        {children}
      </>
    );
  }

  function PrivacyPolicyPage() {
    return (
      <PageWrapper>
        <div style={{ backgroundColor: '#e8e8e8', color: 'black', minHeight: '100vh', padding: '120px 20px 80px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ margin: '0 0 40px 0', fontWeight: 600, fontSize: '2.2rem' }}>Privacy Policy</h1>
            
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '20px' }}>Modern Slavery Statement</h2>
              
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginTop: '32px', marginBottom: '16px' }}>Introduction</h3>
              <p style={{ lineHeight: '1.7', marginBottom: '16px' }}>
                MAXO is committed to conducting business responsibly, ethically, and in full respect of human rights. 
                This statement outlines our approach to preventing modern slavery, forced labour, and human trafficking 
                across our operations and supply chains, in line with globally recognised standards and applicable legislation.
              </p>
              <p style={{ lineHeight: '1.7', marginBottom: '16px' }}>
                This policy has been prepared with the support of BrandBoosters, and all data associated with this policy 
                and related compliance documentation is managed and maintained by BrandBoosters through their digital systems 
                and governance processes.
              </p>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginTop: '32px', marginBottom: '16px' }}>Our Business</h3>
              <p style={{ lineHeight: '1.7', marginBottom: '16px' }}>
                MAXO is a professional services organisation delivering integrated design, digital, and strategic solutions. 
                We work with clients, partners, and suppliers across multiple regions and maintain high standards of integrity 
                in all business activities.
              </p>
              <p style={{ lineHeight: '1.7', marginBottom: '16px' }}>
                This policy applies to all employees, consultants, contractors, freelancers, and third parties working on 
                behalf of MAXO.
              </p>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginTop: '32px', marginBottom: '16px' }}>Commitment to Ethical Practices</h3>
              <p style={{ lineHeight: '1.7', marginBottom: '16px' }}>
                MAXO operates with a zero-tolerance approach to modern slavery and human trafficking. We are committed to:
              </p>
              <ul style={{ lineHeight: '1.7', marginBottom: '16px', paddingLeft: '24px' }}>
                <li>Ethical and transparent business practices</li>
                <li>Respect for freedom of employment and movement</li>
                <li>Fair recruitment with no worker-paid fees</li>
                <li>Prohibition of forced labour and document confiscation</li>
                <li>Respect for freedom of association</li>
              </ul>
              <p style={{ lineHeight: '1.7', marginBottom: '16px' }}>
                We expect the same standards from all suppliers and business partners.
              </p>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginTop: '32px', marginBottom: '16px' }}>Risk and Supply Chain Management</h3>
              <p style={{ lineHeight: '1.7', marginBottom: '16px' }}>
                While the nature of our services presents a low inherent risk, MAXO recognises that modern slavery can exist 
                across global supply chains. We remain vigilant and assess supplier practices to identify and mitigate potential 
                risks where reasonably possible.
              </p>
              <p style={{ lineHeight: '1.7', marginBottom: '16px' }}>
                Our supply chain primarily includes professional and operational service providers such as recruitment, 
                facilities, printing, catering, and travel services.
              </p>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginTop: '32px', marginBottom: '16px' }}>Employment and Workplace Standards</h3>
              <p style={{ lineHeight: '1.7', marginBottom: '16px' }}>
                MAXO is an equal opportunities employer committed to fair treatment, non-discrimination, and safe working 
                conditions. Our internal policies support ethical conduct, transparency, and the ability for individuals to 
                raise concerns without fear of retaliation.
              </p>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginTop: '32px', marginBottom: '16px' }}>Awareness and Responsibility</h3>
              <p style={{ lineHeight: '1.7', marginBottom: '16px' }}>
                We promote ethical awareness through internal communication, onboarding, and ongoing engagement. All individuals 
                working with MAXO are encouraged to act responsibly and report concerns relating to unethical or unlawful conduct.
              </p>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginTop: '32px', marginBottom: '16px' }}>Reporting and Enforcement</h3>
              <p style={{ lineHeight: '1.7', marginBottom: '16px' }}>
                Where concerns relating to modern slavery or human rights violations are identified, MAXO reserves the right to 
                investigate, report to relevant authorities, and suspend or terminate any associated business relationship.
              </p>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginTop: '32px', marginBottom: '16px' }}>Data Management and Policy Ownership</h3>
              <p style={{ lineHeight: '1.7', marginBottom: '16px' }}>
                All policy-related data, compliance records, and associated documentation are managed and maintained by BrandBoosters. 
                BrandBoosters supports MAXO in ensuring that data governance, updates, and policy alignment are handled responsibly 
                and securely in accordance with applicable data protection and regulatory standards.
              </p>
              <p style={{ lineHeight: '1.7', marginBottom: '16px' }}>
                For more information, visit{' '}
                <a href="https://brandboosters.marketing" target="_blank" rel="noopener noreferrer" 
                   style={{ color: '#000', textDecoration: 'underline' }}>
                  Brandboosters.marketing
                </a>.
              </p>
            </section>
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Wrapper components that provide a `navigateTo` helper via `useNavigate`.
  function ContactWithNav() {
    const nav = useNavigate();
    const navigateTo = (page: string) => {
      switch (page) {
        case 'about': nav('/about'); break;
        case 'work': nav('/work'); break;
        case 'future': nav('/future'); break;
        case 'news': nav('/news'); break;
        case 'contact': nav('/contact'); break;
        default: nav('/');
      }
    };
    return <ContactUs navigateTo={navigateTo} />;
  }

  function OurWorkWithNav() {
    return <OurWork />;
  }

  function LegacyProjectsRedirect() {
    const { categoryUid } = useParams();
    const target = categoryUid ? `/work/${categoryUid}` : '/work';
    return <Navigate to={target} replace />;
  }

  function NewsWithNav() {
    const nav = useNavigate();
    const navigateTo = (page: string) => {
      switch (page) {
        case 'about': nav('/about'); break;
        case 'work': nav('/work'); break;
        case 'future': nav('/future'); break;
        case 'news': nav('/news'); break;
        case 'contact': nav('/contact'); break;
        default: nav('/');
      }
    };
    return <News navigateTo={navigateTo} />;
  }

  function FutureWithNav() {
    const nav = useNavigate();
    const navigateTo = (page: string) => {
      switch (page) {
        case 'about': nav('/about'); break;
        case 'work': nav('/work'); break;
        case 'future': nav('/future'); break;
        case 'news': nav('/news'); break;
        case 'contact': nav('/contact'); break;
        default: nav('/');
      }
    };
    return <FutureThinking navigateTo={navigateTo} />;
  }

  // Legacy pages are kept in the repo, but routing is now Prismic-driven under /work/:categoryUid

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<MaxoLanding />} />
        <Route path="/about" element={<PageWrapper><AboutUs /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactWithNav /></PageWrapper>} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/work" element={<PageWrapper><OurWorkWithNav /></PageWrapper>} />
        <Route path="/work/:categoryUid" element={<WorkCategoryPage />} />
        <Route path="/work/:categoryUid/:projectUid" element={<WorkProjectPage />} />
        <Route path="/projects" element={<Navigate to="/work" replace />} />
        <Route path="/projects/:categoryUid" element={<LegacyProjectsRedirect />} />
        <Route path="/allproject" element={<Navigate to="/work" replace />} />
        <Route path="/news" element={<PageWrapper><NewsWithNav /></PageWrapper>} />
        <Route path="/future" element={<PageWrapper><FutureWithNav /></PageWrapper>} />
        <Route path="/future/insight/:insightId" element={<PageWrapper><ResearchInsightPage /></PageWrapper>} />
        <Route path="/architect" element={<PageWrapper><ArchitectContact /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}


import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';
import StaggeredMenu from './StaggeredMenu';
import SEO from './SEO';

export default function News({ navigateTo }: { navigateTo: (page: string) => void }) {
  const [isMobile, setIsMobile] = useState(() => (typeof window === 'undefined' ? false : window.innerWidth <= 768));

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const heroBgUrl = '/future-contact-bg.png';

  const menuItems = [
    { label: 'About', ariaLabel: 'About', link: '/about' },
    { label: 'Our Work', ariaLabel: 'Our Work', link: '/work' },
    { label: 'Future Thinking', ariaLabel: 'Future Thinking', link: '/future' },
    { label: 'News', ariaLabel: 'News', link: '/news' },
    { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
  ];

  // will be uploading soon

  return (
    <div style={{ backgroundColor: '#e8e8e8', color: 'black', minHeight: '100vh' }}>
      <SEO 
        title="News & Updates | MAXO Architects & Designers"
        description="Stay updated with the latest news, projects, and insights from MAXO Architects & Designers. Discover our recent work and architectural innovations."
        keywords="MAXO news, architecture updates, design news, architectural projects, MAXO announcements, architecture firm news"
        url="https://www.maxo.co.in/news"
        image="https://www.maxo.co.in/maxo-logo.jpeg"
      />
      
      {/* Navigation */}
      <StaggeredMenu 
        items={menuItems} 
        position="left"
        colors={['#fff', '#fff', '#fff']}
        menuButtonColor="white"
        openMenuButtonColor="black"
        accentColor="#888"
      />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          padding: isMobile ? '96px 20px 56px' : '120px 40px 80px',
          textAlign: 'center',
          color: 'white',
         backgroundImage: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("' + heroBgUrl + '")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            fontSize: isMobile ? '2.6rem' : '4rem',
            fontWeight: 300,
            lineHeight: 1.1,
            margin: '0 0 30px 0'
          }}
        >
          Latest <span style={{ fontWeight: 'bold' }}>News</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          Stay updated with the latest developments, insights, and achievements 
          from MAXO and the world of innovative design.
        </motion.p>
      </motion.section>

      {/* Coming Soon Message */}
      <section style={{ padding: isMobile ? '50px 20px' : '100px 40px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            padding: isMobile ? '40px 30px' : '60px 50px',
            borderRadius: '20px',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <h2 style={{
            fontSize: isMobile ? '1.8rem' : '2.4rem',
            fontWeight: '600',
            margin: '0 0 20px 0',
            color: 'black'
          }}>
            Will be uploading soon
          </h2>
        </motion.div>
      </section>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}

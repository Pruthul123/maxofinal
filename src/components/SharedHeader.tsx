import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StaggeredMenu from './StaggeredMenu';

export default function SharedHeader({ isMobile, isPreloading = false }: { isMobile: boolean, isPreloading?: boolean }) {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsMenuVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 50 && !isMenuOpen) {
        setIsMenuVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsMenuVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const menuItems = [
    { label: 'About', ariaLabel: 'About', link: '/about' },
    { label: 'Our Work', ariaLabel: 'Our Work', link: '/work' },
    { label: 'Future Thinking', ariaLabel: 'Future Thinking', link: '/future' },
    { label: 'News', ariaLabel: 'News', link: '/news' },
    { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
  ];

  return (
    <>
      {/* Logo */}
      <div style={{ 
        position: 'fixed', 
        zIndex: 60, 
        pointerEvents: 'none',
        top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', justifyContent: 'center'
      }}>
        <motion.div
          initial={false}
          animate={{
            top: isPreloading ? '50%' : (isMenuVisible ? '30px' : '-150px'),
            y: isPreloading ? '-50%' : '0%',
            width: isPreloading ? (isMobile ? '200px' : '400px') : '120px'
          }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'absolute', pointerEvents: 'auto', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img src="/maxo logo.png" alt="MAXO" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </motion.div>
      </div>

      {/* Menu */}
      <>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '20px',
            zIndex: 999,
            pointerEvents: isPreloading ? 'none' : 'auto'
          }}
          onMouseEnter={() => {
            if (!isPreloading) setIsMenuVisible(true);
          }}
        />

        <motion.div
          initial={false}
          animate={{
            opacity: isPreloading ? 0 : 1,
            x: isPreloading ? -24 : 0
          }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: isPreloading ? 0 : 0.15 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 20000,
            pointerEvents: isPreloading ? 'none' : 'auto'
          }}
        >
          <StaggeredMenu
            items={menuItems}
            socialItems={[
              { label: 'Instagram', link: 'https://instagram.com' },
              { label: 'LinkedIn', link: 'https://linkedin.com' },
              { label: 'WhatsApp', link: 'https://wa.me/+' }
            ]}
            position="left"
            colors={['#fff', '#fff', '#fff']}
            menuButtonColor="black"
            openMenuButtonColor="black"
            accentColor="#888"
            onMenuOpen={() => setIsMenuOpen(true)}
            onMenuClose={() => setIsMenuOpen(false)}
          />
        </motion.div>
      </>
    </>
  );
}
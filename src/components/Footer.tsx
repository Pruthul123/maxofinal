import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Footer({ navigateTo, isMobile }: { navigateTo?: (page: string) => void, isMobile?: boolean }) {
  const [autoIsMobile, setAutoIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  });

  useEffect(() => {
    if (isMobile !== undefined) return;
    const onResize = () => setAutoIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMobile]);

  const mobile = isMobile ?? autoIsMobile;

  return (
    <footer style={{ 
      position: 'relative', 
      zIndex: 60, 
      backgroundColor: '#000000', 
      color: '#ffffff', 
      paddingTop: mobile ? '80px' : '128px', 
      paddingBottom: '48px', 
      paddingLeft: '24px', 
      paddingRight: '24px', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      minHeight: '80vh' 
    }}>
      <div style={{ 
        display: mobile ? 'flex' : 'grid', 
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr', 
        gap: mobile ? '48px' : '64px', 
        marginBottom: '48px' 
      }}>
        <div>
          <h5 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', color: '#666', marginBottom: '24px', textTransform: 'uppercase', margin: 0 }}>Contact</h5>
          <p style={{ fontSize: mobile ? '18px' : '20px', fontWeight: 300, lineHeight: 1.8, margin: 0 }}>info@maxo.co.in<br />+91 92270 01016</p>
        </div>
        <div style={{ textAlign: mobile ? 'left' : 'right' }}>
          <h5 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', color: '#666', marginBottom: '24px', textTransform: 'uppercase', margin: 0 }}>Headquarters</h5>
          <p style={{ fontSize: mobile ? '18px' : '20px', fontWeight: 300, lineHeight: 1.8, margin: 0 }}>1215, Maple Trade Centre,<br /> Thaltej, Ahmedabad,<br />Gujarat, India 380052</p>
        </div>
      </div>
      <motion.div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 'auto', paddingTop: '32px' }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <motion.h1 
          style={{ fontSize: mobile ? '14vw' : 'clamp(4rem, 12vw, 16rem)', lineHeight: 0.95, fontWeight: 900, letterSpacing: '-0.02em', margin: 0, cursor: 'pointer' }} 
          whileHover={{ color: '#999', transition: { duration: 0.3 } }}
          onClick={() => navigateTo?.('contact')}
        >
          LET'S TALK.
        </motion.h1>
      </motion.div>
      <div style={{ 
        display: mobile ? 'flex' : 'grid', 
        flexDirection: 'column-reverse',
        gridTemplateColumns: '1fr 1fr', 
        gap: '32px', 
        marginTop: '48px', 
        paddingTop: '32px', 
        borderTop: '1px solid rgba(255,255,255,0.1)', 
        fontSize: '12px', 
        fontWeight: 700, 
        letterSpacing: '0.1em', 
        textTransform: 'uppercase' 
      }}>
        <p style={{ margin: 0, color: '#666' }}>© 2026 MAXO Architects.</p>
        <div style={{ display: 'flex', gap: '32px', justifyContent: mobile ? 'flex-start' : 'flex-end' }}>
          <motion.a 
            href="https://www.instagram.com/maxo.co.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ cursor: 'pointer', color: '#666', textDecoration: 'none' }} 
            whileHover={{ color: '#ffffff', transition: { duration: 0.2 } }}
          >
            Instagram
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/company/maxo12/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ cursor: 'pointer', color: '#666', textDecoration: 'none' }} 
            whileHover={{ color: '#ffffff', transition: { duration: 0.2 } }}
          >
            LinkedIn
          </motion.a>
          <motion.a 
            href="/privacy" 
            style={{ cursor: 'pointer', color: '#666', textDecoration: 'none' }} 
            whileHover={{ color: '#ffffff', transition: { duration: 0.2 } }}
          >
            Privacy
          </motion.a>
        </div>
      </div>
    </footer>
  );
}

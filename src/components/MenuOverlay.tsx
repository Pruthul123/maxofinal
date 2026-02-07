import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

type MenuItem = {
  label: string;
  href: string;
};

type MenuOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Close menu on route change is handled by the Link components

  // Detect mobile viewport
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const menuItems: MenuItem[] = [
    { label: 'About', href: '/about' },
    { label: 'Our Work', href: '/work' },
    { label: 'Future Thinking', href: '/future' },
    { label: 'News', href: '/news' },
    { label: 'Contact', href: '/contact' },
  ];

  

  // Handle navigation
  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 80,
            overflow: 'hidden',
          }}
        >
          {/* Strips */}
          {Array.from({ length: isMobile ? 5 : 7 }).map((_, i, arr) => {
            const h = 100 / arr.length;
            const delay = 0.05 * i;
            return (
              <motion.div
                key={i}
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `${i * h}%`,
                  height: `${h}%`,
                  background: '#ffffff',
                  boxShadow: '0 -8px 24px rgba(0,0,0,0.08), 0 12px 24px rgba(0,0,0,0.12)',
                  transform: 'translateZ(0)',
                }}
              />
            );
          })}

          {/* Content layer */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 81,
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              padding: isMobile ? '24px 20px' : '80px 64px',
              gap: isMobile ? 24 : 40,
            }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: isMobile ? '20px' : '32px',
                right: isMobile ? '20px' : '32px',
                background: 'transparent',
                border: 'none',
                color: '#111',
                cursor: 'pointer',
                zIndex: 82,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={isMobile ? 28 : 32} />
            </motion.button>

            {/* Left: Menu items */}
            <div
              style={{
                flex: isMobile ? 'none' : '0 0 45%',
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? 12 : 18,
              }}
            >
                {menuItems.map((item, _idx) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.href);
                  }}
                  style={{
                    color: '#111',
                    textDecoration: 'none',
                    fontSize: isMobile ? 24 : 42,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    lineHeight: 1.2,
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right column removed: photo tiles intentionally removed */}
          </div>

          {/* Click anywhere to close */}
          <div
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, zIndex: 79, cursor: 'pointer' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

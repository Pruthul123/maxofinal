import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type MenuItemType = {
  label: string;
  href: string;
  bgImage: string;
};

type DarkLuxuryMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
};

const menuItems: MenuItemType[] = [
  {
    label: 'About',
    href: '/about',
    bgImage: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(20,20,30,0.6)), url(/team-about.jpg)'
  },
  {
    label: 'Our Work',
    href: '/work',
    bgImage: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(20,20,30,0.6)), url(/projects-work.jpg)'
  },
  {
    label: 'Future Thinking',
    href: '/future',
    bgImage: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(20,20,30,0.6)), url(/future-thinking.jpg)'
  },
  {
    label: 'News',
    href: '/news',
    bgImage: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(20,20,30,0.6)), url(/news-press.jpg)'
  },
  {
    label: 'Contact',
    href: '/contact',
    bgImage: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(20,20,30,0.6)), url(/contact-studio.jpg)'
  }
];

export default function DarkLuxuryMenu({ isOpen, onClose, onNavigate }: DarkLuxuryMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const handleStripClick = (href: string) => {
    onNavigate(href);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-40"
          onClick={onClose}
        >
          {/* Background Image Layer (fades in on hover) */}
          <motion.div
            className="absolute inset-0 opacity-0 bg-cover bg-center"
            animate={{
              backgroundImage: hoveredIndex !== null ? menuItems[hoveredIndex].bgImage : 'none',
              opacity: hoveredIndex !== null ? 1 : 0
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          />

          {/* Content Layer */}
          <motion.div
            className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24"
            onClick={(e) => e.stopPropagation()}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-8 right-8 text-white hover:opacity-70 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={32} />
            </motion.button>

            {/* Menu Items as Strips */}
            {menuItems.map((item, idx) => (
              <motion.div
                key={item.href}
                className="py-8 md:py-10 lg:py-12 border-b border-white/10 cursor-pointer overflow-hidden min-h-24 flex items-center"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleStripClick(item.href)}
              >
                {/* Strip Text with Hover Effect */}
                <motion.div
                  className="flex items-center gap-6 w-full"
                  animate={
                    hoveredIndex === idx
                      ? { x: 20, opacity: 1 }
                      : hoveredIndex !== null
                      ? { x: 0, opacity: 0.3 }
                      : { x: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <span className="text-5xl md:text-6xl lg:text-8xl font-bold uppercase text-white tracking-tighter flex-grow">
                    {item.label}
                  </span>

                  {/* Hover Arrow Indicator */}
                  <motion.div
                    animate={hoveredIndex === idx ? { x: 10, opacity: 1 } : { x: -10, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white text-5xl flex-shrink-0"
                  >
                    →
                  </motion.div>
                </motion.div>

                {/* Hover Line Accent */}
                <motion.div
                  className="h-1 bg-white mt-4"
                  initial={{ scaleX: 0 }}
                  animate={hoveredIndex === idx ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{ originX: 0 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Subtle Gradient Overlay (top & bottom) */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

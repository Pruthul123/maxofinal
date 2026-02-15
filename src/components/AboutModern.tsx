import { useRef } from 'react';
import { motion } from 'framer-motion';

import CardSwap, { Card } from './CardSwap';

// --- Easing curves for that premium feel ---
const transition = { duration: 1.2, ease: [0.33, 1, 0.68, 1] as const };

// --- VARIANTS FOR TEXT MASKING REVEAL ---
const maskContainerVariant = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
  }
};

const maskChildVariant = {
  hidden: { y: "110%", opacity: 0 },
  visible: { 
    y: "0%", 
    opacity: 1,
    transition: transition
  }
};

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

export default function AboutModern({ isMobile }: { isMobile: boolean }) {
  const containerRef = useRef(null);
  
  return (
    <section ref={containerRef} style={{
      backgroundColor: 'transparent', // Changed from #ffffff to transparent
      color: '#000000',
      padding: isMobile ? '60px 20px' : '128px 96px',
      overflow: 'hidden',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      position: 'relative',
      minHeight: isMobile ? '100vh' : 'auto',
      display: isMobile ? 'flex' : 'block',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '5fr 7fr',
          gap: isMobile ? '40px' : '96px',
          alignItems: 'flex-start'
        }}>
          
          {/* --- LEFT COLUMN: CARD SWAP --- */}
          <div style={{ position: 'relative', height: isMobile ? '340px' : '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <CardSwap width={isMobile ? 360 : 400} height={isMobile ? 200 : 500} cardDistance={40} verticalDistance={50}>
               <Card style={{ backgroundImage: "url('/OPTION_2.png')" }} />
               <Card style={{ backgroundImage: "url('/Scene%208_2.png')" }} />
               <Card style={{ backgroundImage: "url('/SFH_Evening_View_1.jpg')" }} />
               <Card style={{ backgroundImage: "url('/sfh2.png')" }} />
             </CardSwap>
          </div>

          {/* --- RIGHT COLUMN: STAGGERED TEXT REVEAL --- */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', paddingTop: isMobile ? '0' : '32px' }}>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={maskContainerVariant}
              style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            >
                {/* Label */}
                <motion.div variants={fadeInUpVariant} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '1px', backgroundColor: '#000' }}></div>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b7280' }}>Who We Are</span>
                </motion.div>

                {/* Headline */}
                <h2 style={{ 
                  fontSize: isMobile ? '40px' : '72px', 
                  fontWeight: 300, 
                  lineHeight: 0.95, 
                  letterSpacing: '-0.025em',
                  margin: 0
                }}>
                  <div style={{ overflow: 'hidden' }}>
                    <motion.div variants={maskChildVariant}>About</motion.div>
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <motion.div variants={maskChildVariant} style={{ fontWeight: 'bold' }}>MAXO</motion.div>
                  </div>
                </h2>

                {/* Description */}
                <div style={{ 
                  fontSize: isMobile ? '16px' : '24px', 
                  lineHeight: 1.6, 
                  color: '#4b5563', 
                  maxWidth: '672px', 
                  fontWeight: 300 
                }}>
                  <div style={{ overflow: 'hidden' }}>
                     <motion.div variants={maskChildVariant}>
                      We are a forward-thinking architecture studio committed to transforming spaces into meaningful experiences.
                     </motion.div>
                  </div>
                  <div style={{ overflow: 'hidden', marginTop: '8px' }}>
                     <motion.div variants={maskChildVariant}>
                      Blending <span style={{ color: '#000', fontWeight: 500 }}>innovation</span> with timeless aesthetics.
                     </motion.div>
                  </div>
                </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

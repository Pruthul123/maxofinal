import { motion } from 'framer-motion';

const articles = [
  { date: 'OCT 12, 2025', category: 'Awards', title: 'MAXO Wins Pritzker Prize for Sustainability' },
  { date: 'SEP 08, 2025', category: 'Thinking', title: 'The Future of Vertical Living: A 2050 Vision' },
  { date: 'AUG 21, 2025', category: 'Press', title: 'Featured in Architectural Digest: The Glass House' },
  { date: 'JUL 15, 2025', category: 'Exhibition', title: 'London Design Week: "Fluid Structures"' }
];

export default function NewsSection({ isMobile }: { isMobile?: boolean }) {
  return (
    <section style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 50, 
      backgroundColor: '#f8f8f8', 
      color: '#000000', 
      paddingTop: isMobile ? '80px' : '128px', 
      paddingBottom: isMobile ? '80px' : '128px', 
      paddingLeft: '24px', 
      paddingRight: '24px' 
    }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: isMobile ? '48px' : '64px' }}>
        <div style={{ width: '12px', height: '12px', backgroundColor: 'black', borderRadius: '50%' }} />
        <h4 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>Latest Journal</h4>
      </div>

      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        {articles.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '48px', paddingBottom: '48px', cursor: 'pointer', paddingLeft: '16px', paddingRight: '16px' }}
            whileHover={{ backgroundColor: '#e8e8e8', transition: { duration: 0.3 } }}
          >
            <div style={{ 
              display: isMobile ? 'flex' : 'grid', 
              flexDirection: 'column',
              gridTemplateColumns: '1fr 2fr 1fr', 
              gap: isMobile ? '16px' : '32px', 
              alignItems: isMobile ? 'flex-start' : 'center' 
            }}>
              
              {/* Left: Meta Data */}
              <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '16px', alignItems: isMobile ? 'center' : 'flex-start' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#999' }}>{item.date}</span>
                <span style={{ paddingLeft: '12px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '20px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-block', width: 'fit-content' }}>
                  {item.category}
                </span>
              </div>

              {/* Middle: Title */}
              <motion.h3 
                style={{ fontSize: isMobile ? '1.5rem' : 'clamp(1.5rem, 2vw, 2rem)', fontWeight: 300, margin: 0 }}
                whileHover={{ x: isMobile ? 0 : 16, transition: { duration: 0.3 } }}
              >
                {item.title}
              </motion.h3>

              {/* Right: Arrow */}
              <div style={{ fontSize: '20px', display: isMobile ? 'none' : 'flex', justifyContent: 'flex-end' }}>→</div>
            </div>
          </motion.div>
        ))}
        {/* Closing Line */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }} />
      </div>

    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Menu, Search } from 'lucide-react';

// --- ANIMATION SETTINGS ---
const drawSpring = { type: 'spring', stiffness: 50, damping: 20, restDelta: 0.001 } as const;

// --- SVG LAYERS ---
const MapLayer = ({ progress }: { progress: number }) => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
    <motion.path d="M-200 800 L400 300 L1000 800 M0 700 L400 300 L800 700 M100 600 L400 300 L700 600" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" animate={{ pathLength: progress }} transition={drawSpring} />
    <motion.path d="M-100 600 L900 600 M0 500 L800 500 M200 400 L600 400" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" animate={{ pathLength: progress }} transition={drawSpring} />
  </motion.g>
);

const BuildingOutline = ({ progress }: { progress: number }) => (
  <motion.g>
    <motion.path d="M400 150 L280 220 L280 650 L400 720 L520 650 L520 220 Z" stroke="white" strokeWidth="2" fill="none" animate={{ pathLength: progress }} transition={drawSpring} />
    <motion.path d="M400 150 L400 720" stroke="white" strokeWidth="1" fill="none" animate={{ pathLength: progress }} transition={drawSpring} />
    <motion.path d="M520 550 L620 600 L620 700 L520 650" stroke="white" strokeWidth="2" fill="none" animate={{ pathLength: Math.max(0, (progress - 0.3) * 1.5) }} transition={drawSpring} />
    <motion.path d="M400 150 L280 220 L400 280 L520 220 Z" stroke="white" strokeWidth="1.5" fill="none" animate={{ pathLength: progress }} transition={drawSpring} />
  </motion.g>
);

const BuildingDetails = ({ progress }: { progress: number }) => {
  const floors = Array.from({ length: 25 }, (_, i) => i);
  return (
    <motion.g>
      {floors.map(i => <motion.line key={`L-${i}`} x1={280} y1={220 + i * 18} x2={400} y2={280 + i * 18} stroke="rgba(255,255,255,0.25)" strokeWidth="1" animate={{ pathLength: Math.min(1, Math.max(0, progress * 1.5 - (i * 0.05))) }} transition={drawSpring} />)}
      {floors.map(i => <motion.line key={`R-${i}`} x1={400} y1={280 + i * 18} x2={520} y2={220 + i * 18} stroke="rgba(255,255,255,0.25)" strokeWidth="1" animate={{ pathLength: Math.min(1, Math.max(0, progress * 1.5 - (i * 0.05))) }} transition={drawSpring} />)}
    </motion.g>
  );
};

// --- MAIN COMPONENT ---
export default function ArchitectContact() {
  const [mapProgress, setMapProgress] = useState(0);
  const [outlineProgress, setOutlineProgress] = useState(0);
  const [detailProgress, setDetailProgress] = useState(0);
  
  // Responsive State
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNameChange = (e: any) => setMapProgress(Math.min(e.target.value.length / 8, 1));
  const handleTypeChange = (e: any) => setOutlineProgress(e.target.value !== "" ? 1 : 0);
  const handleBudgetChange = (e: any) => setDetailProgress(Math.min(e.target.value.length / 4, 1));

  // Dynamic Styles
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#030610',
    color: 'white',
    display: 'flex',
    // SWITCH LAYOUT BASED ON SCREEN SIZE
    flexDirection: isMobile ? 'column' as const : 'row' as const, 
    fontFamily: 'var(--font-primary)',
    overflow: isMobile ? 'auto' : 'hidden'
  };

  const canvasContainerStyle: React.CSSProperties = {
    width: isMobile ? '100%' : '55%',
    height: isMobile ? '50vh' : '100vh', // Half screen on mobile
    position: 'relative' as const,
    borderRight: isMobile ? 'none' : '1px solid #1f2937',
    borderBottom: isMobile ? '1px solid #1f2937' : 'none',
    backgroundColor: '#050a14',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  };

  const formContainerStyle: React.CSSProperties = {
    width: isMobile ? '100%' : '45%',
    height: isMobile ? 'auto' : '100vh',
    minHeight: isMobile ? '50vh' : 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '30px 20px' : '40px',
    backgroundColor: '#030610'
  };

  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    backgroundColor: 'transparent',
    border: '1px solid #2d3748',
    borderRadius: '6px',
    padding: '14px 16px',
    fontSize: '16px',
    color: 'white',
    outline: 'none',
    marginTop: '8px'
  };

  return (
    <>
      <style>{`
        body { margin: 0; background: #030610; }
        input:focus, select:focus { border-color: white !important; }
      `}</style>

      {/* FIXED NAVBAR FOR BLUEPRINT PAGE */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', justifyContent: 'space-between', padding: isMobile ? '15px 20px' : '20px 40px',
        pointerEvents: 'none'
      }}>
        <div style={{ pointerEvents: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Menu color="white" size={24} />
          {/* Hide Menu Text on Mobile */}
          {!isMobile && <span style={{fontSize:'12px', fontWeight:'bold', color:'white', letterSpacing:'2px'}}>MENU</span>}
        </div>
        <div style={{ pointerEvents: 'auto' }}>
          <Search color="white" size={24} />
        </div>
      </nav>

      <div style={containerStyle}>
        
        {/* --- SECTION 1: BLUEPRINT VISUALIZATION --- */}
        <div style={canvasContainerStyle}>
          {/* Status Overlay */}
          <div style={{ position: 'absolute', top: isMobile ? '80px' : '40px', left: isMobile ? '20px' : '40px', zIndex: 10 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'white', margin: 0 }}>Project Visualization</h3>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '4px 0 0 0' }}>
              Status: <span style={{ color: detailProgress === 1 ? '#4ade80' : '#6b7280' }}>
                {detailProgress === 1 ? 'COMPLETE' : 'ACTIVE'}
              </span>
            </p>
          </div>

          <svg viewBox="0 0 800 800" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a2233" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <MapLayer progress={mapProgress} />
            <BuildingOutline progress={outlineProgress} />
            <BuildingDetails progress={detailProgress} />
          </svg>
        </div>

        {/* --- SECTION 2: FORM INPUTS --- */}
        <div style={formContainerStyle}>
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <div style={{ marginBottom: '32px' }}>
              <h1 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 500, marginBottom: '8px', letterSpacing: '-0.02em' }}>
                Let's Build.
              </h1>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Fill in details to generate blueprint.</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 500 }}>Name / Company</label>
                <input type="text" onChange={handleNameChange} style={inputStyle} placeholder="Acme Architects" />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 500 }}>Project Type</label>
                <div style={{ position: 'relative' }}>
                  <select onChange={handleTypeChange} style={{ ...inputStyle, appearance: 'none' }}>
                    <option value="" disabled selected>Choose Type...</option>
                    <option value="tower" style={{color:'black'}}>Commercial Tower</option>
                  </select>
                  <ArrowRight size={16} style={{ position: 'absolute', right: '16px', top: '55%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 500 }}>Est. Budget</label>
                <input type="text" onChange={handleBudgetChange} style={inputStyle} placeholder="150M" />
              </div>

              <button style={{ 
                marginTop: '16px', padding: '16px', backgroundColor: '#e8e8e8', color: 'black', fontWeight: 600, 
                fontSize: '0.85rem', textTransform: 'uppercase', border: 'none', width: '100%', borderRadius: '6px'
              }}>
                Initialize Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Orb } from './TiltedCard';
import StaggeredMenu from './StaggeredMenu';
import SEO from './SEO';
import './AboutUs.css';
import Footer from './Footer';

// Easing curves for premium feel
const transition = { duration: 1.2, ease: [0.33, 1, 0.68, 1] as const };

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const maskReveal = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition }
};

const lineReveal = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] as const } }
};

// Recommendations data
const recommendationsData = [
  {
    name: "Dhruval Shah",
    company: "Zaha Hadid Architects",
    image: "https://i.pinimg.com/736x/c1/73/07/c17307b4b023eb5f22cc1966e43f477f.jpg",
    companyLogo: "https://iili.io/fU6BbAx.jpg"
  },
  {
    name: "Lydia Kyprioti",
    company: "BIG - Bjarke Ingels Group",
    image: "https://i.pinimg.com/736x/8f/c4/08/8fc408b601f0b00f2cc54aaa1672adf8.jpg",
    companyLogo: "https://iili.io/fU6BmwQ.jpg"
  },
  {
    name: "Sashank Pilla",
    company: "Foster + Partners",
    image: "https://i.pinimg.com/736x/75/c4/ca/75c4ca1390fc7c0d6e6663129cad965d.jpg",
    companyLogo: "https://iili.io/fU6BZ8b.jpg"
  },
  {
    name: "Shivani Rastogi",
    company: "Skidmore, Owings & Merrill (SOM)",
    image: "https://images.prismic.io/maxo-architecture/aYTq0d0YXLCxVd9V_sivani.jpg?auto=format,compress",
    companyLogo: "https://images.prismic.io/maxo-architecture/aYTrKd0YXLCxVd9p_sivani2.jpg?auto=format,compress"
  },
  {
    name: "Charalampos (Pampos) Ioannou",
    company: "Eleni Tsirintani Landscape Architecture Studio",
    image: "https://images.prismic.io/maxo-architecture/aYTq0N0YXLCxVd9U_charlos.jpg?auto=format,compress",
    companyLogo: "https://iili.io/fU6BZ8b.jpg"
  },
  {
    name: "Lorraine Lau",
    company: "Gensler",
    image: "https://images.prismic.io/maxo-architecture/aYTqz90YXLCxVd9T_lo.jpg?auto=format,compress",
    companyLogo: "https://images.prismic.io/maxo-architecture/aYTsG90YXLCxVd-F_3.jpg?auto=format,compress"
  },
  {
    name: "Scott Lenton",
    company: "Skidmore, Owings & Merrill (SOM)",
    image: "https://images.prismic.io/maxo-architecture/aYTqzt0YXLCxVd9R_scoot.jpg?auto=format,compress",
    companyLogo: "https://images.prismic.io/maxo-architecture/aYTrKd0YXLCxVd9p_sivani2.jpg?auto=format,compress"
  },
  {
    name: "Zoe Su",
    company: "Benoy",
    image: "https://images.prismic.io/maxo-architecture/aYTqzd0YXLCxVd9Q_zoe.jpg?auto=format,compress",
    companyLogo: "https://images.prismic.io/maxo-architecture/aYTskt0YXLCxVd-h_4.jpg?auto=format,compress"
  },
  {
    name: "Lola Gu",
    company: "Benoy",
    image: "https://images.prismic.io/maxo-architecture/aYTqzN0YXLCxVd9P_lola.jpg?auto=format,compress",
    companyLogo: "https://images.prismic.io/maxo-architecture/aYTskt0YXLCxVd-h_4.jpg?auto=format,compress"
  }
];

// Recommendation Card Component
interface RecommendationCardProps {
  name: string;
  company: string;
  image: string;
  companyLogo: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  name,
  company,
  image,
  companyLogo
}) => (
  <div
    style={{
      background: '#fff',
      padding: window.innerWidth < 768 ? '1.5rem' : '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0',
      minWidth: window.innerWidth < 768 ? '280px' : '350px',
      flex: '0 0 auto'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
      <img 
        src={image} 
        alt={name}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          objectFit: 'cover'
        }}
      />
      <div>
        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#333', marginBottom: '0.25rem' }}>
          {name}
        </h4>
      </div>
    </div>

    {/* Company Box */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 0.75rem',
      background: '#f8f9fa',
      borderRadius: '6px',
      marginBottom: '1rem',
      border: '1px solid #e9ecef'
    }}>
      <img 
        src={companyLogo} 
        alt={company}
        style={{ width: '20px', height: '20px', borderRadius: '4px', objectFit: 'contain' }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
      <span style={{ fontSize: '0.8rem', color: '#666', fontWeight: '500' }}>{company}</span>
    </div>

    <a 
      href="https://www.linkedin.com/in/divya-patel-20/details/recommendations/?detailScreenTabIndex=0"
      target="_blank"
      rel="noopener noreferrer"
      style={{ 
        fontSize: '0.95rem',
        color: '#0077B5',
        textDecoration: 'none',
        fontWeight: '500',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px'
      }}
    >
      View Recommendation
      <ArrowUpRight size={14} />
    </a>
  </div>
);

// Infinite Carousel Component
interface CarouselProps {
  items: typeof recommendationsData;
}

const InfiniteCarousel: React.FC<CarouselProps> = ({ items }) => {
  const x = useMotionValue(0);
  const isMobile = window.innerWidth < 768;
  const cardWidth = isMobile ? 280 : 350;
  const gap = isMobile ? 16 : 32;
  const itemWidth = cardWidth + gap;
  const totalWidth = items.length * itemWidth;

  // Duplicate items array for seamless loop
  const duplicatedItems = [...items, ...items];
  const containerWidth = duplicatedItems.length * itemWidth;

  const isDraggingRef = useRef(false);
  const lastAnimationTimeRef = useRef(Date.now());

  // Auto-scroll animation
  useAnimationFrame(() => {
    if (isDraggingRef.current) return;

    const now = Date.now();
    const elapsed = now - lastAnimationTimeRef.current;
    lastAnimationTimeRef.current = now;

    // Auto-scroll at 50px per second
    const movePerFrame = (50 / 1000) * elapsed;
    let newX = x.get() - movePerFrame;

    // Reset position seamlessly when halfway through
    if (newX <= -totalWidth) {
      newX += totalWidth;
    }

    x.set(newX);
  });

  const handleDragStart = () => {
    isDraggingRef.current = true;
    lastAnimationTimeRef.current = Date.now();
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    lastAnimationTimeRef.current = Date.now();

    // Snap to grid position
    const currentX = x.get();
    const snappedX = Math.round(currentX / itemWidth) * itemWidth;
    
    // Ensure we stay within bounds and reset seamlessly
    let finalX = snappedX;
    if (finalX <= -totalWidth) {
      finalX += totalWidth;
    } else if (finalX > 0) {
      finalX -= totalWidth;
    }

    x.set(finalX);
  };

  return (
    <div style={{ 
      overflow: 'hidden',
      width: '100%',
      position: 'relative'
    }}>
      <motion.div 
        style={{ 
          display: 'flex', 
          gap: isMobile ? '1rem' : '2rem',
          x
        }}
        drag="x"
        dragElastic={0.2}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragConstraints={{ left: -containerWidth * 0.5, right: 0 }}
      >
        {duplicatedItems.map((rec, idx) => (
          <RecommendationCard
            key={`${rec.name}-${idx}`}
            name={rec.name}
            company={rec.company}
            image={rec.image}
            companyLogo={rec.companyLogo}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default function AboutUs() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const storyRef = useRef(null);

  const navigate = useNavigate();
  const navigateTo = (page: string) => {
    navigate(page.startsWith('/') ? page : `/${page}`);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"]
  });

  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.8], [1, 1.1]);
  const heroTextY = useTransform(heroProgress, [0, 0.8], [0, 100]);
  
  void scrollYProgress;
  void storyProgress;

  const values = [
    {
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge design solutions that redefine architectural possibilities."
    },
    {
      title: "Sustainability",
      description: "Creating environmentally conscious spaces that harmonize with nature and reduce ecological footprint."
    },
    {
      title: "Excellence",
      description: "Delivering exceptional quality in every project through meticulous attention to detail."
    }
  ];

  const menuItems = [
    { label: 'About', ariaLabel: 'About', link: '/about' },
    { label: 'Our Work', ariaLabel: 'Our Work', link: '/work' },
    { label: 'Future Thinking', ariaLabel: 'Future Thinking', link: '/future' },
    { label: 'News', ariaLabel: 'News', link: '/news' },
    { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
  ];

  return (
    <div ref={containerRef} className="about-container">
      <SEO 
        title="About MAXO | Divya Patel - Founder & Principal Architect"
        description="Meet Divya Patel, founder of MAXO Architects & Designers. With experience at Bartlett School of Architecture and Benoy London, we bring global design expertise and innovation to every project."
        keywords="Divya Patel architect, MAXO founder, Bartlett School of Architecture, Benoy London, architectural firm about, architecture team"
        url="https://maxo.co.in/about"
        image="https://maxo.co.in/founder.jpeg"
      />
      
      <StaggeredMenu 
        items={menuItems} 
        position="left"
        colors={['#fff', '#fff', '#fff']}
        menuButtonColor="white"
        openMenuButtonColor="black"
        accentColor="#888"
      />

      {/* Hero Section */}
      <section ref={heroRef} className="about-hero">
        <motion.div
          className="about-hero-bg"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <Orb hue={220} hoverIntensity={0.3} rotateOnHover={true} forceHoverState={false} />
        </motion.div>

        <div className="about-hero-gradient" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="about-hero-content"
          style={{ y: heroTextY }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="about-scroll-indicator"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="about-scroll-line"
            />
            <span className="about-scroll-text">Scroll</span>
          </motion.div>
          
          <motion.p variants={fadeInUp} className="about-hero-subtitle">
           <h3>About MAXO</h3>
          </motion.p>

          <div className="about-hero-title-wrapper">
            <motion.h1 variants={maskReveal} className="about-hero-title">
              Crafting Spaces
            </motion.h1>
          </div>

          <div className="about-hero-title-wrapper">
            <motion.h1 variants={maskReveal} className="about-hero-title">
              That <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Inspire</span>
            </motion.h1>
          </div>

          <motion.p variants={fadeInUp} className="about-hero-description">
            We are a team of passionate architects and designers dedicated to 
            transforming visions into extraordinary built environments.
          </motion.p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="about-story">
        <div className="about-story-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-story-image-wrapper"
          >
            <img
              src="https://images.prismic.io/maxo-architecture/aYTpod0YXLCxVd8y_02_style_transfer01-1-.png?auto=format,compress"
              alt="Architecture Design"
              className="about-story-image"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="about-story-text"
          >
            <motion.p variants={fadeInUp} className="about-section-label">
              Our Story
            </motion.p>

            <motion.div style={{ overflow: 'hidden', marginBottom: '32px' }}>
              <motion.h2 variants={fadeInUp} className="about-story-title">
                Redefining Architecture
              </motion.h2>
            </motion.div>
            
            <motion.div variants={lineReveal} className="about-story-line" />

            <motion.p variants={fadeInUp} className="about-story-paragraph">
              Founded with a vision to create meaningful spaces, MAXO has grown from a 
              small studio into an internationally recognized architectural practice. 
              Our journey has been defined by a relentless pursuit of design excellence 
              and innovation.
            </motion.p>

            <motion.p variants={fadeInUp} className="about-story-paragraph">
              We believe architecture has the power to transform lives. Every project 
              we undertake is an opportunity to create spaces that inspire, function 
              beautifully, and stand the test of time.
            </motion.p>

            <motion.a href="/work" whileHover={{ x: 8 }} className="about-story-link">
              View Our Work
              <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="about-values-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-values-header"
          >
            <div>
              <p className="about-section-label">Our Values</p>
              <h2 className="about-values-title">
                What Drives <span style={{ fontStyle: 'italic' }}>Our Vision</span>
              </h2>
            </div>

            <div className="about-values-grid">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="about-value-item"
                >
                  <h3 className="about-value-title">{value.title}</h3>
                  <p className="about-value-description">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Preview Section */}
      <section className="about-team">
        <div className="about-team-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-team-content"
            style={{ 
              display: 'flex', 
              alignItems: window.innerWidth < 768 ? 'flex-start' : 'stretch', 
              gap: window.innerWidth < 768 ? '1.5rem' : '4rem',
              maxWidth: '1400px',
              margin: '0 auto',
              minHeight: window.innerWidth < 768 ? 'auto' : '600px',
              flexDirection: window.innerWidth < 768 ? 'column' : 'row',
              padding: window.innerWidth < 768 ? '0 20px' : '0'
            }}
          >
            {/* Image Section */}
            <div style={{ flex: window.innerWidth < 768 ? '0 0 100%' : '0 0 350px', height: window.innerWidth < 768 ? '300px' : '100%', flexShrink: 0 }}>
              <img 
                src="/founder.jpeg"
                alt="Divya"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  display: 'block'
                }}
              />
            </div>
            
            {/* Text Section */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: window.innerWidth < 768 ? '0 0' : '0' }}>
              <h3 style={{ 
                fontSize: window.innerWidth < 768 ? '1.8rem' : '3rem', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: '#333'
              }}>
                Divya Patel
              </h3>
              
              <p style={{ 
                fontSize: window.innerWidth < 768 ? '1rem' : '1.2rem', 
                fontWeight: '500', 
                color: '#666',
                marginBottom: '1.5rem'
              }}>
                Founder & Principal Architect
              </p>
              
              <div style={{ 
                display: 'flex', 
                gap: window.innerWidth < 768 ? '0' : '3rem', 
                width: '100%',
                flexDirection: window.innerWidth < 768 ? 'column' : 'row'
              }}>
                <p style={{ 
                  fontSize: window.innerWidth < 768 ? '0.95rem' : '1rem', 
                  lineHeight: '1.8', 
                  color: '#555',
                  textAlign: window.innerWidth > 768 ? 'justify' : 'left',
                  flex: '1',
                  marginBottom: window.innerWidth < 768 ? '1.5rem' : '0'
                }}>
                  Divya has experienced architecture and art across diverse cultures through extensive travel, bringing a global perspective to design that emphasizes boundless creative and technological possibilities within art, architecture, and design. He seamlessly blends innovative design thinking with diverse research methodologies, while challenging existing disciplinary boundaries and contributing to emerging spatial design practice and knowledge.
                </p>
                
                <div style={{ flex: '1' }}>
                  <p style={{ 
                    fontSize: window.innerWidth < 768 ? '0.95rem' : '1rem', 
                    lineHeight: '1.8', 
                    color: '#555',
                    textAlign: window.innerWidth > 768 ? 'justify' : 'left'
                  }}>
                    Divya pursued his Bachelor's in architecture degree in 2014, after which he worked in India as an architect. He then decided to pursue a Master's in architecture from Bartlett School of Architecture, London. Subsequently, he worked as an architect and urban designer at Benoy, London for three years, before establishing MAXO Architects & Designers in 2024.
                  </p>
                  
                  <a 
                    href="https://www.linkedin.com/in/divya-patel-20/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '1rem',
                      textDecoration: 'none'
                    }}
                  >
                    <img 
                      src="https://i.pinimg.com/736x/e2/08/24/e2082469443d595e3b6edb0e91439529.jpg" 
                      alt="LinkedIn" 
                      style={{ width: '24px', height: '24px' }}
                    />
                    <span style={{ color: '#0077B5', fontWeight: '500' }}>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginTop: '6rem' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="about-story-title" style={{ marginTop: '1rem' }}>
               Recognized by Global Architectural Professionals
              </h2>
            </div>

            <InfiniteCarousel items={recommendationsData} />
          </motion.div>
        </div>
      </section>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}

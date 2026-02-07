import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { asImageSrc } from '@prismicio/helpers';
import StaggeredMenu from './StaggeredMenu';
import { createPrismicClient } from '../prismicClient';
import SEO from './SEO';
import './OurWork.css';

type CategoryCard = {
  id: string;
  uid: string;
  title: string;
  image: string;
  description: string;
  redirectLink?: string;
};

// Project Card component
const ProjectCard = ({ 
  item, 
  isHovered, 
  onHover, 
  onLeave, 
  onRedirect
}: { 
  item: CategoryCard;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onRedirect: () => void;
}) => (
  <motion.div
    className="ourwork-card"
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    onClick={onRedirect}
    style={{ cursor: 'pointer' }}
  >
    <div className="ourwork-card-image-wrapper">
      <motion.img
        src={item.image || 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2574&auto=format&fit=crop'}
        alt={item.title}
        className="ourwork-card-image"
        animate={{ scale: isHovered ? 1.08 : 1 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      />
      <motion.div 
        className="ourwork-card-overlay"
        animate={{ opacity: isHovered ? 0.3 : 0.5 }}
        transition={{ duration: 0.4 }}
      />
      {/* View Project Button */}
      <motion.div
        className="ourwork-view-button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
        onClick={e => { e.stopPropagation(); onRedirect(); }}
        style={{ cursor: 'pointer' }}
      >
        <span>View Projects</span>
        <ArrowUpRight size={18} />
      </motion.div>
    </div>
    <p className="ourwork-card-description">{item.description}</p>
  </motion.div>
);


export default function OurWork() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [items, setItems] = useState<CategoryCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const navigate = useNavigate();
  const client = useMemo(() => createPrismicClient(), []);

  const menuItems = [
    { label: 'About', ariaLabel: 'About', link: '/about' },
    { label: 'Our Work', ariaLabel: 'Our Work', link: '/work' },
    { label: 'Future Thinking', ariaLabel: 'Future Thinking', link: '/future' },
    { label: 'News', ariaLabel: 'News', link: '/news' },
    { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
  ];

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        setLoading(true);
        setLoadError(null);

        if (!client) {
          throw new Error('Prismic is not configured. Set VITE_PRISMIC_REPO_NAME on Vercel.');
        }
        const docs = await client.getAllByType('work_category', {
          orderings: {
            field: 'my.work_category.order',
            direction: 'asc',
          },
          pageSize: 100,
        });

        const mapped = docs
          .map((doc: any) => {
            const uid = doc.uid as string | null;
            if (!uid) return null;
            return {
              id: String(doc.id),
              uid,
              title: (doc.data?.title as string) || uid,
              description: (doc.data?.description as string) || '',
              image: asImageSrc(doc.data?.card_image) || '',
              redirectLink: (doc.data?.redirect_link?.url as string) || undefined,
            } as CategoryCard;
          })
          .filter((item) => item !== null) as CategoryCard[];

        if (!cancelled) {
          setItems(mapped);
        }
      } catch (e) {
        if (!cancelled) {
          setItems([]);
          setLoadError(e instanceof Error ? e.message : 'Failed to load categories');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, [client]);

  const handleRedirect = (item: CategoryCard) => {
    // Use Prismic redirect link if available
    if (item.redirectLink) {
      window.location.href = item.redirectLink;
      return;
    }

    // Redirect Research & Development to Future Thinking page
    if (item.title?.toLowerCase().includes('research') && item.title?.toLowerCase().includes('development')) {
      navigate('/future');
    } else {
      navigate(`/work/${item.uid}`);
    }
  };

  return (
    <section className="ourwork-section">
      <SEO 
        title="Our Work & Projects | MAXO Architects & Designers Portfolio"
        description="Explore MAXO's portfolio of innovative architectural projects. From residential design to commercial architecture, urban planning, and sustainable solutions across diverse sectors."
        keywords="MAXO projects, architecture portfolio, residential architecture, commercial architecture, urban planning, architectural design projects, 
        "
        url="https://maxo.co.in/work"
        image="https://maxo.co.in/maxo-logo.jpeg"
      />
      
      {/* Navigation Menu */}
      <StaggeredMenu 
        items={menuItems} 
        position="left"
        colors={['#fff', '#fff', '#fff']}
        menuButtonColor="#000"
        openMenuButtonColor="#000"
        accentColor="#888"
      />

      {/* Header */}
      <motion.div 
        className="ourwork-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="ourwork-header-content">
          <span className="ourwork-label">Our Services</span>
          <h1 className="ourwork-title">
            Our <span className="italic">Expertise</span>
          </h1>
          <p className="ourwork-subtitle">
            We bring visionary designs to life through innovative architecture and sustainable solutions.
          </p>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="ourwork-grid ourwork-grid-4cols">
        {loading ? (
          <p style={{ gridColumn: '1 / -1', color: 'rgba(0,0,0,0.6)' }}>Loading categories...</p>
        ) : null}

        {!loading && loadError ? (
          <p style={{ gridColumn: '1 / -1', color: '#b00020' }}>{loadError}</p>
        ) : null}

        {!loading && !loadError && items.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', color: 'rgba(0,0,0,0.6)' }}>
            No categories found in Prismic yet.
          </p>
        ) : null}

        {items.map((item) => (
          <div className="ourwork-item" key={item.id}>
            {/* Title with dot */}
            <div className="ourwork-item-header">
              <span className="ourwork-dot" />
              <h2 className="ourwork-item-title">{item.title}</h2>
            </div>
            {/* Project Card */}
            <ProjectCard
              item={item}
              isHovered={hoveredId === item.id}
              onHover={() => setHoveredId(item.id)}
              onLeave={() => setHoveredId(null)}
              onRedirect={() => handleRedirect(item)}
            />
          </div>
        ))}
      </div>

      {/* View All Button */}
    </section>
  );
}

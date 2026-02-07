import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { asImageSrc } from '@prismicio/helpers';
import { createPrismicClient } from '../prismicClient';

type CategoryCard = {
  id: string;
  uid: string;
  title: string;
  image: string;
  description: string;
  redirectLink?: string;
};

export default function WorkGallery() {
  const [categories, setCategories] = useState<CategoryCard[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const client = useMemo(() => createPrismicClient(), []);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        setLoading(true);

        if (!client) {
          throw new Error('Prismic is not configured.');
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
          setCategories(mapped);
        }
      } catch (e) {
        if (!cancelled) {
          setCategories([]);
          console.error('Failed to load categories:', e);
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

  const handleCardClick = (category: CategoryCard) => {
    // Use Prismic redirect link if available
    if (category.redirectLink) {
      window.location.href = category.redirectLink;
      return;
    }
    // Fallback to category projects page
    navigate(`/work/${category.uid}`);
  };
  return (
    <section style={{ position: 'relative', zIndex: 40, backgroundColor: '#e8e8e8', padding: '100px 0', overflow: 'hidden' }}>
      
      {/* Internal CSS for Responsiveness */}
      <style>{`
        /* Desktop Default */
        .gallery-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          padding: 0 5vw;
          max-width: 1600px;
          margin: 0 auto;
        }
        .section-header {
          padding-left: 5vw;
          margin-bottom: 60px;
          max-width: 1600px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Tablet View */
        @media (max-width: 1024px) {
          .gallery-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Mobile View (Phone) */
        @media (max-width: 768px) {
          .gallery-container {
            grid-template-columns: 1fr;
            padding: 0 16px;
            gap: 32px;
            margin-left: auto; 
            margin-right: auto;
            max-width: calc(100% - 32px);
          }
          .section-header {
            padding-left: 16px;
            padding-right: 16px;
            text-align: center; 
            margin-bottom: 40px;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div className="section-header">
          <h1 className="ourwork-title" style={{ marginTop: 0 }}>
             Our <span className="italic">Expertise</span>
          </h1>
        </div>
        
        {/* Grid Container */}
        <div className="gallery-container">
          {loading ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'rgba(0,0,0,0.6)' }}>
              Loading categories...
            </div>
          ) : categories.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'rgba(0,0,0,0.6)' }}>
              No categories found in Prismic yet.
            </div>
          ) : (
            categories.map(category => (
              <Card key={category.id} project={category} onClick={() => handleCardClick(category)} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function Card({ project, onClick }: { project: CategoryCard; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{ 
        width: '100%', 
        aspectRatio: '12/8', 
        position: 'relative', 
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', position: 'relative' }}>
        <img 
          src={project.image || 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2574&auto=format&fit=crop'} 
          alt={project.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} 
        />
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }}
        />
      </div>
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <h3 style={{ color: 'white', fontSize: 'clamp(1rem, 2vw, 1.3rem)', margin: 0 }}>{project.title}</h3>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Zap, Globe, Cpu, Leaf, Users } from 'lucide-react';
import Footer from './Footer';
import StaggeredMenu from './StaggeredMenu';
import SEO from './SEO';
import { createPrismicClient } from '../prismicClient';

// Add pulse animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }
`;
document.head.appendChild(style);

interface PrismicInsight {
  uid: string;
  id: string;
  title: string;
  date: string;
  summary?: string;
  content: string;
  description: string;
  author: string;
  image: string;
}

export default function FutureThinking({ navigateTo }: { navigateTo: (page: string) => void }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(() => (typeof window === 'undefined' ? false : window.innerWidth <= 768));
  const [prismaticInsights, setPrismicInsights] = useState<PrismicInsight[]>([]);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const prismicClient = createPrismicClient();
        if (!prismicClient) return;

        const response = await prismicClient.getByType('research_insight', {
          orderings: {
            field: 'my.research_insight.order',
            direction: 'asc',
          },
          pageSize: 100,
        });
        
        if (!response?.results) return;
        
        const getText = (field: any): string => {
          if (!field) return '';
          if (typeof field === 'string') return field;
          if (Array.isArray(field)) {
            return field.map((block: any) => block.text || '').join(' ');
          }
          return '';
        };

        const mappedInsights = response.results
          .map((doc: any) => {
            if (!doc?.data) return null;
            
            return {
              uid: doc.uid,
              id: doc.id,
              title: getText(doc.data.title),
              date: doc.data.date || '',
              summary: getText(doc.data.summary),
              content: getText(doc.data.content),
              description: getText(doc.data.description),
              author: doc.data.author || '',
              image: doc.data.image?.url || ''
            };
          })
          .filter(Boolean) as PrismicInsight[];
          
        if (mappedInsights.length > 0) {
          setPrismicInsights(mappedInsights);
        }
      } catch (error) {
        console.error('Error fetching Prismic insights:', error);
      }
    };

    fetchInsights();
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const innovations = [
    {
      icon: Cpu,
      title: 'AI-Powered Design',
      description: 'Integrating artificial intelligence to optimize space planning, energy efficiency, and user experience in real-time.',
      timeline: 'Next 2-3 years'
    },
    {
      icon: Leaf,
      title: 'Sustainable Materials',
      description: 'Pioneering the use of bio-based and recycled materials that reduce environmental impact while maintaining aesthetic appeal.',
      timeline: 'Already implementing'
    },
    {
      icon: Globe,
      title: 'Virtual Reality Design',
      description: 'Immersive VR experiences that allow clients to walk through and modify designs before construction begins.',
      timeline: 'Current technology'
    },
    {
      icon: Zap,
      title: 'Smart Building Integration',
      description: 'Seamless integration of IoT devices and smart systems that learn and adapt to occupant behavior patterns.',
      timeline: 'Expanding rapidly'
    },
    {
      icon: Users,
      title: 'Collaborative Spaces',
      description: 'Designing flexible environments that adapt to changing work patterns and promote human connection.',
      timeline: 'Post-pandemic evolution'
    },
    {
      icon: Lightbulb,
      title: 'Biophilic Integration',
      description: 'Advanced integration of natural elements to improve mental health and productivity in built environments.',
      timeline: 'Growing trend'
    }
  ];

  return (
    <div style={{ backgroundColor: '#e8e8e8', color: 'black', minHeight: '100vh' }}>
      <SEO 
        title="Future Thinking & Research | MAXO Architects"
        description="Explore innovative research and future-forward thinking from MAXO. Discover cutting-edge insights in architecture, urban design, and sustainable spatial solutions."
        keywords="architectural research, future thinking, innovation in architecture, design research, MAXO insights, urban design research, sustainable architecture"
        url="https://www.maxo.co.in/future"
        image="https://www.maxo.co.in/maxo-logo.jpeg"
      />
      
      {/* Navigation */}
      <StaggeredMenu 
        items={[
          { label: 'About', ariaLabel: 'About', link: '/about' },
          { label: 'Our Work', ariaLabel: 'Our Work', link: '/work' },
          { label: 'Future Thinking', ariaLabel: 'Future Thinking', link: '/future' },
          { label: 'News', ariaLabel: 'News', link: '/news' },
          { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
        ]} 
        position="left"
        colors={['#fff', '#fff', '#fff']}
        menuButtonColor="white"
        openMenuButtonColor="black"
        accentColor="#888"
      />

      {/* Hero Section */}
      <section
        style={{
          padding: isMobile ? '96px 20px 56px' : '120px 40px 80px',
          textAlign: 'center',
          color: 'white',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("/future-contact-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? '2.6rem' : '4rem',
            fontWeight: 300,
            lineHeight: 1.1,
            margin: '0 0 30px 0'
          }}
        >
          Future <span style={{ fontWeight: 'bold' }}>Thinking</span>
        </h1>
        <p
          style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          Exploring emerging trends, innovative technologies, and visionary concepts 
          that will shape the future of design and architecture.
        </p>
      </section>

      {/* Innovation Areas */}
      <section style={{ padding: isMobile ? '56px 20px' : '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: 300,
            textAlign: 'center',
            margin: '0 0 60px 0'
          }}
        >
          Innovation <span style={{ fontWeight: 'bold' }}>Areas</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: isMobile ? '20px' : '30px'
        }}>
          {innovations.map((innovation) => {
            const IconComponent = innovation.icon;
            return (
              <div
                key={innovation.title}
                style={{
                  padding: isMobile ? '24px' : '30px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <IconComponent size={32} style={{ color: 'rgba(0, 0, 0, 0.8)' }} />
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    margin: 0
                  }}>
                    {innovation.title}
                  </h3>
                </div>
                <p style={{
                  color: 'rgba(0, 0, 0, 0.7)',
                  lineHeight: 1.6,
                  margin: '0 0 20px 0'
                }}>
                  {innovation.description}
                </p>
                <div style={{
                  padding: '8px 16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  color: 'rgba(0, 0, 0, 0.9)',
                  display: 'inline-block'
                }}>
                  {innovation.timeline}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Research & Insights Section */}
      <section style={{ padding: isMobile ? '56px 20px' : '80px 80px', maxWidth: '1400px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: 300,
            textAlign: 'center',
            margin: '0 0 60px 0'
          }}
        >
          Research & <span style={{ fontWeight: 'bold' }}>Insights</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '30px' : '40px',
          alignItems: 'stretch'
        }}>
          {prismaticInsights.length > 0 ? (
            prismaticInsights
              .sort((a: PrismicInsight, b: PrismicInsight) => {
                const dateA = new Date(a.date || 0).getTime();
                const dateB = new Date(b.date || 0).getTime();
                return dateB - dateA;
              })
              .map((insight: PrismicInsight) => (
                <article
                  key={insight.uid}
                  onClick={() => {
                    navigate(`/future/insight/${insight.uid}`);
                  }}
                  style={{
                    borderRadius: '12px',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                  }}
                >
                  {/* Image Container */}
                  <div style={{
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden',
                    backgroundColor: '#e0e0e0'
                  }}>
                    <img
                      src={insight.image || 'https://via.placeholder.com/400x300?text=Research+Insight'}
                      alt={insight.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLImageElement).style.transform = 'scale(1)';
                      }}
                    />
                  </div>

                  {/* Content Container */}
                  <div style={{
                    padding: isMobile ? '24px' : '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                  }}>
                    <span style={{
                      color: 'rgba(0, 0, 0, 0.6)',
                      fontSize: '0.8rem',
                      fontWeight: '400',
                      marginBottom: '16px',
                      display: 'block'
                    }}>
                      {insight.date}
                    </span>
                    
                    <h3 style={{
                      fontSize: isMobile ? '1.4rem' : '1.6rem',
                      fontWeight: 400,
                      margin: '0 0 16px 0',
                      lineHeight: 1.3,
                      fontFamily: 'Georgia, serif',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {insight.title}
                    </h3>

                    <p style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: 'rgba(0, 0, 0, 0.7)',
                      margin: '0 0 auto 0',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      flex: 1
                    }}>
                      {insight.summary || insight.description || insight.content.substring(0, 150)}
                    </p>

                    <div style={{
                      marginTop: '20px',
                      paddingTop: '16px'
                    }}>
                      <span style={{
                        fontSize: '0.9rem',
                        color: 'rgba(0, 0, 0, 0.8)',
                        fontWeight: '400',
                        cursor: 'pointer'
                      }}>
                        read more...
                      </span>
                    </div>
                  </div>
                </article>
              ))
          ) : (
            // Loading skeleton placeholder
            [1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  overflow: 'hidden',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}
              >
                {/* Image placeholder */}
                <div style={{
                  width: '100%',
                  height: '200px',
                  backgroundColor: '#d0d0d0'
                }} />

                {/* Content placeholder */}
                <div style={{
                  padding: isMobile ? '24px' : '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  flex: 1
                }}>
                  <div style={{
                    width: '40%',
                    height: '12px',
                    backgroundColor: '#d0d0d0',
                    borderRadius: '4px'
                  }} />
                  <div style={{
                    width: '80%',
                    height: '24px',
                    backgroundColor: '#d0d0d0',
                    borderRadius: '4px'
                  }} />
                  <div style={{
                    width: '100%',
                    height: '60px',
                    backgroundColor: '#d0d0d0',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}
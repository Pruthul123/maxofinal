import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Zap, Globe, Cpu, Leaf, Users, X } from 'lucide-react';
// import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import StaggeredMenu from './StaggeredMenu';
import SEO from './SEO';
import { createPrismicClient } from '../prismicClient';

// Architecture-inspired Loading Component
const ArchitectureLoader: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#e8e8e8',
      gap: '30px'
    }}>
      {/* Animated building blocks */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 40px)',
        gap: '12px',
        justifyContent: 'center'
      }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <div
            key={index}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#000',
              borderRadius: '4px',
              animation: `fadeInOut 1.2s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`,
              '@keyframes fadeInOut': {
                '0%, 100%': { opacity: 0.2 },
                '50%': { opacity: 1 }
              }
            } as any}
          />
        ))}
      </div>
      
      {/* Animated blueprint lines */}
      <svg width="120" height="120" viewBox="0 0 120 120" style={{ marginTop: '20px' }}>
        <defs>
          <style>{`
            @keyframes drawLine {
              0% {
                stroke-dashoffset: 100;
              }
              100% {
                stroke-dashoffset: 0;
              }
            }
            .blueprint-line {
              stroke: #000;
              fill: none;
              stroke-width: 2;
              stroke-dasharray: 100;
              animation: drawLine 2s ease-in-out infinite;
            }
          `}</style>
        </defs>
        <rect x="20" y="20" width="80" height="80" className="blueprint-line" />
        <line x1="60" y1="20" x2="60" y2="100" className="blueprint-line" style={{ animationDelay: '0.3s' }} />
        <line x1="20" y1="60" x2="100" y2="60" className="blueprint-line" style={{ animationDelay: '0.6s' }} />
      </svg>
      
      <p style={{
        fontSize: isMobile ? '0.9rem' : '1rem',
        color: '#666',
        fontWeight: '500',
        letterSpacing: '2px',
        textTransform: 'uppercase'
      }}>
        Loading Insights
      </p>
    </div>
  );
};

// Research Insight Modal Component 
const InsightModal: React.FC<{
  insight: any;
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  onViewMore: (insight: any) => void;
}> = ({ insight, isOpen, onClose, isMobile, onViewMore }) => {
  if (!isOpen || !insight) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          width: '95%',
          height: '95vh',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.3fr 0.7fr',
          gap: isMobile ? '0' : '50px',
          padding: isMobile ? '40px 20px' : '60px 80px',
          overflowY: 'auto',
          maxWidth: '1400px',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'fixed',
            top: '30px',
            right: '30px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1010,
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={32} color="black" />
        </button>

        {/* LEFT SIDE: Content */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: isMobile ? '20px' : '0' }}>
          <span style={{ 
            fontSize: '0.9rem', 
            color: '#666', 
            marginBottom: '20px',
            fontWeight: '500',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            {insight.date || insight.data?.date}
          </span>
          
          <h1 style={{ 
            fontSize: isMobile ? '2rem' : '3.5rem', 
            fontWeight: 'bold', 
            lineHeight: 1.1, 
            marginBottom: '30px',
            maxWidth: '600px',
            color: '#000'
          }}>
            {insight.title || insight.data?.title}
          </h1>

          {(insight.description || insight.data?.description) && (
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: '#333',
              maxWidth: '550px',
              marginBottom: '20px',
              fontWeight: '500'
            }}>
              {insight.description || insight.data?.description}
            </p>
          )}

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: '#444',
            maxWidth: '550px',
            marginBottom: '40px'
          }}>
            {insight.content || insight.data?.content}
          </p>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button
              onClick={() => onViewMore(insight)}
              style={{
                padding: '12px 30px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                textDecoration: 'none',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              VIEW MORE
            </button>
            <p style={{
              color: 'rgba(0, 0, 0, 0.6)',
              fontSize: '0.95rem',
              fontStyle: 'italic',
              margin: 0
            }}>
              — {insight.author || insight.data?.author}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: 3 Image Stack */}
        {!isMobile && (
          <div style={{ 
            display: 'grid', 
            gridTemplateRows: 'repeat(3, 1fr)', 
            gap: '20px',
            height: '100%'
          }}>
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                style={{ 
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img 
                  src={insight.image || insight.data?.image?.url || 'https://via.placeholder.com/400x300?text=Research'} 
                  alt={`Design detail ${i + 1}`}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }} 
                />
              </div>
            ))}
          </div>
        )}

        {/* Mobile: Image below content */}
        {isMobile && (
          <div style={{
            gridColumn: '1',
            display: 'grid',
            gridTemplateRows: 'repeat(3, 150px)',
            gap: '15px',
            marginTop: '30px'
          }}>
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                style={{
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}
              >
                <img 
                  src={insight.image || insight.data?.image?.url}
                  alt={`Design detail ${i + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function FutureThinking({ navigateTo }: { navigateTo: (page: string) => void }) {
  console.log('FutureThinking component rendering...');
  
  const navigate = useNavigate();
  
  // const location = useLocation();
  // const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(() => (typeof window === 'undefined' ? false : window.innerWidth <= 768));
  const [prismaticInsights, setPrismicInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // Start as false - data will load in background
  const [selectedInsight, setSelectedInsight] = useState<any | null>(null);

  // Debug: Track when selectedInsight changes
  useEffect(() => {
    console.log('selectedInsight changed:', selectedInsight);
  }, [selectedInsight]);

  // Fetch data from Prismic
  useEffect(() => {
    const fetchInsights = async () => {
      // Set a very short timeout - if Prismic takes too long, skip it
      const timeout = setTimeout(() => {
        console.log('Prismic fetch timeout - using default data');
        setLoading(false);
      }, 1500); // 1.5 second timeout

      try {
        const prismicClient = createPrismicClient();
        if (!prismicClient) {
          console.log('Prismic client not initialized - using default data');
          clearTimeout(timeout);
          setLoading(false);
          return;
        }

        console.log('Fetching insights from Prismic...');
        // Fetch research insights ordered by manual order field (lower number appears first)
        const response = await prismicClient.getByType('research_insight', {
          orderings: {
            field: 'my.research_insight.order',
            direction: 'asc',
          },
          pageSize: 100,
        });
        
        if (!response || !response.results) {
          console.log('No Prismic response - using default data');
          clearTimeout(timeout);
          setLoading(false);
          return;
        }

        console.log('Prismic insights fetched:', response.results);
        
        // Map Prismic data safely
        try {
          const mappedInsights = response.results.map((doc: any) => {
            if (!doc || !doc.data) return null;
            
            // Helper function to extract text from RichText or plain text
            const getText = (field: any): string => {
              if (!field) return '';
              if (typeof field === 'string') return field;
              if (Array.isArray(field)) {
                return field.map((block: any) => block.text || '').join(' ');
              }
              return '';
            };
            
            return {
              id: doc.id,
              title: getText(doc.data.title),
              date: doc.data.date || '',
              summary: getText(doc.data.summary),
              content: getText(doc.data.content),
              description: getText(doc.data.description),
              author: doc.data.author || '',
              image: doc.data.image?.url || '',
              gallery: doc.data.gallery || [],
              copyright: getText(doc.data.copyright),
              data: doc.data
            };
          }).filter(Boolean);
          
          if (mappedInsights.length > 0) {
            setPrismicInsights(mappedInsights);
            console.log('Mapped insights:', mappedInsights);
          }
        } catch (mapError) {
          console.error('Error mapping Prismic data:', mapError);
        }

        clearTimeout(timeout);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Prismic insights:', error);
        clearTimeout(timeout);
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const heroBgUrl = '/future-contact-bg.png';

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

  const insights = [
    {
      title: 'The Future of Work Environments',
      date: 'November 2024',
      content: 'As remote work becomes permanent for many, office spaces are evolving into collaboration hubs rather than individual workstations. We\'re designing spaces that prioritize flexibility, wellness, and community building.',
      author: 'Sarah Johnson, Creative Director',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      description: 'Flexible workspace design with integrated wellness features and collaborative zones for hybrid work models.'
    },
    {
      title: 'Climate-Responsive Architecture',
      date: 'October 2024',
      content: 'Buildings of the future will actively respond to environmental conditions. From self-cooling facades to rain-harvesting systems, architecture is becoming a living, breathing organism.',
      author: 'Michael Chen, Lead Architect',
      image: 'https://images.unsplash.com/photo-1518779578993-ec2be8dbf4c9?w=800&h=600&fit=crop',
      description: 'Advanced sustainable systems including bio-responsive facades, renewable energy integration, and water management solutions.'
    },
    {
      title: 'Digital-Physical Integration',
      date: 'September 2024',
      content: 'The boundary between digital and physical spaces is dissolving. We\'re creating environments where digital interfaces seamlessly blend with physical architecture to enhance user experience.',
      author: 'Emily Rodriguez, Interior Designer',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
      description: 'Immersive AR/VR experiences integrated with physical architecture for enhanced user interaction and spatial awareness.'
    }
  ];

  // Show loading state
  if (loading) {
    return <ArchitectureLoader isMobile={isMobile} />;
  }

  console.log('Rendering main component, loading is false');

  return (
    <div style={{ backgroundColor: '#e8e8e8', color: 'black', minHeight: '100vh' }}>
      <SEO 
        title="Future Thinking & Research | MAXO Architects"
        description="Explore innovative research and future-forward thinking from MAXO. Discover cutting-edge insights in architecture, urban design, and sustainable spatial solutions."
        keywords="architectural research, future thinking, innovation in architecture, design research, MAXO insights, urban design research"
        url="https://maxo.co.in/future"
        image="https://maxo.co.in/maxo-logo.jpeg"
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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("${heroBgUrl}")`,
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
          {((prismaticInsights.length > 0 ? prismaticInsights : insights)
            .sort((a: any, b: any) => {
              const dateA = new Date(a.date || 0).getTime();
              const dateB = new Date(b.date || 0).getTime();
              return dateB - dateA; // Newest first
            })
          ).map((insight: any) => (
            <article
              key={insight.id || insight.title}
              onClick={() => {
                // Store insight in sessionStorage for the detail page
                sessionStorage.setItem('researchInsights', JSON.stringify(
                  prismaticInsights.length > 0 ? prismaticInsights : insights
                ));
                navigate(`/future/insight/${insight.id || insight.title?.toLowerCase().replace(/\s+/g, '-')}`);
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
                  src={insight.image || insight.data?.image?.url || 'https://via.placeholder.com/400x300?text=Research+Insight'}
                  alt={insight.title || insight.data?.title}
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
                  {insight.date || insight.data?.date}
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
                  {insight.title || insight.data?.title}
                </h3>

                {/* Short summary text */}
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
                  {insight.summary || insight.data?.summary || (insight.description || insight.data?.description || insight.content || insight.data?.content || '').substring(0, 150)}
                </p>

                {/* Read more link */}
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
          ))}
        </div>
      </section>

      {/* Modal */}
      <InsightModal 
        insight={selectedInsight} 
        isOpen={!!selectedInsight} 
        onClose={() => setSelectedInsight(null)}
        isMobile={isMobile}
        onViewMore={(insight) => {
          // Store insight in sessionStorage for the detail page
          sessionStorage.setItem('researchInsights', JSON.stringify([
            ...prismaticInsights.length > 0 ? prismaticInsights : insights
          ]));
          // Navigate to the insight page
          navigate(`/future/insight/${insight.id || insight.title?.toLowerCase().replace(/\s+/g, '-')}`);
        }}
      />

      <Footer navigateTo={navigateTo} />
    </div>
  );
}
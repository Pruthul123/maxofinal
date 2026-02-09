import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Footer from './Footer';
import StaggeredMenu from './StaggeredMenu';
import { createPrismicClient } from '../prismicClient';

interface PrismicInsight {
  uid: string;
  data: {
    title: string;
    date: string;
    content: string;
    description: string;
    author: string;
    image: {
      url: string;
      alt?: string;
    };
    gallery?: Array<{
      image: {
        url: string;
        alt?: string;
      };
    }>;
    copyright?: string;
    seo_meta_title?: string;
    seo_meta_description?: string;
    seo_og_image?: {
      url: string;
    };
  };
}

// Simple loading skeleton
const LoadingSkeleton: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <div style={{ backgroundColor: '#e8e8e8', minHeight: '100vh' }}>
      {/* Navigation placeholder */}
      <div style={{
        padding: isMobile ? '80px 20px 20px' : '100px 40px 20px',
        backgroundColor: '#e8e8e8'
      }}>
        <div style={{
          width: '120px',
          height: '20px',
          backgroundColor: '#d0d0d0',
          borderRadius: '4px',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
      </div>

      {/* Content skeleton */}
      <div style={{
        padding: isMobile ? '20px' : '60px 80px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '24px' : '60px'
        }}>
          {/* Left side - text skeleton */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              width: '30%',
              height: '14px',
              backgroundColor: '#d0d0d0',
              borderRadius: '4px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }} />
            <div style={{
              width: '90%',
              height: isMobile ? '40px' : '60px',
              backgroundColor: '#d0d0d0',
              borderRadius: '4px',
              animation: 'pulse 1.5s ease-in-out infinite',
              animationDelay: '0.1s'
            }} />
            <div style={{
              width: '40%',
              height: '16px',
              backgroundColor: '#d0d0d0',
              borderRadius: '4px',
              animation: 'pulse 1.5s ease-in-out infinite',
              animationDelay: '0.2s'
            }} />
            <div style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#d0d0d0',
              borderRadius: '4px',
              animation: 'pulse 1.5s ease-in-out infinite',
              animationDelay: '0.3s'
            }} />
          </div>

          {/* Right side - image skeleton */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              width: '100%',
              aspectRatio: '16 / 9',
              backgroundColor: '#d0d0d0',
              borderRadius: '4px',
              animation: 'pulse 1.5s ease-in-out infinite',
              animationDelay: '0.4s'
            }} />
            <div style={{
              width: '100%',
              aspectRatio: '16 / 9',
              backgroundColor: '#d0d0d0',
              borderRadius: '4px',
              animation: 'pulse 1.5s ease-in-out infinite',
              animationDelay: '0.5s'
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default function ResearchInsightPage() {
  const { insightId } = useParams<{ insightId: string }>();
  const navigate = useNavigate();
  const [insight, setInsight] = useState<PrismicInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, [insightId]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const loadInsight = async () => {
      if (!insightId) {
        console.warn('No insightId provided');
        setLoading(false);
        return;
      }

      try {
        const client = createPrismicClient();
        
        if (!client) {
          console.error('Prismic client not configured');
          setLoading(false);
          return;
        }

        console.log('Fetching insight with UID:', insightId);
        
        // Fetch the insight directly from Prismic using the UID
        const document = await client.getByUID('research_insight', insightId);
        
        console.log('Prismic document received:', document);
        
        if (document && document.data) {
          setInsight(document as any);
          console.log('Insight data set successfully');
        } else {
          console.warn('No document data found');
          setInsight(null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading insight from Prismic:', error);
        setInsight(null);
        setLoading(false);
      }
    };

    loadInsight();
  }, [insightId]);

  const navigateTo = (page: string) => {
    navigate(page.startsWith('/') ? page : `/${page}`);
  };

  if (loading) {
    return <LoadingSkeleton isMobile={isMobile} />;
  }

  if (!insight) {
    return (
      <>
        <Helmet>
          <title>Insight Not Found | MAXO</title>
          <meta name="description" content="The requested insight could not be found." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div style={{
          backgroundColor: '#e8e8e8',
          color: 'black',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <h1>Insight not found</h1>
          <button
            onClick={() => navigate('/future')}
            style={{
              marginTop: '20px',
              padding: '12px 30px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Back to Future Thinking
          </button>
        </div>
      </>
    );
  }

  // Helper function to extract text from RichText or plain text
  const getText = (field: any): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    if (Array.isArray(field)) {
      return field.map((block: any) => block.text || '').join(' ');
    }
    return '';
  };

  // Extract data from Prismic document with safety checks
  if (!insight || !insight.data) {
    return (
      <>
        <Helmet>
          <title>Insight Not Found | MAXO</title>
          <meta name="description" content="The requested insight could not be found." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div style={{
          backgroundColor: '#e8e8e8',
          color: 'black',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <h1>Insight not found</h1>
          <button
            onClick={() => navigate('/future')}
            style={{
              marginTop: '20px',
              padding: '12px 30px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Back to Future Thinking
          </button>
        </div>
      </>
    );
  }

  const { data } = insight;
  const title = getText(data.title);
  const date = data.date || '';
  const description = getText(data.description);
  const author = data.author || '';
  const content = getText(data.content);
  const copyright = getText(data.copyright);
  const mainImage = data.image?.url || '';
  
  // SEO metadata with fallbacks
  const seoTitle = getText(data.seo_meta_title) || title || 'Research Insight | MAXO';
  const seoDescription = getText(data.seo_meta_description) || description || content.substring(0, 160);
  const seoImage = data.seo_og_image?.url || mainImage || '';
  const canonicalUrl = `https://www.maxo.co.in/future/insight/${insightId}`;
  const keywords = `${title}, MAXO research, architectural insights, ${author || 'MAXO'}, future thinking, design research`;

  const contentParagraphs = content
    .split('\n\n')
    .filter((paragraph: string) => paragraph.trim().length > 0);

  const galleryImages = (data.gallery || [])
    .map((item: any) => item?.image?.url)
    .filter((url: string | null | undefined) => url);
  
  // Combine main image with gallery images for right side display
  const allImages = [mainImage, ...galleryImages].filter(Boolean);

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.maxo.co.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Future Thinking",
        "item": "https://www.maxo.co.in/future"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title || "Research Insight",
        "item": canonicalUrl
      }
    ]
  };

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description || seoDescription,
    "image": seoImage || mainImage,
    "datePublished": date,
    "author": {
      "@type": "Person",
      "name": author || "MAXO"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MAXO",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.maxo.co.in/maxo-logo.jpeg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{seoTitle}</title>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:site_name" content="MAXO | Architects & Designers" />
        {seoImage && <meta property="og:image" content={seoImage} />}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        {seoImage && <meta name="twitter:image" content={seoImage} />}
        
        {/* Article specific */}
        {date && <meta property="article:published_time" content={date} />}
        {author && <meta property="article:author" content={author} />}
        <meta property="article:section" content="Architecture Research" />
        
        {/* Structured Data - Article */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        
        {/* Structured Data - Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <div style={{ backgroundColor: '#e8e8e8', color: 'black', minHeight: '100vh' }}>
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

        {/* Back Button */}
        <div style={{ padding: isMobile ? '80px 20px 20px' : '100px 40px 20px' }}>
          <button
            onClick={() => navigate('/future')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#333',
              padding: '8px 0'
            }}
          >
            <ArrowLeft size={20} />
            Back to Insights
          </button>
        </div>

        {/* Main Content */}
        <div style={{
          padding: isMobile ? '20px' : '60px 80px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '24px' : '60px',
            alignItems: 'flex-start',
            marginBottom: isMobile ? '32px' : '60px'
          }}>
            {/* Left: Text */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              paddingRight: isMobile ? '0' : '20px'
            }}>
              <span style={{
                fontSize: '0.9rem',
                color: '#666',
                fontWeight: '500',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                {date}
              </span>

              <h1 style={{
                fontSize: isMobile ? '2rem' : '3.2rem',
                fontWeight: 'bold',
                lineHeight: 1.1,
                marginTop: '18px',
                marginBottom: '18px',
                color: '#000'
              }}>
                {title || 'Research Insight'}
              </h1>

              <p style={{
                fontSize: '1rem',
                color: 'rgba(0, 0, 0, 0.6)',
                fontStyle: 'italic',
                marginBottom: '24px'
              }}>
                By {author || 'MAXO'}
              </p>

              {description && (
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  color: '#333',
                  marginBottom: '24px',
                  fontWeight: '500'
                }}>
                  {description}
                </p>
              )}

              <div style={{
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: '#444'
              }}>
                {contentParagraphs.map((paragraph: string, index: number) => (
                  <p key={index} style={{ marginBottom: '20px' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Right: Images stacked vertically */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              paddingLeft: isMobile ? '0' : '20px'
            }}>
              {allImages.map((imageUrl: string, index: number) => (
                <div
                  key={index}
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 9',
                    borderRadius: '0px',
                    overflow: 'hidden',
                    backgroundColor: '#ddd'
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={`${title} - Image ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Copyright Section */}
          {copyright && (
            <div style={{
              padding: '40px',
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '60px'
            }}>
              <p style={{ 
                fontSize: '0.9rem', 
                color: '#666',
                lineHeight: 1.6
              }}>
                {copyright}
              </p>
            </div>
          )}
        </div>

        {/* Related Insights Navigation */}
        <div style={{
          padding: isMobile ? '40px 20px' : '80px 40px',
          backgroundColor: '#f0f0f0',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px' }}>
            Explore More Insights
          </h2>
          <button
            onClick={() => navigate('/future')}
            style={{
              padding: '12px 40px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Back to All Insights
          </button>
        </div>

        <Footer navigateTo={navigateTo} />
      </div>
    </>
  );
}

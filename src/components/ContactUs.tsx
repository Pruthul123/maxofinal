import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
// import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import StaggeredMenu from './StaggeredMenu';
import SEO from './SEO';

export default function ContactUs({ navigateTo }: { navigateTo: (page: string) => void }) {
  // const location = useLocation();
  // const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(() => (typeof window === 'undefined' ? false : window.innerWidth <= 768));

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const heroBgUrl = '/future-contact-bg.png';

  const menuItems = [
    { label: 'About', ariaLabel: 'About', link: '/about' },
    { label: 'Our Work', ariaLabel: 'Our Work', link: '/work' },
    { label: 'Future Thinking', ariaLabel: 'Future Thinking', link: '/future' },
    { label: 'News', ariaLabel: 'News', link: '/news' },
    { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
  ];

  const contactInfo = [
   {
      icon: MapPin,
      title: 'Visit Our Studio',
      details: [
        '1215, Maple Trade Centre,',
        'Thaltej, Ahmedabad, ',
        'Gujarat, India 380052'
      ]
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        '+91 92270 01016'
      ]
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        'info@maxo.co.in'
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: '#e8e8e8', color: 'black', minHeight: '100vh' }}>
      <SEO 
        title="Contact MAXO | Get In Touch With Our Architecture Team"
        description="Contact MAXO Architects & Designers for your next project. Visit our studio in Ahmedabad, Gujarat or call us at +91 92270 01016. Let's bring your vision to life."
        keywords="contact MAXO, architecture consultation, Ahmedabad architects, hire architects, architecture services contact, architectural consultation India"
        url="https://www.maxo.co.in/contact"
        image="https://www.maxo.co.in/maxo-logo.jpeg"
      />
      
      {/* Navigation */}
      <StaggeredMenu 
        items={menuItems} 
        position="left"
        colors={['#fff', '#fff', '#fff']}
        menuButtonColor="white"
        openMenuButtonColor="black"
        accentColor="#888"
      />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
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
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            fontSize: isMobile ? '2.6rem' : '4rem',
            fontWeight: 300,
            lineHeight: 1.1,
            margin: '0 0 30px 0'
          }}
        >
          Contact <span style={{ fontWeight: 'bold' }}>Us</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          Ready to start your next project? We'd love to hear from you. 
          Get in touch to discuss how we can bring your vision to life.
        </motion.p>
      </motion.section>

      {/* Contact Info & Map */}
      <section style={{ padding: isMobile ? '56px 20px' : '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <style>{`
          @media (max-width: 768px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
              gap: 50px !important;
            }
          }
        `}</style>
        <div className="contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'flex-start'
        }}>
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 600,
              margin: '0 0 40px 0'
            }}>
              Get in Touch
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                    style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}
                  >
                    <div style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    }}>
                      <IconComponent size={24} style={{ color: 'rgba(0, 0, 0, 0.8)' }} />
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        margin: '0 0 10px 0'
                      }}>
                        {info.title}
                      </h3>
                      <div style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} style={{ margin: '5px 0', fontSize: '0.95rem' }}>
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 600,
              margin: '0 0 30px 0'
            }}>
              Find Us On Map
            </h2>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              height: isMobile ? '320px' : '400px',
              width: '100%'
            }}>
              <iframe
                src="https://www.google.com/maps?q=1215,+Maple+Trade+Centre,+Thaltej,+Ahmedabad,+Gujarat,+India+380052&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}

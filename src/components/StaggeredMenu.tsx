import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import './StaggeredMenu.css';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  isFixed?: boolean;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#B19EEF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  changeMenuColorOnOpen = true,
  accentColor = '#5227FF',
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
  logoUrl
}: StaggeredMenuProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const edgeZoneRef = useRef<HTMLDivElement | null>(null);
  
  // Hamburger lines refs
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const l1 = line1Ref.current;
      const l2 = line2Ref.current;
      
      if (!panel || !l1 || !l2) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });

      if (edgeZoneRef.current) gsap.set(edgeZoneRef.current, { x: 0 });
      
      // Initial "pause bars" state
      gsap.set(l1, { x: -3, rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(l2, { x: 3, rotate: 0, transformOrigin: '50% 50%' });
      
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const edgeZone = edgeZoneRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    ) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    // Move the edge bar (handle) with the drawer so it feels attached.
    if (edgeZone) {
      const panelWidth = panel.getBoundingClientRect().width;
      const edgeWidth = edgeZone.getBoundingClientRect().width;
      // Keep the bar ON the panel edge (inside), so you don't see the grey page behind it.
      const delta = Math.max(0, panelWidth - edgeWidth);
      const targetX = position === 'right' ? -delta : delta;
      tl.to(
        edgeZone,
        {
          x: targetX,
          duration: panelDuration,
          ease: 'power4.out',
          overwrite: 'auto'
        },
        panelInsertTime
      );
    }

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' }
        },
        itemsStart
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.08, from: 'start' }
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(
          socialTitle,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          },
          socialsStart
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const edgeZone = edgeZoneRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        }
        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        ) as HTMLElement[];
        if (numberEls.length) {
          gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }
        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      }
    });

    if (edgeZone) {
      gsap.to(edgeZone, {
        x: 0,
        duration: 0.32,
        ease: 'power3.in',
        overwrite: 'auto'
      });
    }
  }, [position]);

  const animateIcon = useCallback((_opening: boolean) => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    if (!l1 || !l2) return;
    gsap.to(l1, { x: -3, rotate: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
    gsap.to(l2, { x: 3, rotate: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
  }, [playOpen, playClose, animateIcon, animateColor]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
    }
  }, [playClose, animateIcon, animateColor, onMenuClose]);

  const handleHomeClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      closeMenu();
      navigate('/');
    },
    [closeMenu, navigate]
  );

  const handleRouteClick = useCallback(
    (path: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      closeMenu();
      navigate(path);
    },
    [closeMenu, navigate]
  );

  const resolvedLogoUrl = logoUrl || '/blacmaxologo.png';
  
  const [isAndroid, setIsAndroid] = useState(false);

  React.useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsAndroid(/Android/i.test(navigator.userAgent));
    }
  }, []);
  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (toggleBtnRef.current && toggleBtnRef.current.contains(event.target as Node)) {
        return;
      }
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={(className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}
      style={accentColor ? { ['--sm-accent' as any]: accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
          let arr = [...raw];
          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2);
            arr.splice(mid, 1);
          }
          return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
        })()}
      </div>
      <div ref={edgeZoneRef} className="sm-edge-zone" aria-hidden={false}>
        <button
          ref={toggleBtnRef}
          className="sm-edge-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span className="sm-edge-icon" aria-hidden="true">
            <span ref={line1Ref} className="sm-edge-line" />
            <span ref={line2Ref} className="sm-edge-line" />
          </span>
        </button>
      </div>

      <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
        <div className="sm-panel-inner">
          <a href="/" className="sm-menu-home" aria-label="Home" onClick={handleHomeClick}>
            {!isAndroid && (
              <img
                src={resolvedLogoUrl}
                alt="Home"
                style={{ height: '150px', width: '230px', objectFit: 'contain', display: 'block' }}
              />
            )}
          </a>

          <div className="sm-menu-desktop-right" aria-hidden={!open}>
            <div className="sm-menu-address">
              <div className="sm-menu-address-title">HEADQUARTERS</div>
              <div className="sm-menu-address-lines">
                <div> 1215, Maple Trade Centre, </div>
                <div> Thaltej, Ahmedabad, </div>
                <div> Gujarat, India 380052 </div>
              </div>
            </div>
            <div className="sm-menu-bottom">
              <div className="sm-menu-contact-section">
                <div className="sm-menu-contact-label" style={{ color: 'black' }}><b>Career Opportunities</b></div>
                <a className="sm-menu-email" href="mailto:career@maxo.co.in" style={{ color: 'black' }}>career@maxo.co.in</a>
              </div>
              <div className="sm-menu-contact-section">
                <div className="sm-menu-contact-label" style={{ color: 'black' }}><b>Marketing and Press Enquiries</b></div>
                <a className="sm-menu-email" href="mailto:info@maxo.co.in" style={{ color: 'black' }}>info@maxo.co.in</a>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="sm-mobile-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            Close
          </button>
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  <a className="sm-panel-item" href={it.link} aria-label={it.ariaLabel} data-index={idx + 1}>
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => {
                  const lowerLabel = s.label.toLowerCase();
                  let iconSrc: string | null = null;
                  let altText = s.label;
                  let redirectUrl = s.link;
                  
                  if (lowerLabel.includes('instagram')) {
                    iconSrc = 'https://i.pinimg.com/736x/0e/84/d5/0e84d5926187e7a3b785febd3a55bf1d.jpg';
                    altText = 'Instagram';
                    redirectUrl = 'https://www.instagram.com/maxo.co.in/';
                  } else if (lowerLabel.includes('linkedin')) {
                    iconSrc = 'https://i.pinimg.com/736x/e2/08/24/e2082469443d595e3b6edb0e91439529.jpg';
                    altText = 'LinkedIn';
                    redirectUrl = 'https://www.linkedin.com/company/maxo12/';
                  } else if (lowerLabel.includes('whatsapp')) {
                    iconSrc = 'https://i.pinimg.com/736x/76/11/f0/7611f02494be1e121a6f6a391d3eafdc.jpg';
                    altText = 'WhatsApp';
                    redirectUrl = 'https://wa.me/919227001016';
                  }

                  return (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={redirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link"
                        aria-label={s.label}
                      >
                        {iconSrc ? (
                          <img
                            src={iconSrc}
                            alt={altText}
                            className="sm-socials-icon"
                            style={{ width: 24, height: 24, display: 'inline-block' }}
                          />
                        ) : (
                          altText
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          
          {/* Left Side Bottom - Social Media and Privacy */}
          <div className="sm-left-bottom" aria-hidden={!open}>
            <div className="sm-left-socials">
              <a href="https://www.instagram.com/maxo.co.in/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src="https://i.pinimg.com/736x/0e/84/d5/0e84d5926187e7a3b785febd3a55bf1d.jpg" alt="Instagram" style={{ width: 22, height: 22 }} />
              </a>
              <a href="https://www.linkedin.com/company/maxo12/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src="https://i.pinimg.com/736x/e2/08/24/e2082469443d595e3b6edb0e91439529.jpg" alt="LinkedIn" style={{ width: 22, height: 22 }} />
              </a>
              <a href="https://wa.me/919227001016" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <img src="https://i.pinimg.com/736x/76/11/f0/7611f02494be1e121a6f6a391d3eafdc.jpg" alt="WhatsApp" style={{ width: 22, height: 22 }} />
              </a>
            </div>
            <a href="/contact" onClick={handleRouteClick('/contact')} className="sm-privacy-link">Contact</a>
            <a href="/privacy-policy" onClick={handleRouteClick('/privacy-policy')} className="sm-privacy-link">Privacy Policy</a>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;

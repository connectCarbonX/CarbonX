'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import {
  Leaf,
  Zap,
  TrendingUp,
  Users,
  Award,
  Shield,
  ChevronDown,
  ArrowRight,
  BarChart3,
  Target,
  Flame,
  Globe,
  TreePine,
  Droplets,
  Wind,
  Check,
  Star,
  Activity,
  Menu,
  X,
  Instagram,
  Mail,
  Play,
  Pause,
} from 'lucide-react';

/* ═══════════════════════════════════════
   Animation helpers
   ═══════════════════════════════════════ */

const ease = [0.16, 1, 0.3, 1] as const;

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   Navbar
   ═══════════════════════════════════════ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = ['Features', 'X-Coin', 'How It Works', 'Impact'];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled || dropdownOpen ? 'var(--nav-surface-solid)' : 'transparent',
        backdropFilter: scrolled || dropdownOpen ? 'blur(20px) saturate(1.2)' : 'none',
        borderBottom: scrolled || dropdownOpen ? '1px solid var(--border-subtle)' : 'none',
        boxShadow: scrolled || dropdownOpen ? 'var(--nav-shadow)' : 'none',
      }}
    >
      <nav className='site-nav'>
        <div className='site-nav__brand' style={{ gap: '4px' }}>
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1 }} className='text-gradient'>
            CARBON-
          </span>
          <Image src='/images/logo-v2.png' alt='X' width={1225} height={835} style={{ height: 24, width: 'auto' }} />
        </div>

        <div className='site-nav__actions' style={{ position: 'relative' }}>
          <button
            type='button'
            className={dropdownOpen ? 'nav-dropdown-toggle is-active' : 'nav-dropdown-toggle'}
            aria-label={dropdownOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen((open) => !open)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 18px',
              background: dropdownOpen ? '#ddccff' : 'color-mix(in srgb, var(--surface-strong) 88%, transparent)',
              color: dropdownOpen ? '#000000' : 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '999px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              minHeight: '40px',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {dropdownOpen ? 'Close' : 'Menu'}
            {dropdownOpen ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
          </button>
          
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 0,
                  pointerEvents: 'auto',
                }}
              >
                {[...navItems, 'Beta Phase'].map((item, i) => (
                  <motion.a
                    key={item}
                    href={item === 'Beta Phase' ? '#beta' : `#${item.toLowerCase().replace(/ /g, '-')}`}
                    initial={{ opacity: 0, y: -20, scale: 0.95, x: 0 }}
                    animate={{ opacity: 1, y: 0, scale: 1, x: -(i * 12) }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
                    transition={{
                      default: { delay: i * 0.025, type: 'spring', stiffness: 450, damping: 22 },
                      x: { delay: (i * 0.025) + 0.15, type: 'spring', stiffness: 400, damping: 25 },
                    }}
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'block',
                      marginTop: i === 0 ? 0 : '-12px',
                      zIndex: 50 - i,
                      position: 'relative',
                      width: '200px',
                      textAlign: 'center',
                      padding: '16px 24px',
                      background: '#ffffff',
                      color: '#000000',
                      borderRadius: '999px',
                      border: '1px solid rgba(0,0,0,0.06)',
                      fontSize: '15px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}

/* ═══════════════════════════════════════
   Hero
   ═══════════════════════════════════════ */

function Hero() {
  return (
    <section
      className='hero-section'
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'transparent',
        zIndex: 10,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload='auto'
          aria-hidden='true'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        >
          <source src='/hero.mp4' type='video/mp4' />
        </video>
      </div>
      <div
        className='hero-section__overlay'
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div
        className='hero-section__content'
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className='badge' style={{ marginBottom: 32, display: 'inline-flex' }}>
            <Zap style={{ width: 14, height: 14 }} /> Currently in beta testing phase
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className='animate-float'
          style={{ marginBottom: 32 }}
        >
          <Image src='/images/logo-v2.png' alt='CARBON-X' width={1225} height={835} style={{ margin: '0 auto', height: 80, width: 'auto' }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          style={{
            fontSize: 'clamp(42px, 7vw, 80px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 24,
          }}
        >
          Track your carbon.
          <br />
          <span className='text-gradient'>Save the planet.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          style={{
            fontSize: 18,
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            maxWidth: 560,
            margin: '0 auto 40px',
          }}
        >
          The personal carbon tracker that makes sustainability simple.
          Log eco&#8209;actions, watch your impact grow, earn rewards — and help
          heal the planet, one bit at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href='#beta' className='button-primary'>
            Beta details <ArrowRight style={{ width: 18, height: 18 }} />
          </a>
          <a href='#features' className='button-secondary'>
            See features
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ marginTop: 56, display: 'flex', justifyContent: 'center' }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown style={{ width: 22, height: 22, color: 'var(--text-muted)' }} />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   Logos / Social Proof
   ═══════════════════════════════════════ */

function SocialProof() {
  const metrics = [
    { value: '2.4M', label: 'kg CO₂ tracked' },
    { value: '18K+', label: 'Active users' },
    { value: '156', label: 'Countries' },
    { value: '4.8', label: 'App rating', suffix: '★' },
  ];

  void metrics;

  return (
    <section className='social-proof-section' style={{ padding: '60px 24px' }}>
      <FadeIn>
        <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em' }} className='text-gradient'>
            150+kg of CO2 emissions saved in the last 1 week
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

/* ═══════════════════════════════════════
   Features
   ═══════════════════════════════════════ */

const features = [
  {
    icon: Target,
    title: 'Smart Action Tracking',
    desc: 'Log eco-friendly actions in seconds. Walk, eat plant-based, recycle — each precisely measured in CO₂ savings.',
    color: '#2dd4bf',
  },
  {
    icon: BarChart3,
    title: 'Impact Analytics',
    desc: 'Beautiful charts show weekly, monthly, and lifetime carbon reduction. Know exactly how your habits map to real change.',
    color: '#2dd4bf',
  },
  {
    icon: Flame,
    title: 'Streaks & Gamification',
    desc: 'Build daily streaks, earn XP, climb from Climate Rookie to Earth Guardian. Compete on global leaderboards.',
    color: '#2dd4bf',
  },
  {
    icon: Leaf,
    title: 'AI-Powered Insights',
    desc: 'Personalized recommendations based on your lifestyle. Our AI surfaces the highest-impact actions for you.',
    color: '#2dd4bf',
  },
  {
    icon: Users,
    title: 'Community Challenges',
    desc: 'Join global challenges, team up with friends, see collective impact grow in real-time across your city.',
    color: '#2dd4bf',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    desc: 'End-to-end encryption, no third-party data sales, full GDPR compliance. Your data stays yours.',
    color: '#2dd4bf',
  },
];

function Features() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  // Transform scrolls the track to the left. 
  // Adjusted to -60% to account for wider cards.
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  return (
    <section ref={targetRef} id='features' className='feature-section' style={{ height: '300vh', position: 'relative' }}>
      <div className='feature-sticky-inner' style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto', padding: '0 24px', flexShrink: 0 }}>
          
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4ade80', marginBottom: 12 }}>
                Features
              </p>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
                Everything you need to <span className='text-gradient'>make an impact</span>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto' }}>
                Cutting-edge tech meets behavioral science to make sustainability effortless and engaging.
              </p>
            </div>
          </FadeIn>

          <motion.div className='feature-scroll-track' style={{ x, display: 'flex', gap: 24, width: 'max-content' }}>
            {features.map((f, i) => (
              <div key={f.title} className='card glow feature-card' style={{ width: 420, background: '#050a08', padding: '36px 36px', flexShrink: 0, whiteSpace: 'normal', display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'stretch' }}>
                <div
                  style={{
                    width: 100,
                    flexShrink: 0,
                    borderRadius: 20,
                    background: `${f.color}12`,
                    border: `1px solid ${f.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <f.icon style={{ width: 64, height: 64, color: f.color, strokeWidth: 1.2 }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
                  <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em', marginTop: -2 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   How It Works
   ═══════════════════════════════════════ */

const steps = [
  { icon: Mail, title: 'Join the Beta', desc: 'Register your interest and get early access updates as new testing spots open.' },
  { icon: Activity, title: 'Log Your Actions', desc: 'Tap to log walking, recycling, plant meals — any sustainable action.' },
  { icon: TrendingUp, title: 'Watch Your Impact', desc: 'See CO₂ savings grow. Track equivalents in trees planted and km offset.' },
  { icon: Award, title: 'Level Up & Lead', desc: 'Earn XP, unlock achievements, climb leaderboards. Make sustainability fun.' },
];

function HowItWorks() {
  const stepOffsets = [150, 100, 50, 0];

  return (
    <section id='how-it-works' className='steps-section' style={{ padding: '120px 24px' }}>
      <style>{`
        .diagonal-grid {
          display: flex;
          justify-content: space-between;
          position: relative;
          z-index: 1;
          padding-top: 40px;
          padding-bottom: 150px;
        }
        .diagonal-item {
          flex: 1;
          padding: 0 16px;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .diagonal-rope {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .mobile-rope {
          display: none;
        }
        @media (max-width: 768px) {
          .diagonal-grid {
            flex-direction: column;
            align-items: center;
            gap: 64px;
            padding-bottom: 40px !important;
          }
          .diagonal-item {
            transform: translateY(0) !important;
            padding: 0;
            max-width: 360px;
          }
          .diagonal-rope {
             display: none;
          }
          .mobile-rope {
             display: block;
             position: absolute;
             left: 50%;
             top: 80px;
             bottom: 80px;
             width: 2px;
             transform: translateX(-50%);
             background-image: linear-gradient(to bottom, var(--accent-green) 50%, transparent 50%);
             background-size: 100% 16px;
             opacity: 0.3;
             z-index: 0;
          }
        }
      `}</style>
      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2dd4bf', marginBottom: 12 }}>
              How It Works
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Start in <span className='text-gradient'>four simple steps</span>
            </h2>
          </div>
        </FadeIn>

        <div className="diagonal-grid">
          <div className="mobile-rope" />
          <svg className="diagonal-rope" preserveAspectRatio="none">
            <line x1="12.5%" y1={stepOffsets[0] + 76} x2="37.5%" y2={stepOffsets[1] + 76} stroke="var(--accent-green)" strokeWidth="2" strokeDasharray="6 6" opacity="0.4" />
            <line x1="37.5%" y1={stepOffsets[1] + 76} x2="62.5%" y2={stepOffsets[2] + 76} stroke="var(--accent-green)" strokeWidth="2" strokeDasharray="6 6" opacity="0.4" />
            <line x1="62.5%" y1={stepOffsets[2] + 76} x2="87.5%" y2={stepOffsets[3] + 76} stroke="var(--accent-green)" strokeWidth="2" strokeDasharray="6 6" opacity="0.4" />
          </svg>

          {steps.map((s, i) => (
            <div key={s.title} className="diagonal-item" style={{ transform: `translateY(${stepOffsets[i]}px)` }}>
              <FadeIn delay={i * 0.1}>
                <div style={{ position: 'relative', display: 'inline-flex', marginBottom: 24 }}>
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 20,
                      background: '#050a08',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: 'var(--card-shadow)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    <s.icon style={{ width: 28, height: 28, color: 'var(--accent-green)' }} />
                  </div>
                  <span
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: 'var(--brand-gradient)',
                      color: 'var(--button-text)',
                      fontSize: 11,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 3,
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <div className='card glow' style={{ padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 24, textAlign: 'center' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   Impact
   ═══════════════════════════════════════ */

function InteractiveCoin() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25, mass: 0.5 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['100%', '0%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['100%', '0%']);
  const background = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(250, 204, 21, 0.25) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize values between -0.5 and 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className='coin-section__media' style={{ perspective: 1200, width: '100%', display: 'flex', justifyContent: 'center' }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: 'min(100%, 340px)',
          aspectRatio: '1 / 1',
          borderRadius: 28,
          background: 'linear-gradient(180deg, color-mix(in srgb, var(--accent-gold) 14%, transparent) 0%, color-mix(in srgb, var(--surface-strong) 42%, transparent) 100%)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          boxShadow: '0 24px 60px color-mix(in srgb, var(--accent-gold) 16%, transparent)',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 28,
            background,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateZ(80px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <Image
            src='/images/coin.png'
            alt='X-Coin'
            width={260}
            height={260}
            style={{ width: '100%', height: 'auto', maxWidth: 260, filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.5))' }}
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function XCoin() {
  return (
    <section id='x-coin' className='impact-section' style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                marginBottom: 12,
              }}
            >
              X-Coin
            </p>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Rewarding impact with <span className='text-gradient-warm'>every action</span>
            </h2>
          </div>

          <div
            className='card glow'
            style={{
              padding: '36px 32px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -80,
                right: -40,
                width: 240,
                height: 240,
                background: 'radial-gradient(circle, rgba(250,204,21,0.14) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div
              className='coin-section__content'
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 32,
                alignItems: 'center',
              }}
            >
              <div className='coin-section__text'>
                <span
                  className='badge'
                  style={{
                    marginBottom: 18,
                    display: 'inline-flex',
                    background: 'color-mix(in srgb, var(--accent-gold) 12%, transparent)',
                    color: 'var(--accent-gold)',
                    border: '1px solid color-mix(in srgb, var(--accent-gold) 24%, transparent)',
                  }}
                >
                  X-Coin
                </span>

                <h3
                  style={{
                    fontSize: 'clamp(28px, 3.5vw, 40px)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    marginBottom: 14,
                  }}
                >
                  Turn every eco action into <span className='text-gradient-warm'>measurable value</span>
                </h3>

                <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: 18 }}>
                  X-Coin rewards users for building better climate habits. Each action you log contributes to a
                  transparent coin balance that reflects the real-world impact you are creating over time.
                </p>

                <div
                  className='coin-section__conversion'
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 18px',
                    borderRadius: 999,
                    background: 'color-mix(in srgb, var(--accent-gold) 12%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--accent-gold) 24%, transparent)',
                    color: 'var(--accent-gold-strong)',
                    fontSize: 15,
                    fontWeight: 700,
                    marginBottom: 20,
                    flexWrap: 'nowrap',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>10 X-COIN</span>
                  <span style={{ color: 'var(--text-muted)' }}>=</span>
                  <span>1 kg of CO2 emissions saved</span>
                </div>

                <div style={{ display: 'grid', gap: 12 }}>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    Track progress in a format users can understand instantly, while reinforcing how small daily
                    actions add up to meaningful emissions reduction.
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    The X-Coin system gives Carbon-X a clear incentive layer that is simple, credible, and easy to grow
                    into future rewards, campaigns, and partner programs.
                  </p>
                </div>
              </div>

              <InteractiveCoin />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Impact() {
  const impacts = [
    { icon: TreePine, value: '12', label: 'Total equivalent trees planted', color: '#4ade80' },
    { icon: Droplets, value: '12+', label: 'Liters of water conserved', color: '#2dd4bf' },
    { icon: Wind, value: '180+', label: 'km of car travel offset', color: '#22d3ee' },
    {
      icon: Leaf,
      value: '150+',
      label: (
        <>
          kg of CO<sub>2</sub> emissions saved in the last 1 week
        </>
      ),
      color: '#34d399',
    },
  ];

  const mainImpact = impacts[0];
  const sideImpacts = impacts.slice(1);

  return (
    <section id='impact' className='impact-section' style={{ padding: '120px 24px' }}>
      <div className='impact-section__inner'>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-teal)', marginBottom: 12 }}>
              Our Collective Impact
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Together we&apos;re making a <span className='text-gradient'>real difference</span>
            </h2>
          </div>
        </FadeIn>

        <style>{`
          .impact-hero-layout {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 80px;
            flex-wrap: wrap;
          }
          .impact-side-column {
            display: flex;
            flex-direction: column;
            gap: 32px;
            position: relative;
            z-index: 1;
          }
          .orbit-lines-left {
            position: absolute;
            left: 100%;
            top: 0;
            bottom: 0;
            width: 80px;
            pointer-events: none;
            z-index: 0;
          }
          .orbit-lines-right {
            position: absolute;
            right: 100%;
            top: 0;
            bottom: 0;
            width: 80px;
            pointer-events: none;
            z-index: 0;
          }
          @media (max-width: 900px) {
            .impact-hero-layout {
              gap: 48px;
              flex-direction: column;
            }
            .orbit-left-col { order: 2; }
            .orbit-middle-col { order: 1; }
            .orbit-right-col { order: 3; }
            .orbit-lines-left, .orbit-lines-right {
              display: none;
            }
          }
        `}</style>
        <div className="impact-hero-layout">

          {/* Left Column (1 Smaller Square) */}
          <div className="impact-side-column orbit-left-col">
            <div className="orbit-lines-left">
              <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
                <line x1="-2" y1="50%" x2="160" y2="50%" stroke="var(--accent-green)" strokeWidth="2" strokeDasharray="6 6" opacity="0.3" />
              </svg>
            </div>
            {(() => {
              const leftItem = sideImpacts[0];
              const LeftIcon = leftItem.icon;
              return (
                <FadeIn delay={0.2}>
                  <div
                    className='card impact-card'
                    style={{
                      aspectRatio: '1 / 1',
                      width: 200,
                      borderRadius: 24,
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',                  
                      alignItems: 'center',
                      textAlign: 'center',
                      boxShadow: `0 0 60px ${leftItem.color}08`,
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    <LeftIcon style={{ width: 32, height: 32, color: leftItem.color, margin: '0 auto 16px' }} />
                    <div style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }} className='text-gradient'>
                      {leftItem.value}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.4 }}>{leftItem.label}</p>
                  </div>
                </FadeIn>
              );
            })()}
          </div>

          {/* Middle Column (Large Hero Square) */}
          <div className="orbit-middle-col">
            <FadeIn delay={0.1}>
              <div
                className='card impact-card glow'
                style={{
                  aspectRatio: '1 / 1',
                  width: '100%',
                  maxWidth: 480,
                  minWidth: 320,
                  margin: '0 auto',
                  borderRadius: 48,
                  padding: '64px 48px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: `0 0 80px ${mainImpact.color}15`,
                  background: 'var(--bg-card)',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <mainImpact.icon style={{ width: 80, height: 80, color: mainImpact.color, margin: '0 auto 24px' }} />
                <div style={{ fontSize: 'clamp(80px, 10vw, 120px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 16 }} className='text-gradient'>
                  {mainImpact.value}
                </div>
                <p style={{ fontSize: 24, color: 'var(--text-secondary)', fontWeight: 600 }}>{mainImpact.label}</p>
              </div>
            </FadeIn>
          </div>

          {/* Right Column (2 Smaller Squares) */}
          <div className="impact-side-column orbit-right-col">
            <div className="orbit-lines-right">
              <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
                <line x1="82" y1="100" x2="-80" y2="216" stroke="var(--accent-green)" strokeWidth="2" strokeDasharray="6 6" opacity="0.3" />
                <line x1="82" y1="332" x2="-80" y2="216" stroke="var(--accent-green)" strokeWidth="2" strokeDasharray="6 6" opacity="0.3" />
              </svg>
            </div>
            {[sideImpacts[1], sideImpacts[2]].map((item, i) => (
              <FadeIn key={item.value} delay={0.3 + (i * 0.1)}>
                <div
                  className='card impact-card'
                  style={{
                    aspectRatio: '1 / 1',
                    width: 200,
                    borderRadius: 24,
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',                  
                    alignItems: 'center',
                    textAlign: 'center',
                    boxShadow: `0 0 60px ${item.color}08`,
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <item.icon style={{ width: 32, height: 32, color: item.color, margin: '0 auto 16px' }} />
                  <div style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }} className='text-gradient'>
                    {item.value}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.4 }}>{item.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CTA
   ═══════════════════════════════════════ */

function BetaPhase() {
  const betaRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: betaRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], [-70, 70]), {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [36, -36]), {
    stiffness: 140,
    damping: 28,
    mass: 0.45,
  });
  const contentScale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 1.015]), {
    stiffness: 140,
    damping: 28,
    mass: 0.45,
  });
  const glowY = useSpring(useTransform(scrollYProgress, [0, 1], [24, -24]), {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  return (
    <section
      ref={betaRef}
      className='cta-section beta-phase-section'
      id='beta'
      style={{
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        aria-hidden='true'
        style={{
          position: 'absolute',
          inset: '-8%',
          zIndex: 0,
          y: bgY,
          scale: 1.14,
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.78)), url("/images/bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      <motion.div
        aria-hidden='true'
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 400,
          zIndex: 1,
          y: glowY,
          background: 'radial-gradient(circle, var(--hero-orb-primary) 0%, transparent 70%)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          y: contentY,
          scale: contentScale,
          willChange: 'transform',
        }}
      >
        <FadeIn>
          <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <span className='badge' style={{ marginBottom: 24, display: 'inline-flex' }}>
            <Zap style={{ width: 14, height: 14 }} /> Currently in beta testing phase
          </span>

          <Image
            src='/images/logo-v2.png'
            alt='CARBON-X'
            width={1225}
            height={835}
            className='animate-float'
            style={{ margin: '0 auto 28px', height: 64, width: 'auto' }}
          />

          <h2
            className='beta-phase__title'
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: 16,
            }}
          >
            <span className='beta-phase__title-line'>
              <span>Carbon-X is</span>
            </span>
            <span className='beta-phase__title-line'>
              <span className='text-gradient'>currently in beta phase</span>
            </span>
          </h2>

          <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 36, lineHeight: 1.7 }}>
            We are actively testing the product experience, impact tracking, and reward system before the public
            release. There is no app download available yet.
          </p>

          <div className='beta-phase__list'>
            {[
              'Core flows are being validated with test users.',
              'Reward mechanics and impact scoring are still being tuned.',
              'Public launch details will follow after beta feedback.',
            ].map((item) => (
              <div key={item} className='card beta-phase__card' style={{ padding: '20px 18px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                {item}
              </div>
            ))}
          </div>

          {/*
            Free · No credit card · Available on Play Store
          */}
          </div>
        </FadeIn>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════
   Founder Video
   ═══════════════════════════════════════ */

function FounderVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const togglePlay = () => {
    if (!iframeRef.current) return;
    
    if (isPlaying) {
      iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      setIsPlaying(false);
    } else {
      iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      setIsPlaying(true);
      if (!hasStarted) setHasStarted(true);
    }
  };

  return (
    <section className='video-section' style={{ padding: '100px 24px', position: 'relative' }}>
      <FadeIn>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '56px', alignItems: 'center', width: '100%' }}>
            
            {/* Left Side: Video */}
            <div style={{ flex: '1 1 500px', width: '100%', position: 'relative' }}>
              <div className='ripple-ring' style={{ animationDelay: '0s' }} />
              <div className='ripple-ring' style={{ animationDelay: '1.2s' }} />
              <div className='ripple-ring' style={{ animationDelay: '2.4s' }} />
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '56.25%',
                  borderRadius: 24,
                  background: 'var(--bg-card)',
                  overflow: 'visible',
                  boxShadow: 'var(--card-shadow-hover)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <iframe
                  ref={iframeRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                    borderRadius: 24,
                    pointerEvents: isPlaying ? 'auto' : 'none',
                  }}
                  src='https://www.youtube.com/embed/3aoGGa2hb0w?enablejsapi=1&controls=0&modestbranding=1&rel=0'
                  title='CARBON-X Founder Message'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                />

                <div 
                  onClick={togglePlay}
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    borderRadius: 24,
                    backgroundImage: 'url("https://img.youtube.com/vi/3aoGGa2hb0w/maxresdefault.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'pointer',
                    opacity: hasStarted ? 0 : 1,
                    transition: 'opacity 0.6s ease',
                    pointerEvents: hasStarted ? 'none' : 'auto',
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', borderRadius: 24 }} />
                </div>

                <button
                  onClick={togglePlay}
                  style={{
                    position: 'absolute',
                    bottom: -24,
                    right: -24,
                    width: 72,
                    height: 72,
                    backgroundColor: 'var(--accent-green)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: '0 8px 32px rgba(105, 192, 143, 0.4)',
                    zIndex: 10,
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  aria-label={isPlaying ? "Pause Founder Video" : "Play Founder Video"}
                >
                  {isPlaying ? (
                    <Pause fill="#08110e" color="#08110e" style={{ width: 28, height: 28 }} />
                  ) : (
                    <Play fill="#08110e" color="#08110e" style={{ width: 28, height: 28, marginLeft: 4 }} />
                  )}
                </button>
              </div>
            </div>

            {/* Right Side: Text */}
            <div style={{ flex: '1 1 350px' }}>
              <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-cyan)', marginBottom: 12 }}>
                Message from the Founder
              </p>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 32, lineHeight: 1.15 }}>
                The Vision behind <br /><span className='text-gradient'>Carbon-X</span>
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: 24 }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>Arman Khan</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', fontWeight: 500 }}>Founder & CEO</p>
              </div>

              <div style={{ paddingLeft: 20, borderLeft: '3px solid var(--accent-green)' }}>
                <p style={{ fontSize: 17, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6 }}>
                  "We believe that saving the planet shouldn't feel like a chore. Carbon-X turns everyday positive actions into a genuinely rewarding, gamified experience."
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ═══════════════════════════════════════
   Footer
   ═══════════════════════════════════════ */

function Footer() {
  return (
    <footer className='site-footer' style={{ background: '#000000', position: 'relative', zIndex: 10 }}>
      <div className='site-footer__inner'>
        <div className='site-footer__brand'>
          <Image src='/images/logo-v2.png' alt='CARBON-X' width={1225} height={835} style={{ height: 24, width: 'auto' }} />
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: 0.5 }} className='text-gradient'>
            CARBON-X
          </span>
          <span className='site-footer__tagline' style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Healing the Planet, One Bit at a Time.
          </span>
        </div>

        <div className='site-footer__links' style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          <div className='site-footer__actions'>
            <a
              href='https://www.instagram.com/carbonx.in?igsh=cW5uMnk0M2ZraWdt'
              target='_blank'
              rel='noreferrer'
              className='site-footer__link-item'
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <Instagram style={{ width: 16, height: 16 }} />
              <span className='site-footer__link-text'>Instagram</span>
            </a>
            <a
              href='mailto:carbonxarman@gmail.com'
              className='site-footer__link-item'
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <Mail style={{ width: 16, height: 16 }} />
              <span className='site-footer__link-text'>carbonxarman@gmail.com</span>
            </a>
          </div>

          <div className='site-footer__legal'>
            <a href='#' className='site-footer__text-link' style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
            <a href='#' className='site-footer__text-link' style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   Page
   ═══════════════════════════════════════ */

export default function Home() {
  useEffect(() => {
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.style.colorScheme = 'dark';
    window.localStorage.removeItem('carbonx-theme');
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateGridOffset = () => {
      frameId = 0;
      const offset = window.scrollY * -0.12;
      document.documentElement.style.setProperty('--grid-scroll-offset', `${offset}px`);
    };

    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateGridOffset);
    };

    updateGridOffset();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      document.documentElement.style.setProperty('--grid-scroll-offset', '0px');
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className='noise' />
      <Navbar />
      <main className='page-shell'>
        <Hero />
        <FounderVideo />
        <Features />
        <div className='section-divider' />
        <XCoin />
        <div className='section-divider' />
        <HowItWorks />
        <div className='section-divider' />
        <Impact />
        <BetaPhase />
      </main>
      <Footer />
    </>
  );
}



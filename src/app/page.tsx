'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
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
        background: scrolled || mobileMenuOpen ? 'var(--nav-surface-solid)' : 'transparent',
        backdropFilter: scrolled || mobileMenuOpen ? 'blur(20px) saturate(1.2)' : 'none',
        borderBottom: scrolled || mobileMenuOpen ? '1px solid var(--border-subtle)' : 'none',
        boxShadow: scrolled || mobileMenuOpen ? 'var(--nav-shadow)' : 'none',
      }}
    >
      <nav className='site-nav'>
        <div className='site-nav__brand'>
          <Image src='/images/logo-v2.png' alt='CARBON-X' width={1225} height={835} style={{ height: 30, width: 'auto' }} />
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: 1 }} className='text-gradient'>
            CARBON-X
          </span>
        </div>

        <div className='site-nav__desktop'>
          <div className='site-nav__links'>
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className='nav-link'>
                {item}
              </a>
            ))}
          </div>
          <a href='#beta' className='button-primary button-primary--compact'>
            Beta Phase
          </a>
        </div>

        <div className='site-nav__controls'>
          <button
            type='button'
            className='site-nav__toggle'
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
          </button>
        </div>
      </nav>

      <div className={`site-nav__mobile ${mobileMenuOpen ? 'is-open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/ /g, '-')}`}
            className='site-nav__mobile-link'
            onClick={() => setMobileMenuOpen(false)}
          >
            {item}
          </a>
        ))}
        <a href='#beta' className='site-nav__mobile-cta button-primary' onClick={() => setMobileMenuOpen(false)}>
          Beta Phase
        </a>
      </div>
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
    color: '#4ade80',
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
    color: '#22d3ee',
  },
  {
    icon: Leaf,
    title: 'AI-Powered Insights',
    desc: 'Personalized recommendations based on your lifestyle. Our AI surfaces the highest-impact actions for you.',
    color: '#4ade80',
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
    color: '#22d3ee',
  },
];

function Features() {
  return (
    <section id='features' className='feature-section' style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.06}>
              <div className='card glow' style={{ padding: '36px 32px', height: '100%' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${f.color}12`,
                    border: `1px solid ${f.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                >
                  <f.icon style={{ width: 22, height: 22, color: f.color }} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.01em' }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            </FadeIn>
          ))}
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
  return (
    <section id='how-it-works' className='steps-section' style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
          {steps.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', display: 'inline-flex', marginBottom: 24 }}>
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 20,
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
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
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   Impact
   ═══════════════════════════════════════ */

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

              <div className='coin-section__media' style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    width: 'min(100%, 340px)',
                    aspectRatio: '1 / 1',
                    borderRadius: 28,
                    background:
                      'linear-gradient(180deg, color-mix(in srgb, var(--accent-gold) 14%, transparent) 0%, color-mix(in srgb, var(--surface-strong) 42%, transparent) 100%)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 24,
                    boxShadow: '0 24px 60px color-mix(in srgb, var(--accent-gold) 16%, transparent)',
                  }}
                >
                  <Image
                    src='/images/coin.png'
                    alt='X-Coin'
                    width={260}
                    height={260}
                    className='animate-float'
                    style={{ width: '100%', height: 'auto', maxWidth: 260 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Impact() {
  const impacts = [
    { icon: TreePine, value: '12,847', label: 'Trees equivalent CO₂ absorbed', color: '#4ade80' },
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

  const visibleImpacts = impacts.slice(1);

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

        <div className='impact-grid'>
          {visibleImpacts.map((item, i) => (
            <FadeIn key={item.value} delay={i * 0.1} className='impact-grid__item'>
              <div
                className='card impact-card'
                style={{
                  padding: '48px 32px',
                  textAlign: 'center',
                  boxShadow: `0 0 60px ${item.color}08`,
                }}
              >
                <item.icon style={{ width: 36, height: 36, color: item.color, margin: '0 auto 20px' }} />
                <div style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }} className='text-gradient'>
                  {item.value}
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>{item.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CTA
   ═══════════════════════════════════════ */

function BetaPhase() {
  return (
    <section
      className='cta-section'
      id='beta'
      style={{
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 400,
          background: 'radial-gradient(circle, var(--hero-orb-primary) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

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
    </section>
  );
}

/* ═══════════════════════════════════════
   Footer
   ═══════════════════════════════════════ */

function Footer() {
  return (
    <footer className='site-footer'>
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

  return (
    <>
      <div className='noise' />
      <Navbar />
      <main className='page-shell'>
        <Hero />
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



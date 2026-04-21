'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  EMPTY_SITE_CONSTANTS,
  subscribeToSiteConstants,
  type SiteConstants,
} from '@/lib/site-constants';
import { SiteNavbar } from '@/components/site-navbar';
import {
  Leaf,
  Zap,
  TrendingUp,
  Award,
  Shield,
  ArrowRight,
  BarChart3,
  Target,
  Flame,
  TreePine,
  Droplets,
  Wind,
  Check,
  Activity,
  Instagram,
  Linkedin,
  Mail,
} from 'lucide-react';

/* ═══════════════════════════════════════
   Animation helpers
   ═══════════════════════════════════════ */

const ease = [0.16, 1, 0.3, 1] as const;
export type MarketingSitePage = 'home' | 'about' | 'features' | 'x-coin' | 'how-it-works' | 'impact' | 'beta';

type PageContent = {
  badge: string;
  title: string;
  accentTitle: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  overviewEyebrow: string;
  overviewTitle: string;
  overviewIntro: string;
  overviewParagraphs: string[];
  pillarTitle: string;
  pillars: Array<{
    title: string;
    description: string;
  }>;
  answersTitle: string;
  answers: Array<{
    question: string;
    answer: string;
  }>;
};

const pageContent: Record<MarketingSitePage, PageContent> = {
  home: {
    badge: 'Beta testing now',
    title: 'Track your carbon.',
    accentTitle: 'Save the planet.',
    description:
      'Log actions, see savings, and earn X-Coin as better habits become routine.',
    primaryHref: '/beta',
    primaryLabel: 'Beta details',
    secondaryHref: '/features',
    secondaryLabel: 'See features',
    overviewEyebrow: 'Why Carbon-X',
    overviewTitle: 'Carbon habits, made visible',
    overviewIntro:
      'Carbon-X turns simple choices into clear progress you can track.',
    overviewParagraphs: [
      'The product keeps the loop short: log an action, read the impact, and build a streak you can keep.',
    ],
    pillarTitle: 'Why Carbon-X matters',
    pillars: [
      {
        title: 'From intent to action',
        description:
          'Carbon-X turns climate intent into a repeatable product loop people can actually use.',
      },
      {
        title: 'A trusted impact layer',
        description:
          'Clear metrics, simple rewards, and beta validation make the product easier to trust.',
      },
    ],
    answersTitle: 'Quick answer',
    answers: [
      {
        question: 'What is Carbon-X?',
        answer:
          'A beta carbon-tracking platform for everyday sustainable actions.',
      },
    ],
  },
  about: {
    badge: 'About Carbon-X',
    title: 'Meet the team.',
    accentTitle: 'Built with purpose and ambition.',
    description:
      'A small team building a simple way to track sustainable action.',
    primaryHref: '/features',
    primaryLabel: 'Explore features',
    secondaryHref: '/beta',
    secondaryLabel: 'View beta phase',
    overviewEyebrow: 'Who we are',
    overviewTitle: 'Focused on practical climate tools',
    overviewIntro:
      'Carbon-X is being shaped through product design, engineering, and beta feedback.',
    overviewParagraphs: [
      'The goal is direct: make low-carbon choices easier to notice, repeat, and value.',
    ],
    pillarTitle: 'Team focus',
    pillars: [
      {
        title: 'Product clarity',
        description:
          'Keep the experience easy to understand.',
      },
      {
        title: 'Careful launch',
        description:
          'Use beta learning before wider release.',
      },
    ],
    answersTitle: 'Team note',
    answers: [
      {
        question: 'Who is building Carbon-X?',
        answer:
          'Arman Khan leads the product vision and Abishrant Shandilya builds the web experience.',
      },
    ],
  },
  features: {
    badge: 'Feature overview',
    title: 'Explore the platform.',
    accentTitle: 'Built for real habit change.',
    description:
      'Simple tools for logging actions, reading impact, and staying consistent.',
    primaryHref: '/beta',
    primaryLabel: 'Beta details',
    secondaryHref: '/impact',
    secondaryLabel: 'View impact',
    overviewEyebrow: 'Feature set',
    overviewTitle: 'Small actions, useful feedback',
    overviewIntro:
      'Each feature supports a cleaner habit loop.',
    overviewParagraphs: [
      'Carbon-X avoids heavy dashboards and focuses on fast actions, clear stats, and light motivation.',
    ],
    pillarTitle: 'Core features',
    pillars: [
      {
        title: 'Action log',
        description:
          'Save walking, recycling, plant meals, and other choices quickly.',
      },
      {
        title: 'Impact cards',
        description:
          'Turn activity into carbon, water, and travel equivalents.',
      },
      {
        title: 'Progress cues',
        description:
          'Use streaks, XP, and X-Coin to keep users returning.',
      },
    ],
    answersTitle: 'Feature note',
    answers: [
      {
        question: 'Why keep the feature set focused?',
        answer:
          'The beta should prove the main loop before adding more layers.',
      },
    ],
  },
  'x-coin': {
    badge: 'Incentive layer',
    title: 'Reward every action.',
    accentTitle: 'Make impact more tangible.',
    description:
      'X-Coin gives eco-actions a visible reward inside Carbon-X.',
    primaryHref: '/beta',
    primaryLabel: 'Beta details',
    secondaryHref: '/how-it-works',
    secondaryLabel: 'See the journey',
    overviewEyebrow: 'Why X-Coin',
    overviewTitle: 'A reward for repeat action',
    overviewIntro:
      'Coins make progress feel tangible without replacing the climate goal.',
    overviewParagraphs: [
      'X-Coin connects effort to a simple balance users can build over time.',
    ],
    pillarTitle: 'Reward basics',
    pillars: [
      {
        title: 'Clear conversion',
        description:
          '10 X-Coin equals 1 kg of CO2 saved.',
      },
      {
        title: 'No hype',
        description:
          'Rewards support the habit, not the other way around.',
      },
    ],
    answersTitle: 'X-Coin note',
    answers: [
      {
        question: 'Is X-Coin a currency?',
        answer:
          'No. In beta, it is a product reward and progress signal.',
      },
    ],
  },
  'how-it-works': {
    badge: 'Product flow',
    title: 'Start simply.',
    accentTitle: 'Stay consistent over time.',
    description:
      'Join the beta, log actions, check impact, and keep going.',
    primaryHref: '/beta',
    primaryLabel: 'Join the beta',
    secondaryHref: '/features',
    secondaryLabel: 'See features',
    overviewEyebrow: 'User journey',
    overviewTitle: 'A short loop for better habits',
    overviewIntro:
      'Every step is meant to be obvious.',
    overviewParagraphs: [
      'Carbon-X keeps the journey practical: act, log, learn, repeat.',
    ],
    pillarTitle: 'Flow basics',
    pillars: [
      {
        title: 'Easy start',
        description:
          'Join without a complicated setup.',
      },
      {
        title: 'Fast feedback',
        description:
          'See impact right after logging.',
      },
    ],
    answersTitle: 'Flow note',
    answers: [
      {
        question: 'Why keep the process so simple?',
        answer:
          'A shorter flow makes repeat use more likely.',
      },
    ],
  },
  impact: {
    badge: 'Live impact view',
    title: 'Measure progress.',
    accentTitle: 'Show real environmental value.',
    description:
      'See carbon savings, water conservation, and travel offsets at a glance.',
    primaryHref: '/beta',
    primaryLabel: 'Beta details',
    secondaryHref: '/x-coin',
    secondaryLabel: 'Explore X-Coin',
    overviewEyebrow: 'Impact view',
    overviewTitle: 'Numbers people can read quickly',
    overviewIntro:
      'Impact should feel clear, not like a dense report.',
    overviewParagraphs: [
      'The page highlights live totals and one nature equivalent so users understand the result faster.',
    ],
    pillarTitle: 'Impact basics',
    pillars: [
      {
        title: 'Primary totals',
        description:
          'Keep the main numbers visible.',
      },
      {
        title: 'Simple context',
        description:
          'Use tree equivalents only where they help.',
      },
    ],
    answersTitle: 'Impact note',
    answers: [
      {
        question: 'Why are equivalents like trees useful?',
        answer:
          'They make a carbon number easier to understand.',
      },
    ],
  },
  beta: {
    badge: 'Current stage',
    title: 'Build the product carefully.',
    accentTitle: 'Prepare for a stronger launch.',
    description:
      'Carbon-X is still being tested before public release.',
    primaryHref: '/features',
    primaryLabel: 'Explore features',
    secondaryHref: '/impact',
    secondaryLabel: 'See impact',
    overviewEyebrow: 'Beta phase',
    overviewTitle: 'Testing before launch',
    overviewIntro:
      'The team is refining the core experience now.',
    overviewParagraphs: [
      'Beta feedback helps tune logging, rewards, and impact scoring before the app opens wider.',
    ],
    pillarTitle: 'Beta focus',
    pillars: [
      {
        title: 'Product loop',
        description:
          'Check whether users can log and return easily.',
      },
      {
        title: 'Scoring logic',
        description:
          'Make rewards and impact numbers feel clear.',
      },
    ],
    answersTitle: 'Beta note',
    answers: [
      {
        question: 'Is the app publicly available right now?',
        answer:
          'No. Carbon-X is currently in beta and not available for download.',
      },
    ],
  },
};

type CountTarget = {
  prefix: string;
  suffix: string;
  value: number;
  decimals: number;
};

function parseCountTarget(value: string | number | null) {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      return null;
    }

    return {
      prefix: '',
      suffix: '',
      value,
      decimals: Number.isInteger(value) ? 0 : 1,
    } satisfies CountTarget;
  }

  if (!value) {
    return null;
  }

  const match = value.trim().match(/^([^0-9-]*)(-?\d[\d,]*(?:\.\d+)?)(.*)$/);

  if (!match) {
    return null;
  }

  const [, prefix, numericPart, suffix] = match;
  const parsedValue = Number.parseFloat(numericPart.replace(/,/g, ''));

  if (!Number.isFinite(parsedValue)) {
    return null;
  }

  return {
    prefix,
    suffix,
    value: parsedValue,
    decimals: numericPart.includes('.') ? numericPart.split('.')[1]?.length ?? 0 : 0,
  } satisfies CountTarget;
}

function formatCountValue(target: CountTarget, nextValue: number) {
  const safeValue = target.decimals === 0 ? Math.round(nextValue) : nextValue;
  const formattedValue = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: target.decimals,
    maximumFractionDigits: target.decimals,
  }).format(safeValue);

  return `${target.prefix}${formattedValue}${target.suffix}`;
}

function AnimatedCount({
  value,
  start,
  duration = 2500,
}: {
  value: string | number | null;
  start: boolean;
  duration?: number;
}) {
  const target = useMemo(() => parseCountTarget(value), [value]);
  const staticDisplayValue = !target ? (value ? String(value) : '-') : !start ? formatCountValue(target, 0) : null;
  const [displayValue, setDisplayValue] = useState(() => (target ? formatCountValue(target, start ? target.value : 0) : value ? String(value) : '-'));

  useEffect(() => {
    if (!target || !start) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const animationFrame = window.requestAnimationFrame(() => {
        setDisplayValue(formatCountValue(target, target.value));
      });

      return () => window.cancelAnimationFrame(animationFrame);
    }

    let animationFrame = 0;
    const animationStart = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - animationStart) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = target.value * easedProgress;

      setDisplayValue(formatCountValue(target, progress >= 1 ? target.value : nextValue));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [duration, start, target]);

  return <>{staticDisplayValue ?? displayValue}</>;
}

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

/* ---------------------------------------
   Hero
   --------------------------------------- */

function Hero({ content }: { content: PageContent }) {
  return (
    <section className='hero-section'>
      <div className='hero-shell'>
        <FadeIn>
          <div className='hero-copy'>
            <span className='badge hero-eyebrow'>
              <Leaf style={{ width: 14, height: 14 }} /> {content.badge}
            </span>
            <h1 className='hero-title'>Measure your carbon footprint.</h1>
            <p className='hero-subtitle'>Turn daily actions into measurable climate impact with a clean tracking, rewards, and reporting workflow built for real habits.</p>
            <div className='hero-actions'>
              <Link href={content.primaryHref} className='button-primary button-primary--large'>
                <span>{content.primaryLabel}</span>
                <ArrowRight style={{ width: 18, height: 18 }} />
              </Link>
              <Link href={content.secondaryHref} className='button-secondary button-primary--large'>
                <span>{content.secondaryLabel}</span>
              </Link>
            </div>
            <div className='hero-proof' aria-label='Carbon-X product highlights'>
              <div className='hero-proof__item'>
                <p className='hero-proof__value'>CO2</p>
                <p className='hero-proof__label'>impact tracking</p>
              </div>
              <div className='hero-proof__item'>
                <p className='hero-proof__value'>X-Coin</p>
                <p className='hero-proof__label'>reward layer</p>
              </div>
              <div className='hero-proof__item'>
                <p className='hero-proof__value'>Beta</p>
                <p className='hero-proof__label'>testing now</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className='dashboard-preview' aria-label='Carbon-X product dashboard preview'>
            <div className='dashboard-frame'>
              <div className='dashboard-toolbar'>
                <p className='dashboard-toolbar__label'>Carbon-X Dashboard</p>
                <p className='dashboard-toolbar__status'>Live beta</p>
              </div>
              <div className='dashboard-body'>
                <div className='dashboard-featured'>
                  <div>
                    <p className='dashboard-label'>Carbon saved this week</p>
                    <p className='dashboard-value'>150 kg</p>
                    <p className='dashboard-note'>Tracked across walking, recycling, and lower-emission meals.</p>
                  </div>
                  <div className='mini-chart' aria-hidden='true'>
                    {[42, 56, 48, 72, 64, 88, 76].map((height) => (
                      <span key={height} style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>

                <div className='dashboard-grid'>
                  <div className='dashboard-metric'>
                    <p className='metric-label'>Water saved</p>
                    <p className='metric-value'>2.8K L</p>
                    <p className='metric-note'>weekly estimate</p>
                  </div>
                  <div className='dashboard-metric'>
                    <p className='metric-label'>Travel offset</p>
                    <p className='metric-value'>82 km</p>
                    <p className='metric-note'>car equivalent</p>
                  </div>
                  <div className='dashboard-metric'>
                    <p className='metric-label'>Rewards</p>
                    <p className='metric-value'>1,500</p>
                    <p className='metric-note'>X-Coin earned</p>
                  </div>
                </div>

                <div className='activity-card'>
                  <span className='activity-icon'>
                    <Activity style={{ width: 20, height: 20 }} />
                  </span>
                  <div>
                    <p className='activity-label'>Recent action</p>
                    <p className='activity-copy'>Logged a walk commute and avoided 1.8 kg CO2.</p>
                  </div>
                  <p className='activity-value'>+18 XP</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function InnerPageHero({ content }: { content: PageContent }) {
  return (
    <section className='section-shell section-shell--tight'>
      <div className='section-inner'>
        <FadeIn className='section-header section-header--center'>
          <span className='badge'>
            <Zap style={{ width: 14, height: 14 }} /> {content.badge}
          </span>
          <h1 className='section-title' style={{ marginTop: 18 }}>{content.title} {content.accentTitle}</h1>
          <p className='section-copy'>{content.description}</p>
          <div className='cta-actions'>
            <Link href={content.primaryHref} className='button-primary'>
              <span>{content.primaryLabel}</span>
            </Link>
            <Link href={content.secondaryHref} className='button-secondary'>
              <span>{content.secondaryLabel}</span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function InnerPageStory({ content }: { content: PageContent }) {
  return (
    <section style={{ padding: '0 24px 72px' }}>
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 26,
        }}
      >
        <FadeIn>
          <div className='card' style={{ padding: '30px 28px', position: 'sticky', top: 110 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-teal)',
                marginBottom: 12,
              }}
            >
              {content.overviewEyebrow}
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
              {content.overviewTitle}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text-secondary)', marginBottom: 22 }}>
              {content.overviewIntro}
            </p>
            <div style={{ display: 'grid', gap: 12 }}>
              {content.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    padding: '10px 0',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <Check style={{ width: 16, height: 16, color: 'var(--accent-green)', marginTop: 4, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{pillar.title}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gap: 18 }}>
          {content.overviewParagraphs.map((paragraph, index) => (
            <FadeIn key={paragraph} delay={index * 0.06}>
              <article className='card glow' style={{ padding: '30px 28px' }}>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: 'var(--text-secondary)', margin: 0 }}>{paragraph}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function InnerPageFramework({ content }: { content: PageContent }) {
  return (
    <section style={{ padding: '0 24px 84px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'end', flexWrap: 'wrap', marginBottom: 30 }}>
            <div>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  marginBottom: 10,
                }}
              >
                Highlights
              </p>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>
                {content.pillarTitle}
              </h2>
            </div>
            <p style={{ maxWidth: 480, fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>
              A shorter scan of the main points.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
          {content.pillars.map((pillar, index) => (
            <FadeIn key={pillar.title} delay={index * 0.06}>
              <div className='card' style={{ padding: '28px 24px', height: '100%' }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: 'color-mix(in srgb, var(--accent-green) 12%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--accent-green) 20%, transparent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 18,
                    fontWeight: 800,
                    color: 'var(--accent-green)',
                  }}
                >
                  {index + 1}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 10 }}>{pillar.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>{pillar.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function InnerPageAnswers({ content }: { content: PageContent }) {
  return (
    <section style={{ padding: '0 24px 100px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ marginBottom: 28 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-teal)',
                marginBottom: 10,
              }}
            >
              Key questions
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>
              {content.answersTitle}
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gap: 16 }}>
          {content.answers.map((item, index) => (
            <FadeIn key={item.question} delay={index * 0.05}>
              <div
                className='card glow'
                style={{
                  padding: '24px 26px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: 22,
                }}
              >
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', margin: 0 }}>{item.question}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text-secondary)', margin: 0 }}>{item.answer}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   Logos / Social Proof
   ═══════════════════════════════════════ */

function PagePillars({ content }: { content: PageContent }) {
  return (
    <section className='section-shell'>
      <div className='section-inner why-layout'>
        <FadeIn className='why-panel'>
          <p className='section-kicker'>Why it matters</p>
          <h2 className='section-title'>{content.pillarTitle}</h2>
          <p className='section-copy'>
            Climate products earn trust when they make impact easy to understand, repeat, and verify.
          </p>
        </FadeIn>

        <div className='why-grid'>
          {content.pillars.map((pillar, index) => (
            <FadeIn key={pillar.title} delay={index * 0.08}>
              <div className='why-card'>
                <span className='why-icon'>
                  <Check style={{ width: 19, height: 19 }} />
                </span>
                <div>
                  <h3 className='why-title'>{pillar.title}</h3>
                  <p className='why-copy'>{pillar.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
          <FadeIn delay={content.pillars.length * 0.08}>
            <div className='why-card'>
              <span className='why-icon'>
                <Shield style={{ width: 19, height: 19 }} />
              </span>
              <div>
                <h3 className='why-title'>Product-ready foundation</h3>
                <p className='why-copy'>The beta is structured around clear reporting, habit retention, and a calm user experience.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
/* ═══════════════════════════════════════
   Features
   ═══════════════════════════════════════ */

const features = [
  {
    icon: Target,
    title: 'Action Tracking',
    desc: 'Log sustainable choices in seconds.',
    color: '#4ade80',
  },
  {
    icon: BarChart3,
    title: 'Impact Analytics',
    desc: 'See carbon savings and trends clearly.',
    color: '#2dd4bf',
  },
  {
    icon: Flame,
    title: 'Streaks',
    desc: 'Use XP and milestones to stay consistent.',
    color: '#22d3ee',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    desc: 'Keep user activity protected by design.',
    color: '#4ade80',
  },
];

function Features() {
  return (
    <section id='features' className='section-shell feature-section'>
      <div className='section-inner'>
        <FadeIn className='section-header'>
          <p className='section-kicker'>Product features</p>
          <h2 className='section-title'>Designed for fast, trustworthy climate tracking.</h2>
          <p className='section-copy'>A focused feature set for logging actions, understanding outcomes, and keeping users engaged without visual noise.</p>
        </FadeIn>

        <div className='feature-grid'>
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.06}>
              <div className='feature-card'>
                <span className='feature-icon'>
                  <feature.icon style={{ width: 20, height: 20 }} />
                </span>
                <h3 className='feature-title'>{feature.title}</h3>
                <p className='feature-copy'>{feature.desc}</p>
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
  { icon: Activity, title: 'Log Actions', desc: 'Add eco-actions quickly.' },
  { icon: TrendingUp, title: 'See Impact', desc: 'Track CO2 savings.' },
  { icon: Award, title: 'Earn X-Coin', desc: 'Build rewards as you go.' },
];

function HowItWorks() {
  return (
    <section id='how-it-works' className='section-shell steps-section'>
      <div className='section-inner'>
        <FadeIn className='section-header section-header--center'>
          <p className='section-kicker'>How it works</p>
          <h2 className='section-title'>A simple loop for measurable climate habits.</h2>
          <p className='section-copy'>Carbon-X keeps the experience focused: log an action, understand the result, and build progress over time.</p>
        </FadeIn>

        <div className='step-grid'>
          {steps.map((step, index) => (
            <FadeIn key={step.title} delay={index * 0.08}>
              <div className='step-card'>
                <p className='step-number'>0{index + 1}</p>
                <span className='step-icon'>
                  <step.icon style={{ width: 21, height: 21 }} />
                </span>
                <h3 className='step-title'>{step.title}</h3>
                <p className='step-copy'>{step.desc}</p>
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
    <section id='x-coin' className='section-shell impact-section'>
      <div className='section-inner'>
        <FadeIn className='reward-card'>
          <div>
            <p className='section-kicker'>X-Coin rewards</p>
            <h2 className='section-title'>Reward the behavior, keep the impact clear.</h2>
            <p className='section-copy'>X-Coin gives sustainable actions a visible value inside Carbon-X while keeping the experience grounded in impact.</p>
            <div className='reward-conversion'>
              <span>10 X-Coin</span>
              <span>=</span>
              <span>1 kg CO2 saved</span>
            </div>
          </div>
          <div className='coin-visual'>
            <Image src='/images/coin.png' alt='X-Coin reward coin' width={180} height={180} style={{ width: '70%', height: 'auto', maxWidth: 180 }} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Impact({ constants }: { constants: SiteConstants }) {
  const impactSectionRef = useRef<HTMLElement | null>(null);
  const [hasTriggeredCountUp, setHasTriggeredCountUp] = useState(false);
  const annualTreeAbsorptionKg = 21;
  const kgValue = Number.parseFloat(constants.kg.replace(/,/g, ''));
  const treeEquivalent = Number.isFinite(kgValue) ? kgValue / annualTreeAbsorptionKg : null;
  const roundedTreeEquivalent = treeEquivalent !== null ? Math.max(1, Math.round(treeEquivalent)) : null;
  const exactTreeEquivalent =
    treeEquivalent !== null
      ? new Intl.NumberFormat('en-IN', { maximumFractionDigits: 1 }).format(treeEquivalent)
      : null;
  const impacts = [
    {
      id: 'top',
      icon: Leaf,
      value: constants.kg,
      label: (
        <>
          kg of CO<sub>2</sub> emissions saved in the last 1 week
        </>
      ),
      color: '#34d399',
    },
    {
      id: 'left',
      icon: Droplets,
      value: constants.liter,
      label: 'Liters of water conserved',
      color: '#2dd4bf',
    },
    {
      id: 'right',
      icon: Wind,
      value: constants.km,
      label: 'km of car travel offset',
      color: '#22d3ee',
    },
  ];

  const visibleImpacts = impacts.filter((item) => item.value && item.value.trim().length > 0);

  useEffect(() => {
    const section = impactSectionRef.current;

    if (!section || hasTriggeredCountUp) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setHasTriggeredCountUp(true);
        observer.disconnect();
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [hasTriggeredCountUp]);

  return (
    <section ref={impactSectionRef} id='impact' className='section-shell impact-section'>
      <div className='impact-section__inner'>
        <FadeIn className='section-header section-header--center'>
          <p className='section-kicker'>Key impact metrics</p>
          <h2 className='section-title'>A cleaner view of climate progress.</h2>
          <p className='section-copy'>One featured nature equivalent supported by the core metrics users need to scan quickly.</p>
        </FadeIn>

        <div className='impact-orbit'>
          <div className='impact-orbit__cluster'>
            {visibleImpacts.map((item) => (
              <div key={item.id} className={`impact-orbit__item impact-orbit__item--${item.id}`}>
                <div className='card impact-card impact-card--orbit'>
                  <div
                    className='impact-card__icon-shell'
                    style={{
                      color: item.color,
                      borderColor: `${item.color}40`,
                      background: `linear-gradient(180deg, ${item.color}1f 0%, ${item.color}0d 100%)`,
                    }}
                  >
                    <item.icon style={{ width: 28, height: 28 }} />
                  </div>
                  <p className='impact-card__kicker'>Live impact</p>
                  <div className='impact-card__value text-gradient'>
                    <AnimatedCount value={item.value} start={hasTriggeredCountUp} />
                  </div>
                  <p className='impact-card__label'>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='impact-orbit__main'>
            <div
              className='card impact-card impact-card--tree impact-card--tree-orbit'
            >
              <div className='impact-card__tree-header'>
                <div>
                  <p className='impact-card__eyebrow'>Nature Equivalent</p>
                  <h3 className='impact-card__title'>Equivalent trees planted</h3>
                </div>
                <div className='impact-card__tree-icon'>
                  <TreePine style={{ width: 32, height: 32, color: '#34d399' }} />
                </div>
              </div>

              <div className='impact-card__tree-body'>
                <div>
                  <div className='impact-card__tree-value text-gradient'>
                    <AnimatedCount value={roundedTreeEquivalent} start={hasTriggeredCountUp} />
                  </div>
                  <p className='impact-card__tree-label'>Annual CO<sub>2</sub> absorption equivalent</p>
                </div>

                <div className='impact-card__tree-meta'>
                  <p style={{ margin: 0 }}>
                    Based on <strong>{constants.kg || '—'} kg CO<sub>2</sub></strong> saved and an estimate of{' '}
                    <strong>21 kg per mature tree each year</strong>.
                  </p>
                  <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 600 }}>
                    {exactTreeEquivalent ? `≈ ${exactTreeEquivalent} trees per year equivalent` : 'Tree equivalent appears once CO2 data is available.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CTA
   ═══════════════════════════════════════ */

const leadershipProfiles = [
  {
    featured: true,
    role: 'Founder & Lead Developer',
    name: 'Arman Khan',
    image: '/images/team/arman-khan.svg',
    summary: 'Leads product vision, strategy, and core Carbon-X development.',
  },
  {
    featured: false,
    role: 'Lead Web Developer',
    name: 'Abishrant Shandilya',
    image: '/images/team/abishrant-shandilya.svg',
    summary: 'Builds the web experience, interface system, and responsive product polish.',
  },
] as const;

const footerNavigation = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Features', href: '/features' },
  { label: 'Impact', href: '/impact' },
  { label: 'Beta Phase', href: '/beta' },
] as const;

function TeamSection() {
  return (
    <section className='section-shell'>
      <div className='section-inner'>
        <FadeIn className='section-header section-header--center'>
          <p className='section-kicker'>Team</p>
          <h2 className='section-title'>The people building Carbon-X.</h2>
          <p className='section-copy'>A focused product and engineering team shaping the beta experience.</p>
        </FadeIn>

        <div className='feature-grid'>
          {leadershipProfiles.map((profile, index) => (
            <FadeIn key={profile.name} delay={index * 0.08}>
              <div className='feature-card'>
                <div style={{ width: 88, height: 88, borderRadius: 18, overflow: 'hidden', border: '1px solid var(--border-subtle)', marginBottom: 18 }}>
                  <Image src={profile.image} alt={profile.name} width={88} height={88} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p className='section-kicker' style={{ marginBottom: 8 }}>{profile.role}</p>
                <h3 className='feature-title'>{profile.name}</h3>
                <p className='feature-copy'>{profile.summary}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
function BetaPhase() {
  return (
    <section className='cta-section' id='beta'>
      <FadeIn>
        <div className='cta-card'>
          <span className='badge'>
            <Zap style={{ width: 14, height: 14 }} /> Beta testing
          </span>
          <h2 className='section-title' style={{ marginTop: 18 }}>Build lower-carbon habits with clearer data.</h2>
          <p className='section-copy' style={{ maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            Carbon-X is being refined in beta before public release. Join the product journey and follow launch updates.
          </p>
          <div className='cta-actions'>
            <Link href='/beta' className='button-primary button-primary--large'>
              <span>View beta phase</span>
              <ArrowRight style={{ width: 18, height: 18 }} />
            </Link>
            <Link href='/features' className='button-secondary button-primary--large'>Explore features</Link>
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
    <footer className='site-footer'>
      <div className='site-footer__inner'>
        <div className='site-footer__hero'>
          <span className='site-footer__eyebrow'>Climate technology platform</span>
          <div className='site-footer__brand'>
            <Image src='/images/logo-v2.png' alt='CARBON-X' width={1225} height={835} style={{ height: 34, width: 'auto' }} />
            <span className='site-footer__brand-name'>CARBON-X</span>
          </div>
          <p className='site-footer__lead'>
            Track carbon-conscious habits and see the impact build.
          </p>
          <p className='site-footer__tagline'>
            Healing the Planet, One Bit at a Time.
          </p>
        </div>

        <div className='site-footer__grid'>
          <div className='site-footer__column'>
            <p className='site-footer__heading'>Connect</p>
            <div className='site-footer__actions'>
              <a
                href='https://www.instagram.com/carbonx.in?igsh=cW5uMnk0M2ZraWdt'
                target='_blank'
                rel='noreferrer'
                className='site-footer__link-item'
              >
                <Instagram style={{ width: 16, height: 16 }} />
                <span className='site-footer__link-text'>Instagram</span>
              </a>
              <a
                href='mailto:connect.carbonx@outlook.com'
                className='site-footer__link-item'
              >
                <Mail style={{ width: 16, height: 16 }} />
                <span className='site-footer__link-text'>connect.carbonx@outlook.com</span>
              </a>
            </div>
          </div>

          <div className='site-footer__column'>
            <p className='site-footer__heading'>Navigation</p>
            <div className='site-footer__menu'>
              {footerNavigation.map((item) => (
                <Link key={item.href} href={item.href} className='site-footer__menu-link'>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className='site-footer__column'>
            <p className='site-footer__heading'>Developers</p>
            <div className='site-footer__team'>
              {leadershipProfiles.map((profile) => (
                <div key={profile.name} className='site-footer__team-card'>
                  <div className='site-footer__team-copy'>
                    <p className='site-footer__team-name'>{profile.name}</p>
                    <p className='site-footer__team-role'>{profile.role}</p>
                  </div>
                  <span className='site-footer__team-linkedin' aria-label={`${profile.name} LinkedIn`}>
                    <Linkedin style={{ width: 16, height: 16 }} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='site-footer__bottom'>
          <div className='site-footer__legal'>
            <a href='#' className='site-footer__text-link'>Privacy</a>
            <a href='#' className='site-footer__text-link'>Terms</a>
            <span>&copy; {new Date().getFullYear()} CARBON-X</span>
          </div>
          <div className='site-footer__bottom-note'>
            Designed for a climate-first digital future.
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   Page
   ═══════════════════════════════════════ */

export function MarketingSite({ page = 'home' }: { page?: MarketingSitePage }) {
  const [siteConstants, setSiteConstants] = useState<SiteConstants>(EMPTY_SITE_CONSTANTS);

  useEffect(() => {
    const unsubscribe = subscribeToSiteConstants(
      (constants) => {
        setSiteConstants(constants);
      },
      () => {
        setSiteConstants(EMPTY_SITE_CONSTANTS);
      }
    );

    return () => unsubscribe();
  }, []);

  const isHomePage = page === 'home';
  const content = pageContent[page];

  return (
    <>
      <SiteNavbar />
      <main className='page-shell'>
        {isHomePage ? <Hero content={content} /> : <InnerPageHero content={content} />}
        {page === 'home' ? (
          <>
            <HowItWorks />
            <Impact constants={siteConstants} />
            <Features />
            <XCoin />
            <PagePillars content={content} />
            <BetaPhase />
          </>
        ) : null}
        {page === 'about' ? (
          <>
            <InnerPageStory content={content} />
            <TeamSection />
          </>
        ) : null}
        {page === 'features' ? (
          <>
            <InnerPageFramework content={content} />
          </>
        ) : null}
        {page === 'x-coin' ? (
          <>
            <XCoin />
          </>
        ) : null}
        {page === 'how-it-works' ? (
          <>
            <HowItWorks />
          </>
        ) : null}
        {page === 'impact' ? (
          <>
            <Impact constants={siteConstants} />
          </>
        ) : null}
        {page === 'beta' ? (
          <>
            <BetaPhase />
            <InnerPageAnswers content={content} />
          </>
        ) : null}
      </main>
      <Footer />
    </>
  );
}

export default function Home() {
  return <MarketingSite page='home' />;
}















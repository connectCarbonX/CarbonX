'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  EMPTY_SITE_CONSTANTS,
  subscribeToSiteConstants,
  type SiteConstants,
} from '@/lib/site-constants';
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
  Linkedin,
  Mail,
  Moon,
  Sun,
} from 'lucide-react';

/* ═══════════════════════════════════════
   Animation helpers
   ═══════════════════════════════════════ */

const ease = [0.16, 1, 0.3, 1] as const;
type ThemeMode = 'light' | 'dark';
export type MarketingSitePage = 'home' | 'about' | 'features' | 'x-coin' | 'how-it-works' | 'impact' | 'beta';

const navItems = [
  { label: 'Home', href: '/', icon: Globe },
  { label: 'About', href: '/about', icon: Users },
  { label: 'Features', href: '/features', icon: Zap },
  { label: 'X-Coin', href: '/x-coin', icon: Award },
  { label: 'How It Works', href: '/how-it-works', icon: Check },
  { label: 'Impact', href: '/impact', icon: Activity },
] as const;

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
    badge: 'Currently in beta testing phase',
    title: 'Track your carbon.',
    accentTitle: 'Save the planet.',
    description:
      'The personal carbon tracker that makes sustainability simple. Log eco-actions, watch your impact grow, earn rewards, and build climate-positive habits you can actually sustain.',
    primaryHref: '/beta',
    primaryLabel: 'Beta details',
    secondaryHref: '/features',
    secondaryLabel: 'See features',
    overviewEyebrow: 'Why Carbon-X',
    overviewTitle: 'A sustainability platform built for consistent everyday action',
    overviewIntro:
      'Carbon-X translates climate action into a product experience that feels practical, motivating, and measurable for real people.',
    overviewParagraphs: [
      'Many people want to live more sustainably, but most climate advice is either too broad, too technical, or too difficult to apply day to day. Carbon-X closes that gap by turning eco-friendly actions into a clear system that shows users what they did, why it mattered, and how small improvements build over time.',
      'Instead of treating sustainability like a one-time challenge, the platform is designed around repeatable habits. Users can log relevant actions, view measurable outcomes, and understand the environmental value of ordinary decisions such as walking, recycling, eating lower-emission meals, or reducing waste.',
      'The goal is not just to display numbers. Carbon-X is built to create stronger awareness, better decision-making, and long-term engagement. By combining thoughtful product design with impact communication, the platform helps climate responsibility feel more accessible, more credible, and more rewarding.',
    ],
    pillarTitle: 'What makes the platform useful',
    pillars: [
      {
        title: 'Practical personal measurement',
        description:
          'Carbon-X focuses on actions individuals can understand and repeat. That makes the platform more useful than generic sustainability messaging because users can connect climate impact to specific choices they make during the week.',
      },
      {
        title: 'Clear motivation and progression',
        description:
          'The experience is designed to encourage consistency, not guilt. Rewards, streaks, milestones, and feedback loops help users stay engaged while keeping the environmental message grounded in visible outcomes.',
      },
      {
        title: 'Professional climate communication',
        description:
          'Strong sustainability products need more than attractive visuals. Carbon-X aims to present impact in a way that is understandable to students, families, communities, and future partners without losing credibility.',
      },
    ],
    answersTitle: 'What visitors usually want to know',
    answers: [
      {
        question: 'What is Carbon-X trying to solve?',
        answer:
          'Carbon-X is focused on one of the biggest gaps in climate behavior: people often care about sustainability but lack a simple system for tracking meaningful actions consistently. The platform turns good intentions into visible routines.',
      },
      {
        question: 'Who is the platform for?',
        answer:
          'The product direction is well suited for individuals, students, campus communities, early adopters, and organizations that want a more engaging way to talk about daily sustainability than spreadsheets or static awareness campaigns.',
      },
      {
        question: 'Why does the product emphasize measurable impact?',
        answer:
          'Measurement creates trust and motivation. When users can see the carbon, water, or transport effect of their actions, the experience feels more credible and gives them a stronger reason to keep participating.',
      },
    ],
  },
  about: {
    badge: 'About Carbon-X',
    title: 'Meet the team.',
    accentTitle: 'Built with purpose and ambition.',
    description:
      'The Carbon-X team is building a sustainability platform focused on measurable action, responsible product design, and long-term climate engagement.',
    primaryHref: '/features',
    primaryLabel: 'Explore features',
    secondaryHref: '/beta',
    secondaryLabel: 'View beta phase',
    overviewEyebrow: 'Who we are',
    overviewTitle: 'A climate-focused team building a more engaging sustainability experience',
    overviewIntro:
      'Carbon-X is being shaped as a product-led sustainability platform that combines environmental awareness, impact visibility, and strong digital experience design.',
    overviewParagraphs: [
      'The idea behind Carbon-X is simple: climate-positive behavior should feel easier to understand, easier to repeat, and easier to value. The team is building the platform around that principle by turning daily eco-friendly actions into a system people can actually engage with over time.',
      'Rather than approaching sustainability as a static awareness campaign, Carbon-X is being developed as a product experience with structure, motivation, and measurable feedback. That requires a blend of product thinking, technical execution, and management discipline across every part of the journey.',
      'The About page exists to communicate the people and leadership direction behind the platform. For an early-stage brand, that kind of transparency matters. It helps visitors, future users, and potential partners understand who is shaping the mission and how the company is thinking about growth.',
    ],
    pillarTitle: 'What defines the Carbon-X team',
    pillars: [
      {
        title: 'Mission-led product thinking',
        description:
          'The team is not only building a digital product. It is shaping a climate engagement model intended to make sustainable behavior more understandable, measurable, and motivating for everyday users.',
      },
      {
        title: 'Technology with practical value',
        description:
          'Carbon-X is designed around usable technology rather than abstract climate messaging. Product and engineering decisions are meant to support clarity, trust, and repeat participation.',
      },
      {
        title: 'Management focused on disciplined growth',
        description:
          'Strong execution requires more than good ideas. Management direction is focused on product validation, communication quality, brand credibility, and responsible long-term scaling.',
      },
    ],
    answersTitle: 'Questions about the team and leadership',
    answers: [
      {
        question: 'Why does an early-stage climate brand need a strong About page?',
        answer:
          'People want to know who is behind the mission. A strong About page adds credibility by showing that Carbon-X is being developed with clear leadership, real product intent, and a serious sustainability vision.',
      },
      {
        question: 'What kind of leadership matters most for Carbon-X?',
        answer:
          'The platform needs a balance of founder vision, technical execution, and day-to-day management. That combination helps turn a strong idea into a usable product with long-term growth potential.',
      },
      {
        question: 'How does the team approach the product professionally?',
        answer:
          'The direction is focused on clarity, measurable impact, strong communication, and controlled iteration during beta. That is an important foundation for trust in any sustainability-focused technology product.',
      },
    ],
  },
  features: {
    badge: 'Feature overview',
    title: 'Explore the platform.',
    accentTitle: 'Built for real habit change.',
    description:
      'The Carbon-X feature set is designed to help users log actions quickly, understand impact clearly, and stay engaged with sustainability over time.',
    primaryHref: '/beta',
    primaryLabel: 'Beta details',
    secondaryHref: '/impact',
    secondaryLabel: 'View impact',
    overviewEyebrow: 'Feature strategy',
    overviewTitle: 'A feature system designed around clarity, trust, and repeat use',
    overviewIntro:
      'Every major feature in Carbon-X supports one goal: helping users take sustainable action more often without making the experience complicated.',
    overviewParagraphs: [
      'Good climate products do more than present information. They reduce friction at the moment a user wants to act. Carbon-X is structured so people can record eco-friendly behavior quickly, understand what it means, and return to the product without feeling overwhelmed by data or jargon.',
      'The feature mix balances motivation with accountability. Tracking tools, analytics, achievements, and progress signals are meant to reinforce responsible habits while still communicating a serious environmental purpose. This makes the experience suitable for both everyday users and future community or institutional programs.',
      'Professional sustainability software also needs trust. Privacy, transparency, and understandable reporting are essential if the product is going to grow beyond novelty. Carbon-X therefore presents its features as part of a broader system for awareness, consistency, and long-term engagement.',
    ],
    pillarTitle: 'How the feature set creates value',
    pillars: [
      {
        title: 'Low-friction action logging',
        description:
          'Users should be able to capture sustainable behavior in seconds. The simpler the logging flow, the more likely it is that a positive action becomes part of a regular routine instead of being forgotten.',
      },
      {
        title: 'Readable impact analytics',
        description:
          'Charts and summaries are useful only when they translate behavior into understandable outcomes. Carbon-X focuses on impact storytelling that explains progress without forcing users to interpret raw climate data on their own.',
      },
      {
        title: 'Retention through meaningful motivation',
        description:
          'Gamified systems work best when they support a real mission. In Carbon-X, rewards and streaks are intended to reinforce climate-positive behavior rather than distract from the environmental value behind each action.',
      },
    ],
    answersTitle: 'Questions about the feature direction',
    answers: [
      {
        question: 'Are these features intended only for individual users?',
        answer:
          'The current experience speaks directly to individuals, but the structure is also relevant for student communities, teams, campaigns, and future partnership programs that want a more engaging sustainability layer.',
      },
      {
        question: 'Why combine analytics with gamification?',
        answer:
          'Analytics explain impact, while gamification supports consistency. Together they help users understand both the environmental meaning of their choices and the personal progress they are making over time.',
      },
      {
        question: 'Why is privacy positioned as a core feature?',
        answer:
          'Sustainability platforms often ask users to share behavior data. If trust is weak, adoption suffers. A privacy-first approach helps Carbon-X feel professional, responsible, and ready for more serious long-term use.',
      },
    ],
  },
  'x-coin': {
    badge: 'Incentive layer',
    title: 'Reward every action.',
    accentTitle: 'Make impact more tangible.',
    description:
      'X-Coin is the Carbon-X reward system that gives eco-friendly actions a visible value users can understand, track, and build over time.',
    primaryHref: '/beta',
    primaryLabel: 'Beta details',
    secondaryHref: '/how-it-works',
    secondaryLabel: 'See the journey',
    overviewEyebrow: 'Why X-Coin',
    overviewTitle: 'An incentive system designed to support behavior, not distract from it',
    overviewIntro:
      'X-Coin gives Carbon-X a simple way to represent progress while keeping the focus on measurable environmental action.',
    overviewParagraphs: [
      'Rewards are most effective when people understand what they represent. In Carbon-X, X-Coin is tied to the idea that sustainable choices create value. That value is not abstract branding; it helps users see that repeated climate-positive behavior can be tracked, recognized, and communicated clearly.',
      'A good reward layer should encourage participation without undermining credibility. That is why the X-Coin model is presented alongside environmental equivalents and impact explanations. Users should feel motivated, but they should also understand how their balance connects back to real-world emissions savings.',
      'Over time, a system like X-Coin can support community campaigns, milestone recognition, and partner benefits. Even at the beta stage, it already provides something important: a consistent language for progress that feels more engaging than raw numbers alone.',
    ],
    pillarTitle: 'What makes the reward model professional',
    pillars: [
      {
        title: 'Transparent conversion logic',
        description:
          'A visible relationship between actions, carbon savings, and X-Coin makes the system easier to trust. Clear conversion rules also make future product decisions easier to communicate to users and partners.',
      },
      {
        title: 'Habit reinforcement rather than hype',
        description:
          'The purpose of X-Coin is to strengthen sustainable routines. It is designed as a behavior signal that rewards repeated effort, not as a gimmick that overwhelms the environmental message of the product.',
      },
      {
        title: 'Scalable value for future programs',
        description:
          'A structured reward layer creates room for future challenges, referrals, campus initiatives, redemption campaigns, and partnership benefits while preserving a consistent brand language across the product.',
      },
    ],
    answersTitle: 'Common questions about X-Coin',
    answers: [
      {
        question: 'Is X-Coin meant to be financial currency?',
        answer:
          'At this stage, X-Coin functions as a product-level reward and progress system. Its job is to make sustainable behavior easier to value and communicate inside the Carbon-X experience.',
      },
      {
        question: 'Why connect coins to environmental outcomes?',
        answer:
          'That connection prevents the system from feeling arbitrary. When users understand how rewards relate to saved emissions or better choices, the product feels more honest and more meaningful.',
      },
      {
        question: 'Can the reward layer grow later?',
        answer:
          'Yes. A well-designed reward system can expand into campaigns, community programs, milestones, or partner benefits. Building the logic early gives Carbon-X a stronger foundation for that future growth.',
      },
    ],
  },
  'how-it-works': {
    badge: 'Product flow',
    title: 'Start simply.',
    accentTitle: 'Stay consistent over time.',
    description:
      'Carbon-X is structured around a clear journey: join the beta, log actions, understand results, and keep building better sustainability habits.',
    primaryHref: '/beta',
    primaryLabel: 'Join the beta',
    secondaryHref: '/features',
    secondaryLabel: 'See features',
    overviewEyebrow: 'User journey',
    overviewTitle: 'A straightforward flow that turns climate intent into repeatable action',
    overviewIntro:
      'The Carbon-X journey is intentionally simple because sustainable products are more effective when people can understand the next step immediately.',
    overviewParagraphs: [
      'The first stage is awareness and onboarding. Users need to know what the platform does, why it matters, and what value they will get from participating. Carbon-X therefore frames the experience around practical action rather than abstract climate theory.',
      'The second stage is daily use. Logging eco-actions should feel lightweight enough to repeat regularly. This is important because climate engagement often drops when the product asks for too much effort before delivering any visible sense of progress or reward.',
      'The third stage is reflection and momentum. Once users see what they have saved, how they compare over time, and how their actions translate into broader impact, the product becomes more than a tracker. It becomes a tool that supports identity, consistency, and long-term commitment.',
    ],
    pillarTitle: 'Why this flow works',
    pillars: [
      {
        title: 'Easy entry for new users',
        description:
          'Strong onboarding lowers hesitation and helps users understand the value of participating quickly. That matters especially for climate products that may otherwise feel educational before they feel useful.',
      },
      {
        title: 'Fast feedback after every action',
        description:
          'People are more likely to return when the product responds clearly to their effort. Immediate feedback helps connect a logged action to visible progress, which strengthens habit formation.',
      },
      {
        title: 'A journey that supports retention',
        description:
          'The sequence from action to insight to progression gives Carbon-X a more durable product loop. Users are not just recording behavior; they are building a continuing record of climate-positive participation.',
      },
    ],
    answersTitle: 'Questions about the experience flow',
    answers: [
      {
        question: 'Why keep the process so simple?',
        answer:
          'Simplicity increases participation. A product that asks for too much time or interpretation early on usually loses users before the environmental mission has a chance to become meaningful.',
      },
      {
        question: 'How often should someone use Carbon-X?',
        answer:
          'The ideal cadence is regular but manageable. Carbon-X works best when it supports frequent, realistic logging rather than demanding constant attention or encouraging performative activity.',
      },
      {
        question: 'What makes this flow different from a normal tracker?',
        answer:
          'Carbon-X combines behavior logging, impact communication, and motivational design. That gives users a clearer sense of why their actions matter and helps the experience feel more purposeful than a basic checklist.',
      },
    ],
  },
  impact: {
    badge: 'Live impact view',
    title: 'Measure progress.',
    accentTitle: 'Show real environmental value.',
    description:
      'The impact page helps users understand emissions savings, conservation metrics, and environmental equivalents in a format that feels credible and easy to read.',
    primaryHref: '/beta',
    primaryLabel: 'Beta details',
    secondaryHref: '/x-coin',
    secondaryLabel: 'Explore X-Coin',
    overviewEyebrow: 'Impact reporting',
    overviewTitle: 'Metrics that help users understand why their actions matter',
    overviewIntro:
      'Impact data is most valuable when it is accurate enough to trust and simple enough to understand at a glance.',
    overviewParagraphs: [
      'Carbon-X presents environmental outcomes in a way that helps users connect behavior with consequences. Instead of leaving sustainability as a vague aspiration, the product translates logged actions into more concrete signals such as carbon savings, water conservation, and transport-related equivalents.',
      'Readable impact design is especially important for public-facing climate products. If the numbers feel confusing, users disengage. If they feel exaggerated, trust weakens. Carbon-X therefore aims to balance motivation with restraint by using simple visual structures and understandable comparisons.',
      'The broader value of an impact page is strategic as well as educational. It gives users proof of progress, gives the brand a stronger credibility layer, and creates a foundation for future reporting, campaigns, and partnerships built around measurable sustainability outcomes.',
    ],
    pillarTitle: 'What strong impact communication requires',
    pillars: [
      {
        title: 'Clear primary metrics',
        description:
          'Users need to know which numbers matter most. Carbon-X keeps the focus on understandable environmental measures so the experience feels informative without turning into a dense reporting dashboard.',
      },
      {
        title: 'Useful real-world equivalents',
        description:
          'Comparisons such as tree-equivalent absorption can help users interpret what a carbon figure means. When used carefully, these equivalents make abstract climate data easier to remember and discuss.',
      },
      {
        title: 'Consistency over time',
        description:
          'Impact becomes more meaningful when users can see progression. Repeated reporting reinforces the idea that sustainable habits accumulate into larger environmental outcomes rather than standing as isolated moments.',
      },
    ],
    answersTitle: 'Questions about the impact view',
    answers: [
      {
        question: 'Why are equivalents like trees useful?',
        answer:
          'Most people do not instinctively understand a carbon figure on its own. Equivalents provide context, helping users relate the number to something more familiar while preserving the focus on measurable impact.',
      },
      {
        question: 'Why show more than one metric?',
        answer:
          'Sustainability is multidimensional. Carbon is central, but water conservation and transport-related offsets can also help users understand how different behaviors contribute to a broader environmental picture.',
      },
      {
        question: 'What makes a public impact page valuable for the brand?',
        answer:
          'A visible impact page signals seriousness. It shows that Carbon-X is not only interested in lifestyle branding, but also in communicating progress in a way that can support trust, conversation, and long-term adoption.',
      },
    ],
  },
  beta: {
    badge: 'Current stage',
    title: 'Build the product carefully.',
    accentTitle: 'Prepare for a stronger launch.',
    description:
      'Carbon-X is in beta so the team can validate the experience, strengthen the reward logic, and improve how impact is measured before wider release.',
    primaryHref: '/features',
    primaryLabel: 'Explore features',
    secondaryHref: '/impact',
    secondaryLabel: 'See impact',
    overviewEyebrow: 'Beta phase',
    overviewTitle: 'A professional beta is about validation, refinement, and trust',
    overviewIntro:
      'The beta phase gives Carbon-X room to improve the product experience before scaling to a wider public audience.',
    overviewParagraphs: [
      'A strong beta is not just an early preview. It is an important stage for testing assumptions about usability, motivation, and impact communication. Carbon-X is using this period to learn what feels intuitive, what needs better explanation, and what users value most in the experience.',
      'This stage is also important for system quality. Reward mechanics, environmental equivalents, and interface flows all need to feel coherent before the product expands. Beta feedback helps the team adjust the product where confidence, clarity, or retention can be improved.',
      'For a sustainability platform, careful rollout matters. Users need to trust the product before they rely on it as part of their routine. By treating beta as a structured learning phase, Carbon-X positions itself more professionally for future growth and public launch.',
    ],
    pillarTitle: 'What the beta phase is focused on',
    pillars: [
      {
        title: 'Testing the core product loop',
        description:
          'The team is validating how easily users can understand the product, log actions, interpret their progress, and return to the experience again with confidence.',
      },
      {
        title: 'Improving reward and impact logic',
        description:
          'Beta feedback helps confirm whether the incentive system feels motivating and whether the environmental explanations feel clear, balanced, and credible to users.',
      },
      {
        title: 'Preparing for reliable growth',
        description:
          'Before launch, the product needs stronger polish, clearer messaging, and confidence in the overall journey. A disciplined beta creates better foundations than rushing into wide public exposure.',
      },
    ],
    answersTitle: 'Questions about beta access and launch readiness',
    answers: [
      {
        question: 'Is the app publicly available right now?',
        answer:
          'No. The current messaging makes it clear that Carbon-X is still in beta. That helps set the right expectations while the product experience, impact logic, and reward design continue to improve.',
      },
      {
        question: 'Why stay in beta instead of launching immediately?',
        answer:
          'A premature launch can damage trust. Beta gives the team time to refine the experience, improve clarity, and make sure the product delivers consistent value before it reaches a broader audience.',
      },
      {
        question: 'What should visitors expect during this phase?',
        answer:
          'Visitors should expect ongoing refinement, clearer product direction, and more polished communication over time. The beta page exists to explain that Carbon-X is being developed with intention rather than rushed to market.',
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
  const [displayValue, setDisplayValue] = useState(() => {
    const target = parseCountTarget(value);

    if (!target) {
      return value ? String(value) : '—';
    }

    return formatCountValue(target, start ? target.value : 0);
  });

  useEffect(() => {
    const target = parseCountTarget(value);

    if (!target) {
      setDisplayValue(value ? String(value) : '—');
      return;
    }

    if (!start) {
      setDisplayValue(formatCountValue(target, 0));
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(formatCountValue(target, target.value));
      return;
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
  }, [duration, start, value]);

  return <>{displayValue}</>;
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

function ThemeToggleButton({
  theme,
  onToggle,
  className = '',
}: {
  theme: ThemeMode;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type='button'
      className={`theme-toggle ${className}`.trim()}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={theme === 'dark'}
      onClick={onToggle}
    >
      {theme === 'dark' ? <Sun style={{ width: 18, height: 18 }} /> : <Moon style={{ width: 18, height: 18 }} />}
    </button>
  );
}

/* ═══════════════════════════════════════
   Navbar
   ═══════════════════════════════════════ */

function Navbar({
  theme,
  onToggleTheme,
}: {
  theme: ThemeMode;
  onToggleTheme: () => void;
}) {
  const pathname = usePathname();
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

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`site-header ${scrolled || mobileMenuOpen ? 'site-header--floating' : ''}`}>
        <nav className={`site-nav ${scrolled || mobileMenuOpen ? 'site-nav--floating' : ''}`}>
          <Link href='/' className='site-nav__brand' aria-label='Go to the CARBON-X homepage'>
            <Image
              src='/images/logo-v2.png'
              alt='CARBON-X'
              width={1225}
              height={835}
              className='site-nav__brand-logo'
              style={{ height: 30, width: 'auto' }}
            />
            <span className='site-nav__brand-text text-gradient'>CARBON-X</span>
          </Link>

          <div className='site-nav__desktop'>
            <div className='site-nav__links'>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className='nav-link'
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  <item.icon style={{ width: 14, height: 14 }} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <ThemeToggleButton theme={theme} onToggle={onToggleTheme} />
            <Link href='/beta' className='button-primary button-primary--compact site-nav__cta'>
              <Star style={{ width: 14, height: 14 }} />
              <span>Beta Phase</span>
            </Link>
          </div>

          <div className='site-nav__controls'>
            <ThemeToggleButton theme={theme} onToggle={onToggleTheme} />
            <button
              type='button'
              className='site-nav__toggle'
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-controls='site-mobile-menu'
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <>
            <motion.div
              key='mobile-nav-backdrop'
              className='site-nav__backdrop'
              aria-hidden='true'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease }}
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              key='mobile-nav-modal'
              id='site-mobile-menu'
              className='site-nav__mobile-modal'
              initial={{ opacity: 0, y: -18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.28, ease }}
            >
              <motion.div
                className='site-nav__mobile'
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.22, delay: 0.04, ease }}
              >
                <div className='site-nav__mobile-header'>
                  <div className='site-nav__mobile-title-group'>
                    <span className='site-nav__mobile-eyebrow'>Navigation</span>
                    <span className='site-nav__mobile-title'>Explore Carbon-X</span>
                  </div>
                  <button
                    type='button'
                    className='site-nav__mobile-close'
                    aria-label='Close navigation menu'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X style={{ width: 18, height: 18 }} />
                  </button>
                </div>

                <div className='site-nav__mobile-links'>
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.22, delay: 0.16 + index * 0.05, ease }}
                    >
                      <Link
                        href={item.href}
                        className='site-nav__mobile-link'
                        aria-current={pathname === item.href ? 'page' : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon style={{ width: 16, height: 16 }} />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.24, delay: 0.36, ease }}
                >
                  <Link
                    href='/beta'
                    className='site-nav__mobile-cta button-primary'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Star style={{ width: 16, height: 16 }} />
                    <span>Beta Phase</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════
   Hero
   ═══════════════════════════════════════ */

function Hero({
  content,
  showScrollHint = true,
}: {
  content: PageContent;
  showScrollHint?: boolean;
}) {
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
      {/* Radial gradient background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, var(--hero-orb-primary) 0%, transparent 62%), radial-gradient(ellipse 55% 36% at 82% 34%, var(--hero-orb-secondary) 0%, transparent 52%), radial-gradient(ellipse 50% 34% at 16% 78%, var(--hero-orb-tertiary) 0%, transparent 52%)',
        }}
      />

      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          backgroundImage:
            'linear-gradient(var(--hero-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid-line) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className='badge' style={{ marginBottom: 32, display: 'inline-flex' }}>
            <Zap style={{ width: 14, height: 14 }} /> {content.badge}
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
          {content.title}
          <br />
          <span className='text-gradient'>{content.accentTitle}</span>
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
          <Link href={content.primaryHref} className='button-primary'>
            <Star style={{ width: 18, height: 18 }} />
            <span>{content.primaryLabel}</span>
            <ArrowRight style={{ width: 18, height: 18 }} />
          </Link>
          <Link href={content.secondaryHref} className='button-secondary'>
            <Zap style={{ width: 18, height: 18 }} />
            <span>{content.secondaryLabel}</span>
          </Link>
        </motion.div>

        {/* Scroll hint */}
        {showScrollHint ? (
          <motion.div
            style={{ marginTop: 56, display: 'flex', justifyContent: 'center' }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown style={{ width: 22, height: 22, color: 'var(--text-muted)' }} />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

function InnerPageHero({ content }: { content: PageContent }) {
  return (
    <section
      style={{
        padding: '160px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--hero-orb-primary) 28%, transparent) 0%, transparent 62%), radial-gradient(circle at 12% 18%, color-mix(in srgb, var(--accent-green) 12%, transparent) 0%, transparent 36%), radial-gradient(circle at 88% 20%, color-mix(in srgb, var(--accent-teal) 12%, transparent) 0%, transparent 34%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1120,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 28,
          alignItems: 'start',
        }}
      >
        <FadeIn>
          <div>
            <span className='badge' style={{ display: 'inline-flex', marginBottom: 22 }}>
              <Zap style={{ width: 14, height: 14 }} /> {content.badge}
            </span>

            <h1
              style={{
                fontSize: 'clamp(40px, 6vw, 76px)',
                lineHeight: 0.98,
                letterSpacing: '-0.04em',
                fontWeight: 900,
                marginBottom: 20,
                maxWidth: 700,
              }}
            >
              {content.title} <span className='text-gradient'>{content.accentTitle}</span>
            </h1>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.85,
                color: 'var(--text-secondary)',
                maxWidth: 620,
                marginBottom: 32,
              }}
            >
              {content.description}
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href={content.primaryHref} className='button-primary'>
                <Star style={{ width: 18, height: 18 }} />
                <span>{content.primaryLabel}</span>
              </Link>
              <Link href={content.secondaryHref} className='button-secondary'>
                <ArrowRight style={{ width: 18, height: 18 }} />
                <span>{content.secondaryLabel}</span>
              </Link>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div style={{ display: 'grid', gap: 18 }}>
            <div className='card glow' style={{ padding: '28px 24px' }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-green)',
                  marginBottom: 10,
                }}
              >
                Page overview
              </p>
              <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
                {content.overviewTitle}
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>
                {content.overviewIntro}
              </p>
            </div>

            <div
              className='card'
              style={{
                padding: '24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: 16,
              }}
            >
              <div>
                <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 6 }}>
                  Focus
                </p>
                <p style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>{content.pillars.length}</p>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>core themes</p>
              </div>
              <div>
                <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 6 }}>
                  Detail
                </p>
                <p style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>{content.answers.length}</p>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>key answers</p>
              </div>
              <div>
                <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 6 }}>
                  Style
                </p>
                <p style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>Inner</p>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>page layout</p>
              </div>
            </div>
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
                Framework
              </p>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>
                {content.pillarTitle}
              </h2>
            </div>
            <p style={{ maxWidth: 480, fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>
              This section breaks the page into a clearer inner-page format, so visitors scan structured ideas instead of another full landing-page hero stack.
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

function PageOverview({ content }: { content: PageContent }) {
  return (
    <section style={{ padding: '110px 24px 80px' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 52px' }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-green)',
                marginBottom: 12,
              }}
            >
              {content.overviewEyebrow}
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
              {content.overviewTitle}
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{content.overviewIntro}</p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
          {content.overviewParagraphs.map((paragraph, index) => (
            <FadeIn key={paragraph} delay={index * 0.07}>
              <div className='card glow' style={{ padding: '30px 28px', height: '100%' }}>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text-secondary)', margin: 0 }}>{paragraph}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function PagePillars({ content }: { content: PageContent }) {
  return (
    <section style={{ padding: '30px 24px 100px' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 46 }}>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14 }}>
              {content.pillarTitle}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: 700, margin: '0 auto' }}>
              Each page in Carbon-X is meant to explain the product with more context, stronger trust signals, and more useful language for people evaluating the idea carefully.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
          {content.pillars.map((pillar, index) => (
            <FadeIn key={pillar.title} delay={index * 0.08}>
              <div className='card' style={{ padding: '32px 28px', height: '100%' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 12 }}>{pillar.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>{pillar.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function PageAnswers({ content }: { content: PageContent }) {
  return (
    <section style={{ padding: '0 24px 110px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 42 }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-teal)',
                marginBottom: 12,
              }}
            >
              Professional context
            </p>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              {content.answersTitle}
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gap: 18 }}>
          {content.answers.map((item, index) => (
            <FadeIn key={item.question} delay={index * 0.06}>
              <div className='card' style={{ padding: '28px 26px' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 10 }}>{item.question}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text-secondary)', margin: 0 }}>{item.answer}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

const leadershipProfiles = [
  {
    featured: true,
    role: 'Founder & Lead Developer',
    name: 'Arman Khan',
    image:
      'https://media.licdn.com/dms/image/v2/D5603AQG9pgKdWt0kRA/profile-displayphoto-scale_400_400/B56Z0_nCrSKcAg-/0/1774888694864?e=1776902400&v=beta&t=xnOkPfABjNIpKbC2HNbP-O-MTSURVhvd8prclJBd0ac',
    summary:
      'Arman Khan leads the Carbon-X vision and core product development. His role brings together founder-led strategy, hands-on execution, and the technical direction required to shape the platform from concept to launch.',
  },
  {
    featured: false,
    role: 'Lead Web Developer',
    name: 'Abishrant Shandilya',
    image:
      'https://media.licdn.com/dms/image/v2/D5603AQHiEx2WFw2pwA/profile-displayphoto-scale_400_400/B56Z1UxWy9KsAg-/0/1775243724580?e=1776902400&v=beta&t=QgNCzyF0zINgzNZa50fYvWcg7JaH4z9lXJFIECccAbI',
    summary:
      'Abishrant Shandilya drives the web experience behind Carbon-X, focusing on interface quality, responsive implementation, and the frontend systems that make the platform feel polished, usable, and professional across devices.',
  },
  {
    featured: false,
    role: 'Strategy Lead',
    name: 'Dil Hameem Nelofar',
    image:
      'https://media.licdn.com/dms/image/v2/D5603AQFpFwXtMfQn5A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727644252148?e=1776902400&v=beta&t=0y3CHkntFxbMKh2WSL-pILzwTahQC-nbOYd-ZgJdx68',
    summary:
      'Dil Hameem Nelofar supports Carbon-X through strategy, planning, and growth-oriented thinking. The role helps align product priorities, communication, and long-term direction as the platform evolves during beta.',
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
  const founderProfile = leadershipProfiles.find((profile) => profile.featured);
  const supportingProfiles = leadershipProfiles.filter((profile) => !profile.featured);
  const orderedProfiles = founderProfile
    ? [supportingProfiles[0], founderProfile, supportingProfiles[1]].filter(Boolean)
    : leadershipProfiles;

  return (
    <section style={{ padding: '0 24px 110px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}>
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
              Our team
            </p>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
              The people building Carbon-X
            </h2>
          </div>
        </FadeIn>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 22,
            alignItems: 'stretch',
          }}
        >
          {orderedProfiles.map((profile, index) => {
            const isFounder = profile.featured;

            return (
              <FadeIn key={profile.role} delay={index * 0.07}>
                <div
                  className='card glow'
                  style={{
                    padding: isFounder ? '28px' : '22px',
                    minHeight: isFounder ? 620 : 520,
                    height: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: isFounder ? 190 : 138,
                      height: isFounder ? 190 : 138,
                      margin: '0 auto 20px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      background:
                        'linear-gradient(180deg, color-mix(in srgb, var(--accent-green) 18%, transparent) 0%, color-mix(in srgb, var(--surface-strong) 86%, transparent) 100%)',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: isFounder
                        ? '0 20px 48px color-mix(in srgb, var(--accent-green) 14%, transparent)'
                        : 'none',
                    }}
                  >
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      fill
                      sizes={isFounder ? '190px' : '138px'}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: isFounder ? '0.14em' : '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-green)',
                      marginBottom: 10,
                    }}
                  >
                    {profile.role}
                  </p>
                  <h3
                    style={{
                      fontSize: isFounder ? 'clamp(28px, 4vw, 38px)' : 24,
                      fontWeight: isFounder ? 900 : 800,
                      letterSpacing: '-0.03em',
                      marginBottom: 14,
                    }}
                  >
                    {profile.name}
                  </h3>
                  <p
                    style={{
                      fontSize: isFounder ? 16 : 15,
                      lineHeight: isFounder ? 1.9 : 1.85,
                      color: 'var(--text-secondary)',
                      margin: 0,
                    }}
                  >
                    {profile.summary}
                  </p>
                </div>
              </FadeIn>
            );
          })}
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
    <section ref={impactSectionRef} id='impact' className='impact-section' style={{ padding: '120px 24px' }}>
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

        <div className='impact-orbit'>
          <div className='impact-orbit__cluster'>
            {visibleImpacts.map((item) => (
              <div key={item.id} className={`impact-orbit__item impact-orbit__item--${item.id}`}>
                <div
                  className='card impact-card impact-card--orbit'
                  style={{
                    boxShadow: `0 30px 80px ${item.color}18`,
                  }}
                >
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
              style={{
                boxShadow: '0 40px 120px rgba(52, 211, 153, 0.18)',
              }}
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
        <div className='site-footer__hero'>
          <span className='site-footer__eyebrow'>Climate technology platform</span>
          <div className='site-footer__brand'>
            <Image src='/images/logo-v2.png' alt='CARBON-X' width={1225} height={835} style={{ height: 34, width: 'auto' }} />
            <span className='site-footer__brand-name'>CARBON-X</span>
          </div>
          <p className='site-footer__lead'>
            Carbon-X is building a more engaging way to track carbon-conscious habits, communicate sustainability impact, and make better environmental action feel measurable and meaningful.
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
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [themeReady, setThemeReady] = useState(false);
  const [siteConstants, setSiteConstants] = useState<SiteConstants>(EMPTY_SITE_CONSTANTS);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('carbonx-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
      setThemeReady(true);
      return;
    }

    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) {
      return;
    }

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('carbonx-theme', theme);
  }, [theme, themeReady]);

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
      {isHomePage ? (
        <div className='noise' />
      ) : (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(circle at 15% 10%, color-mix(in srgb, var(--accent-green) 8%, transparent) 0%, transparent 28%), radial-gradient(circle at 85% 12%, color-mix(in srgb, var(--accent-teal) 9%, transparent) 0%, transparent 24%), linear-gradient(180deg, color-mix(in srgb, var(--surface-strong) 36%, transparent) 0%, transparent 32%)',
            zIndex: 0,
          }}
        />
      )}
      <Navbar theme={theme} onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />
      <main className='page-shell'>
        {isHomePage ? <Hero content={content} showScrollHint={isHomePage} /> : <InnerPageHero content={content} />}
        {page === 'home' ? (
          <>
            <PageOverview content={content} />
            <PagePillars content={content} />
            <Features />
            <div className='section-divider' />
            <XCoin />
            <div className='section-divider' />
            <HowItWorks />
            <div className='section-divider' />
            <Impact constants={siteConstants} />
            <PageAnswers content={content} />
            <BetaPhase />
          </>
        ) : null}
        {page === 'about' ? (
          <>
            <InnerPageStory content={content} />
            <InnerPageFramework content={content} />
            <TeamSection />
            <InnerPageAnswers content={content} />
            <BetaPhase />
          </>
        ) : null}
        {page === 'features' ? (
          <>
            <InnerPageStory content={content} />
            <Features />
            <div className='section-divider' />
            <InnerPageFramework content={content} />
            <InnerPageAnswers content={content} />
            <BetaPhase />
          </>
        ) : null}
        {page === 'x-coin' ? (
          <>
            <InnerPageStory content={content} />
            <XCoin />
            <div className='section-divider' />
            <InnerPageFramework content={content} />
            <InnerPageAnswers content={content} />
            <BetaPhase />
          </>
        ) : null}
        {page === 'how-it-works' ? (
          <>
            <InnerPageStory content={content} />
            <HowItWorks />
            <div className='section-divider' />
            <InnerPageFramework content={content} />
            <InnerPageAnswers content={content} />
            <BetaPhase />
          </>
        ) : null}
        {page === 'impact' ? (
          <>
            <InnerPageStory content={content} />
            <Impact constants={siteConstants} />
            <div className='section-divider' />
            <InnerPageFramework content={content} />
            <InnerPageAnswers content={content} />
            <BetaPhase />
          </>
        ) : null}
        {page === 'beta' ? (
          <>
            <InnerPageStory content={content} />
            <InnerPageFramework content={content} />
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

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const desktopLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Impact', href: '/impact' },
  { label: 'About', href: '/about' },
] as const;

const mobileLinks = [...desktopLinks, { label: 'X-Coin', href: '/x-coin' }] as const;

export function SiteNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateState = () => {
      const availableScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = availableScroll > 0 ? window.scrollY / availableScroll : 0;

      setIsScrolled(window.scrollY > 20);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateState();
      });
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 960) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', closeOnDesktop);
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={[
          'pointer-events-none fixed inset-x-0 top-0 z-50 transition-[padding] duration-300',
          isScrolled
            ? 'pt-[clamp(0.65rem,1vw,0.9rem)]'
            : 'pt-[clamp(1rem,1.8vw,1.45rem)]',
        ].join(' ')}
      >
        <div className='mx-auto w-[min(94vw,78rem)]'>
          <div
            className={[
              'pointer-events-auto grid min-h-[clamp(4rem,5vw,4.6rem)] grid-cols-[auto_1fr_auto] items-center gap-[clamp(0.9rem,1.8vw,1.5rem)] rounded-[1.65rem] border border-white/72 px-[clamp(1rem,2vw,1.45rem)] shadow-[0_1.2rem_3rem_rgba(23,32,27,0.09)] transition-all duration-300',
              isScrolled
                ? 'bg-[rgba(255,255,255,0.84)] backdrop-blur-xl'
                : 'bg-[rgba(255,255,255,0.68)] backdrop-blur-lg',
            ].join(' ')}
          >
            <Link
              href='/'
              aria-label='Go to the Carbon-X homepage'
              className='flex min-w-0 items-center gap-[clamp(0.72rem,1vw,0.9rem)] text-[#17201B] no-underline'
            >
              <span className='grid h-[clamp(2.35rem,3vw,2.7rem)] w-[clamp(2.35rem,3vw,2.7rem)] shrink-0 place-items-center rounded-[0.95rem] border border-[#1F7A4C]/12 bg-[linear-gradient(180deg,rgba(234,244,238,0.95),rgba(255,255,255,0.96))] text-[clamp(0.85rem,0.95vw,0.98rem)] font-semibold tracking-[-0.06em] text-[#1F7A4C] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]'>
                CX
              </span>

              <span className='min-w-0'>
                <span className='block truncate text-[clamp(0.95rem,1vw,1.04rem)] font-semibold tracking-[-0.03em] text-[#17201B]'>
                  Carbon-X
                </span>
                <span className='block truncate text-[clamp(0.68rem,0.72vw,0.74rem)] font-medium uppercase tracking-[0.18em] text-[#5F6B63]'>
                  Climate intelligence
                </span>
              </span>
            </Link>

            <div className='hidden min-[960px]:flex min-w-0 items-center justify-center'>
              <nav aria-label='Primary navigation' className='rounded-full border border-[#17201B]/6 bg-white/60 px-[clamp(0.45rem,0.8vw,0.65rem)] py-[0.36rem] backdrop-blur-sm'>
                <ul className='flex list-none items-center gap-[clamp(0.3rem,0.8vw,0.55rem)]'>
                  {desktopLinks.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={isActive ? 'page' : undefined}
                          className={[
                            'inline-flex min-h-[2.35rem] items-center rounded-full px-[clamp(0.85rem,1vw,1.05rem)] text-[clamp(0.78rem,0.84vw,0.88rem)] font-medium no-underline transition-all duration-200',
                            isActive
                              ? 'bg-[#17201B] text-white shadow-[0_0.5rem_1.1rem_rgba(23,32,27,0.16)]'
                              : 'text-[#5F6B63] hover:bg-white hover:text-[#17201B]',
                          ].join(' ')}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className='hidden min-[960px]:flex items-center justify-end gap-[0.7rem]'>
              <Link
                href='/beta'
                className='group inline-flex min-h-[2.7rem] items-center gap-[0.7rem] rounded-full border border-[#17201B]/10 bg-[#17201B] px-[clamp(1rem,1.2vw,1.15rem)] text-[clamp(0.78rem,0.84vw,0.9rem)] font-semibold text-white no-underline shadow-[0_0.85rem_1.8rem_rgba(23,32,27,0.14)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#1F7A4C]'
              >
                <span>Join beta</span>
                <span className='grid h-[1.55rem] w-[1.55rem] place-items-center rounded-full bg-white/12 ring-1 ring-white/12 transition-transform duration-200 group-hover:translate-x-[0.05rem]'>
                  <ArrowUpRight className='h-[0.85rem] w-[0.85rem]' aria-hidden='true' />
                </span>
              </Link>
            </div>

            <div className='flex justify-end min-[960px]:hidden'>
              <button
                type='button'
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-controls='site-mobile-menu'
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className='inline-flex min-h-[clamp(2.75rem,10vw,3rem)] items-center gap-[0.55rem] rounded-full border border-[#17201B]/10 bg-white/70 px-[clamp(0.9rem,3vw,1.05rem)] text-[0.82rem] font-medium text-[#17201B] backdrop-blur-md'
              >
                <span>Menu</span>
                {menuOpen ? <X className='h-[0.95rem] w-[0.95rem]' aria-hidden='true' /> : <Menu className='h-[0.95rem] w-[0.95rem]' aria-hidden='true' />}
              </button>
            </div>
          </div>

          <div className='pointer-events-none mx-auto mt-[0.42rem] h-px w-[min(92vw,74rem)] overflow-hidden rounded-full bg-[#DDE5DD]/72'>
            <span
              className='block h-full origin-left bg-[#1F7A4C] transition-transform duration-100 ease-linear'
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type='button'
              aria-label='Close navigation menu'
              className='fixed inset-0 z-40 border-0 bg-[#17201B]/16 backdrop-blur-[2px] min-[960px]:hidden'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              id='site-mobile-menu'
              className='fixed inset-x-[clamp(1rem,4vw,1.4rem)] top-[clamp(5.25rem,16vw,6.2rem)] z-50 overflow-hidden rounded-[1.6rem] border border-white/70 bg-[rgba(255,255,255,0.92)] p-[clamp(1rem,4vw,1.3rem)] shadow-[0_1.5rem_3rem_rgba(23,32,27,0.16)] backdrop-blur-2xl min-[960px]:hidden'
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className='flex items-center justify-between gap-[1rem] border-b border-[#DDE5DD] pb-[0.95rem]'>
                <div>
                  <p className='text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#1F7A4C]'>Navigation</p>
                  <p className='mt-[0.22rem] text-[1.15rem] font-semibold tracking-[-0.04em] text-[#17201B]'>Carbon-X</p>
                </div>
                <button
                  type='button'
                  aria-label='Close navigation menu'
                  onClick={() => setMenuOpen(false)}
                  className='grid h-[2.35rem] w-[2.35rem] place-items-center rounded-full border border-[#17201B]/10 bg-white text-[#17201B]'
                >
                  <X className='h-[0.95rem] w-[0.95rem]' aria-hidden='true' />
                </button>
              </div>

              <nav aria-label='Mobile navigation' className='mt-[0.55rem]'>
                <ul className='grid list-none gap-[0.2rem]'>
                  {mobileLinks.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={isActive ? 'page' : undefined}
                          onClick={() => setMenuOpen(false)}
                          className={[
                            'flex min-h-[3.1rem] items-center justify-between rounded-[1rem] px-[0.9rem] text-[0.98rem] font-medium no-underline transition-colors duration-200',
                            isActive ? 'bg-[#17201B] text-white' : 'text-[#17201B] hover:bg-[#F3F6F2]',
                          ].join(' ')}
                        >
                          <span>{item.label}</span>
                          <ArrowUpRight className='h-[0.95rem] w-[0.95rem] opacity-60' aria-hidden='true' />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <Link
                href='/beta'
                onClick={() => setMenuOpen(false)}
                className='mt-[0.95rem] inline-flex min-h-[3.1rem] w-full items-center justify-center gap-[0.55rem] rounded-full bg-[#17201B] px-[1rem] text-[0.92rem] font-semibold text-white no-underline shadow-[0_0.9rem_1.8rem_rgba(23,32,27,0.14)] transition-colors duration-200 hover:bg-[#1F7A4C]'
              >
                Join beta
                <ArrowUpRight className='h-[0.95rem] w-[0.95rem]' aria-hidden='true' />
              </Link>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

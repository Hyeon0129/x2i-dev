'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import HeroParticles from '../components/HeroParticles'

const HERO_IMG = 'https://x2i.dev/wp-content/uploads/2025/03/intro-1.png'
const TV_IMG   = 'https://x2i.dev/wp-content/uploads/2025/04/abm.png'

export default function HomePage() {

  // ✅ fade-in 스크롤 애니메이션 추가
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ✅ 기존 return 그대로 유지
  return (
    <>
      <Hero />
      <div className="divider" />
      <div className="below-bg">
        <TvSection />
        <SkillsSection /> {/* ✅ 여기에 추가 */}
      </div>
    </>
  )
}


function Hero() {
  return (
    <section className="hero">
      {/* 파티클: 섹션 내부에만 렌더(=divider 위로만) */}
      <HeroParticles />

      <div className="container hero-grid">
        <div className="hero-left">
          <div className="mono-tag">
            <span>[</span>
            <span>MY GRIND</span>
            <span>]</span>
          </div>

          <h1 className="hero-title">
            If It Doesn&apos;t Work,<br />Make It Work
          </h1>
          <p className="hero-sub">
            I record to learn what I care about, and to organize what I’ve tried and built.
            I just want to keep moving forward each day, and someday get to where I want to be.
          </p>
        </div>

        <div className="hero-right hero-right--smaller">
              <Image
        src={HERO_IMG}
        alt="brand visual"
        width={500}
        height={500}
        priority
        unoptimized   // ✅ 여기에 추가!
        className="hero-image"
/>
        </div>
      </div>

      <a href="#records" className="scroll-down" aria-label="scroll to next">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </a>
    </section>
  )
}

function TvSection() {
  const text = `> Hello, I'm\n_ a Server Engineer.`
  const [idx, setIdx] = useState(0)
  const done = idx >= text.length

  useEffect(() => {
    if (done) return
    const t = setTimeout(() => setIdx((n) => n + 1), 50)
    return () => clearTimeout(t)
  }, [idx, done])

  return (
    <section id="records" className="section fade-in">
      <div className="container tv-grid">
        <div className="tv-wrap">
          <Image src={TV_IMG} alt="terminal tv" width={1200} height={800} className="tv-image" priority />
          <div className="tv-text">
            <span className="typing-text">{text.slice(0, idx)}</span>
            <span className={`cursor ${done ? 'blink' : ''}`} />
          </div>
        </div>

        <div className="tv-side">
          <div className="mono-tag">
            <span>[</span>
            <span>ABOUT ME</span>
            <span>]</span>
          </div>
          <h3 className="section-title">My Records</h3>
          <p className="section-sub">
            This is a space where I write down what I learn, what I think, and personal thoughts,
            questions, and everyday moments. If it helps someone later, that would be great.
          </p>
                   <a href="/about" className="tv-cta">
                    <span>explore</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="icon"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.25 5.75h10v10h-1.5V8.31L5.78 19.28 4.72 18.22 15.69 7.25H8.25V5.75z"
                      />
                    </svg>
                  </a>
        </div>
      </div>
    </section>
  )
}


function SkillsSection() {
  return (
  <section id="skills" className="section fade-in">
  <div className="container skills-grid-alt">
    <div className="skills-left">
      <div className="mono-tag">
        <span>[</span>
        <span>SKILLS</span>
        <span>]</span>
      </div>
      <h3 className="section-title">Technical Expertise</h3>
    </div>

    <div className="skills-right">
      <div className="skills-box">
        <h4>CORE SKILLS</h4>
        <ul>
          <li>&nbsp;Linux Administration</li>
          <li>&nbsp;Quality Control</li>
          <li>&nbsp;Process Automation</li>
          <li>&nbsp;System Integration</li>
          <li>&nbsp;Technical Documentation</li>
          <li>&nbsp;Server Assembly</li>
        </ul>
      </div>
      <div className="skills-box">
        <h4>DEVELOPMENT</h4>
        <ul>
          <li>&nbsp;Bash/Shell Script</li>
        </ul>
      </div>
      <div className="skills-box">
        <h4>DEVOPS & TOOLS</h4>
        <ul>
          <li>&nbsp;Docker</li>
          <li>&nbsp;Ansible</li>
          <li>&nbsp;Git</li>
        </ul>
      </div>
      <div className="skills-box">
        <h4>HARDWARE & PROTOCOLS</h4>
        <ul>
          <li>&nbsp;Redfish API</li>
          <li>&nbsp;IPMI Management</li>
          <li>&nbsp;AI Accelerator</li>
          <li>&nbsp;Soldering</li>
        </ul>
      </div>
    </div>
  </div>
</section>

  )
}


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
        <SkillsSection /> {}
        <HistorySection /> {/* ✅ 여기에 있어야 함 */}
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
            <span>PROFILE</span>
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

function HistorySection() {
  useEffect(() => {
    
    const timelineWrap = document.querySelector('.timeline-wrap');
    const eventDots = document.querySelectorAll('.event-dot');
    const highlight = document.getElementById('highlightBox');
    const detailBox = document.getElementById('detailBox');
    const detailDate = document.getElementById('detailDate');
    const detailTitle = document.getElementById('detailTitle');
    const detailDesc = document.getElementById('detailDesc');

    if (!timelineWrap || !eventDots.length) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    function showDetail(dot: Element) {
      eventDots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
    
      const dotRect = dot.getBoundingClientRect();
      const timelineRect = timelineWrap!.getBoundingClientRect();

      const relativeLeft = dotRect.left - timelineRect.left + dotRect.width / 2;
      const relativeTop = dotRect.top - timelineRect.top + dotRect.height / 2;

      if (highlight) {
        highlight.style.left = `${relativeLeft}px`;
        highlight.style.top = `${relativeTop}px`;
        highlight.style.display = 'block';
      }

      if (detailBox) {
        if (isMobile) {
          detailBox.style.top = `${relativeTop - 18}px`;
          detailBox.style.display = 'block';
        } else {
          const HBOX_W = 20;
          const PAD_X = 0;
          const detailLeft = relativeLeft - (HBOX_W / 2) + PAD_X;
          const detailTop = relativeTop + 40;
          detailBox.style.left = `${detailLeft}px`;
          detailBox.style.top = `${detailTop}px`;
          detailBox.style.display = 'block';
        }
      }

      const dataset = (dot as HTMLElement).dataset;
      if (detailDate) detailDate.textContent = dataset.date || '';
      if (detailTitle) detailTitle.textContent = dataset.title || '';
      if (detailDesc) detailDesc.textContent = dataset.desc || '';
    }

    function adjustDotsForMobile() {
      if (isMobile) {
        eventDots.forEach((dot, index) => {
          const topPosition = 10 + (index * (80 / (eventDots.length - 1)));
          (dot as HTMLElement).style.top = `${topPosition}%`;
        });

        const labels = document.querySelectorAll('.quarter-label');
        labels.forEach((label, index) => {
          const topPosition = 10 + (index * (80 / (labels.length - 1)));
          (label as HTMLElement).style.top = `${topPosition}%`;
        });
      }
    }

    adjustDotsForMobile();
    if (eventDots[0]) {
      showDetail(eventDots[0]);
    }

    if (isMobile) {
      eventDots.forEach(dot => {
        ['click', 'touchstart'].forEach(eventName => {
          dot.addEventListener(eventName, function (e) {
            e.preventDefault();
            const target = (e as Event).currentTarget as Element;
            if (target) showDetail(target);
          });
        });
      });
    } else {
      const handleMouseMove = (event: MouseEvent) => {
        let nearestDot: Element | null = null;
        let minDistance = 70;

        eventDots.forEach(dot => {
          const dotRect = dot.getBoundingClientRect();
          const dotCenterX = dotRect.left + dotRect.width / 2;
          const dotCenterY = dotRect.top + dotRect.height / 2;

          const distance = Math.sqrt(
            Math.pow(event.clientX - dotCenterX, 2) + 
            Math.pow(event.clientY - dotCenterY, 2)
          );

          if (distance < minDistance) {
            nearestDot = dot;
            minDistance = distance;
          }
        });

        if (nearestDot) {
          showDetail(nearestDot);
        }
      };

      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section id="history" className="section fade-in">
      <div className="container">
        <div className="timeline-header">
          <div>
            <div className="mono-tag">
              <span>[</span>
              <span>HISTORY</span>
              <span>]</span>
            </div>
            <h3 className="section-title">My Timeline</h3>
          </div>

        <p className="timeline-desc">
          This is where I keep track of the things I&apos;ve done and the moments I&apos;ve been through.
          There&apos;s no particular rule to what&apos;s included — just events that felt meaningful to me.
          I&apos;ll continue adding to it whenever something comes to mind.
        </p>

        </div>

        {/* ✅ 타임라인 추가 */}
        <div className="timeline-wrap">
          <div className="timeline-line"></div>

          {/* 3개월 간격 라벨들 */}
          <div className="quarter-label" style={{left: '5%'}}><span>JUL 2023</span></div>
          <div className="quarter-label" style={{left: '12%'}}><span>OCT 2023</span></div>
          <div className="quarter-label" style={{left: '19%'}}><span>JAN 2024</span></div>
          <div className="quarter-label" style={{left: '26%'}}><span>APR 2024</span></div>
          <div className="quarter-label" style={{left: '33%'}}><span>JUL 2024</span></div>
          <div className="quarter-label" style={{left: '40%'}}><span>OCT 2024</span></div>
          <div className="quarter-label" style={{left: '47%'}}><span>JAN 2025</span></div>
          <div className="quarter-label" style={{left: '54%'}}><span>APR 2025</span></div>
          <div className="quarter-label" style={{left: '61%'}}><span>JUL 2025</span></div>
          <div className="quarter-label" style={{left: '68%'}}><span>OCT 2025</span></div>

          <div id="highlightBox"></div>

          <div id="detailBox">
            <div className="date-label" id="detailDate"></div>
            <div className="detail-title" id="detailTitle"></div>
            <div className="detail-desc" id="detailDesc"></div>
          </div>

          {/* 이벤트 점들 */}
          <div className="event-dot" style={{left: '8%'}} 
            data-date="09 APR" 
            data-title="New Beginning" 
            data-desc="Completed military service and moved to Japan for studies, seeking a new direction.">
          </div>

          <div className="event-dot" style={{left: '14%'}} 
            data-date="15 JAN" 
            data-title="Becoming a Father" 
            data-desc="My son was born — a turning point that changed my sense of responsibility and priorities.">
          </div>

          <div className="event-dot" style={{left: '22%'}} 
            data-date="20 MAR" 
            data-title="First Career" 
            data-desc="Returned to Korea and joined Eslim Korea, starting my first full-time role in server manufacturing.">
          </div>

          <div className="event-dot" style={{left: '29%'}} 
            data-date="12 JUN" 
            data-title="Linux & Infrastructure" 
            data-desc="Began studying Linux and system automation — the foundation of my engineering path.">
          </div>

          <div className="event-dot" style={{left: '35%'}} 
            data-date="05 DEC" 
            data-title="Server Dispatch Dashboard" 
            data-desc="Built a web dashboard to manage server shipment processes — my first automation project.">
          </div>

          <div className="event-dot" style={{left: '38%'}} 
            data-date="18 JUN" 
            data-title="QC Automation System" 
            data-desc="Began developing a full server quality control (QC) automation dashboard, focusing on replacing manual inspection with a web-based system.">
          </div>

          <div className="event-dot" style={{left: '43%'}} 
            data-date="25 MAR" 
            data-title="QC Automation Launch" 
            data-desc="Officially launched the QC automation system — achieving 260% increase in throughput, 70% reduction in inspection time, and 0% error rate.">
          </div>

          <div className="event-dot" style={{left: '48%'}} 
            data-date="10 OCT" 
            data-title="Tenstorrent NPU PoC" 
            data-desc="Began Proof-of-Concept work for Tenstorrent NPU — exploring AI inference and hardware integration.">
          </div>

          <div className="event-dot" style={{left: '52%'}} 
            data-date="08 FEB" 
            data-title="LLM Inference Demo" 
            data-desc="Successfully served a Korean fine-tuned LLaMA model on Tenstorrent NPU using vLLM + Open WebUI — first in Korea.">
          </div>

          <div className="event-dot" style={{left: '57%'}} 
            data-date="22 MAY" 
            data-title="ResNet-50 Benchmark" 
            data-desc="Proved NPU's superior inference efficiency on ResNet-50 workloads — first in Korea.">
          </div>

          <div className="event-dot" style={{left: '63%'}} 
            data-date="14 AUG" 
            data-title="New Chapter" 
            data-desc="Resigned from Eslim Korea to focus on personal projects and build my own direction as an independent engineer.">
          </div>

          <div className="event-dot" style={{left: '66%'}} 
            data-date="09 NOV" 
            data-title="Today" 
            data-desc="Taking stock of where I've been and redefining the path ahead.">
          </div>
        </div>
      </div>
    </section>
  )
}

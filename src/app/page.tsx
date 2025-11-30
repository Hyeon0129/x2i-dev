//src/app/page.tsx
'use client'



import dynamic from "next/dynamic";
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import HeroParticles from '../components/HeroParticles'




const HERO_IMG = '/images/intro.png';
const TV_IMG   = '/images/abm.png';
const BlogSection = dynamic(() => import("../components/BlogSection"), {
  ssr: true,  
});



export default function HomePage() {

  
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

  
  return (
    <>
      <Hero />
      <div className="divider" />
      <div className="below-bg">
        <TvSection />
        <SkillsSection /> {}
        <div style={{ height: "20px" }} />
        <HistorySection /> {}
        <div style={{ height: "50px" }} />
        <ProjectsSection /> {}
        <div style={{ height: "60px" }} />
        <div className="divider" />
        <div style={{ height: "20px" }} />
        <BlogSection /> {}
        <div style={{ height: "40px" }} />
        <div className="divider" />
        
      </div>
    </>
  )
}


function Hero() {
  return (
    <section className="hero">
      { }
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
          <p className="section-sub">
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
        unoptimized  
        className="hero-image"
/>
        </div>
      </div>
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
            <p className="about-desc">
              This is a space where I write down what I learn and think,
              along with personal thoughts, questions, and everyday moments.
              If it helps someone later, that would be great.
              I plan to keep adding to it whenever I get the time.
            </p>
                   <a href="/cv/cv_kth.pdf" target="_blank" rel="noopener noreferrer" className="tv-cta">
                    <span>About me</span>
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
          A timeline that captures both personal and professional milestones 
          from meaningful life moments to career shifts that shaped who I am today.
        </p>

        </div>

        {}
        <div className="timeline-wrap">
          <div className="timeline-inner">
            <div className="vertical-line" style={{ left: '5%',  top: 'calc(50% - 33px)' }}></div>
            <div className="vertical-line" style={{ left: '12.5%', top: 'calc(50% - 33px)' }}></div>
            <div className="vertical-line" style={{ left: '17.5%', top: 'calc(50% - 33px)' }}></div>
            <div className="vertical-line" style={{ left: '22.5%', top: 'calc(50% - 33px)' }}></div>
            <div className="vertical-line" style={{ left: '27.5%', top: 'calc(50% - 33px)' }}></div>
            <div className="vertical-line" style={{ left: '35.5%', top: 'calc(50% - 33px)' }}></div>
            <div className="vertical-line" style={{ left: '42%', top: 'calc(50% - 33px)' }}></div>
            <div className="vertical-line" style={{ left: '47%', top: 'calc(50% - 33px)' }}></div>
            <div className="vertical-line" style={{ left: '56%', top: 'calc(50% - 33px)' }}></div>
          </div>

          {/* Quarter Labels */}
          <div className="quarter-label" style={{ left: '5%'  }}><span>NOV 1998</span></div>
          <div className="quarter-label" style={{ left: '12.5%' }}><span>MAR 2019</span></div>
          <div className="quarter-label" style={{ left: '17.5%' }}><span>JAN 2020</span></div>
          <div className="quarter-label" style={{ left: '22.5%' }}><span>MAR 2021</span></div>
          <div className="quarter-label" style={{ left: '27.5%' }}><span>FEB 2022</span></div>
          <div className="quarter-label" style={{ left: '35.5%' }}><span>DEC 2023</span></div>
          <div className="quarter-label" style={{ left: '42%' }}><span>SEP 2024</span></div>
          <div className="quarter-label" style={{ left: '47%' }}><span>JUN 2025</span></div>
          <div className="quarter-label" style={{ left: '56%' }}><span>DEC 2025</span></div>

          <div id="highlightBox"></div>

          <div id="detailBox">
            <div className="date-label" id="detailDate"></div>
            <div className="detail-title" id="detailTitle"></div>
            <div className="detail-desc" id="detailDesc"></div>
          </div>

          {/*  */}

          {/* Event dots */}
          <div className="event-dot" style={{ left: '5%' }}
            data-date="30 NOV"
            data-title="Birth"
            data-desc="Born in South Korea.">
          </div>

          <div className="event-dot" style={{ left: '13%' }}
            data-date="09 APR"
            data-title="Military Discharge"
            data-desc="Completed mandatory military service.">
          </div>

          <div className="event-dot" style={{ left: '15.5%' }}
            data-date="29 MAY"
            data-title="Moved to Japan"
            data-desc="Relocated to Japan for studies, looking for a new direction in life.">
          </div>

          <div className="event-dot" style={{ left: '18%' }}
            data-date="28 JAN"
            data-title="Becoming a Father"
            data-desc="My son was born—everything changed.">
          </div>

          <div className="event-dot" style={{ left: '23%' }}
            data-date="17 MAR"
            data-title="Returned to Korea"
            data-desc="Came back to Korea and started my first job at Eslim Korea.">
          </div>

          <div className="event-dot" style={{ left: '29%' }}
            data-date="17 MAR"
            data-title="Marriage"
            data-desc="Married in the Philippines.">
          </div>

          <div className="event-dot" style={{ left: '31%' }}
            data-date="01 JUN"
            data-title="QC Engineering"
            data-desc="Began working in server quality control (QC).">
          </div>

          <div className="event-dot" style={{ left: '36%' }}
            data-date="09 DEC"
            data-title="QC Automation Dashboard"
            data-desc="Developed a full server QC automation system.">
          </div>

          <div className="event-dot" style={{ left: '45%' }}
            data-date="29 OCT"
            data-title="Tenstorrent NPU PoC"
            data-desc="Started the NPU Proof-of-Concept project.">
          </div>

          <div className="event-dot" style={{ left: '49%' }}
            data-date="29 AUG"
            data-title="Resignation"
            data-desc="Left Eslim Korea and worked at a logistics center.">
          </div>

          <div className="event-dot" style={{ left: '51%' }}
            data-date="10 NOV"
            data-title="Left Logistics Job"
            data-desc="Left the logistics center.">
          </div>

          <div className="event-dot" style={{ left: '53%' }}
            data-date="17 NOV"
            data-title="Joined SecuLayer"
            data-desc="Moved into a Security Solution Engineer role at SecuLayer.">
          </div>

          <div className="event-dot" style={{ left: '55%' }}
            data-date="01 DEC"
            data-title="Left SecuLayer"
            data-desc="Realized it wasn't the right fit and left shortly after.">
          </div>

          <div className="event-dot" style={{ left: '57%' }}
            data-date="03 DEC"
            data-title="Today"
            data-desc="Taking time to figure things out and find my next step.">
          </div>
        </div>
      </div>
    </section>
  )
}


function ProjectsSection() {
  // ---------- Types ----------
  type Dir = 'up' | 'down' | 'neutral';

  interface Metric {
    label: string;
    value: number;
    suffix: string;
    dir: Dir;
  }

  interface SnapshotPoint {
  value: number;
  unit: string;
  percent?: number;
}
  interface SnapshotRow {
    label: string;
    npu: SnapshotPoint;
    gpu: SnapshotPoint;
  }

  interface ProjectEntry {
    title: string;
    description: string; // HTML string
    video: string;
    link: string;
    metrics?: Metric[];
    snapshots?: SnapshotRow[];
    methods?: string[];
  }

  type ProjectId = 'qc-dashboard' | 'llm-inference' | 'resnet-inference';
  const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
  useEffect(() => {
  if (!mounted) return; 

  // ---------- DOM helpers ----------
  const $ = <T extends Element = Element>(sel: string, root: ParentNode = document) =>
    root.querySelector<T>(sel);
  const $$ = <T extends Element = Element>(sel: string, root: ParentNode = document) =>
    Array.from(root.querySelectorAll<T>(sel));

  // ---------- Carousel ----------
  const track = $('#projectsTrack') as HTMLElement | null;
  const prevBtn = $('#prevBtn') as HTMLButtonElement | null;
  const nextBtn = $('#nextBtn') as HTMLButtonElement | null;
  const cards = $$('.project-card') as HTMLElement[];
  let currentIndex = 0;

  const getCardsToShow = () => {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 1024) return 1.5;
    return 2;
  };

  const updateCarousel = () => {
    if (!track || cards.length === 0) return;
    const cardWidth = cards[0].offsetWidth;
    const gap = 40;
    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= cards.length - Math.floor(getCardsToShow());
  };

  prevBtn?.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn?.addEventListener('click', () => {
    const maxIndex = Math.max(0, cards.length - Math.floor(getCardsToShow()));
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  const onResize = () => {
    currentIndex = 0;
    updateCarousel();
  };
  window.addEventListener('resize', onResize);
  updateCarousel();

  // ---------- Modal ----------
  const modal = $('#projectModal') as HTMLDivElement | null;
  const modalClose = $('#modalClose') as HTMLButtonElement | null;
  const modalMedia = $('#modalMedia') as HTMLDivElement | null;
  const modalTitle = $('#modalTitle') as HTMLHeadingElement | null;
  const modalDesc = $('#modalDesc') as HTMLParagraphElement | null;
  const modalCta = $('#modalCta') as HTMLAnchorElement | null;
  const impactBar = $('#impactBar') as HTMLDivElement | null;
  const methodChips = $('#methodChips') as HTMLDivElement | null;
  const divider = $('#projectModal .thin-divider') as HTMLDivElement | null;

  type Dir = 'up' | 'down' | 'neutral';
  interface Metric { label: string; value: number; suffix: string; dir: Dir; }
  interface SnapshotPoint {
  value: number;
  unit: string;
  percent?: number; 
}
  interface SnapshotRow { label: string; npu: SnapshotPoint; gpu: SnapshotPoint; }
  interface ProjectEntry {
    title: string; description: string; video: string; link: string;
    metrics?: Metric[]; snapshots?: SnapshotRow[]; methods?: string[];
  }
  type ProjectId = 'qc-dashboard' | 'llm-inference' | 'resnet-inference';

 const projectData: Record<ProjectId, ProjectEntry> = {
      'qc-dashboard': {
        title: 'Server QC Automation Dashboard',
        description: `
        Automated the repetitive server QC process—eliminating manual checks by letting the system handle everything from power control to BIOS config, 
        OS installation, and real-time alerts.
        Built a web dashboard to deploy tasks across multiple servers and visualize progress at a glance.
        `,
        video: '/videos/intro/qc-automation.mp4',
        link: 'https://x2i.dev/blog/how-i-made-work-5x-faster-with-automation/',
        metrics: [
          { label: 'Throughput ↑', value: 260, suffix: '%', dir: 'up' },
          { label: 'Inspection Time ↓', value: 70, suffix: '%', dir: 'down' },
          { label: 'Error Rate', value: 0, suffix: '%', dir: 'neutral' },
        ],
        methods: ['Ansible', 'Shell Scripting', 'Redfish/IPMI', 'iPXE', 'FastAPI', 'Python'],
      },
      'llm-inference': {
        title: 'LLM Inference Visualization',
        description: `
        Real-time comparison demo of LLM inference performance between Tenstorrent NPU (N300S) and NVIDIA A100 GPU. <br />
        Using a Llama-3 based model, the interface visualizes token generation speed alongside GPU utilization and power 
        consumption—making hardware differences instantly clear.

        `,
        video: '/videos/intro/npu-open-webui.mp4',
        link: '#',
        snapshots: [
        { label: 'Llama-3 70B', npu: { value: 15, unit: 'tok/s', percent: 75 }, gpu: { value: 20, unit: 'tok/s', percent: 100 } },
        { label: 'QwQ-32B',     npu: { value: 18, unit: 'tok/s', percent: 80 }, gpu: { value: 22, unit: 'tok/s', percent: 100 } },
      ],
        methods: ['Llama', 'vLLM', 'Docker', 'Open WebUI', 'TT-Metalium', 'TT-NN'],
      },
      'resnet-inference': {
        title: 'ResNet-50 Comparison',
        description: `
        Benchmarked ResNet-50 inference across NPU (N300S) and GPUs (A30, A100, H100), measuring FPS and power consumption in real time. <br />
        Visualized hardware efficiency through canvas rendering, making performance differences instantly comparable under identical conditions.
        Demonstrates how NPU achieves superior throughput efficiency and power optimization for specific AI workloads.
        `,
        video: '/videos/intro/npu-resnet50.mp4',
        link: '#',
        snapshots: [
          { label: 'FPS',   npu: { value: 8000, unit: 'FPS', percent: 100  }, gpu: { value: 5000, unit: 'FPS' , percent: 62.5 } },
          { label: 'Power', npu: { value: 160,  unit: 'W' , percent: 46   }, gpu: { value: 350,  unit: 'W'   , percent: 100 } },
        ],
        methods: ['ResNet-50', 'PyTorch', 'TorchVision', 'TT-Metalium', 'TT-NN'],
      },
  };

  const animateImpact = () => {
    const els = $$('#impactBar .impact-value') as HTMLElement[];
    els.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      const start = performance.now();
      const dur = Math.max(600, Math.min(1200, Math.abs(target) * 6));
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const val = Math.round(target * p);
        el.textContent = `${val}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };

  const renderImpactOrHighlights = (data: ProjectEntry) => {
  if (!impactBar) return;
  impactBar.innerHTML = '';
  impactBar.removeAttribute('style'); 
  if (divider) divider.style.display = 'block';

    if (data.metrics && data.metrics.length) {
      const cols = Math.min(3, data.metrics.length);
      impactBar.style.display = 'grid';
      impactBar.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      impactBar.style.columnGap = '15px'; 
      impactBar.style.justifyContent = 'space-between'; 


      impactBar.innerHTML = data.metrics.map(m => `
        
        <div class="impact-stat">
          <div class="impact-value" data-target="${m.value}" data-suffix="${m.suffix}">0</div>
          <div class="impact-label">${m.label}</div>
        </div>
      `).join('');
      animateImpact();
      return;
    }

    if (data.snapshots && data.snapshots.length) {

      impactBar.classList.remove('impact-bar');
      impactBar.style.display = 'block';

      const max = Math.max(...data.snapshots.map(s => Math.max(s.npu.value, s.gpu.value)));
      let html = '<div class="snapshots">';
      data.snapshots.forEach((s) => {
            const npuPct = (typeof s.npu.percent === 'number')
      ? Math.max(0, Math.min(100, s.npu.percent))
      : (max ? Math.min(100, Math.round((s.npu.value / max) * 100)) : 0);

    const gpuPct = (typeof s.gpu.percent === 'number')
      ? Math.max(0, Math.min(100, s.gpu.percent))
      : (max ? Math.min(100, Math.round((s.gpu.value / max) * 100)) : 0);
        html += `
          <div class="snapshot-card">
            <div class="snapshot-label">${s.label}</div>
            <div class="snapshot-bars">
              <div class="bar"><div class="bar-fill" style="width:${npuPct}%"></div></div>
              <div class="bar-meta">NPU ${s.npu.value} ${s.npu.unit}</div>
              <div class="bar"><div class="bar-fill" style="width:${gpuPct}%"></div></div>
              <div class="bar-meta">GPU ${s.gpu.value} ${s.gpu.unit}</div>
            </div>
          </div>`;
      });
      html += '</div>'; 
      html += '<div class="snap-caption">* Demo snapshot values — may vary based on environment and configuration.</div>';
      impactBar.innerHTML = html;
      if (divider) divider.style.display = 'block';
      return;
    }

    impactBar.style.display = 'none';
    if (divider) divider.style.display = 'none';
  };

  const openModal = (data: ProjectEntry) => {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (modalMedia)
      modalMedia.innerHTML = `<video autoplay muted loop playsinline><source src="${data.video}" type="video/mp4"></video>`;
    if (modalTitle) modalTitle.innerHTML = data.title;
    if (modalDesc) modalDesc.innerHTML = data.description;
    if (modalCta) modalCta.href = data.link;
    renderImpactOrHighlights(data);
    if (methodChips) {
      methodChips.innerHTML = (data.methods || []).map(m => `<span class="chip">${m}</span>`).join('');
    }
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (modalMedia) modalMedia.innerHTML = '';
  };

  
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      const idAttr = card.getAttribute('data-project') as ProjectId | null;
      const fallback: ProjectId[] = ['qc-dashboard', 'llm-inference', 'resnet-inference'];
      const key = (idAttr || fallback[idx]) as ProjectId;
      if (projectData[key]) openModal(projectData[key]);
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
  document.addEventListener('keydown', onEsc);

  
  return () => {
    window.removeEventListener('resize', onResize);
    document.removeEventListener('keydown', onEsc);
  };
}, [mounted]);


  
  return (
    <section id="projects" className="section fade-in">
      <div className="container">
        {/*  */}
        <div className="timeline-header">
          <div>
            <div className="mono-tag"><span>[</span><span>PROJECTS</span><span>]</span></div>
            <h3 className="section-title">Featured Work</h3>
          </div>
          <p className="timeline-desc">
            Built from curiosity and necessity small experiments that eventually became real projects.
          </p>
        </div>

        {/* Carousel */}
        <div className="projects-carousel">
          <div className="container"></div>
          <div className="projects-track" id="projectsTrack">
            {/* 1 */}
            <div className="project-card" data-project="qc-dashboard">
              <video autoPlay muted loop playsInline>
                <source src="/videos/intro/qc-automation.mp4" type="video/mp4" />
              </video>
              <div className="project-content">
                <h3 className="project-title">Server Quality Control Automation Dashboard</h3>
                <p className="project-desc">
                 This web dashboard automates QC for <strong>10,000+ servers annually</strong>.<br />
                It handles power control, OS installs, BIOS configuration, and all test steps automatically.<br />
                Resulted in <strong>260% higher throughput</strong>, <strong>70% faster inspections</strong>, and <strong>0% errors</strong>.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">FastAPI</span>
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Ansible</span>
                  <span className="tech-tag">Redfish/IPMI</span>
                  <span className="tech-tag">Shell Scripting</span>
                  <span className="tech-tag">iPXE</span>
                  <span className="tech-tag">MariaDB</span>
                </div>
              </div>
            </div>
            {/* 2 */}
            <div className="project-card" data-project="llm-inference">
              <video autoPlay muted loop playsInline>
                <source src="/videos/intro/npu-open-webui.mp4" type="video/mp4" />
              </video>
              <div className="project-content">
                <h3 className="project-title">LLM Inference Visualization</h3>
                <p className="project-desc">
                  This demo uses the Llama model to compare real-time inference performance between the <strong>Tenstorrent NPU (N300S)</strong>
                  and the <strong>NVIDIA A100 80GB PCIe ×2 GPUs</strong>. It visualizes response and token generation speed differences 
                  through an Open WebUI-based real-time interface.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">Llama</span>
                  <span className="tech-tag">vLLM</span>
                  <span className="tech-tag">Docker</span>
                  <span className="tech-tag">Open WebUI</span>
                  <span className="tech-tag">TT-Metalium</span>
                  <span className="tech-tag">TT-NN</span>
                </div>
              </div>
            </div>
            {/* 3 */}
            <div className="project-card" data-project="resnet-inference">
              <video autoPlay muted loop playsInline>
                <source src="/videos/intro/npu-resnet50.mp4" type="video/mp4" />
              </video>
              <div className="project-content">
                <h3 className="project-title">ResNet-50 Comparison</h3>
                <p className="project-desc">
                  This demo compares real-time inference performance of the ResNet-50 model between the <strong>Tenstorrent NPU (N300S)</strong>
                  and <strong>NVIDIA GPUs (A30, A100, H100)</strong>. It visualizes differences in FPS and power efficiency
                  to make hardware performance gaps immediately noticeable.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">ResNet-50</span>
                  <span className="tech-tag">TT-Metalium</span>
                  <span className="tech-tag">TT-NN</span>
                  <span className="tech-tag">PyTorch</span>
                  <span className="tech-tag">TorchVision</span>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-nav">
            <button className="carousel-btn" id="prevBtn">←</button>
            <button className="carousel-btn" id="nextBtn">→</button>
          </div>
        </div>

        {/* Modal */}
      {mounted &&
      createPortal(
        <div className="project-modal" id="projectModal">
          <div className="modal-content">
            <button className="modal-close" id="modalClose">✕</button>

            <div className="modal-left">
              <div className="modal-header">
                <div className="modal-label" id="modalLabel">PROJECT</div>
                <h2 className="modal-title" id="modalTitle"></h2>
                <p className="modal-description" id="modalDesc"></p>
              </div>

              <div className="modal-middle">
                <div id="impactBar" className="impact-bar"></div>
                <div className="thin-divider"></div>
                <div id="methodChips" className="method-chips"></div>
              </div>

              <a href="#" className="modal-cta" id="modalCta">READ</a>
            </div>

            <div className="modal-right">
              <div className="modal-media" id="modalMedia"></div>
            </div>
          </div>
        </div>
      ,
    document.body   
  )}
      </div>
    </section>
  );
}



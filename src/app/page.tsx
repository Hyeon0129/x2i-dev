'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react';
import HeroParticles from '../components/HeroParticles'
import { createPortal } from 'react-dom';

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
        <HistorySection /> {}
        <ProjectsSection /> {}
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
        unoptimized  
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
            questions, and everyday moments. If it helps someone later, that would be great. <br />
            I plan to keep adding to it whenever I get the time.
            
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
          A timeline that captures both personal and professional milestones 
          from meaningful life moments to career shifts that shaped who I am today.
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
  /** 0~100 (%). 지정하면 이 값 그대로 사용, 없으면 value 기준으로 자동 계산 */
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
  if (!mounted) return; // Portal 렌더 전엔 실행 안 함

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
  percent?: number; // ✅ ← 이 한 줄 추가!
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
          반복적인 서버 품질관리 과정을 자동화해, 사람이 육안으로 확인하던 모든 단계를 시스템이 대신 처리하도록 설계하고 구축했습니다.<br>
        서버 전원 제어부터 BIOS 설정, OS 자동 설치, 상태 점검 및 실시간 이상 알림까지 모든 과정을 버튼 한 번으로 수행할 수 있습니다.
        뿐만 아니라 웹 새디보드를 통해 대량의 서버에 대한 작업 배포, 상태를 실시간으로 시각화해 전체 프로세스의 진행 상황을 직관적으로 확인할 수 있도록 구현했습니다.
        `,
        video: 'https://x2i.dev/wp-content/uploads/2025/10/test.mp4',
        link: 'https://x2i.dev/blog/how-i-made-work-5x-faster-with-automation/',
        metrics: [
          { label: '처리량 증가 ↑', value: 260, suffix: '%', dir: 'up' },
          { label: '검수 시간 단축 ↓', value: 70, suffix: '%', dir: 'down' },
          { label: '오류율', value: 0, suffix: '%', dir: 'neutral' },
        ],
        methods: ['Ansible', 'Shell Scripting', 'Redfish/IPMI', 'iPXE', 'FastAPI', 'Python'],
      },
      'llm-inference': {
        title: 'LLM Inference Visualization',
        description: `
          Tenstorrent NPU(N300S)와 NVIDIA A100 GPU 환경에서 LLM의 응답 속도와 리소스 사용 변화를 실시간으로 비교·시각화한 데모입니다.<br>
        Llama-3 기반 모델을 사용해 인터페이스 상에서 문장이 출력되는 속도와 GPU의 사용률·전력 소모를 함께 표현해,
        두 하드웨어 간의 차이를 직관적으로 확인할 수 있습니다.
        `,
        video: 'https://x2i.dev/wp-content/uploads/2025/10/2025-10-22-21-42-24.mp4',
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
          ResNet-50 기반 추론을 NPU(N300S)와 GPU(A30·A100·H100) 환경에서 동시에 실행해, 초당 처리 속도(FPS)와 전력 사용량(W)을 실시간으로 측정했습니다. <br>
        캔버스를 통해 하드웨어별 처리 효율을 시각적으로 표현했으며,  
        동일한 조건에서의 성능 차이를 직관적으로 비교할 수 있습니다.  
        이를 통해 특정 AI 워크로드에서 NPU가 GPU 대비 더 높은 처리 효율과 전력 최적화를 달성할 수 있음을 보여줍니다.
        `,
        video: 'https://x2i.dev/wp-content/uploads/2025/10/Tenstorrent_ResNe5-50.mp4',
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
  impactBar.removeAttribute('style'); // ✅ 기존 grid/flex 스타일 초기화
  if (divider) divider.style.display = 'block';

    if (data.metrics && data.metrics.length) {
      const cols = Math.min(3, data.metrics.length);
      impactBar.style.display = 'grid';
      impactBar.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      impactBar.style.columnGap = '15px'; // ✅ 가로 간격 확실히 지정
      impactBar.style.justifyContent = 'space-between'; // ✅ 양쪽 여백 유지


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
     // ✅ 스냅샷: 원본 구조 + caption 순서 수정
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
      html += '</div>'; // ✅ snapshots 닫기 먼저
      html += '<div class="snap-caption">* 데모 스냅샷 값 — 환경/설정에 따라 달라질 수 있습니다.</div>'; // ✅ 그다음 caption 추가
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

  // 카드 클릭
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

  // ✅ cleanup
  return () => {
    window.removeEventListener('resize', onResize);
    document.removeEventListener('keydown', onEsc);
  };
}, [mounted]);


  
  return (
    <section id="projects" className="section fade-in">
      <div className="container">
        {/* 헤더: 좌/우 그리드(좌 = mono-tag+title, 우 = 설명) */}
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
                <source src="https://x2i.dev/wp-content/uploads/2025/10/test.mp4" type="video/mp4" />
              </video>
              <div className="project-content">
                <h3 className="project-title">Server Quality Control Automation Dashboard</h3>
                <p className="project-desc">
                 <strong>연간 10,000대+</strong> 이상의 서버 품질검수 과정을 자동화한 웹 대시보드 입니다.<br />
                                서버 전원 제어부터 OS설치, BIOS 설정값 변경, 모든 테스트 과정을 자동화했습니다.<br />
                                자동화 시스템 도입 후 일일 처리량 <strong>260% 증가</strong>, 검수 시간 <strong>70% 단축</strong>, 오류율 <strong>0%</strong>를 달성했습니다.
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
                <source src="https://x2i.dev/wp-content/uploads/2025/10/2025-10-22-21-42-24.mp4" type="video/mp4" />
              </video>
              <div className="project-content">
                <h3 className="project-title">LLM Inference Visualization</h3>
                <p className="project-desc">
                  LLM 모델중 하나인 Llama를 활용하여 <strong>Tenstorrent NPU(N300S)</strong> vs <strong>NVIDIA GPU(A100 80GB PCIE *2)</strong>의 추론 성능을 실시간으로 비교·시각화한 데모입니다.<br />
                                Open WebUI 인터페이스를 통해 응답 속도 및 토큰 생성 속도 차이를 직관적으로 확인할 수 있도록 구현했습니다.                  
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
                <source src="https://x2i.dev/wp-content/uploads/2025/10/Tenstorrent_ResNe5-50.mp4" type="video/mp4" />
              </video>
              <div className="project-content">
                <h3 className="project-title">ResNet-50 Comparison</h3>
                <p className="project-desc">
                  이미지 분류 모델 ResNet-50을 기반으로 <strong>Tenstorrent NPU(N300S)</strong> vs <strong>NVIDIA GPU(A30,A100,H100)</strong>
                                의 추론 성능을 실시간으로 비교·시각화한 데모입니다. <strong>초당 처리 프레임(FPS),전력효율의 차이를 바로 체감가능 하도록 구현했습니다.</strong><br />         
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



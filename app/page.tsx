"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { Code, Cpu, Layers, Rocket, ExternalLink, Mail, Github, MapPin, Sparkles, Terminal, Activity, ChevronRight } from "lucide-react";
import { useMousePosition } from "./hooks/useMousePosition";

// --- 트렌디한 마그네틱 버튼 컴포넌트 ---
function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.35);
    y.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- 데이터 섹션 ---
const experiences = [
  {
    id: 1,
    period: "2025.10 - 2026.03",
    title: "LG 세이커스 마케팅·기획 실무",
    role: "데이터 분석 및 마케팅 기획",
    desc: "팬 데이터를 기반으로 한 마케팅 전략 수립 및 프로모션 웹페이지 기획 참여. 스포츠 산업 내 데이터 기반 의사결정 프로세스 경험.",
    tech: ["Data Analysis", "Marketing", "Planning"],
  },
  {
    id: 2,
    period: "2024.06 - 2024.11",
    title: "스타트업 프론트엔드 개발",
    role: "Frontend Developer",
    desc: "초기 단계 스타트업에서 웹 서비스 UI/UX 구현 및 API 연동 담당. 애자일 환경에서의 협업 및 서비스 배포 경험.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
  },
];

const marqueeSkills = [
  "React", "TypeScript", "Next.js", "AI Tools", "Tailwind CSS",
  "UX Design", "Marketing", "Web Development", "JavaScript"
];

const CONTACT_INFO = {
  email: "yeyiyeyi@naver.com",
  phone: "010-5501-2760",
};

const TECH_STACK = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

const projects = [
  {
    id: 1,
    title: "AI Powered Study Room",
    desc: "AI 학습 타이머와 실시간 화상 스터디 플랫폼",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    tags: ["Next.js", "Supabase", "AI API"],
    link: "https://study-room-taupe.vercel.app/",
  },
  {
    id: 2,
    title: "LG Sakers Fan Analytics",
    desc: "구단 마케팅 데이터를 시각화한 대시보드 프로젝트",
    image: "https://images.unsplash.com/photo-1542259646-cd4d97e28c46?q=80&w=2070&auto=format&fit=crop",
    tags: ["Data Viz", "Chart.js", "Marketing"],
    link: "#",
  },
  {
    id: 3,
    title: "Baseball Player Records",
    desc: "사회인 야구팀 선수 기록 저장·관리용 웹",
    image: "https://images.unsplash.com/photo-1515703406961-3a0f274a7386?q=80&w=2070&auto=format&fit=crop",
    tags: ["Next.js", "Team Stats"],
    link: "https://baseball-zeta.vercel.app/",
  },
];

// --- 무한 마키 스크롤러 ---
function MarqueeScroller({ items, duration = 15 }: { items: string[]; duration?: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const duplicatedItems = [...items, ...items, ...items];
  const speed = isHovered ? duration * 0.4 : duration;
  return (
    <div
      className="w-full overflow-hidden py-4 border-y border-white/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
        }}
      >
        {duplicatedItems.map((item, i) => (
          <span key={i} className="text-gray-400/90 text-lg md:text-xl font-bold tracking-tighter uppercase italic flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-purple" /> {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Portfolio() {
  const targetRef = useRef(null);
  const mousePosition = useMousePosition();
  const [windowSize, setWindowSize] = useState({ w: 1920, h: 1080 });
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    const onResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    
    // 로컬 시간 업데이트 (트렌디한 시계 효과)
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000 * 60);
    
    return () => {
      window.removeEventListener("resize", onResize);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-accent-purple selection:text-white overflow-x-hidden font-sans grain">
      
      {/* 0. 프리미엄 배경 레이어 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[50vw] h-[50vw] bg-accent-purple/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] bg-accent-blue/10 rounded-full blur-[100px]" />
      </div>

      {/* 1. 플로팅 내비게이션 (Glassmorphic) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl flex items-center gap-8">
        <span className="text-sm font-bold text-gradient">SOONCHUL.DEV</span>
        <div className="flex gap-6 items-center">
          <button onClick={() => setIsContactOpen(true)} className="text-xs font-medium text-gray-400 hover:text-white transition-colors">Contact</button>
          <a href="https://github.com/soonchul12" target="_blank" className="text-gray-400 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
        </div>
      </nav>

      {/* 2. 히어로 섹션 */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-accent-purple mb-6">
            <Activity className="w-3 h-3" /> Available for new challenges
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8">
            CRAFTING <br />
            <span className="text-gradient">AI DRIVEN</span> WEB
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
            데이터와 디자인을 연결하는 프론트엔드 개발자 권순철입니다. <br />
            AI 도구를 통해 더 빠르고 정교한 사용자 경험을 설계합니다.
          </p>
          
          <div className="flex gap-4 justify-center">
            <MagneticButton>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="px-8 py-4 rounded-2xl bg-white text-black font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-2xl"
              >
                Hire Me <ChevronRight className="w-4 h-4" />
              </button>
            </MagneticButton>
            <MagneticButton>
              <a 
                href="#projects"
                className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 font-bold hover:bg-white/10 transition-colors"
              >
                View Work
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        {/* 3. 벤토 그리드 레이아웃 (핵심 특색 섹션) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl w-full">
          {/* Profile Card */}
          <motion.div whileHover={{ y: -5 }} className="bento-card md:col-span-2 p-8 flex items-end justify-between group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 italic">About Me</h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                스포츠 산업의 데이터와 스타트업의 유연함을 경험했습니다. <br />
                단순한 코딩을 넘어, 비즈니스 가치를 만드는 개발을 지향합니다.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 opacity-20 group-hover:opacity-40 transition-opacity">
              <img src="/profile.jpeg" className="w-full h-full object-cover grayscale" />
            </div>
          </motion.div>

          {/* AI Status Card */}
          <motion.div whileHover={{ y: -5 }} className="bento-card p-6 flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 rounded-lg bg-accent-purple/20 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-accent-purple" />
              </div>
              <span className="text-[10px] text-accent-purple font-mono">LIVE_AGENT</span>
            </div>
            <div className="mt-4">
              <p className="text-[10px] uppercase text-gray-500 mb-1">Current Focus</p>
              <p className="text-sm font-bold font-mono">Next.js 16 & <br />Mastra AI Agent</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-gray-400 font-mono tracking-widest">THINKING...</span>
            </div>
          </motion.div>

          {/* Location & Time Card */}
          <motion.div whileHover={{ y: -5 }} className="bento-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <MapPin className="w-4 h-4 text-accent-blue" />
              <span className="text-lg font-mono font-bold">{currentTime}</span>
            </div>
            <div>
              <p className="text-[10px] uppercase text-gray-500 mb-1">Base</p>
              <p className="text-sm font-bold">Seoul, South Korea</p>
            </div>
          </motion.div>

          {/* Tech Stack Horizontal Scroll (Bento Item) */}
          <div className="md:col-span-4 bento-card py-6 px-8 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">EXPERTISE</span>
            <div className="flex gap-6 overflow-x-auto pb-2 no-scrollbar">
              {TECH_STACK.map((tech) => (
                <div key={tech.name} className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 bg-white/5">
                  <img src={tech.icon} className="w-4 h-4" />
                  <span className="text-xs font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. 마키 스크롤 (Skill Highlights) */}
      <MarqueeScroller items={marqueeSkills} duration={25} />

      {/* 5. 프로젝트 섹션 */}
      <section id="projects" className="relative z-10 py-32 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-xs font-bold text-accent-purple uppercase tracking-[0.2em] mb-4 block">Selection</span>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Featured<br />Projects</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-[280px]">사용자의 문제 해결과 비즈니스 성장을 고려한 엄선된 결과물입니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 mb-6 transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-60" />
                <img src={project.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-x-0 bottom-0 p-8 z-20">
                  <div className="flex gap-2 mb-3">
                    {project.tags.map(t => <span key={t} className="text-[10px] px-2 py-1 rounded-full border border-white/20 backdrop-blur-md">{t}</span>)}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                  <div className="overflow-hidden h-0 group-hover:h-8 transition-all duration-500">
                    <p className="text-xs text-gray-300 flex items-center gap-1">View Project Details <ExternalLink className="w-3 h-3" /></p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. 경력 (Experience) - 세련된 수직 리스트 */}
      <section className="relative z-10 py-32 px-6 max-w-4xl mx-auto">
        <h2 className="text-sm font-bold text-gray-500 mb-16 tracking-widest text-center">JOURNEY SO FAR</h2>
        <div className="space-y-16">
          {experiences.map((exp) => (
            <div key={exp.id} className="grid grid-cols-1 md:grid-cols-4 gap-8 group">
              <span className="text-sm font-mono text-accent-purple">{exp.period}</span>
              <div className="md:col-span-3">
                <h3 className="text-3xl font-bold mb-2 group-hover:text-accent-purple transition-colors">{exp.title}</h3>
                <p className="text-sm text-accent-blue font-medium mb-4">{exp.role}</p>
                <p className="text-gray-400 leading-relaxed mb-6">{exp.desc}</p>
                <div className="flex gap-2">
                  {exp.tech.map(t => <span key={t} className="text-[10px] px-2 py-1 rounded-lg bg-white/5 border border-white/10">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. 컨택 푸터 */}
      <footer className="relative z-10 py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase mb-12">
            Let&apos;s build <br /> something <span className="text-gradient underline decoration-accent-purple underline-offset-8">epic</span>
          </h2>
          <MagneticButton className="inline-block">
            <button 
              onClick={() => setIsContactOpen(true)}
              className="px-12 py-6 rounded-3xl bg-white text-black text-xl font-black uppercase hover:scale-110 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            >
              Contact Me
            </button>
          </MagneticButton>
          <div className="mt-32 flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 gap-6">
            <p className="text-xs text-gray-500">© 2026 SOONCHUL PORTFOLIO</p>
            <div className="flex gap-8">
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-xs text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-widest">Email</a>
              <a href="https://github.com/soonchul12" target="_blank" className="text-xs text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-widest">Github</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 연락처 모달 (더 세련되게 수정) */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsContactOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bento-card max-w-md w-full p-12 mx-6 relative"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-4xl font-black italic uppercase mb-8 text-gradient">Get in touch</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Email Me</p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-xl font-bold hover:text-accent-purple transition-colors">{CONTACT_INFO.email}</a>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Call Me</p>
                  <p className="text-xl font-bold">{CONTACT_INFO.phone}</p>
                </div>
                <div className="pt-8">
                  <button onClick={() => setIsContactOpen(false)} className="w-full py-4 rounded-2xl border border-white/10 hover:bg-white hover:text-black font-bold transition-all uppercase text-xs tracking-widest">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

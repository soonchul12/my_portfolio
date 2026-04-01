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
    title: "LG 세이커스 프로농구단 마케팅 실무",
    role: "데이터 분석 및 마케팅 기획",
    desc: "홈경기 관중 데이터를 분석하여 평일 관중 증대를 위한 실질적인 전략을 수립했습니다. 요일별 관중 추이 분석과 타 구단 사례 조사를 바탕으로 이벤트 좌석, 한정판 굿즈 등 프로모션을 제안하여 최우수상을 수상했습니다.",
    tech: ["데이터 분석", "마케팅 전략", "성과 지표 수립"],
  },
  {
    id: 2,
    period: "2024.06 - 2024.11",
    title: "IT 스타트업 서비스 개발",
    role: "프론트엔드 개발 및 UI/UX 설계",
    desc: "초기 단계 스타트업에서 웹 서비스의 UI/UX 구현과 API 연동을 담당했습니다. 사용자 경험 중심의 인터페이스를 설계하고, 애자일 환경에서 빠르게 기능을 배포하며 서비스 성장에 기여했습니다.",
    tech: ["React", "TypeScript", "UI/UX 디자인"],
  },
];

const marqueeSkills = [
  "Data Analysis", "Marketing Strategy", "UX Design", "React", "Next.js", "AI Utilization", "Performance Marketing", "Web Development", "Problem Solving"
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
  { name: "데이터분석", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "디자인", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
];

const projects = [
  {
    id: 1,
    title: "AI 기반 지능형 스터디룸",
    desc: "AI 학습 타이머와 실시간 소통을 결합한 스터디 플랫폼",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    tags: ["서비스 기획", "AI 연동", "사용자 분석"],
    link: "https://study-room-taupe.vercel.app/",
    details: {
      overview: "혼자 공부할 때의 고립감을 해결하고, 데이터로 학습 집중도를 측정하여 사용자들의 '순공 시간'을 관리해주는 AI 기반 협업 스터디 플랫폼입니다.",
      tech: ["Next.js", "TensorFlow.js", "WebRTC", "Supabase"],
      analysis: [
        { label: "사용자 니즈 파악", content: "혼자 공부할 때 나태해지는 문제를 상호 감시와 데이터 측정으로 해결하고자 함" },
        { label: "객관적 지표 설정", content: "단순 접속 시간이 아닌, 실제 화면 앞 집중 시간(순공 시간) 측정의 필요성" },
        { label: "커뮤니티 형성", content: "화상 공유를 통해 스터디 카페와 같은 현장감 있는 환경 구축" }
      ],
      strategy: [
        { title: "AI 집중도 분석", desc: "얼굴 인식 기술로 사용자의 부재나 졸음을 실시간 감지하여 데이터 신뢰성 확보" },
        { title: "데이터 시각화", desc: "개인별 학습 통계를 그래프로 제공하여 성취감 고취 및 재방문 유도" },
        { title: "상호 작용 설계", desc: "친구들과 실시간으로 공부 모습을 공유하며 선의의 경쟁을 유도하는 시스템" }
      ],
      outcome: "실제 사용자 테스트 결과, 평균 집중 시간이 40% 이상 향상되었으며, 데이터 기반의 체계적인 학습 관리가 가능해졌습니다."
    }
  },
  {
    id: 2,
    title: "LG 세이커스 마케팅 전략",
    desc: "데이터 분석을 통한 프로농구 관중 증대 프로젝트",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop",
    tags: ["데이터 분석", "콘텐츠 마케팅", "성과 지표"],
    link: "https://soonchul12.github.io/lg_sakers/",
    details: {
      overview: "LG 세이커스 마케팅 실무 과정에서 진행한 데이터 기반 관중 유입 전략 수립 프로젝트입니다.",
      tech: ["Excel", "Python", "Tableau", "데이터 시각화"],
      analysis: [
        { label: "관중 패턴 분석", content: "홈경기 일자별 관중수 데이터를 시각화하여 요일별/상대팀별 유입 패턴 파악" },
        { label: "이탈 원인 분석", content: "평일 관중수가 주말 대비 급감하는 핵심 원인(직장인/학생 접근성 등) 분석" },
        { label: "시장 트렌드 조사", content: "타 스포츠 구단의 성공적인 평일 프로모션 사례를 벤치마킹하여 스터디" }
      ],
      strategy: [
        { title: "체험형 프로모션", desc: "평일 퇴근길 직장인을 타겟으로 한 전용 프리미엄 체험 좌석 기획" },
        { title: "희소성 기반 마케팅", desc: "평일 관중에게만 제공되는 한정판 굿즈 마케팅을 통해 방문 동기 부여" },
        { title: "공간 마케팅", desc: "경기장 내 유휴 공간을 팝업 스토어로 활용하여 MZ세대의 방문 경험 강화" }
      ],
      outcome: "예상 수익 및 관중 증대 지표를 수치로 산출하여 전략의 타당성을 입증했고, 최종 과제 최우수상을 수상했습니다."
    }
  },
  {
    id: 3,
    title: "라멘피디아 (Ramen Pedia)",
    desc: "취향 기반 추천과 검색이 결합된 라면 큐레이션 서비스",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=2080&auto=format&fit=crop",
    tags: ["UX 디자인", "검색 최적화", "사용자 경험"],
    link: "https://ramen-pedia.vercel.app/",
    details: {
      overview: "수많은 라면 중 사용자의 취향에 맞는 제품을 쉽고 빠르게 찾을 수 있도록 돕는 라면 전문 도감 및 추천 서비스입니다.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "React Query"],
      analysis: [
        { label: "정보 탐색 비용", content: "다양한 브랜드와 종류로 인해 원하는 제품을 찾기 힘든 페인 포인트 발견" },
        { label: "기록의 가치", content: "자신이 먹어본 제품을 기록하고 싶은 사용자 니즈를 '도감' 형태로 기획" },
        { label: "추천 알고리즘", content: "맵기, 국물 종류 등 사용자 선호도에 따른 추천 흐름 설계" }
      ],
      strategy: [
        { title: "검색 경험 최적화", desc: "검색어와 다중 필터를 조합해 최소한의 클릭으로 결과에 도달하는 UX 설계" },
        { title: "사용자 참여 유도", desc: "별점과 북마크 기능을 통해 사용자가 직접 자신의 데이터를 쌓아가는 재미 제공" },
        { title: "시각적 큐레이션", desc: "제품의 특징을 한눈에 파악할 수 있는 카드 형태의 UI와 카테고리 분류" }
      ],
      outcome: "탐색부터 저장, 추천까지 이어지는 흐름을 단일 화면 경험으로 구축하여 사용자 편의성을 극대화했습니다."
    }
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

// --- 프로젝트 상세 모달 ---
function ProjectDetailModal({ project, isOpen, onClose }: { project: any; isOpen: boolean; onClose: () => void }) {
  if (!project || !project.details) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={onClose} />
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-5xl max-h-[90vh] bento-card !overflow-y-auto p-6 md:p-12 no-scrollbar"
            onClick={e => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors z-20"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="absolute w-6 h-0.5 bg-white rotate-45" />
                <div className="absolute w-6 h-0.5 bg-white -rotate-45" />
              </div>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* 왼쪽: 이미지 및 기본 정보 */}
              <div>
                <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 mb-8">
                  <img src={project.image} className="w-full h-full object-cover" alt={project.title} />
                </div>
                <div className="flex gap-2 mb-6 flex-wrap">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="text-xs font-mono text-accent-purple px-3 py-1 rounded-full border border-accent-purple/30 bg-accent-purple/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-6">{project.title}</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">{project.details.overview}</p>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">사용 기술</h4>
                  <div className="flex gap-3 flex-wrap">
                    {project.details.tech.map((t: string) => (
                      <span key={t} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 오른쪽: 상세 분석 및 전략 */}
              <div className="space-y-12">
                {/* 분석 섹션 */}
                <section>
                  <h4 className="text-accent-purple font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> 문제 정의 및 분석
                  </h4>
                  <div className="grid gap-4">
                    {project.details.analysis.map((item: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-xs text-accent-blue font-bold mb-1">{item.label}</p>
                        <p className="text-sm text-gray-300">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 전략/기능 섹션 */}
                <section>
                  <h4 className="text-accent-purple font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Rocket className="w-4 h-4" /> 해결 전략 및 주요 기능
                  </h4>
                  <div className="space-y-6">
                    {project.details.strategy.map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-accent-purple/10 flex items-center justify-center text-accent-purple font-bold">
                          0{idx + 1}
                        </div>
                        <div>
                          <h5 className="font-bold text-lg mb-1">{item.title}</h5>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 성과 섹션 */}
                <section className="p-8 rounded-[2rem] bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-white/10">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                    </div>
                    <h4 className="font-bold uppercase tracking-tighter">핵심 성과</h4>
                  </div>
                  <p className="text-lg font-medium leading-relaxed italic">&quot;{project.details.outcome}&quot;</p>
                </section>

                {/* 링크 버튼 */}
                <MagneticButton className="w-full">
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-6 rounded-3xl bg-white text-black font-black uppercase hover:bg-gray-200 transition-colors shadow-2xl"
                  >
                    프로젝트 방문하기 <ExternalLink className="w-5 h-5" />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Portfolio() {
  const targetRef = useRef(null);
  const mousePosition = useMousePosition();
  const [windowSize, setWindowSize] = useState({ w: 1920, h: 1080 });
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);

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

  // 모달 오픈 시 바디 스크롤 방지
  useEffect(() => {
    if (isContactOpen || selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isContactOpen, selectedProject]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-accent-purple selection:text-white overflow-x-hidden font-sans grain">
      
      <ProjectDetailModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* 0. 프리미엄 배경 레이어 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[50vw] h-[50vw] bg-accent-purple/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] bg-accent-blue/10 rounded-full blur-[100px]" />
      </div>

      {/* 1. 플로팅 내비게이션 (Glassmorphic) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl flex items-center gap-8">
        <span className="text-sm font-bold text-gradient">KWON SOONCHUL</span>
        <div className="flex gap-6 items-center">
          <button onClick={() => setIsContactOpen(true)} className="text-xs font-medium text-gray-400 hover:text-white transition-colors">연락하기</button>
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
            <Activity className="w-3 h-3" /> 비즈니스 가치를 만드는 개발자 & 마케터
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8 uppercase">
            GROWTH INSIGHT <br />
            <span className="text-white/20">&</span> <br />
            <span className="text-gradient">SOLID CODE</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
            데이터 분석 기반의 마케팅 통찰력과 탄탄한 개발 실력을 결합하여 <br />
            사용자와 비즈니스가 모두 만족하는 웹 서비스를 만듭니다.
          </p>
          
          <div className="flex gap-4 justify-center">
            <MagneticButton>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="px-8 py-4 rounded-2xl bg-white text-black font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-2xl"
              >
                협업 제안 <ChevronRight className="w-4 h-4" />
              </button>
            </MagneticButton>
            <MagneticButton>
              <a 
                href="#projects"
                className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 font-bold hover:bg-white/10 transition-colors"
              >
                프로젝트 보기
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        {/* 3. 벤토 그리드 레이아웃 (핵심 특색 섹션) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl w-full">
          {/* Profile Card */}
          <motion.div whileHover={{ y: -5 }} className="bento-card md:col-span-2 p-8 flex items-end justify-between group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 italic uppercase">About Me</h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                스포츠 구단의 마케팅 데이터와 스타트업의 개발 문화를 모두 경험했습니다. <br />
                단순한 구현을 넘어, 지표를 개선하고 가치를 창출하는 개발을 지향합니다.
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
              <p className="text-sm font-bold">데이터 분석 모델링 & <br />AI 에이전트 개발</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-gray-400 font-mono tracking-widest">실행 중...</span>
            </div>
          </motion.div>

          {/* Location & Time Card */}
          <motion.div whileHover={{ y: -5 }} className="bento-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <MapPin className="w-4 h-4 text-accent-blue" />
              <span className="text-lg font-mono font-bold">{currentTime}</span>
            </div>
            <div>
              <p className="text-[10px] uppercase text-gray-500 mb-1">Location</p>
              <p className="text-sm font-bold">대한민국, 서울</p>
            </div>
          </motion.div>

          {/* Tech Stack Horizontal Scroll (Bento Item) */}
          <div className="md:col-span-4 bento-card py-6 px-8 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">Expertise</span>
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
              onClick={() => {
                if (project.details) {
                  setSelectedProject(project);
                } else {
                  window.open(project.link, "_blank");
                }
              }}
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
                    <p className="text-xs text-gray-300 flex items-center gap-1">상세 내용 보기 <ExternalLink className="w-3 h-3" /></p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* 6. 경력 (Experience) - 세련된 수직 리스트 */}
      <section className="relative z-10 py-32 px-6 max-w-4xl mx-auto">
        <h2 className="text-sm font-bold text-gray-500 mb-16 tracking-widest text-center uppercase">Experience</h2>
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
            함께 새로운 <br /> 가치를 <span className="text-gradient underline decoration-accent-purple underline-offset-8">만들어봐요</span>
          </h2>
          <MagneticButton className="inline-block">
            <button 
              onClick={() => setIsContactOpen(true)}
              className="px-12 py-6 rounded-3xl bg-white text-black text-xl font-black uppercase hover:scale-110 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            >
              연락하기
            </button>
          </MagneticButton>
          <div className="mt-32 flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 gap-6">
            <p className="text-xs text-gray-500">© 2026 KWON SOONCHUL PORTFOLIO</p>
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
              <h3 className="text-4xl font-black italic uppercase mb-8 text-gradient">연락처</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">이메일</p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-xl font-bold hover:text-accent-purple transition-colors">{CONTACT_INFO.email}</a>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">전화번호</p>
                  <p className="text-xl font-bold">{CONTACT_INFO.phone}</p>
                </div>
                <div className="pt-8">
                  <button onClick={() => setIsContactOpen(false)} className="w-full py-4 rounded-2xl border border-white/10 hover:bg-white hover:text-black font-bold transition-all uppercase text-xs tracking-widest">닫기</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

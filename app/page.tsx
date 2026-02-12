"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Cpu, Layers, Rocket, ExternalLink, Mail, Github } from "lucide-react";
import { useMousePosition } from "./hooks/useMousePosition";

// --- 데이터 섹션 (사용자 정보 수정) ---
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

// Gyöngy 스타일 마키 스크롤용 스킬 목록
const marqueeSkills = [
  "React", "TypeScript", "Next.js", "AI Tools", "Tailwind CSS",
  "UX Design", "Marketing", "Web Development", "Java Script"
];

const projects = [
  {
    id: 1,
    title: "AI Powered Study Room",
    desc: "AI 학습 타이머와 실시간 화상 스터디 플랫폼",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", // 예시 이미지
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
    title: "Baseball Team Player Records",
    desc: "사회인 야구팀 선수 기록 저장·관리용 웹",
    image: "https://images.unsplash.com/photo-1515703406961-3a0f274a7386?q=80&w=2070&auto=format&fit=crop",
    tags: ["Next.js", "Record Management", "Team Stats"],
    link: "https://baseball-zeta.vercel.app/",
  },
];

// --- 컴포넌트 섹션 ---

/** Gyöngy 스타일 무한 마키 스크롤 애니메이션 */
function MarqueeScroller({ items, duration = 15 }: { items: string[]; duration?: number }) {
  const duplicatedItems = [...items, ...items];
  return (
    <div className="w-full overflow-hidden py-3 border-y border-white/5">
      <motion.div
        className="flex gap-12 whitespace-nowrap w-max"
        animate={{ x: "-50%" }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration, ease: "linear" },
        }}
      >
        {duplicatedItems.map((item, i) => (
          <span key={i} className="text-gray-400/90 text-base md:text-lg font-medium italic">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** 자기소개서 카드 - 커서 근접 시 글로우 + 커서 따라다니는 하이라이트 */
function SelfIntroCard({
  title,
  content,
  mouseX,
  mouseY,
}: {
  title: string;
  content: string;
  mouseX: number;
  mouseY: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState(0);
  const [highlightPos, setHighlightPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);
    setGlow(Math.max(0, 1 - dist / 200));
    setHighlightPos({ x: mouseX - rect.left, y: mouseY - rect.top });
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.02 }}
      className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 overflow-hidden transition-all duration-300"
      style={{
        boxShadow: `0 0 ${20 + glow * 30}px rgba(139, 92, 246, ${0.1 + glow * 0.2}), inset 0 0 ${glow * 20}px rgba(139, 92, 246, 0.05)`,
        borderColor: `rgba(255,255,255,${0.1 + glow * 0.1})`,
      }}
    >
      {/* 커서 따라다니는 하이라이트 */}
      <div
        className="absolute w-32 h-32 rounded-full pointer-events-none transition-opacity duration-200"
        style={{
          left: highlightPos.x - 64,
          top: highlightPos.y - 64,
          background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)",
          opacity: glow * 0.6,
        }}
      />
      <div className="relative z-10">
        <span className="text-purple-400 font-bold text-sm mb-2 block"># {title}</span>
        <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const mousePosition = useMousePosition();
  const [windowSize, setWindowSize] = useState({ w: 1920, h: 1080 });

  useEffect(() => {
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    const onResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 배경 텍스트 파라럭스 (스크롤에 따라 움직임)
  const bgTextY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  // 프로필 사진 3D 틸트 (커서 기반)
  const photoTiltX = ((mousePosition.y - windowSize.h / 2) / (windowSize.h / 2)) * -8;
  const photoTiltY = ((mousePosition.x - windowSize.w / 2) / (windowSize.w / 2)) * 8;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500 selection:text-white overflow-hidden font-sans">
      
      {/* 커서 따라다니는 스포트라이트 효과 */}
      <div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0 transition-opacity duration-300"
        style={{
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.08) 25%, transparent 60%)",
        }}
      />
      
      {/* 배경 그라디언트 효과 (보라색 오로라) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
      </div>

      {/* 네비게이션 */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          권순철 포트폴리오
        </span>
        <div className="flex gap-4">
          <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          <Mail className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
        </div>
      </nav>

      {/* Gyöngy 스타일: 큰 배경 텍스트 (스크롤 파라럭스) */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[20vw] font-black text-white/[0.03] pointer-events-none z-0 select-none"
        style={{ y: bgTextY }}
      >
        BUILD
      </motion.div>

      {/* 1. 히어로 섹션 (자기소개 + 프로필 사진) */}
      <section className="relative z-10 flex flex-col md:flex-row justify-center items-center min-h-screen px-4 py-20 md:py-0 gap-12 md:gap-16">
        {/* 프로필 사진 - 커서 기반 3D 틸트 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-shrink-0"
          style={{
            transform: `perspective(1000px) rotateX(${photoTiltX}deg) rotateY(${photoTiltY}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative group">
            {/* 커서 위치에 따라 움직이는 글로우 */}
            <div 
              className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 opacity-50 blur-xl transition-opacity duration-300 group-hover:opacity-70 pointer-events-none"
              style={{
                transform: `translate(${(mousePosition.x / windowSize.w - 0.5) * 16}px, ${(mousePosition.y / windowSize.h - 0.5) * 16}px)`,
              }}
            />
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-white/20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm shadow-2xl">
              <img
                src="/profile.jpeg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* 자기소개서 양식 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          {/* Gyöngy 스타일: 상단 소개 라벨 */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-sm mb-2"
          >
            Hi, I&apos;m
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-extrabold mb-2 leading-tight text-left"
          >
            AI-Augmented Developer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl font-bold mb-6 text-purple-300/90 italic"
          >
            open to create
          </motion.p>

          {/* Gyöngy 스타일 마키 스크롤 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <MarqueeScroller items={marqueeSkills} duration={20} />
          </motion.div>

          {/* 회사 지원용 자기소개서 카드 - 커서 근접 시 글로우 */}
          <div className="space-y-4 mb-8">
            <SelfIntroCard
              title="성장 과정"
              content="프론트엔드 개발과 데이터 분석을 병행하며, 스타트업과 스포츠 산업(LG 세이커스)에서 실무 경험을 쌓았습니다. AI 도구를 적극 활용해 개발 생산성을 높이는 동시에, 사용자 중심의 인터페이스를 설계하는 데 집중해 왔습니다."
              mouseX={mousePosition.x}
              mouseY={mousePosition.y}
            />
            <SelfIntroCard
              title="지원 동기"
              content="귀사의 혁신적인 기술과 서비스 철학에 큰 감명을 받았습니다. 데이터 기반 의사결정과 사용자 경험 개선에 대한 제 경험과 역량이 귀사에 기여할 수 있다고 확신하며, AI와의 협업 능력을 바탕으로 더 나은 제품을 함께 만들어 가고 싶습니다."
              mouseX={mousePosition.x}
              mouseY={mousePosition.y}
            />
            <SelfIntroCard
              title="입사 후 포부"
              content="입사 후에는 사용자 피드백을 기반으로 한 지속적인 개선, 접근성과 성능을 고려한 웹 제품 개발, 그리고 팀 내 AI 활용 워크플로우 확산에 기여하겠습니다. 단기적으로는 실무에 빠르게 적응하고, 장기적으로는 기술과 UX를 아우르는 핵심 인력으로 성장하겠습니다."
              mouseX={mousePosition.x}
              mouseY={mousePosition.y}
            />
          </div>
          
          {/* <div className="flex gap-4">
            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 font-bold transition-all shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]">
              포트폴리오 보기
            </button>
          </div> */}
        </motion.div>

        {/* 하단 스크롤 유도 아이콘 */}
        {/* <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div> */}
      </section>

      {/* 2. 경력 섹션 (Timeline) */}
      <section className="relative z-10 py-20 px-6 md:px-20 max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-3"
        >
          <Rocket className="text-purple-400" /> Experience
        </motion.h2>

        <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              {/* 타임라인 점 */}
              <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
              
              <span className="text-sm text-gray-400 font-mono mb-2 block">{exp.period}</span>
              <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
              <p className="text-purple-400 font-medium mb-3">{exp.role}</p>
              <p className="text-gray-300 mb-4 leading-relaxed max-w-2xl">{exp.desc}</p>
              
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. 포트폴리오 섹션 (Glassmorphism Cards) */}
      <section className="relative z-10 py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3"
        >
          <Layers className="text-blue-400" /> Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
            >
              {/* 이미지 영역 */}
              <div className="h-48 bg-gray-800 overflow-hidden relative">
                {/* 실제 이미지가  src에  수정필요 */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent z-10" />
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>

              {/* 내용 영역 */}
              <div className="p-6 relative z-20">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 mb-4 h-12">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-semibold px-2 py-1 rounded bg-purple-500/20 text-purple-300">
                      #{tag}
                    </span>
                  ))}
                </div>
                <a href={project.link} className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all">
                  View Project <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              {/* 호버 시 빛나는 효과 */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500 -z-10" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Contact Footer */}
      <footer className="relative z-10 py-20 text-center border-t border-white/10 mt-20 bg-black/40 backdrop-blur-lg">
        <h2 className="text-3xl font-bold mb-6">Let's Build Together</h2>
        <p className="text-gray-400 mb-8">AI와 함께 더 빠르고 창의적인 웹을 만듭니다.</p>
        <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all flex items-center gap-2 mx-auto">
          <Mail className="w-4 h-4" /> Contact Me
        </button>
        <p className="text-gray-600 text-sm mt-12">© 2026 Developer Portfolio. All rights reserved.</p>
      </footer>

    </div>
  );
}
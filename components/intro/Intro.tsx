"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useInView, useReducedMotion } from "framer-motion";
import { useSplashDone } from "@/components/voyage/SplashContext";
import Link from "next/link";
import { Sparkles, FileText, Layers, Brain, Settings, Server, Mail, Linkedin, Github, Phone, ArrowUpRight, Cloud, Database, Container, GitBranch, Code2 } from "lucide-react";

const techStack = [
  // Chips spiral out from the laptop and settle on an ellipse around it. Positions are percentages\r\n  // of the scene, so the same layout simply scales down on phones.
  { name: "React", icon: Code2, className: "tech-react" },
  { name: "Node.js", icon: Server, className: "tech-node" },
  { name: "AWS", icon: Cloud, className: "tech-aws" },
  { name: "Next.js", icon: Layers, className: "tech-next" },
  { name: "TypeScript", icon: Code2, className: "tech-ts" },
  { name: "Docker", icon: Container, className: "tech-docker" },
  { name: "Kubernetes", icon: Settings, className: "tech-k8s" },
  { name: "PostgreSQL", icon: Database, className: "tech-db" },
  { name: "Java", icon: Code2, className: "tech-java" },
  { name: "Git", icon: GitBranch, className: "tech-git" },
];

const SPIRAL_RX = 42;
const SPIRAL_RY = 46;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const SPIRAL = techStack.map((_, i) => {
  const theta = -120 + i * 38; // where this chip finally rests, going round the laptop
  const radius = 0.8 + i * 0.02; // each one a little further out: a spiral
  const at = (angle: number, r: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: Number(clamp(50 + Math.cos(rad) * SPIRAL_RX * r, 15, 85).toFixed(2)),
      y: Number(clamp(50 + Math.sin(rad) * SPIRAL_RY * r, 9, 87).toFixed(2)),
    };
  };
  // the chip leaves the laptop and winds outwards to its place
  const path = [0, 0.25, 0.5, 0.75, 1].map((t) => at(theta - (1 - t) * 240, radius * t));
  return { end: at(theta, radius), path };
});
const contacts = [
  { label: "Email", detail: "Get in touch", href: "mailto:saumyasanjay08@gmail.com", Icon: Mail },
  { label: "LinkedIn", detail: "Connect", href: "https://linkedin.com/in/saumya-sanjay-srivastava", Icon: Linkedin },
  { label: "GitHub", detail: "My code", href: "https://github.com/saumyasrivastava08", Icon: Github },
  { label: "Phone", detail: "Call me", href: "tel:+919473729355", Icon: Phone },
];

export default function Intro() {
  // The technologies only spiral out of the laptop once the laptop scene has scrolled into view.
  const sceneRef = useRef<HTMLElement | null>(null);
  const sceneInView = useInView(sceneRef, { once: true, amount: 0.8 });
  const splashDone = useSplashDone();
  const reduceMotion = useReducedMotion();
  const sceneControls = useAnimationControls();
  // Techs pop out once the laptop has docked on its side of the page.
  const [laptopDocked, setLaptopDocked] = useState(false);
  const splashWasDone = useRef(splashDone);
  // Hero text and buttons wait for the opening, then come in as before.
  const go = <T,>(value: T) => (splashDone ? value : undefined);

  // The hero laptop "comes over" from the middle of the page after the opening, ghosted at first,
  // and docks on its side. The planet resting in it waits until it has landed.
  useEffect(() => {
    const root = document.documentElement;
    if (!splashWasDone.current) root.setAttribute("data-hero-intro", "");
    if (!splashDone) return () => root.removeAttribute("data-hero-intro");

    const el = sceneRef.current;
    const timers: number[] = [];
    let cancelled = false;
    const settle = () => {
      if (cancelled) return;
      root.removeAttribute("data-hero-intro");
      setLaptopDocked(true);
      // the traveller measures its start position from the laptop: refresh it once it has landed
      timers.push(window.setTimeout(() => window.dispatchEvent(new Event("resize")), 120));
      timers.push(window.setTimeout(() => window.dispatchEvent(new Event("resize")), 900));
    };

    const rect = el?.getBoundingClientRect();
    const onScreen =
      !!rect && rect.width > 0 && rect.top < window.innerHeight * 0.55 && rect.bottom > 80;

    if (splashWasDone.current || reduceMotion || !rect || !onScreen) {
      // nothing to fly from (phone layout / returning visitor): a simple entrance
      sceneControls.set({ opacity: 0, y: 18, x: 0, scale: 0.96, filter: "blur(0px)" });
      sceneControls
        .start({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } })
        .then(settle);
    } else {
      const dx = window.innerWidth / 2 - (rect.left + rect.width / 2);
      const dy = window.innerHeight / 2 - (rect.top + rect.height / 2);
      sceneControls.set({ x: dx, y: dy, scale: 1.55, opacity: 0, filter: "blur(10px)" });
      sceneControls
        .start({
          x: 0,
          y: 0,
          scale: 1,
          opacity: [0, 0.5, 0.45, 1],
          filter: ["blur(10px)", "blur(5px)", "blur(2px)", "blur(0px)"],
          transition: {
            duration: 1.5,
            ease: [0.5, 0, 0.2, 1],
            times: [0, 0.28, 0.7, 1],
          },
        })
        .then(settle);
    }

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      root.removeAttribute("data-hero-intro");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [splashDone]);

  // The heading / buttons moved while they came in: let the traveller re-measure afterwards.
  useEffect(() => {
    if (!splashDone) return;
    const timer = window.setTimeout(() => window.dispatchEvent(new Event("resize")), 1600);
    return () => window.clearTimeout(timer);
  }, [splashDone]);
  return (
    <section id="intro" className="intro">
      <div className="intro-bg" /><div className="intro-orb intro-orb-one" /><div className="intro-orb intro-orb-two" /><div className="cosmic-planet cosmic-planet-two" aria-hidden="true" /><div className="cosmic-planet cosmic-planet-three" aria-hidden="true" /><div className="cosmic-starfield" aria-hidden="true" />
      <div id="hero-wanderer-slot" className="hero-wanderer-slot" aria-hidden="true" />
      <div className="intro-container">
        <div className="intro-layout">
        <div className="intro-main">
          <motion.p className="intro-eyebrow" initial={{ opacity: 0, y: 10 }} animate={go({ opacity: 1, y: 0 })} transition={{ duration: 0.55 }}>
            <Sparkles size={13} aria-hidden="true" /> SOFTWARE ENGINEERING <span>·</span> CLOUD <span>·</span> DEVOPS
          </motion.p>
          <motion.h1 className="intro-title" initial={{ opacity: 0, y: 24 }} animate={go({ opacity: 1, y: 0 })} transition={{ duration: 0.8, ease: "easeOut" }}>
            Hi, I’m <span className="intro-name">Saumya <span className="intro-sparkle">✨</span></span>
          </motion.h1>
          <motion.div className="intro-subtitle" initial={{ opacity: 0 }} animate={go({ opacity: 1 })} transition={{ delay: 0.3, duration: 0.6 }}>
            <p className="role-line"><Layers size={14} /><span>Full-Stack Engineer</span><span className="dot">•</span><Server size={14} /><span>DevOps Engineer</span></p>
            <p className="role-line"><Brain size={14} /><span>AI-Powered Applications</span><span className="dot">•</span><Settings size={14} /><span>Cloud & Automation</span></p>
          </motion.div>
          <motion.p className="intro-subtext" initial={{ opacity: 0 }} animate={go({ opacity: 1 })} transition={{ delay: 0.5, duration: 0.6 }}>
            Full-Stack and DevOps Engineer with 3+ years of experience building scalable web applications, cloud-native infrastructure, and internal platforms. I work mainly with React, TypeScript, Java, AWS, Kubernetes, and CI/CD automation, and I own systems from the frontend through to production.
          </motion.p>
          <motion.div className="intro-actions" initial={{ opacity: 0, y: 10 }} animate={go({ opacity: 1, y: 0 })} transition={{ delay: 0.7, duration: 0.5 }}>
            <Link href="/experience" className="intro-primary-btn">View Experience</Link>
            <a href="/resumes/Saumya-Resume.pdf" className="intro-secondary-btn" download="saumya_srivastava_resume.pdf"><FileText size={16} />Download CV</a>
          </motion.div>
        </div>

        <motion.aside ref={sceneRef} className="intro-tech-scene" initial={{ opacity: 0 }} animate={sceneControls} aria-label="Technology stack">
          
          <div className="tech-orbit tech-orbit-one" /><div className="tech-orbit tech-orbit-two" /><div className="tech-orbit tech-orbit-three" />
          <div className="tech-laptop">
            <div className="laptop-screen">
              <div className="laptop-topbar"><span /><span /><span /><small>saumya.dev</small></div>
              <div className="laptop-code">
                <div className="code-line"><i>01</i><b>const</b> developer = <em>&quot;Saumya&quot;</em>;</div>
                <div className="code-line"><i>02</i><b>const</b> stack = [<em>&quot;React&quot;</em>, <em>&quot;Java&quot;</em>, <em>&quot;AWS&quot;</em>];</div>
                <div className="code-line"><i>03</i><b>function</b> <strong>build</strong>() {"{"}</div>
                <div className="code-line"><i>04</i>&nbsp;&nbsp;return <em>&quot;ideas → reality&quot;</em>;</div>
                <div className="code-line"><i>05</i>{"}"}</div>
                <div className="code-line"><i>06</i></div>
                <div className="code-line"><i>07</i><span className="code-cursor">▌</span></div>
              </div>
              <div className="laptop-screen-glow" />
              {/* Invisible anchor: the travelling planet rests here, inside the laptop, until you scroll */}
              <div className="laptop-planet" aria-hidden="true" />
              <div id="laptop-wanderer-slot" className="wanderer-slot" aria-hidden="true" />
            </div>
            <div className="laptop-base"><div className="laptop-notch" /></div>
          </div>
          {techStack.map(({ name, icon: Icon, className }, index) => {
            const { end, path } = SPIRAL[index];
            return (
              <motion.div
                key={name}
                className="tech-spiral-slot"
                initial={{ left: "50%", top: "50%", opacity: 0, scale: 0.4 }}
                animate={
                  sceneInView && laptopDocked
                    ? {
                        left: path.map((point) => `${point.x}%`),
                        top: path.map((point) => `${point.y}%`),
                        opacity: [0, 1, 1, 1, 1],
                        scale: [0.4, 0.7, 0.9, 1, 1],
                      }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.85, delay: 0.05 + index * 0.045, ease: "easeOut", times: [0, 0.25, 0.5, 0.75, 1] }}
                style={{ left: `${end.x}%`, top: `${end.y}%`, x: "-50%", y: "-50%" }}
              >
                <motion.div
                  className={"tech-float " + className}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3 + (index % 4) * 0.45, repeat: Infinity, ease: "easeInOut", delay: 2.4 + index * 0.12 }}
                >
                  <Icon size={17} /><span>{name}</span>
                </motion.div>
              </motion.div>
            );
          })}          <div className="tech-scene-caption">Building across the stack <Sparkles size={13} /></div>
        </motion.aside>
        </div>
        <motion.div className="hero-contact-section" initial={{opacity:0,y:18}} animate={go({opacity:1,y:0})} transition={{delay:0.9,duration:0.6}}>
          <div className="hero-contact-heading"><span className="contact-status-dot" />LET’S CONNECT <span className="hero-contact-heading-line" /></div>
          <div className="hero-contact-grid">
            {contacts.map(({ label, detail, href, Icon }) => <a key={label} href={href} target={label === "Phone" ? undefined : "_blank"} rel={label === "Phone" ? undefined : "noopener noreferrer"}><span className="hero-contact-icon"><Icon size={18}/></span><span className="hero-contact-copy"><strong>{label}</strong><small>{detail}</small></span><ArrowUpRight size={14} className="hero-contact-arrow" /></a>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Moon, Sparkles, FileText, Layers, Brain, Settings, Server, Mail, Linkedin, Github, Phone, ArrowUpRight, Cloud, Database, Container, GitBranch, Code2 } from "lucide-react";

const techStack = [
  { name: "React", icon: Code2, className: "tech-react", x: "8%", y: "18%" },
  { name: "Next.js", icon: Layers, className: "tech-next", x: "72%", y: "9%" },
  { name: "TypeScript", icon: Code2, className: "tech-ts", x: "82%", y: "37%" },
  { name: "Java", icon: Code2, className: "tech-java", x: "76%", y: "70%" },
  { name: "AWS", icon: Cloud, className: "tech-aws", x: "45%", y: "5%" },
  { name: "Docker", icon: Container, className: "tech-docker", x: "18%", y: "72%" },
  { name: "Kubernetes", icon: Settings, className: "tech-k8s", x: "5%", y: "48%" },
  { name: "PostgreSQL", icon: Database, className: "tech-db", x: "52%", y: "84%" },
  { name: "Git", icon: GitBranch, className: "tech-git", x: "91%", y: "55%" },
  { name: "Node.js", icon: Server, className: "tech-node", x: "28%", y: "10%" },
];

const contacts = [
  { label: "Email", detail: "Get in touch", href: "mailto:saumyasanjay08@gmail.com", Icon: Mail },
  { label: "LinkedIn", detail: "Connect", href: "https://linkedin.com/in/saumya-sanjay-srivastava", Icon: Linkedin },
  { label: "GitHub", detail: "My code", href: "https://github.com/saumyasrivastava08", Icon: Github },
  { label: "Phone", detail: "Call me", href: "tel:+919473729355", Icon: Phone },
];

export default function Intro() {
  return (
    <section id="intro" className="intro">
      <div className="intro-bg" /><div className="intro-orb intro-orb-one" /><div className="intro-orb intro-orb-two" />
      <div className="intro-container intro-layout">
        <div className="intro-main">
          <motion.h1 className="intro-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            Hi, I’m <span className="intro-name">Saumya ✨</span>
          </motion.h1>
          <motion.div className="intro-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <p className="role-line"><Layers size={14} /><span>Full-Stack Engineer</span><span className="dot">•</span><Server size={14} /><span>DevOps Engineer</span></p>
            <p className="role-line"><Brain size={14} /><span>AI-Powered Applications</span><span className="dot">•</span><Settings size={14} /><span>Cloud & Automation</span></p>
          </motion.div>
          <motion.p className="intro-subtext" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
            Full-Stack & DevOps Engineer with 3+ years of experience building scalable web applications, cloud-native infrastructure, and internal platforms. I specialize in React, TypeScript, Java, AWS, Kubernetes, and CI/CD automation, delivering reliable systems from frontend to production.
          </motion.p>
          <motion.div className="intro-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
            <a href="/experience" className="intro-primary-btn">View Experience</a>
            <a href="/resumes/Saumya-Resume.pdf" className="intro-secondary-btn" download="saumya_srivastava_resume.pdf"><FileText size={16} />Download CV</a>
          </motion.div>
          <motion.p className="intro-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <Moon size={14} />Turning ideas into products<span className="dot">•</span>🫖 Powered by chai<span className="dot">•</span><Sparkles size={14} />Continuously learning
          </motion.p>
        </div>

        <motion.aside className="intro-tech-scene" initial={{ opacity: 0, scale: 0.92, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }} aria-label="Technology stack">
          <div className="tech-scene-label"><span className="contact-status-dot" />MY TECH UNIVERSE</div>
          <div className="tech-orbit tech-orbit-one" /><div className="tech-orbit tech-orbit-two" /><div className="tech-orbit tech-orbit-three" />
          <div className="tech-laptop">
            <div className="laptop-screen">
              <div className="laptop-topbar"><span /><span /><span /><small>saumya.dev</small></div>
              <div className="laptop-code">
                <div className="code-line"><i>01</i><b>const</b> developer = <em>"Saumya"</em>;</div>
                <div className="code-line"><i>02</i></div>
                <div className="code-line"><i>03</i><b>function</b> <strong>build</strong>() {"{"}</div>
                <div className="code-line"><i>04</i>&nbsp;&nbsp;return <em>"ideas → reality"</em>;</div>
                <div className="code-line"><i>05</i>{"}"}</div>
                <div className="code-line"><i>06</i></div>
                <div className="code-line"><i>07</i><span className="code-cursor">▌</span></div>
              </div>
              <div className="laptop-screen-glow" />
            </div>
            <div className="laptop-base"><div className="laptop-notch" /></div>
          </div>
          {techStack.map(({ name, icon: Icon, className, x, y }, index) => (
            <motion.div key={name} className={`tech-float ${className}`} style={{ left: x, top: y }} animate={{ y: [0, -7, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 3 + (index % 4) * 0.45, repeat: Infinity, ease: "easeInOut", delay: index * 0.12 }}>
              <Icon size={17} /><span>{name}</span>
            </motion.div>
          ))}
          <div className="tech-scene-caption">Building across the stack <Sparkles size={13} /></div>
          <div className="tech-contact-row">
            {contacts.map(({ label, detail, href, Icon }) => <a key={label} href={href} target={label === "Phone" ? undefined : "_blank"} rel={label === "Phone" ? undefined : "noopener noreferrer"}><Icon size={16} /><span className="tech-contact-copy"><strong>{label}</strong><small>{detail}</small></span><ArrowUpRight size={11} className="tech-contact-arrow" /></a>)}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

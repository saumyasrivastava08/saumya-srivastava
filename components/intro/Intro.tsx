"use client";

import { motion } from "framer-motion";
import { Moon, Sparkles, FileText } from "lucide-react";
import { Layers, Brain, Settings, Server } from "lucide-react";
import { Mail, Linkedin, Github, Phone, ArrowUpRight } from "lucide-react";

const contactLinks = [
  {
    label: "Email",
    value: "saumyasanjay08@gmail.com",
    href: "mailto:saumyasanjay08@gmail.com",
    Icon: Mail,
    detail: "Let’s talk",
  },
  {
    label: "LinkedIn",
    value: "Connect professionally",
    href: "https://linkedin.com/in/saumya-sanjay-srivastava",
    Icon: Linkedin,
    detail: "Network",
  },
  {
    label: "GitHub",
    value: "Explore my work",
    href: "https://github.com/saumyasrivastava08",
    Icon: Github,
    detail: "Open source",
  },
  {
    label: "Phone",
    value: "+91 9473729355",
    href: "tel:+919473729355",
    Icon: Phone,
    detail: "Say hello",
  },
];

export default function Intro() {
  return (
    <section id="intro" className="intro">
      <div className="intro-bg" />

      <div className="intro-container intro-layout">
        <div className="intro-main">
          <motion.h1
            className="intro-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Hi, I’m <span className="intro-name">Saumya ✨</span>
          </motion.h1>

          <motion.div
            className="intro-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="role-line">
              <Layers size={14} />
              <span>Full-Stack Engineer</span>
              <span className="dot">•</span>
              <Server size={14} />
              <span>DevOps Engineer</span>
            </p>

            <p className="role-line">
              <Brain size={14} />
              <span>AI-Powered Applications</span>
              <span className="dot">•</span>
              <Settings size={14} />
              <span>Cloud & Automation</span>
            </p>
          </motion.div>

          <motion.p
            className="intro-subtext"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Full-Stack & DevOps Engineer with 3+ years of experience building
            scalable web applications, cloud-native infrastructure, and internal
            platforms. I specialize in React, TypeScript, Java, AWS, Kubernetes,
            and CI/CD automation, delivering reliable systems from frontend to
            production.
          </motion.p>

          <motion.div
            className="intro-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <a href="/experience" className="intro-primary-btn">
              View Experience
            </a>

            <a
              href="/resumes/Saumya-Resume.pdf"
              className="intro-secondary-btn"
              download="saumya_srivastava_resume.pdf"
            >
              <FileText size={16} />
              Download CV
            </a>
          </motion.div>

          <motion.p
            className="intro-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Moon size={14} />
            Turning ideas into products
            <span className="dot">•</span>
            🫖 Powered by chai
            <span className="dot">•</span>
            <Sparkles size={14} />
            Continuously learning
          </motion.p>
        </div>

        <motion.aside
          className="intro-contact-panel"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
          aria-label="Contact information"
        >
          <div className="contact-panel-glow" />
          <div className="contact-panel-heading">
            <span className="contact-eyebrow">
              <span className="contact-status-dot" />
              CONTACT & LINKS
            </span>
            <h2>Let’s connect<span>.</span></h2>
            <p>Have an idea, an opportunity, or just want to say hello?</p>
          </div>

          <div className="contact-card-list">
            {contactLinks.map(({ label, value, href, Icon, detail }, index) => (
              <motion.a
                key={label}
                href={href}
                target={label === "Phone" ? undefined : "_blank"}
                rel={label === "Phone" ? undefined : "noopener noreferrer"}
                className="contact-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 + index * 0.1, duration: 0.4 }}
              >
                <span className="contact-icon-wrap">
                  <Icon size={19} strokeWidth={1.8} />
                </span>
                <span className="contact-card-copy">
                  <span className="contact-card-topline">
                    <span className="contact-card-label">{label}</span>
                    <span className="contact-card-detail">{detail}</span>
                  </span>
                  <span className="contact-card-value">{value}</span>
                </span>
                <ArrowUpRight className="contact-card-arrow" size={17} />
              </motion.a>
            ))}
          </div>

          <div className="contact-panel-footer">
            <span className="contact-footer-line" />
            <span>Usually around, always curious.</span>
            <Sparkles size={14} />
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

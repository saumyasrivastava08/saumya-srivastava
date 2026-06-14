"use client";

import { motion } from "framer-motion";
import { Moon, Sparkles, FileText } from "lucide-react";
import { Layers, Brain, Settings, Server } from "lucide-react";
import { Mail, Linkedin, Github, Phone } from "lucide-react";
export default function Intro() {
  return (
    <section id="intro" className="intro">
      <div className="intro-bg" />

      <div className="intro-container">
        {/* Title */}
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

        {/* Actions */}
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
            href="/resumes/Saumya_Srivastava_Resume.pdf"
            className="intro-secondary-btn"
            download="saumya_srivastava_resume.pdf"
          >
            <FileText size={16} />
            Download CV
          </a>
        </motion.div>
        <motion.div
          className="intro-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="intro-links">
            <a
              href="mailto:saumyasanjay08@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail size={16} />
              <span>Email</span>
            </a>

            <a
              href="https://linkedin.com/in/saumya-sanjay-srivastava"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/saumyasrivastava08"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>

            <a
              href="tel:+919473729355"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone size={16} />
              <span>+91 9473729355</span>
            </a>
          </div>
        </motion.div>
        {/* Note — personality lives here */}
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
    </section>
  );
}

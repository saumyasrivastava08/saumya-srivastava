"use client";

import { motion } from "framer-motion";
import { Moon, Sparkles, FileText } from "lucide-react";
import { Layers, Brain, Settings , Server} from "lucide-react";

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
              <span>Full-Stack Enginner</span>
              <span className="dot">•</span>
               <Sparkles size={14} />
              <span>Frontend Engineer</span>
              <span className="dot">•</span>
              <Server size={14} />
              <span>Backend</span>
            </p>

            <p className="role-line">
              <Brain size={14} />
              <span>AI-Powered Apps</span>
              <span className="dot">•</span>
              <Settings size={14} />
              <span>DevOps</span>
            </p>
          </motion.div>



            <motion.p
        className="intro-subtext"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
   I design thoughtful user interfaces, build scalable full-stack systems,
and ship AI-enabled features — with hands-on ownership of backend APIs,
cloud infrastructure, and DevOps pipelines focused on performance and reliability.

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

          <a href="/resume.pdf" className="intro-secondary-btn">
            <FileText size={16} />
            Download CV
          </a>
        </motion.div>

        {/* Note — personality lives here */}
        <motion.p
          className="intro-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Moon size={14} />
          Built late nights
          <span className="dot">•</span>
          🫖 Powered by chai
          <span className="dot">•</span>
          <Sparkles size={14} />
          Crafted with care
        </motion.p>
      </div>
    </section>
  );
}
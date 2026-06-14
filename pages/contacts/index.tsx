"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Phone } from "lucide-react";

export default function ContactsPage() {
  return (
    <section className="experience-section">
      <div className="experience-container">
        <motion.h1
          className="experience-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact
        </motion.h1>

        <motion.p
          className="experience-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          Feel free to reach out — open to opportunities, collaborations, and
          friendly chats.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="mailto:saumyasanjay08@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="intro-primary-btn"
            >
              <Mail size={16} />
              <span style={{ marginLeft: 8 }}>Email</span>
            </a>

            <a
              href="https://linkedin.com/in/saumya-sanjay-srivastava"
              target="_blank"
              rel="noopener noreferrer"
              className="intro-secondary-btn"
            >
              <Linkedin size={16} />
              <span style={{ marginLeft: 8 }}>LinkedIn</span>
            </a>

            <a
              href="https://github.com/saumyasrivastava08"
              target="_blank"
              rel="noopener noreferrer"
              className="intro-secondary-btn"
            >
              <Github size={16} />
              <span style={{ marginLeft: 8 }}>GitHub</span>
            </a>

            <a
              href="tel:+919473729355"
              target="_blank"
              rel="noopener noreferrer"
              className="intro-secondary-btn"
            >
              <Phone size={16} />
              <span style={{ marginLeft: 8 }}>+91 9473729355</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <p style={{ color: "#94a3b8" }}>
            Or send a quick message — it will open your mail client.
          </p>

          <form
            action="mailto:saumyasanjay08@gmail.com"
            method="GET"
            encType="text/plain"
            style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8, maxWidth: 640 }}
          >
            <input name="subject" placeholder="Subject" style={{ padding: 12, borderRadius: 8, border: "1px solid rgba(148,163,184,0.12)", background: "rgba(15,23,42,0.6)", color: "#e5e7eb" }} />
            <textarea name="body" placeholder="Message" rows={6} style={{ padding: 12, borderRadius: 8, border: "1px solid rgba(148,163,184,0.12)", background: "rgba(15,23,42,0.6)", color: "#e5e7eb" }} />
            <button className="intro-primary-btn" type="submit">Send Email</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

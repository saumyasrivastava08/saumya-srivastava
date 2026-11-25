"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  Radio,
  Send,
  Sparkles,
} from "lucide-react";
import { CONTACT_CHANNELS, CONTACT_EMAIL } from "./data";

const ease = [0.22, 0.8, 0.24, 1] as const;

const ICONS = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  phone: Phone,
} as const;

export default function Contacts() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (subject.trim()) params.set("subject", subject.trim());
    if (message.trim()) params.set("body", message.trim());
    const query = params.toString();
    window.location.href = `mailto:${CONTACT_EMAIL}${query ? `?${query}` : ""}`;
  };

  return (
    <section className="contacts-section cosmic-contacts-section">
      <div className="contacts-starfield" aria-hidden="true" />
      <div className="contacts-nebula contacts-nebula-a" aria-hidden="true" />
      <div className="contacts-nebula contacts-nebula-b" aria-hidden="true" />
      <div className="contacts-aurora" aria-hidden="true" />
      <div className="contacts-signal-ring contacts-signal-ring-a" aria-hidden="true" />
      <div className="contacts-signal-ring contacts-signal-ring-b" aria-hidden="true" />

      <div className="contacts-container">
        <motion.header
          className="contacts-intro"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
        >
          <p className="contacts-kicker">
            <Radio size={13} aria-hidden="true" /> OPEN CHANNEL
          </p>
          <h1 className="contacts-title">Let’s connect</h1>
          <p className="contacts-subtitle">
            Open to new roles, collaborations, and a good conversation. Pick a
            channel below or send a quick message.
          </p>
          <div className="contacts-status">
            <span className="contacts-status-dot" aria-hidden="true" />
            Currently open to new opportunities
          </div>
        </motion.header>

        <div className="contacts-channels" aria-label="Contact channels">
          {CONTACT_CHANNELS.map((channel, index) => {
            const Icon = ICONS[channel.id as keyof typeof ICONS] ?? Mail;
            return (
              <motion.a
                key={channel.id}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className={`contacts-channel tone-${channel.tone}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 + index * 0.07, ease }}
              >
                <span className="contacts-channel-icon" aria-hidden="true">
                  <Icon size={18} />
                </span>
                <span className="contacts-channel-copy">
                  <strong>{channel.label}</strong>
                  <small>{channel.detail}</small>
                  <em>{channel.blurb}</em>
                </span>
                <ArrowUpRight size={16} className="contacts-channel-arrow" aria-hidden="true" />
              </motion.a>
            );
          })}
        </div>

        <motion.div
          className="contacts-compose"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28, ease }}
        >
          <div className="contacts-compose-head">
            <p className="contacts-compose-kicker">
              <Sparkles size={13} aria-hidden="true" /> TRANSMIT
            </p>
            <h2>Send a quick message</h2>
            <p>
              This opens your mail app with the subject and message filled in.
              Nothing is stored on this site.
            </p>
          </div>

          <form className="contacts-form" onSubmit={onSubmit}>
            <label className="contacts-field">
              <span>Subject</span>
              <input
                name="subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="What’s this about?"
                autoComplete="off"
              />
            </label>

            <label className="contacts-field">
              <span>Message</span>
              <textarea
                name="body"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Say hello, share an idea, or send a link to a role…"
                rows={6}
              />
            </label>

            <div className="contacts-form-actions">
              <button type="submit" className="contacts-send-btn">
                <Send size={16} aria-hidden="true" />
                Open mail client
              </button>
              <a href={`mailto:${CONTACT_EMAIL}`} className="contacts-direct-mail">
                Or email directly
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

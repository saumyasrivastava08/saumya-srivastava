"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Education", href: "/education" },
  { name: "Achievements", href: "/achievements" },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        className="navbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <nav className="navbar-container">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <div className="navbar-logo-icon">S</div>
            <span className="navbar-logo-text">Saumya ✨</span>
          </Link>

          {/* Desktop Links */}
          <div className="navbar-links">
            {links.map((link) => {
              const active = router.pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`navbar-link ${
                    active ? "navbar-link-active" : ""
                  }`}
                >
                  {link.name}
                  <span className="navbar-underline" />
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="navbar-menu-btn"
            onClick={() => setOpen(true)}
          >
            <Menu size={26} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              className="mobile-sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setOpen(false)}
              >
                <X size={22} />
              </button>

              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="mobile-link"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

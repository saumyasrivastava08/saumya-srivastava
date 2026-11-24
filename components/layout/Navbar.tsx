"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Education", href: "/education" },
  { name: "Contacts", href: "/contacts" },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <motion.header
        className="navbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <nav className="navbar-container" aria-label="Main navigation">
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
                  aria-current={active ? "page" : undefined}
                >
                  {link.name}
                  <span className="navbar-underline" />
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="navbar-menu-btn"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
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
              id="mobile-navigation"
              className="mobile-sidebar"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
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

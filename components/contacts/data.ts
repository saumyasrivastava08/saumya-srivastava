export type ContactChannel = {
  id: string;
  label: string;
  detail: string;
  href: string;
  tone: "cyan" | "lilac" | "pink" | "mint";
  blurb: string;
  external: boolean;
};

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "email",
    label: "Email",
    detail: "saumyasanjay08@gmail.com",
    href: "mailto:saumyasanjay08@gmail.com",
    tone: "cyan",
    blurb: "Best for job opportunities, collaborations, and longer messages.",
    external: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    detail: "saumya-sanjay-srivastava",
    href: "https://linkedin.com/in/saumya-sanjay-srivastava",
    tone: "lilac",
    blurb: "Connect with me professionally.",
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    detail: "saumyasrivastava08",
    href: "https://github.com/saumyasrivastava08",
    tone: "pink",
    blurb: "My code, side projects, and experiments.",
    external: true,
  },
  {
    id: "phone",
    label: "Phone",
    detail: "+91 94737 29355",
    href: "tel:+919473729355",
    tone: "mint",
    blurb: "For a quick call when email won’t do.",
    external: false,
  },
];

export const CONTACT_EMAIL = "saumyasanjay08@gmail.com";

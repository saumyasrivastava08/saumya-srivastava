export type EducationStop = {
  id: string;
  duration: string;
  location: string;
  degree: string;
  institute: string;
  score: string;
  tone: "cyan" | "lilac" | "pink";
  label: string;
  blurb: string;
};

export const EDUCATION: EducationStop[] = [
  {
    id: "btech",
    duration: "2019 – 2023",
    location: "Phagwara, Punjab, India",
    degree: "B.Tech in Computer Science & Engineering (Hons.)",
    institute: "Lovely Professional University",
    score: "CGPA 8.01 / 10",
    tone: "cyan",
    label: "Degree",
    blurb: "A grounding in computer science, systems thinking, and building software for real users.",
  },
  {
    id: "senior-secondary",
    duration: "2018",
    location: "Raebareli, Uttar Pradesh, India",
    degree: "Senior Secondary (CBSE)",
    institute: "Lucknow Public School",
    score: "87.5%",
    tone: "lilac",
    label: "Senior Secondary",
    blurb: "Math and science, and the first serious step toward engineering.",
  },
  {
    id: "secondary",
    duration: "2016",
    location: "Raebareli, Uttar Pradesh, India",
    degree: "Secondary (CBSE)",
    institute: "Lucknow Public School",
    score: "CGPA 10 / 10",
    tone: "pink",
    label: "Secondary",
    blurb: "Where my curiosity took shape, with a strong start to my academic path.",
  },
];


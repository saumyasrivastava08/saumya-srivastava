"use client";

import EducationCard from "./EducationCard";
import Timeline from "../shared/Timeline";
import { motion } from "framer-motion";

const EDUCATION = [
	{
		duration: "2019 – 2023",
		location: "Phagwara, Punjab, India",
		degree: "B.Tech in Computer Science & Engineering (Hons.)",
		institute: "Lovely Professional University",
		score: "CGPA: 8.01 / 10",
	},
	{
		duration: "2018",
		degree: "Senior Secondary (CBSE)",
		institute: "Lucknow Public School",
		location: "Raebareli, Uttar Pradesh, India",
		score: "Percentage: 87.5%",
	},
	{
		duration: "2016",
		degree: "Secondary (CBSE)",
		institute: "Lucknow Public School",
		location: "Raebareli, Uttar Pradesh, India",
		score: "CGPA: 10 / 10",
	},
];

export default function EducationTimeline() {
	const entries = EDUCATION.map((edu, i) => ({
		key: `edu-${i}`,
		duration: edu.duration,
		content: (
			<EducationCard
				degree={edu.degree}
				institute={edu.institute}
				duration={edu.duration}
				score={edu.score}
				location={edu.location}
			/>
		),
	}));

	return (
		<section className="education-section">
			<div className="education-container">
				<motion.h2
					className="education-title"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					Education Timeline{" "}
					<span className="text-pink-300">🎓</span>
				</motion.h2>

				<Timeline entries={entries} />
			</div>
		</section>
	);
}

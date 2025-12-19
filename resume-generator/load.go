package main

import (
	"encoding/json"
	"os"
)

func loadJSON[T any](path string) T {
	data, err := os.ReadFile(path)
	if err != nil {
		panic(err)
	}

	var v T
	if err := json.Unmarshal(data, &v); err != nil {
		panic(err)
	}

	return v
}

func loadResumeData() ResumeData {
	return ResumeData{
		Profile:      loadJSON[Profile]("data/profile.json"),
		Experiences:  loadJSON[[]Experience]("data/experiences.json"),
		Skills:       loadJSON[Skills]("data/skills.json"),
		Projects:     loadJSON[[]Project]("data/projects.json"),
		Education:    loadJSON[Education]("data/education.json"),
		Achievements: loadJSON[[]string]("data/achievements.json"),
	}
}

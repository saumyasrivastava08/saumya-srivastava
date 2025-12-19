package main

type ResumeData struct {
	Profile      Profile
	Experiences  []Experience
	Skills       Skills
	Projects     []Project
	Education    Education
	Achievements []string
}

type Profile struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Phone    string `json:"phone"`
	LinkedIn string `json:"linkedin"`
}

type Experience struct {
	Title    string   `json:"title"`
	Company  string   `json:"company"`
	Duration string   `json:"duration"`
	Bullets  []string `json:"bullets"`
	Tech     string   `json:"tech"`
}

type Skills struct {
	Core     string `json:"core"`
	Frontend string `json:"frontend"`
	Backend  string `json:"backend"`
	DevOps   string `json:"devops"`
	Cloud    string `json:"cloud"`
	Tools    string `json:"tools"`
}

type Project struct {
	Name    string   `json:"name"`
	Bullets []string `json:"bullets"`
	Tech    string   `json:"tech"`
}

type Education struct {
	Degree    string `json:"degree"`
	Institute string `json:"institute"`
	Duration  string `json:"duration"`
	CGPA      string `json:"cgpa"`
}

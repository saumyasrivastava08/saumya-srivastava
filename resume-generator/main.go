package main

import (
	"os"
	"os/exec"
	"text/template"
)

func main() {
	resume := loadResumeData()

	
	_ = os.MkdirAll("build", 0755)

	tmpl := template.Must(
		template.ParseFiles("templates/resume.tex.tmpl"),
	)
	texFile, err := os.Create("build/resume.tex")
	if err != nil {
		panic(err)
	}
	defer texFile.Close()

	
	if err := tmpl.Execute(texFile, resume); err != nil {
		panic(err)
	}

	cmd := exec.Command(
    "/Library/TeX/texbin/pdflatex",
    "-interaction=nonstopmode",
    "-output-directory=build",
    "build/resume.tex",
	)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}
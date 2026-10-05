# Project report & presentation

Topic: *Describe a project which you have worked on*: Course Management & Registration System.

| File | What it is |
|------|------------|
| `report.tex` | LaTeX source of the written report |
| `report.pdf` | Compiled report (11 pages) |
| `presentation.pptx` | 14-slide deck with speaker notes (a talk script) on every slide |
| `build_presentation.js` | pptxgenjs script that generates the deck |

## Before submitting
Fill in your details at the top of `report.tex` (`\studentname`, `\studentid`, `\coursename`, `\lecturer`), and on slide 1 of the deck.

## Rebuild
```bash
pdflatex report.tex && pdflatex report.tex   # run twice for the table of contents
```

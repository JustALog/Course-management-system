# Project report & presentation

Course: **English Writing & Presentation Skills**. Topic: *Describe a project which you have worked on* (Course Management & Registration System).

| File | What it is |
|------|------------|
| `report.tex` | LaTeX source of the written report (essay style, max 6 pages) |
| `report.pdf` | Compiled report (5 pages) |
| `presentation.pptx` | 12-slide deck, about 8 minutes, with real app screenshots and speaker notes on every slide |
| `presentation_script.md` | The speaker notes as one script for practising, plus signposting phrases |
| `screenshots/` | Screenshots of the running app (seed data), used in the deck |
| `build_presentation.js` | pptxgenjs script that generates the deck from `screenshots/` |

## Before submitting
- Fill in your details at the top of `report.tex` (`\studentname`, `\studentid`, `\lecturer`).
- Replace "Your Name" / "Student ID" on slides 1 and 12, and `[your name]` in the script.

## Rebuild the report
```bash
pdflatex report.tex
```

#!/usr/bin/env python3
"""Build five single-page, text-selectable resume PDFs from the public resume profiles."""
import json
import re
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "resumes"
OUT.mkdir(parents=True, exist_ok=True)
profiles = json.loads((ROOT / "src" / "data" / "resume-profiles.json").read_text(encoding="utf-8"))

def clean(s):
    # Standard PDF fonts do not contain all Unicode glyphs. Convert only for display.
    return escape(str(s).replace("—", "-").replace("–", "-").replace("’", "'").replace("•", "-"))

ink = colors.HexColor("#18242B")
muted = colors.HexColor("#42535B")
accent = colors.HexColor("#1C6874")
styles = {
    "name": ParagraphStyle("Name", fontName="Helvetica-Bold", fontSize=16, leading=18.5, alignment=TA_CENTER, textColor=ink, spaceAfter=3),
    "role": ParagraphStyle("Role", fontName="Helvetica-Bold", fontSize=9.5, leading=12, alignment=TA_CENTER, textColor=accent, spaceAfter=3),
    "contact": ParagraphStyle("Contact", fontName="Helvetica", fontSize=8.3, leading=11, alignment=TA_CENTER, textColor=muted, spaceAfter=5),
    "section": ParagraphStyle("Section", fontName="Helvetica-Bold", fontSize=9.4, leading=12, textColor=accent, spaceBefore=7, spaceAfter=2),
    "body": ParagraphStyle("Body", fontName="Helvetica", fontSize=8.9, leading=11.2, textColor=ink, spaceAfter=2),
    "project": ParagraphStyle("Project", fontName="Helvetica-Bold", fontSize=8.9, leading=11.2, textColor=ink, spaceBefore=2, spaceAfter=1),
    "bullet": ParagraphStyle("Bullet", fontName="Helvetica", fontSize=8.8, leading=11.1, textColor=ink, leftIndent=11, firstLineIndent=-9, spaceAfter=3),
}
def para(value, style="body"):
    return Paragraph(clean(value), styles[style])

for p in profiles:
    out = OUT / p["filename"]
    doc = SimpleDocTemplate(str(out), pagesize=letter, leftMargin=.62*inch, rightMargin=.62*inch, topMargin=.46*inch, bottomMargin=.44*inch, title="Chad Hamilton - " + p["title"], author="Chad Hamilton")
    story = [
        para("CHAD HAMILTON", "name"),
        para(p["title"].upper() + " | " + p["subtitle"].upper(), "role"),
        Paragraph('Wylie, TX (DFW) | <link href="mailto:Justchadham@gmail.com" color="#1C6874">Justchadham@gmail.com</link> | (469) 878-2466<br/><link href="https://tech.icyclearer.com" color="#1C6874">tech.icyclearer.com</link> | <link href="https://github.com/icyNatural" color="#1C6874">github.com/icyNatural</link>', styles["contact"]),
        para("PROFESSIONAL SUMMARY","section"), para(p["summary"]),
        para("TECHNICAL SKILLS","section"),
    ]
    for label, value in p["skills"]:
        story.append(Paragraph("<b>" + clean(label) + ":</b> " + clean(value), styles["body"]))
    story.append(para("SELECTED INDEPENDENT PROJECTS","section"))
    for name, stack, bullet in p["projects"]:
        story.append(KeepTogether([Paragraph("<b>"+clean(name)+"</b> | "+clean(stack),styles["project"]),Paragraph("- " + clean(bullet),styles["bullet"])]))
    story.append(para("PROFESSIONAL EXPERIENCE","section"))
    experiences = [
      ("United States Postal Service - Mail Handler / Expeditor | Dec 2019-Present","Coordinate time-sensitive trailer movement and shipping records; verify documentation and resolve operational discrepancies with drivers and management."),
      ("MyIT Services - Junior IT Consultant / Field IT Intern | May 2025","Inventoried 90+ computers and network assets; scripted PowerShell collection of serial numbers, configurations, and system specifications."),
      ("Kroger - ClickList Customer Service / Technical Support | 2016-2019","Assisted customers with account, app, and order issues through structured troubleshooting and escalation."),
    ]
    for name, detail in experiences:
        story.append(KeepTogether([Paragraph("<b>"+clean(name)+"</b>",styles["body"]),Paragraph("- "+clean(detail),styles["bullet"])]))
    story += [
      para("EDUCATION & CREDENTIALS","section"),
      para("Collin College - Cybersecurity and Computer Networking coursework; Dean's List: Fall 2024 and Spring 2025"),
      para("Earned: Cybersecurity Infrastructure Technician Certificate; Entry-Level Network Support Occupational Skills Award."),
      para("Microsoft Azure Fundamentals (AZ-900); Microsoft 365 Fundamentals (MS-900); CompTIA A+ Core 1 passed (not A+ certified); Google Technical Support Fundamentals coursework."),
    ]
    doc.build(story)
    pages=len(PdfReader(str(out)).pages)
    if pages != 1:
        raise RuntimeError(f"{out.name}: expected 1 page, got {pages}. Revise layout before publishing.")
    print(f"PASS {out.name}: {out.stat().st_size} bytes, 1 page")

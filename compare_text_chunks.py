import sys
import json
import fitz
import re

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('src/assets/data/HEALTH.pdf')

# Let's clean and reconstruct full book text for Chapter 1
# Book pages 1 to 19 (PDF pages 13 to 31)

with open('js_ch1.json', 'r', encoding='utf-8') as f:
    js_data = json.load(f)

# Collect all text from PDF page by page, joining broken words across lines (like life-\nstyle -> life-style or lifestyle)
pdf_text_pages = []
for p in range(12, 31):
    raw = doc[p].get_text()
    # Simple word-wrap fix: hyphenated end of line
    raw_clean = re.sub(r'(\w+)-\n(\w+)', r'\1\2', raw)
    pdf_text_pages.append(raw_clean)

# Let's inspect where JS text differs from PDF text!
# Let's check paragraph by paragraph from PDF and find it in JS

print("=== CHECKING MISSING OR ALTERED PARAGRAPHS FROM PDF TO JS ===")

# Let's extract paragraphs from PDF (grouping lines into paragraphs)
pdf_paragraphs = []
for b_num, p_text in enumerate(pdf_text_pages, start=1):
    lines = [l.strip() for l in p_text.splitlines() if l.strip()]
    curr_p = []
    for l in lines:
        curr_p.append(l)
        if l.endswith('.') or l.endswith('?') or l.endswith('!'):
            pdf_paragraphs.append((b_num, " ".join(curr_p)))
            curr_p = []
    if curr_p:
        pdf_paragraphs.append((b_num, " ".join(curr_p)))

print(f"Total extracted PDF text lines/chunks: {len(pdf_paragraphs)}")

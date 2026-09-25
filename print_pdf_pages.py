import sys
import fitz

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('src/assets/data/HEALTH.pdf')

for b_page in range(1, 20):
    pdf_idx = b_page + 11 # PDF page 13 is Book page 1
    if pdf_idx >= len(doc):
        break
    text = doc[pdf_idx].get_text()
    print(f"==================================================")
    print(f"BOOK PAGE {b_page} (PDF Page {pdf_idx+1})")
    print(f"==================================================")
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    for line in lines:
        print(line)

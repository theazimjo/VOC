import sys
import json
import re
import fitz

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('src/assets/data/HEALTH.pdf')

# Let's inspect pages 1 to 19 of Chapter 1 in PDF
pdf_pages_clean = []
for p in range(12, 31):
    b_num = p - 12 + 1
    raw = doc[p].get_text()
    pdf_pages_clean.append((b_num, raw))

with open('js_ch1.json', 'r', encoding='utf-8') as f:
    js_data = json.load(f)

# Let's check paragraph alignment between PDF and JS for each section:

# Section 1: Book pages 1 - 7
# Section 2: Book pages 8 - 13
# Section 3: Book pages 14 - 15
# Health Skills: Book pages 16 - 17
# Chapter Review: Book pages 18 - 19

print("=== DETAILED COMPARISON OF PDF TEXT VS JS TEXT ===")

for b_num, raw_pdf in pdf_pages_clean:
    print(f"\n==================== BOOK PAGE {b_num} ====================")
    lines = [l.strip() for l in raw_pdf.splitlines() if l.strip()]
    # Reconstruct text of page into continuous text
    text_block = " ".join(lines)
    # Print first 200 chars and last 200 chars of PDF page
    print("PDF Page Text:")
    print("  [START]", text_block[:200])
    print("  [END]  ", text_block[-200:])

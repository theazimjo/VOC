import fitz
import json
import re

doc = fitz.open('src/assets/data/HEALTH.pdf')

pdf_pages_text = []
# PDF pages 13 to 30 correspond to book pages 1 to 18
for pdf_page in range(12, 30):
    book_page = pdf_page - 12 + 1
    text = doc[pdf_page].get_text()
    pdf_pages_text.append((book_page, pdf_page+1, text))

with open('src/data/healthChapterText.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Extract H.Ch.01 block
start_idx = js_content.find('"H.Ch.01 · Choosing Wellness"')
end_idx = js_content.find('"H.Ch.02 ·')
if end_idx == -1:
    end_idx = js_content.find('"H.Ch.02')

ch1_js_sub = js_content[start_idx:end_idx]

# Let's inspect headings, pages, text in JS
print("=== JS Pages in Chapter 1 ===")
# Find all text strings inside page arrays
pages_raw = ch1_js_sub.split('"pages": [')[1]

# Print raw text in JS vs PDF
print("JS excerpt length:", len(ch1_js_sub))

# Print PDF text page by page completely to a text file for inspection
with open('pdf_ch1_extracted.txt', 'w', encoding='utf-8') as f:
    for b_num, pdf_num, text in pdf_pages_text:
        f.write(f"\n==================== BOOK PAGE {b_num} (PDF Page {pdf_num}) ====================\n")
        f.write(text)

print("Saved pdf_ch1_extracted.txt!")

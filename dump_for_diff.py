import sys
import fitz
import json
import difflib

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('src/assets/data/HEALTH.pdf')

# PDF pages 13-31 are Book pages 1-19
pdf_text_all = ""
for p in range(12, 31):
    pdf_text_all += f"\n--- PDF PAGE {p+1} (BOOK PAGE {p-11}) ---\n" + doc[p].get_text()

with open('js_ch1.json', 'r', encoding='utf-8') as f:
    js_ch1 = json.load(f)

# Collect all text blocks from JS
js_blocks = []
for p_idx, page in enumerate(js_ch1['pages']):
    for b in page:
        b_type = b.get('type')
        if b_type == 'review':
            js_blocks.append((p_idx+1, b_type, f"REVIEW: {b.get('title')}"))
            for sec in b.get('sections', []):
                js_blocks.append((p_idx+1, 'review_sec', sec.get('heading', '')))
                for item in sec.get('items', []):
                    js_blocks.append((p_idx+1, 'review_item', f"Q: {item.get('prompt')}\nA: {item.get('answer', '')}"))
        else:
            js_blocks.append((p_idx+1, b_type, b.get('text', '')))

# Save both clean representations to compare
with open('full_pdf_ch1_raw.txt', 'w', encoding='utf-8') as f:
    f.write(pdf_text_all)

with open('full_js_ch1_clean.txt', 'w', encoding='utf-8') as f:
    for page_num, b_type, text in js_blocks:
        f.write(f"[JS Page {page_num}] [{b_type}] {text}\n\n")

print("Saved full_pdf_ch1_raw.txt and full_js_ch1_clean.txt!")

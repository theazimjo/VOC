import sys
import fitz
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('src/assets/data/HEALTH.pdf')

with open('js_ch1.json', 'r', encoding='utf-8') as f:
    js_data = json.load(f)

# Let's write a python script that cleans up the text of Book Pages 1..19 from PDF and builds the EXACT JS pages structure.

# Let's inspect Book Page 1..19 PDF text completely:
pdf_pages_data = []
for b in range(1, 20):
    pdf_p = b + 11 # PDF Page 13 is Book Page 1
    raw = doc[pdf_p].get_text()
    pdf_pages_data.append((b, pdf_p+1, raw))

# Let's write a script that outputs for each Book Page 1..19:
# 1) The exact text in PDF
# 2) The exact text in current JS
# 3) The difference or missing parts

with open('page_by_page_deep_diff.txt', 'w', encoding='utf-8') as out:
    for b_num, pdf_num, pdf_raw in pdf_pages_data:
        out.write(f"\n==================================================\n")
        out.write(f"BOOK PAGE {b_num} (PDF Page {pdf_num})\n")
        out.write(f"==================================================\n")
        out.write("--- PDF RAW TEXT ---\n")
        out.write(pdf_raw.strip() + "\n\n")
        
        out.write("--- JS PAGE BLOCKS ---\n")
        js_page = js_data['pages'][b_num-1] if b_num-1 < len(js_data['pages']) else []
        for block in js_page:
            b_type = block.get('type')
            if b_type == 'review':
                out.write(f"[{b_type}] {block.get('title')}\n")
                for sec in block.get('sections', []):
                    out.write(f"  Sec: {sec.get('heading')}\n")
                    for item in sec.get('items', []):
                        out.write(f"    Q: {item.get('prompt')}\n")
                        if 'answer' in item:
                            out.write(f"    A: {item.get('answer')}\n")
            else:
                out.write(f"[{b_type}]\n{block.get('text')}\n\n")

print("Saved page_by_page_deep_diff.txt")

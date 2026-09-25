import sys
import json
import fitz
import re

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('src/assets/data/HEALTH.pdf')

with open('js_ch1.json', 'r', encoding='utf-8') as f:
    js_data = json.load(f)

# PDF text for Book Pages 1 to 19 (PDF pages 13 to 31)
pdf_text_pages = {}
for p in range(12, 31):
    b_num = p - 12 + 1
    pdf_text_pages[b_num] = doc[p].get_text()

# Extract all paragraphs from JS
js_blocks = []
for p_idx, page in enumerate(js_data['pages']):
    for b in page:
        js_blocks.append((p_idx+1, b))

print(f"Total pages in JS: {len(js_data['pages'])}")
print(f"Total blocks in JS: {len(js_blocks)}")

# Let's inspect each JS block against the PDF pages to see what text matches or differs!
diff_log = []

for b_idx, (js_p_idx, block) in enumerate(js_blocks):
    b_type = block.get('type')
    if b_type == 'review':
        title = block.get('title')
        diff_log.append(f"JS Block {b_idx+1} (JS Page {js_p_idx}): [review] {title}")
    else:
        text = block.get('text', '')
        # Search for text in PDF pages
        # Normalize spaces
        clean_text = " ".join(text.split())
        found_page = None
        for b_num in range(1, 20):
            pdf_clean = " ".join(pdf_text_pages[b_num].split())
            # check substring or snippet match
            snippet = clean_text[:40]
            if snippet.lower() in pdf_clean.lower():
                found_page = b_num
                break
        diff_log.append(f"JS Block {b_idx+1} (JS Page {js_p_idx}): [{b_type}] (Book Page ~{found_page}) snippet: '{text[:60]}...'")

with open('js_block_mapping.txt', 'w', encoding='utf-8') as f:
    f.write("\n".join(diff_log))

print("Wrote js_block_mapping.txt")

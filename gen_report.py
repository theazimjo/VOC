import sys
import fitz
import json

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('src/assets/data/HEALTH.pdf')

# Let's clean up PDF raw text page by page
pdf_pages = []
for p in range(12, 30):
    b_num = p - 12 + 1
    raw = doc[p].get_text()
    pdf_pages.append((b_num, p+1, raw))

with open('js_ch1.json', 'r', encoding='utf-8') as f:
    js_ch1 = json.load(f)

# Let's print out what is on each PDF page and compare it with the corresponding JS pages!
with open('comparison_detailed_report.txt', 'w', encoding='utf-8') as f:
    f.write("=== PDF PAGES DETAIL ===\n")
    for b_num, pdf_num, raw in pdf_pages:
        f.write(f"\n==================== BOOK PAGE {b_num} (PDF Page {pdf_num}) ====================\n")
        f.write(raw)

    f.write("\n\n=== JS PAGES DETAIL ===\n")
    for p_idx, page in enumerate(js_ch1['pages']):
        f.write(f"\n==================== JS PAGE {p_idx+1} ====================\n")
        for b in page:
            f.write(f"[{b.get('type')}]\n")
            if b.get('type') == 'review':
                f.write(f"Review: {b.get('title')}\n")
            else:
                f.write(f"{b.get('text')}\n")

print("Generated comparison_detailed_report.txt")

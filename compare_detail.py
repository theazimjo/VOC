import fitz
import json

doc = fitz.open('src/assets/data/HEALTH.pdf')

# Let's inspect each PDF page from Book Page 1 (PDF page 13) to Book Page 19 (PDF page 31)
pdf_pages = []
for p in range(12, 31):
    pdf_pages.append((p - 12 + 1, p + 1, doc[p].get_text()))

with open('js_ch1.json', 'r', encoding='utf-8') as f:
    js_data = json.load(f)

print("=== PDF BOOK PAGES AND CONTENT OVERVIEW ===")
for b_num, pdf_num, text in pdf_pages:
    print(f"\n--- Book Page {b_num} (PDF Page {pdf_num}) ---")
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    print(f"Total lines: {len(lines)}")
    # Print headings or key parts
    for line in lines:
        if any(h in line.lower() for h in ['chapter', '1.', '2.', '3.', 'aspects', 'health frontiers', 'health skills', 'continuum', 'determinants', 'risk', 'decision']):
            print(f"   [Key Line] {line}")

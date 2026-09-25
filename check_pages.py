import sys
import json
import fitz

sys.stdout.reconfigure(encoding='utf-8')

with open('js_ch1.json', 'r', encoding='utf-8') as f:
    js_data = json.load(f)

# Extract paragraphs from JS
js_paragraphs = []
for p_idx, page in enumerate(js_data['pages']):
    for b in page:
        if b.get('type') in ['p', 'heading', 'activity', 'sidebar']:
            js_paragraphs.append((p_idx+1, b.get('type'), b.get('text', '')))

doc = fitz.open('src/assets/data/HEALTH.pdf')

# Let's search for paragraphs in PDF vs JS
print(f"Total JS blocks: {len(js_paragraphs)}")

# Let's inspect Book Page by Book Page what text is in PDF vs JS
for b_num in range(1, 19):
    pdf_text = doc[b_num+11].get_text()
    print(f"\n--- BOOK PAGE {b_num} ---")
    # Clean PDF lines
    pdf_clean = " ".join([l.strip() for l in pdf_text.splitlines() if l.strip()])
    print(f"PDF length (chars): {len(pdf_clean)}")
    # Print sample of PDF
    print(f"PDF snippet: {pdf_clean[:150]}...")

import sys
import fitz
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('src/assets/data/HEALTH.pdf')

# PDF pages 13 to 30 (Book pages 1 to 18)
pdf_text_by_page = {}
for p in range(12, 30):
    b_num = p - 12 + 1
    pdf_text_by_page[b_num] = doc[p].get_text()

with open('js_ch1.json', 'r', encoding='utf-8') as f:
    js_ch1 = json.load(f)

# Let's check sections in PDF vs JS
print("=== COMPARING PDF VS JS FOR CHAPTER 1 ===\n")

# Extract all text from JS pages into flat string per JS page
js_page_texts = []
for p_idx, page in enumerate(js_ch1['pages']):
    txts = []
    for block in page:
        if block.get('type') == 'review':
            txts.append("REVIEW: " + block.get('title', ''))
            for sec in block.get('sections', []):
                txts.append(sec.get('heading', ''))
                for item in sec.get('items', []):
                    txts.append(item.get('prompt', ''))
                    if 'answer' in item:
                        txts.append(item.get('answer', ''))
        else:
            txts.append(block.get('text', ''))
    js_page_texts.append("\n".join(txts))

full_js_text = "\n\n".join(js_page_texts)

# Check for specific headings/content in PDF that might be missing or edited in JS
print("--- Check major headings ---")
pdf_full = "\n".join([pdf_text_by_page[b] for b in range(1, 19)])

headings = [
    "Choosing Wellness",
    "1. What Are Health and Wellness?",
    "Aspects of Health",
    "Check Your Wellness",
    "What Determines Health and Wellness",
    "Heredity",
    "Environment",
    "Culture",
    "Health Frontiers",
    "2. You and Your Health",
    "The Illness-Wellness Continuum",
    "Risk Behaviors",
    "Moving Along the Continuum",
    "3. Taking Control of Your Health",
    "Health Hazards for Teenagers",
    "Promoting Your Wellness",
    "Health Skills",
    "Chapter Summary"
]

for h in headings:
    in_pdf = h.lower() in pdf_full.lower()
    in_js = h.lower() in full_js_text.lower()
    print(f"Heading: '{h}' -> In PDF: {in_pdf}, In JS: {in_js}")

print("\n--- Word count comparison ---")
pdf_words = len(re.findall(r'\w+', pdf_full))
js_words = len(re.findall(r'\w+', full_js_text))
print(f"Total words in PDF Ch 1: {pdf_words}")
print(f"Total words in JS Ch 1: {js_words}")


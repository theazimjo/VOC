import json
import fitz

with open('js_ch1.json', 'r', encoding='utf-8') as f:
    js_ch1 = json.load(f)

# Re-read PDF pages
doc = fitz.open('src/assets/data/HEALTH.pdf')

print(f"JS Pages count: {len(js_ch1['pages'])}")

# Flatten JS text blocks
js_texts = []
for p_idx, page in enumerate(js_ch1['pages']):
    for b in page:
        js_texts.append(f"[{b['type']}] {b['text']}")

full_js_str = "\n".join(js_texts)

with open('js_ch1_extracted.txt', 'w', encoding='utf-8') as f:
    f.write(full_js_str)

print("Saved js_ch1_extracted.txt")

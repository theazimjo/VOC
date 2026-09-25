import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('book_pages_1_to_19.txt', 'r', encoding='utf-8') as f:
    pdf_txt = f.read()

with open('js_ch1.json', 'r', encoding='utf-8') as f:
    js_data = json.load(f)

# Flatten JS text blocks
js_texts_list = []
for p_idx, page in enumerate(js_data['pages']):
    for b in page:
        if b.get('type') == 'review':
            js_texts_list.append(f"REVIEW: {b.get('title')}")
            for sec in b.get('sections', []):
                js_texts_list.append(sec.get('heading', ''))
                for item in sec.get('items', []):
                    js_texts_list.append(item.get('prompt', ''))
                    if 'answer' in item:
                        js_texts_list.append(item.get('answer', ''))
        else:
            js_texts_list.append(b.get('text', ''))

js_full_str = "\n".join(js_texts_list)

# Let's check section reviews in PDF:
# Page 7: Section 1 Review (Questions 1, 2, 3)
# Page 13: Section 2 Review (Questions 1, 2, 3, 4)
# Page 15: Section 3 Review (Questions 1, 2, 3, 4)

print("--- Section 1 Review in PDF ---")
print("1. What are the three aspects of wellness?" in pdf_txt)
print("--- Section 1 Review in JS ---")
print("1. What are the three aspects of wellness?" in js_full_str)

print("--- Section 2 Review in PDF ---")
print("1. What is the Illness-Wellness continuum?" in pdf_txt)
print("--- Section 2 Review in JS ---")
print("1. What is the Illness-Wellness continuum?" in js_full_str)

print("--- Section 3 Review in PDF ---")
print("1. What are the three most common causes of teenage" in pdf_txt)
print("--- Section 3 Review in JS ---")
print("1. What are the three most common causes of teenage" in js_full_str)

print("--- Figure Captions in PDF vs JS ---")
fig_captions = [
    "Health includes your physical, mental, and social well-being",
    "Americans live longer today than they did in 1900",
    "Today, many of the leading causes of death are influenced by life-style choices",
    "Do your friends help you to make healthful decisions",
    "The culture in which you live influences your habits",
    "Eating nutritiously is one key to physical well-being",
    "Where along the Illness-Wellness continuum would you place",
    "Every activity involves a degree of risk",
    "Are you aware of how your current behavior affects your health",
    "The only way to master a skill is through practice",
    "Risk behaviors account for most deaths among teenagers",
    "Drinking and driving is a risk behavior",
    "Responsible decision-making can help protect your state of wellness"
]

for fc in fig_captions:
    in_pdf = fc.lower() in pdf_txt.lower()
    in_js = fc.lower() in js_full_str.lower()
    print(f"Caption '{fc[:30]}...': In PDF={in_pdf}, In JS={in_js}")

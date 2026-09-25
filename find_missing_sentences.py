import sys
import json
import fitz
import re

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('src/assets/data/HEALTH.pdf')

with open('js_ch1.json', 'r', encoding='utf-8') as f:
    js_data = json.load(f)

# Collect all text from JS
all_js_text = ""
for page in js_data['pages']:
    for b in page:
        if b.get('type') == 'review':
            all_js_text += "\n" + b.get('title', '')
            for sec in b.get('sections', []):
                all_js_text += "\n" + sec.get('heading', '')
                for item in sec.get('items', []):
                    all_js_text += "\n" + item.get('prompt', '') + "\n" + item.get('answer', '')
        else:
            all_js_text += "\n" + b.get('text', '')

# Clean spaces in all_js_text
all_js_text_clean = " ".join(all_js_text.split())

# Check each Book Page 1..19 in PDF
for b_num in range(1, 20):
    pdf_p = b_num + 11
    pdf_raw = doc[pdf_p].get_text()
    
    # Fix hyphenated words at end of line
    pdf_clean_raw = re.sub(r'(\w+)-\n(\w+)', r'\1\2', pdf_raw)
    
    # Split into lines/sentences
    lines = [l.strip() for l in pdf_clean_raw.splitlines() if l.strip()]
    
    # Group into sentences or paragraphs
    text_full = " ".join(lines)
    sentences = re.split(r'(?<=[.!?])\s+', text_full)
    
    missing_sentences = []
    for s in sentences:
        s_clean = " ".join(s.split())
        if len(s_clean) > 25: # filter tiny fragments/page numbers
            # Check if sentence is in JS
            # Strip figures and page header/footer clutter from s_clean for check
            if "Chapter 1 Choosing Wellness" in s_clean or "Figure 1-" in s_clean:
                continue
            
            # Simple check: test if 8-word chunk of s_clean is in all_js_text_clean
            words = s_clean.split()
            if len(words) >= 6:
                sample_str = " ".join(words[:6])
                # ignore case and punctuation
                sample_regex = re.escape(sample_str[:20])
                if not re.search(sample_regex, all_js_text_clean, re.IGNORECASE):
                    missing_sentences.append(s_clean)

    print(f"\n=== BOOK PAGE {b_num} (PDF Page {pdf_p+1}) ===")
    print(f"Total sentences: {len(sentences)}, Missing in JS: {len(missing_sentences)}")
    if missing_sentences:
        print("Missing sentences/chunks sample:")
        for ms in missing_sentences[:10]:
            print(f"  [MISSING] {ms}")

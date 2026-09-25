import sys
import fitz
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('src/assets/data/HEALTH.pdf')

# Let's inspect Book Pages 1 to 19 (PDF pages 13 to 31)
with open('js_ch1.json', 'r', encoding='utf-8') as f:
    js_data = json.load(f)

for b_num in range(1, 20):
    pdf_p = b_num + 11 # 1 -> PDF page 13
    raw_pdf = doc[pdf_p].get_text()
    
    # Get JS page
    js_page = js_data['pages'][b_num-1] if b_num-1 < len(js_data['pages']) else []
    
    print(f"\n==================================================")
    print(f"BOOK PAGE {b_num} (PDF Page {pdf_p+1})")
    print(f"==================================================")
    
    print("--- PDF RAW TEXT ---")
    print(raw_pdf.strip())
    
    print("\n--- JS PAGE BLOCKS ---")
    for b in js_page:
        b_type = b.get('type')
        if b_type == 'review':
            print(f"  [{b_type}] Title: {b.get('title')}")
            for sec in b.get('sections', []):
                print(f"    Sec: {sec.get('heading')}")
                for item in sec.get('items', []):
                    print(f"      Q: {item.get('prompt')}")
        else:
            print(f"  [{b_type}] {b.get('text')}\n")

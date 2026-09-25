import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('pdf_pages_printed.txt', 'r', encoding='utf-8') as f:
    pdf_content = f.read()

with open('full_js_ch1_clean.txt', 'r', encoding='utf-8') as f:
    js_clean = f.read()

pages = pdf_content.split('==================================================\nBOOK PAGE ')

for p_num in range(1, 20):
    page_text = ""
    for p in pages:
        if p.startswith(f"{p_num} ("):
            page_text = p
            break
    
    print(f"\n--- BOOK PAGE {p_num} ---")
    lines = page_text.splitlines()
    print("Header line:", lines[0] if lines else "")
    print("Line count:", len(lines))
    # Search for headings or features
    headings = [l for l in lines if l.isupper() or any(h in l for h in ['1.', '2.', '3.', 'Health', 'Section', 'Figure', 'Review'])]
    print("Interesting lines:", headings[:10])

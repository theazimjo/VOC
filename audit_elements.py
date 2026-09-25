import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('page_by_page_deep_diff.txt', 'r', encoding='utf-8') as f:
    content = f.read()

pages = content.split('==================================================\nBOOK PAGE ')

for p in pages[1:]:
    lines = p.splitlines()
    header = lines[0]
    b_num = header.split(' ')[0]
    
    pdf_text = p.split('--- JS PAGE BLOCKS ---')[0].replace('--- PDF RAW TEXT ---', '').strip()
    js_text = p.split('--- JS PAGE BLOCKS ---')[1].strip()
    
    print(f"\n==================== PAGE {b_num} AUDIT ====================")
    # Check if key headers in PDF are in JS
    pdf_lines = [l.strip() for l in pdf_text.splitlines() if l.strip()]
    
    # Let's check for specific elements in PDF:
    # Captions, sidebars, activity questions, headings
    for line in pdf_lines:
        if line.startswith('Figure 1-') or 'Health Skills' in line or 'Health Frontiers' in line or 'Section Review' in line or line.isupper() and len(line) > 3:
            in_js = line.lower() in js_text.lower()
            print(f"  PDF Element: '{line}' -> In JS: {in_js}")

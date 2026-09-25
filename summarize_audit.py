import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('ch1_audit_output.txt', 'r', encoding='utf-8') as f:
    text = f.read()

pages = text.split('==================================================\nBOOK PAGE ')

for p in pages[1:]:
    p_num = p.split('\n')[0]
    print(f"\n==================== BOOK PAGE {p_num} ====================")
    pdf_part = p.split('--- JS PAGE BLOCKS ---')[0].replace('--- PDF RAW TEXT ---', '').strip()
    js_part = p.split('--- JS PAGE BLOCKS ---')[1].strip()
    
    # Check length
    print(f"PDF raw lines: {len(pdf_part.splitlines())}")
    print(f"JS part length: {len(js_part)}")

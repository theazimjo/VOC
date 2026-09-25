import sys
import json
import fitz

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('src/assets/data/HEALTH.pdf')

with open('js_ch1.json', 'r', encoding='utf-8') as f:
    js_data = json.load(f)

for p_idx in range(len(js_data['pages'])):
    page_blocks = js_data['pages'][p_idx]
    book_p_num = p_idx + 1
    pdf_p_num = p_idx + 13
    pdf_text = doc[pdf_p_num-1].get_text()
    
    print(f"\n==================== PAGE {book_p_num} (PDF Page {pdf_p_num}) ====================")
    print("JS BLOCKS:")
    for b in page_blocks:
        b_type = b.get('type')
        if b_type == 'review':
            print(f"  [{b_type}] {b.get('title')}")
        else:
            txt = b.get('text', '')
            print(f"  [{b_type}] {txt[:80]}...")
            
    print("\nPDF SAMPLE:")
    pdf_lines = [l.strip() for l in pdf_text.splitlines() if l.strip()]
    print("  First line:", pdf_lines[0] if pdf_lines else "")
    print("  Last lines:", pdf_lines[-2:] if len(pdf_lines)>=2 else pdf_lines)

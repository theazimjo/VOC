import sys
import fitz

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('src/assets/data/HEALTH.pdf')

for b in range(1, 20):
    pdf_p = b + 11
    text = doc[pdf_p].get_text()
    print(f"**************************************************")
    print(f"=== BOOK PAGE {b} (PDF PAGE {pdf_p+1}) ===")
    print(f"**************************************************")
    print(text)

import json

with open('js_ch1.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('js_ch1_extracted.txt', 'w', encoding='utf-8') as out:
    out.write(f"Title: {data.get('title')}\n")
    out.write(f"Total Pages: {len(data.get('pages', []))}\n\n")
    for p_idx, page in enumerate(data.get('pages', [])):
        out.write(f"==================== PAGE {p_idx+1} ====================\n")
        for b_idx, block in enumerate(page):
            b_type = block.get('type')
            if b_type == 'review':
                out.write(f"--- Block {b_idx+1} [{b_type}] {block.get('title')} ---\n")
                for sec in block.get('sections', []):
                    out.write(f"  Heading: {sec.get('heading')}\n")
                    for item in sec.get('items', []):
                        out.write(f"    Q: {item.get('prompt')}\n")
                        if 'answer' in item:
                            out.write(f"    A: {item.get('answer')}\n")
            else:
                out.write(f"--- Block {b_idx+1} [{b_type}] ---\n")
                out.write(f"{block.get('text', '')}\n\n")

print("Successfully written js_ch1_extracted.txt!")

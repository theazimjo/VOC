import re
import json

def parse_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = [l.strip() for l in f.readlines()]
    lines = [l for l in lines if l]
    
    cat = lines[0]
    author = lines[1]
    title = lines[2]
    subtitle = lines[3]
    tags = lines[4]
    
    body_lines = lines[5:]
    vocab_idx = -1
    for idx, l in enumerate(body_lines):
        if 'WORDS & PHRASES' in l or 'WORDS &' in l:
            vocab_idx = idx
            break
            
    article_lines = body_lines[:vocab_idx] if vocab_idx != -1 else body_lines
    vocab_lines = body_lines[vocab_idx+1:] if vocab_idx != -1 else []
    
    blocks = []
    current_paragraph = []
    
    for l in article_lines:
        is_heading = l.isupper() and len(l) > 3 and not re.search(r'[a-z]', l)
        if is_heading:
            if current_paragraph:
                blocks.append({'type': 'p', 'text': ' '.join(current_paragraph)})
                current_paragraph = []
            if blocks and blocks[-1]['type'] == 'heading':
                blocks[-1]['text'] += ' ' + l.title()
            else:
                blocks.append({'type': 'heading', 'text': l.title()})
        else:
            current_paragraph.append(l)
            
    if current_paragraph:
        blocks.append({'type': 'p', 'text': ' '.join(current_paragraph)})
        
    vocab_items = []
    for vl in vocab_lines:
        if '—' in vl or '-' in vl:
            parts = re.split(r'\s*[—\-]\s*', vl, maxsplit=1)
            if len(parts) == 2:
                word = parts[0].strip()
                trans = parts[1].strip()
                vocab_items.append({'word': word, 'translation': trans})
                
    return {
        'category': cat,
        'author': author,
        'title': title,
        'subtitle': subtitle,
        'tags': tags,
        'blocks': blocks,
        'vocab': vocab_items
    }

p4 = parse_file('scratch/page4.txt')
p5 = parse_file('scratch/page5.txt')

print("Page 4 title:", p4['title'])
print("Page 4 blocks:", len(p4['blocks']))
print("Page 4 vocab:", len(p4['vocab']))
for i, b in enumerate(p4['blocks']):
    print(f"  {i+1}. [{b['type']}] {b['text'][:60]}...")

print("\nPage 5 title:", p5['title'])
print("Page 5 blocks:", len(p5['blocks']))
print("Page 5 vocab:", len(p5['vocab']))
for i, b in enumerate(p5['blocks']):
    print(f"  {i+1}. [{b['type']}] {b['text'][:60]}...")

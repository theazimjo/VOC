import fitz
import re
import json

doc = fitz.open('src/assets/data/I’m ready September.pdf')

def clean_str(s):
    if not s:
        return ""
    # Replace smart quotes with standard quotes for clean JS rendering
    s = s.replace('“', '"').replace('”', '"')
    s = s.replace('‘', "'").replace('’', "'")
    s = s.replace('–', '-').replace('—', '—')
    # Replace any unrecognized replacement chars if any
    s = re.sub(r'[\ufffd\x7f]', '', s)
    return s.strip()

def parse_pdf_page(page_num):
    page = doc[page_num]
    raw_text = page.get_text('text')
    lines = [clean_str(l) for l in raw_text.splitlines()]
    lines = [l for l in lines if l]
    
    cat = lines[0] # INTERESTING & SOCIAL
    author = lines[1] # Ulugbek Davlatov
    raw_title = lines[2] # WHY DO WE MISS THE PAST SO MUCH?
    subtitle = lines[3] # The strange power of nostalgia...
    tags = lines[4] # NOSTALGIA • MEMORY...
    
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
                p_text = ' '.join(current_paragraph)
                # Fix double spaces
                p_text = re.sub(r'\s+', ' ', p_text)
                blocks.append({'type': 'p', 'text': p_text})
                current_paragraph = []
                
            # Title case heading
            heading_text = ' '.join([w.capitalize() for w in l.split()])
            if blocks and blocks[-1]['type'] == 'heading':
                blocks[-1]['text'] += ' ' + heading_text
            else:
                blocks.append({'type': 'heading', 'text': heading_text})
        else:
            current_paragraph.append(l)
            
    if current_paragraph:
        p_text = re.sub(r'\s+', ' ', ' '.join(current_paragraph))
        blocks.append({'type': 'p', 'text': p_text})
        
    vocab_items = []
    for vl in vocab_lines:
        if '—' in vl or '-' in vl:
            parts = re.split(r'\s*[—\-]\s*', vl, maxsplit=1)
            if len(parts) == 2:
                word = clean_str(parts[0])
                trans = clean_str(parts[1])
                vocab_items.append({'word': word, 'translation': trans})
                
    # Title format
    if page_num == 3:
        formatted_title = "Why Do We Miss the Past So Much?"
    elif page_num == 4:
        formatted_title = "Why Are We Becoming More Lonely?"
    else:
        formatted_title = ' '.join([w.capitalize() for w in raw_title.split()])
        
    return {
        'category': cat,
        'author': author,
        'title': formatted_title,
        'subtitle': subtitle,
        'tags': tags,
        'blocks': blocks,
        'vocab': vocab_items
    }

p4 = parse_pdf_page(3) # Page 4
p5 = parse_pdf_page(4) # Page 5

# Rebuild imReadySeptemberChapterText.js
p4_image_block = {
    "type": "image-group",
    "images": [
        {
            "src": "/images/imReadySeptember/p4_nostalgia.jpg",
            "caption": "Why Do We Miss the Past So Much?"
        }
    ]
}

p5_image_block = {
    "type": "image-group",
    "images": [
        {
            "src": "/images/imReadySeptember/p5_loneliness.jpg",
            "caption": "Why Are We Becoming More Lonely?"
        }
    ]
}

# Split into 2 logical reading pages for optimal UX
p4_page1 = [
    {"type": "heading", "text": p4['title']},
    p4_image_block
] + p4['blocks'][:12]

p4_page2 = p4['blocks'][12:]

p5_page1 = [
    {"type": "heading", "text": p5['title']},
    p5_image_block
] + p5['blocks'][:13]

p5_page2 = p5['blocks'][13:]

chapter_data = {
    p4['title']: {
        "title": p4['title'],
        "subtitle": p4['subtitle'],
        "author": p4['author'],
        "category": p4['category'],
        "pages": [p4_page1, p4_page2]
    },
    p5['title']: {
        "title": p5['title'],
        "subtitle": p5['subtitle'],
        "author": p5['author'],
        "category": p5['category'],
        "pages": [p5_page1, p5_page2]
    }
}

file_content = "// Reading stories for 'I\'m Ready September' book (Pages 4 & 5 topics).\n"
file_content += "// Keyed by the exact topic string used on each word in marketData.js.\n\n"
file_content += "export const imReadySeptemberChapterText = " + json.dumps(chapter_data, indent=2, ensure_ascii=False) + ";\n"

with open('src/data/imReadySeptemberChapterText.js', 'w', encoding='utf-8') as f:
    f.write(file_content)

print("Updated src/data/imReadySeptemberChapterText.js with 100% clean UTF-8 text.")

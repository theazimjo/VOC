import re
import json

def parse_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = [l.strip() for l in f.readlines()]
    lines = [l for l in lines if l]
    
    cat = lines[0]
    author = lines[1]
    raw_title = lines[2]
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
                # Capitalize title
                words = (blocks[-1]['text'] + ' ' + l).split()
                blocks[-1]['text'] = ' '.join([w.capitalize() for w in words])
            else:
                words = l.split()
                blocks.append({'type': 'heading', 'text': ' '.join([w.capitalize() for w in words])})
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
                
    # Fix title formatting: "WHY DO WE MISS THE PAST SO MUCH?" -> "Why Do We Miss the Past So Much?"
    formatted_title = raw_title.strip()
    if formatted_title == "WHY DO WE MISS THE PAST SO MUCH?":
        formatted_title = "Why Do We Miss the Past So Much?"
    elif formatted_title == "WHY ARE WE BECOMING MORE LONELY?":
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

p4 = parse_file('scratch/page4.txt')
p5 = parse_file('scratch/page5.txt')

# Build imReadySeptemberChapterText.js
def build_chapter_text_file():
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
    
    # Insert image block after heading/first block in pages
    # Split blocks into 2 reading pages for better UX
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
    
    content = "// Reading stories for 'I\'m Ready September' book (Pages 4 & 5 topics).\n"
    content += "// Keyed by the exact topic string used on each word in marketData.js.\n\n"
    content += "export const imReadySeptemberChapterText = " + json.dumps(chapter_data, indent=2, ensure_ascii=False) + ";\n"
    
    with open('src/data/imReadySeptemberChapterText.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Created src/data/imReadySeptemberChapterText.js")

build_chapter_text_file()

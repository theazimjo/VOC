import json

with open('scratch/im_ready_pack.json', 'r', encoding='utf-8') as f:
    pack_data = json.load(f)

pack_json_str = json.dumps(pack_data, indent=2, ensure_ascii=False)

with open('src/data/marketData.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find last occurrence of ];
idx = content.rfind('];')
if idx != -1:
    new_content = content[:idx].rstrip() + ',\n  ' + pack_json_str + '\n];\n'
    with open('src/data/marketData.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully appended I'm Ready September pack to marketData.js!")
else:
    print("Error: Could not find ]; in marketData.js")

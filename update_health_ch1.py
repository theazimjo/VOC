import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

# Import the new ch1_data from construct_ch1.py
from construct_ch1 import ch1_data

with open('src/data/healthChapterText.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Find start of H.Ch.01 and start of H.Ch.02
key1 = '"H.Ch.01 · Choosing Wellness"'
key2 = '"H.Ch.02 · Your Personality"'

idx1 = js_content.find(key1)
idx2 = js_content.find(key2)

if idx1 == -1 or idx2 == -1:
    print("ERROR: Could not find key boundaries in JS file!")
    sys.exit(1)

# The content to replace is from idx1 up to just before key2
# Format ch1_data as pretty JSON
ch1_json_str = json.dumps(ch1_data, indent=4)

# We want the JS formatting: "H.Ch.01 · Choosing Wellness": <ch1_json_str>,\n  
new_ch1_block = f'"{key1[1:-1]}": ' + ch1_json_str + ',\n  '

new_js_content = js_content[:idx1] + new_ch1_block + js_content[idx2:]

with open('src/data/healthChapterText.js', 'w', encoding='utf-8') as f:
    f.write(new_js_content)

print("Successfully replaced Chapter 1 in src/data/healthChapterText.js!")

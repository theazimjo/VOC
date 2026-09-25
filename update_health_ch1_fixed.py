import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

from construct_ch1 import ch1_data

with open('src/data/healthChapterText.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Exact boundary string
start_marker = 'export const healthChapterText = {\n  "H.Ch.01 · Choosing Wellness": {'
end_marker = '  "H.Ch.02 · Your Personality": {'

idx1 = js_content.find(start_marker)
idx2 = js_content.find(end_marker)

if idx1 == -1 or idx2 == -1:
    print(f"ERROR: Could not find exact markers! idx1={idx1}, idx2={idx2}")
    sys.exit(1)

# Format ch1_data as pretty JSON
ch1_json_str = json.dumps(ch1_data, indent=4)

new_ch1_block = 'export const healthChapterText = {\n  "H.Ch.01 · Choosing Wellness": ' + ch1_json_str + ',\n  '

new_js_content = js_content[:idx1] + new_ch1_block + js_content[idx2:]

with open('src/data/healthChapterText.js', 'w', encoding='utf-8') as f:
    f.write(new_js_content)

print("Updated Chapter 1 in healthChapterText.js successfully!")

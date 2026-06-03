import os
import re

def process_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
    except Exception as e:
        return

    original = content
    
    # Replace bg-slate-50 (not followed by another digit, e.g. 0 to make 500)
    content = re.sub(r'bg-slate-50(?!\d)', 'bg-neutral-50', content)
    
    # Replace the rgba hardcoded value
    content = content.replace('bg-[rgba(248,250,252,0.3)]', 'bg-[rgba(250,250,250,0.3)]')
    content = content.replace('rgba(248, 250, 252,', 'rgba(250, 250, 250,')
    content = content.replace('#F8FAFC', '#FAFAFA')
    content = content.replace('#f8fafc', '#fafafa')
    
    if original != content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css', '.jsx', '.js', '.html')):
            process_file(os.path.join(root, file))

from pathlib import Path
import re
paths = list(Path('.').glob('*.html'))
replacements = [
    ('<div class="footer-item" data-page="profile"><i class="fas fa-user"></i> MY PROFILE</div>', '<div class="footer-item" data-page="profile"><i class="fas fa-user"></i> PROFILE</div>'),
    ('<div class="footer-item" data-page="account"><i class="fas fa-wallet"></i> MY ACCOUNT</div>', '<div class="footer-item" data-page="account"><i class="fas fa-wallet"></i> ACCOUNT</div>'),
    ('<div class="footer-item" data-page="support"><i class="fas fa-headset"></i> CUSTOMER CARE</div>', '<div class="footer-item" data-page="support"><i class="fas fa-headset"></i> SUPPORT</div>'),
]
for path in paths:
    text = path.read_text(encoding='utf-8')
    new_text = text
    for old, new in replacements:
        new_text = new_text.replace(old, new)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        print(f'Updated {path}')

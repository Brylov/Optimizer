def analyze_title(title):
    if not title:
        return 'Missing title tag', False
    elif len(title) < 10 or len(title) > 70:
        return 'Title tag length should be between 10 and 70 characters', False
    else:
        return 'Title tag length is fine', True

def analyze_meta_description(md):
    if not md:
        return 'Missing meta description', False
    elif len(md) < 70 or len(md) > 160:
        return 'Meta description length should be between 70 and 160 characters', False
    else:
        return 'Meta description length is fine', True


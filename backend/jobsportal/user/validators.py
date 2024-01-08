import os

def validate_resume_file(filename):
    is_valid = False
    ext = os.path.splitext(filename)[1]
    valid_exts = ['.pdf']

    if ext.lower() in valid_exts:
        is_valid = True

    return is_valid
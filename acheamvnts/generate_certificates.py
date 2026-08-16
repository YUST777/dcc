#!/usr/bin/env python3
"""
DCC 2026 Certificate Generator
-------------------------------
Reads contestant data from CSV, overlays name, team, and rank
onto the template image, and saves each as a PDF.

Usage:
    python3 generate_certificates.py                 # Generate all certificates
    python3 generate_certificates.py --test          # Generate only the first certificate for testing
    python3 generate_certificates.py --test-ref      # Generate the reference example (Ruba Abdallah)
"""

import csv
import os
import sys
from PIL import Image, ImageDraw, ImageFont

# ── Paths ──────────────────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_PATH = os.path.join(SCRIPT_DIR, "template.webp")
CSV_PATH = os.path.join(SCRIPT_DIR, "Final Constestants 2026 - Sheet1.csv")
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "output")

# Font paths
FONT_DIR = os.path.join(SCRIPT_DIR, "fonts")
FONT_BOLD = os.path.join(FONT_DIR, "Montserrat-Bold.ttf")
FONT_EXTRABOLD = os.path.join(FONT_DIR, "Montserrat-ExtraBold.ttf")
FONT_BOLD_ITALIC = os.path.join(FONT_DIR, "Montserrat-BoldItalic.ttf")
FONT_EXTRABOLD_ITALIC = os.path.join(FONT_DIR, "Montserrat-ExtraBoldItalic.ttf")
FONT_BLACK = os.path.join(FONT_DIR, "Montserrat-Black.ttf")

# ── Layout constants (derived from pixel-precise analysis) ─────────────────────
# Template size: 1672 x 941

# Student name: centered horizontally at X=836, Y center at 412
NAME_CENTER_X = 828
NAME_CENTER_Y = 412
NAME_MAX_WIDTH = 1200  # max width before we shrink the font
NAME_FONT_SIZE = 48    # target font size producing ~39px height

# Team name: centered horizontally at X=836, Y center at 521
TEAM_CENTER_X = 841
TEAM_CENTER_Y = 521
TEAM_MAX_WIDTH = 700
TEAM_FONT_SIZE = 34    # target font size producing ~30px height

# Rank number: placed right after the existing "RANK" text
# "RANK" word right edge is at X=943, the "17" starts at ~X=955 (small gap)
# Y center of rank text is ~607, height ~55px
RANK_START_X = 955      # where the rank number starts (after "RANK" + space)
RANK_CENTER_Y = 607
RANK_FONT_SIZE = 77     # bold italic, matched to produce 55px height like "RANK"

# Colors
COLOR_NAME = (0, 0, 0)           # Black
COLOR_TEAM = (0, 194, 179)       # Teal / Turquoise
COLOR_RANK = (255, 0, 92)        # Pink / Red (matches existing "RANK" text)


def load_font(font_path, size):
    """Load a TrueType font, falling back to default if not found."""
    try:
        return ImageFont.truetype(font_path, size)
    except (IOError, OSError):
        print(f"  WARNING: Could not load font {font_path}, using default")
        return ImageFont.load_default()


def get_text_bbox(draw, text, font):
    """Get text bounding box and return (width, height)."""
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0], bbox[3] - bbox[1]


def fit_text_width(draw, text, font_path, max_size, max_width):
    """
    Find the largest font size (up to max_size) that fits text within max_width.
    Returns (font, actual_width, actual_height).
    """
    size = max_size
    while size > 10:
        font = load_font(font_path, size)
        w, h = get_text_bbox(draw, text, font)
        if w <= max_width:
            return font, w, h
        size -= 2
    # Fallback: smallest size
    font = load_font(font_path, 10)
    w, h = get_text_bbox(draw, text, font)
    return font, w, h


def draw_centered_text(draw, text, center_x, center_y, font_path, max_font_size,
                       max_width, color):
    """Draw text centered at (center_x, center_y), auto-shrinking to fit max_width."""
    font, w, h = fit_text_width(draw, text, font_path, max_font_size, max_width)
    x = center_x - w // 2
    # Use textbbox to get precise vertical positioning
    bbox = draw.textbbox((0, 0), text, font=font)
    text_top_offset = bbox[1]  # offset from y=0 to actual top of glyphs
    y = center_y - h // 2 - text_top_offset
    draw.text((x, y), text, fill=color, font=font)
    return font, w, h


def draw_rank_number(draw, rank_text, font_path, font_size, color):
    """
    Draw the rank number right after the existing 'RANK' word on the template.
    The number is left-aligned starting at RANK_START_X, vertically centered at RANK_CENTER_Y.
    """
    font = load_font(font_path, font_size)
    # Try to fit; if the number is very long, shrink
    w, h = get_text_bbox(draw, rank_text, font)
    max_w = 250  # max space available in the banner for the number
    while w > max_w and font_size > 20:
        font_size -= 2
        font = load_font(font_path, font_size)
        w, h = get_text_bbox(draw, rank_text, font)

    bbox = draw.textbbox((0, 0), rank_text, font=font)
    text_top_offset = bbox[1]
    x = RANK_START_X
    y = RANK_CENTER_Y - h // 2 - text_top_offset
    draw.text((x, y), rank_text, fill=color, font=font)


def generate_certificate(name, team, rank, output_path):
    """Generate a single certificate and save as PDF."""
    # Open template
    img = Image.open(TEMPLATE_PATH).convert("RGB")
    draw = ImageDraw.Draw(img)

    # 1. Draw student name (UPPERCASE, bold, black, centered)
    name_upper = name.strip().upper()
    draw_centered_text(
        draw, name_upper,
        NAME_CENTER_X, NAME_CENTER_Y,
        FONT_EXTRABOLD, NAME_FONT_SIZE,
        NAME_MAX_WIDTH, COLOR_NAME
    )

    # 2. Draw team name (UPPERCASE, bold, teal, centered)
    team_upper = team.strip().upper()
    draw_centered_text(
        draw, team_upper,
        TEAM_CENTER_X, TEAM_CENTER_Y,
        FONT_BOLD, TEAM_FONT_SIZE,
        TEAM_MAX_WIDTH, COLOR_TEAM
    )

    # 3. Draw rank number
    rank_clean = rank.strip()
    if rank_clean and rank_clean != "--":
        draw_rank_number(
            draw, rank_clean,
            FONT_EXTRABOLD_ITALIC, RANK_FONT_SIZE,
            COLOR_RANK
        )

    # Save as PDF
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PDF", resolution=150)
    print(f"  ✅ Saved: {output_path}")


def sanitize_filename(s):
    """Remove/replace characters that are problematic in filenames."""
    # Replace problematic chars with underscore
    bad_chars = r'/\:*?"<>|'
    for c in bad_chars:
        s = s.replace(c, "_")
    # Collapse multiple underscores/spaces
    while "__" in s:
        s = s.replace("__", "_")
    return s.strip().strip("_")


def read_csv():
    """Read the CSV and return list of dicts with keys: name, team, rank, email."""
    contestants = []
    with open(CSV_PATH, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            contestants.append({
                "name": row["English Name"].strip(),
                "team": row["Team Name"].strip(),
                "rank": row["Rank"].strip(),
                "email": row["Email"].strip(),
            })
    return contestants


def main():
    test_mode = "--test" in sys.argv
    test_ref = "--test-ref" in sys.argv

    all_contestants = read_csv()
    # Filter out contestants with no rank ("--") — they didn't attend the final
    contestants = [c for c in all_contestants if c["rank"] != "--"]
    skipped = len(all_contestants) - len(contestants)
    print(f"📋 Loaded {len(all_contestants)} from CSV, skipped {skipped} with no rank → {len(contestants)} finalists")

    if test_ref:
        # Generate the reference example: Ruba Abdallah Abdallah Elsemary
        for c in contestants:
            if "Ruba" in c["name"]:
                contestants = [c]
                break
        print("🧪 Test mode: generating reference example only")
    elif test_mode:
        contestants = contestants[:1]
        print("🧪 Test mode: generating first contestant only")

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for i, c in enumerate(contestants, 1):
        name = c["name"]
        team = c["team"]
        rank = c["rank"]

        # Build output filename: studentname_teamname.pdf
        safe_name = sanitize_filename(name.replace(" ", "_"))
        safe_team = sanitize_filename(team.replace(" ", "_"))
        filename = f"{safe_name}_{safe_team}.pdf"
        output_path = os.path.join(OUTPUT_DIR, filename)

        print(f"[{i}/{len(contestants)}] {name} | Team: {team} | Rank: {rank}")
        generate_certificate(name, team, rank, output_path)

    print(f"\n🎉 Done! Generated {len(contestants)} certificate(s) in: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()

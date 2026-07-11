from pathlib import Path
from random import Random

from PIL import Image, ImageDraw, ImageFont


WIDTH = 1200
HEIGHT = 630
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "social-preview.png"


def font(path, size):
    return ImageFont.truetype(path, size)


image = Image.new("RGB", (WIDTH, HEIGHT), "#080a0e")
draw = ImageDraw.Draw(image)
rng = Random(20260711)

# Celestial graticule.
for inset in (70, 145, 220, 295):
    draw.arc(
        (-360 + inset, -510 + inset // 2, 1540 - inset, 1120 - inset // 2),
        198,
        342,
        fill="#183336",
        width=2,
    )
for x in (360, 520, 680, 840, 1000):
    draw.arc((x - 430, -110, x + 430, 760), 92, 268, fill="#17282c", width=2)

# Deterministic star field with natural color variation.
star_colors = ["#fff7e2", "#d7e7ff", "#a9c9ff", "#ffdca8", "#efb080"]
for _ in range(285):
    x = rng.randrange(28, WIDTH - 28)
    y = rng.randrange(24, HEIGHT - 24)
    radius = rng.choices([1, 2, 3, 4], weights=[68, 23, 7, 2])[0]
    color = rng.choices(star_colors, weights=[50, 19, 10, 14, 7])[0]
    if radius >= 3:
        draw.ellipse((x - radius * 2, y - 1, x + radius * 2, y + 1), fill="#5f7778")
        draw.ellipse((x - 1, y - radius * 2, x + 1, y + radius * 2), fill="#5f7778")
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=color)

# A restrained constellation network across the right half.
nodes = [
    (725, 165), (785, 218), (858, 190), (925, 250), (1018, 222),
    (1080, 303), (985, 340), (900, 320), (835, 390), (760, 352),
]
edges = [(0, 1), (1, 2), (2, 3), (3, 4), (4, 5), (5, 6), (6, 7), (7, 8), (8, 9), (9, 1), (3, 7)]
for start, end in edges:
    draw.line((nodes[start], nodes[end]), fill="#2f6d6b", width=2)
for index, (x, y) in enumerate(nodes):
    radius = 5 if index in (1, 3, 6) else 3
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill="#e5bd73")

chinese_bold = font("C:/Windows/Fonts/msyhbd.ttc", 92)
chinese_regular = font("C:/Windows/Fonts/msyh.ttc", 28)
latin_bold = font("C:/Windows/Fonts/georgiab.ttf", 22)

draw.text((72, 78), "STELLAR ATLAS · ALL-SKY J2000", font=latin_bold, fill="#8bb8b3")
draw.text((68, 132), "天象志", font=chinese_bold, fill="#f0e8d5")
draw.line((72, 253, 560, 253), fill="#ad654a", width=3)
draw.text((72, 282), "88 星座 · 今晚星空 · 跨文明专题", font=chinese_regular, fill="#d3cbb9")

draw.rectangle((28, 28, WIDTH - 28, HEIGHT - 28), outline="#314446", width=2)
draw.rectangle((40, 40, WIDTH - 40, HEIGHT - 40), outline="#8b5c47", width=1)

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
image.save(OUTPUT, format="PNG", optimize=True)

for icon_size in (192, 512):
    icon = Image.new("RGB", (icon_size, icon_size), "#090a0d")
    icon_draw = ImageDraw.Draw(icon)
    center = icon_size / 2
    outer = icon_size * 0.39
    inner = icon_size * 0.075
    points = [
        (center, center - outer),
        (center + inner, center - inner),
        (center + outer, center),
        (center + inner, center + inner),
        (center, center + outer),
        (center - inner, center + inner),
        (center - outer, center),
        (center - inner, center - inner),
    ]
    icon_draw.polygon(points, fill="#d8ab5f")
    core = icon_size * 0.065
    icon_draw.ellipse(
        (center - core, center - core, center + core, center + core),
        fill="#f7f4ec",
    )
    icon.save(ROOT / "assets" / f"icon-{icon_size}.png", format="PNG", optimize=True)

print(OUTPUT)

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import landscape, A4
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "fausto-vasquez-direccion-de-marca-v1.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)

PAGE = landscape(A4)
W, H = PAGE
INK = HexColor("#0A0908")
IVORY = HexColor("#F2EBDD")
GOLD = HexColor("#AA824B")
STONE = HexColor("#B9B0A3")
OXBLOOD = HexColor("#451C22")
LIMESTONE = HexColor("#E9E2D7")
BRONZE = HexColor("#815E3B")
NAVY = HexColor("#101619")
COPPER = HexColor("#A76D45")


def text(c, value, x, y, font="Helvetica", size=12, color=INK, tracking=0):
    c.setFillColor(color)
    c.setFont(font, size)
    if tracking == 0:
        c.drawString(x, y, value)
        return
    cursor = x
    for char in value:
        c.drawString(cursor, y, char)
        cursor += stringWidth(char, font, size) + tracking


def paragraph(c, value, x, y, width, size=12, leading=18, color=INK, font="Helvetica"):
    words = value.split()
    lines = []
    line = ""
    for word in words:
        trial = f"{line} {word}".strip()
        if stringWidth(trial, font, size) <= width:
            line = trial
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    for index, line in enumerate(lines):
        text(c, line, x, y - index * leading, font, size, color)
    return y - len(lines) * leading


def footer(c, number, dark=False):
    color = STONE if dark else HexColor("#766F66")
    c.setStrokeColor(HexColor("#3A342D") if dark else HexColor("#C5BCB0"))
    c.setLineWidth(0.5)
    c.line(48, 34, W - 48, 34)
    text(c, "FAUSTO VÁSQUEZ · DIRECCIÓN DE MARCA · FASE 01", 48, 18, "Helvetica-Bold", 7, color, 1.1)
    text(c, f"{number:02}", W - 66, 18, "Helvetica-Bold", 8, color)


def page_title(c, eyebrow, title_value, subtitle=None, dark=False):
    fg = IVORY if dark else INK
    accent = GOLD if dark else BRONZE
    text(c, eyebrow.upper(), 52, H - 58, "Helvetica-Bold", 8, accent, 1.8)
    text(c, title_value, 50, H - 112, "Times-Roman", 34, fg)
    if subtitle:
        paragraph(c, subtitle, 52, H - 144, 530, 11, 17, STONE if dark else HexColor("#5B554E"))


def mark_cut(c, x, y, scale=1):
    c.setFillColor(IVORY)
    c.rect(x, y, 20 * scale, 126 * scale, stroke=0, fill=1)
    c.rect(x, y + 112 * scale, 78 * scale, 14 * scale, stroke=0, fill=1)
    c.rect(x, y + 60 * scale, 63 * scale, 13 * scale, stroke=0, fill=1)
    c.setStrokeColor(IVORY)
    c.setLineWidth(14 * scale)
    c.line(x + 40 * scale, y + 80 * scale, x + 82 * scale, y,)
    c.line(x + 82 * scale, y, x + 124 * scale, y + 80 * scale)
    c.setStrokeColor(GOLD)
    c.setLineWidth(11 * scale)
    c.line(x + 27 * scale, y + 82 * scale, x + 73 * scale, y + 26 * scale)


def mark_axis(c, x, y, scale=1):
    c.setStrokeColor(INK)
    c.setLineWidth(13 * scale)
    c.line(x, y, x, y + 126 * scale)
    c.line(x, y + 118 * scale, x + 72 * scale, y + 118 * scale)
    c.line(x, y + 67 * scale, x + 58 * scale, y + 67 * scale)
    c.setStrokeColor(BRONZE)
    c.setLineWidth(11 * scale)
    c.line(x + 32 * scale, y + 78 * scale, x + 70 * scale, y)
    c.line(x + 70 * scale, y, x + 108 * scale, y + 78 * scale)
    c.setStrokeColor(INK)
    c.setLineWidth(1.5 * scale)
    c.line(x + 70 * scale, y, x + 70 * scale, y + 126 * scale)


def mark_counterpoint(c, x, y, scale=1):
    c.setFillColor(IVORY)
    c.rect(x, y, 16 * scale, 126 * scale, stroke=0, fill=1)
    c.rect(x, y + 112 * scale, 73 * scale, 12 * scale, stroke=0, fill=1)
    c.rect(x, y + 58 * scale, 57 * scale, 11 * scale, stroke=0, fill=1)
    c.setStrokeColor(IVORY)
    c.setLineWidth(13 * scale)
    c.line(x + 34 * scale, y + 79 * scale, x + 68 * scale, y)
    c.line(x + 68 * scale, y, x + 102 * scale, y + 79 * scale)
    c.setStrokeColor(COPPER)
    c.setLineWidth(2 * scale)
    c.line(x + 72 * scale, y, x + 72 * scale, y + 126 * scale)


c = canvas.Canvas(str(OUT), pagesize=PAGE)
c.setTitle("Fausto Vásquez - Dirección de marca Fase 01")

# 01 Cover
c.setFillColor(INK)
c.rect(0, 0, W, H, stroke=0, fill=1)
mark_cut(c, 58, 236, 1.65)
text(c, "FAUSTO", 300, 332, "Times-Roman", 22, GOLD, 6)
text(c, "VÁSQUEZ", 292, 244, "Times-Roman", 70, IVORY)
text(c, "DIRECCIÓN DE MARCA", 298, 194, "Helvetica-Bold", 10, STONE, 3.8)
c.setStrokeColor(GOLD)
c.setLineWidth(1)
c.line(300, 172, W - 55, 172)
paragraph(c, "Tres territorios estratégicos para construir una identidad jurídica de categoría internacional.", 300, 136, 430, 13, 20, STONE)
text(c, "FASE 01 · DOCUMENTO DE DECISIÓN", 300, 72, "Helvetica-Bold", 8, GOLD, 2.4)
footer(c, 1, True)
c.showPage()

# 02 Premise
c.setFillColor(LIMESTONE)
c.rect(0, 0, W, H, stroke=0, fill=1)
page_title(c, "01 · Estrategia", "No debe parecer abogado. Debe parecer la referencia.")
paragraph(c, "El territorio competitivo no es la iconografía legal. Es la combinación poco común entre dirección personal de casos de alta consecuencia y pensamiento jurídico académico.", 52, H - 198, 470, 16, 25, INK, "Times-Roman")
items = [
    ("AUTORIDAD", "Seguridad sin arrogancia ni promesas vacías."),
    ("PRECISIÓN", "La forma, el lenguaje y cada interacción deben sentirse deliberados."),
    ("DISCRECIÓN", "La marca protege; no exhibe al cliente ni dramatiza el conflicto."),
    ("PENSAMIENTO", "Investigación, docencia y obra jurídica como ventaja competitiva."),
]
y = H - 190
for label, body in items:
    text(c, label, 575, y, "Helvetica-Bold", 9, BRONZE, 1.8)
    paragraph(c, body, 575, y - 24, 210, 11, 17, HexColor("#4D4740"))
    y -= 84
footer(c, 2)
c.showPage()

# 03 Positioning
c.setFillColor(INK)
c.rect(0, 0, W, H, stroke=0, fill=1)
page_title(c, "02 · Plataforma", "Asuntos que no admiten improvisación.", dark=True)
text(c, "POSICIONAMIENTO", 52, 305, "Helvetica-Bold", 8, GOLD, 1.8)
text(c, "Dirección personal de la", 52, 252, "Times-Roman", 34, IVORY)
text(c, "defensa penal estratégica.", 52, 211, "Times-Italic", 34, GOLD)
c.setStrokeColor(HexColor("#463C2E"))
c.line(52, 176, 790, 176)
text(c, "IDEA RECTORA", 52, 148, "Helvetica-Bold", 8, GOLD, 1.8)
text(c, "La precisión cambia el curso de un caso.", 52, 100, "Times-Roman", 28, IVORY)
footer(c, 3, True)
c.showPage()

# Territory pages
territories = [
    ("A", "Corte Estratégico", "Intervención precisa", INK, mark_cut,
     [("Tinta", "#0A0908"), ("Marfil", "#F2EBDD"), ("Oro antiguo", "#AA824B"), ("Oxblood", "#451C22")],
     "La F aporta estructura. La V introduce un corte que modifica el curso de la forma. Es la opción más personal, internacional y contundente.",
     "Canela / Söhne", "Retrato cerrado, luz lateral, biblioteca y oficina real."),
    ("B", "Eje Jurídico", "Orden, análisis y escala", LIMESTONE, mark_axis,
     [("Carbón", "#171411"), ("Caliza", "#E9E2D7"), ("Bronce", "#815E3B"), ("Grafito", "#4E4943")],
     "F y V se organizan alrededor de un eje visible. Expresa método, estabilidad y capacidad institucional sin recurrir a una balanza.",
     "Tiempos / Söhne", "Arquitectura, documentos, anotaciones y retrato ambiental."),
    ("C", "Contrapunto", "Tradición y pensamiento contemporáneo", NAVY, mark_counterpoint,
     [("Azul tinta", "#101619"), ("Pergamino", "#EFE8DB"), ("Cobre", "#A76D45"), ("Acero", "#AEB3B1")],
     "Una serif clásica convive con un eje contemporáneo. Convierte la dimensión académica y editorial en el principal activo distintivo.",
     "Portrait / Suisse Intl", "Conferencias, libros, páginas anotadas y retrato editorial."),
]

for idx, (letter, name, tagline, bg, mark, palette, description, fonts, photo) in enumerate(territories, start=4):
    dark = bg in (INK, NAVY)
    c.setFillColor(bg)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    fg = IVORY if dark else INK
    accent = GOLD if name == "Corte Estratégico" else (BRONZE if name == "Eje Jurídico" else COPPER)
    text(c, f"TERRITORIO {letter}", 52, H - 54, "Helvetica-Bold", 8, accent, 2)
    text(c, name, 50, H - 110, "Times-Roman", 38, fg)
    text(c, tagline.upper(), 53, H - 144, "Helvetica-Bold", 8, accent, 1.7)
    mark(c, 70, 180, 1.55)
    text(c, "FAUSTO", 290, 273, "Times-Roman", 17, accent, 4.2)
    text(c, "VÁSQUEZ", 285, 207, "Times-Roman", 55, fg)
    text(c, "DERECHO PENAL ESTRATÉGICO", 290, 175, "Helvetica-Bold", 8, STONE if dark else HexColor("#6A6259"), 2.1)
    paragraph(c, description, 52, 123, 460, 11, 18, STONE if dark else HexColor("#514A43"))
    text(c, "TIPOGRAFÍA", 565, 126, "Helvetica-Bold", 8, accent, 1.5)
    text(c, fonts, 565, 98, "Times-Roman", 18, fg)
    text(c, "FOTOGRAFÍA", 565, 65, "Helvetica-Bold", 8, accent, 1.5)
    paragraph(c, photo, 565, 43, 230, 9, 14, STONE if dark else HexColor("#514A43"))
    x = 565
    for label, hex_value in palette:
        color = HexColor(hex_value)
        c.setFillColor(color)
        c.rect(x, 165, 48, 48, stroke=0, fill=1)
        text(c, label, x, 150, "Helvetica", 6.5, STONE if dark else HexColor("#625B53"))
        x += 58
    footer(c, idx, dark)
    c.showPage()

# Comparison
c.setFillColor(LIMESTONE)
c.rect(0, 0, W, H, stroke=0, fill=1)
page_title(c, "06 · Decisión", "Tres caminos. Una recomendación.")
headers = ["CRITERIO", "A · CORTE", "B · EJE", "C · CONTRAPUNTO"]
xs = [52, 400, 525, 650]
for x, header in zip(xs, headers):
    text(c, header, x, 330, "Helvetica-Bold", 8, BRONZE, 1.1)
rows = [
    ("Autoridad personal", "5", "4", "5"),
    ("Escalabilidad", "4", "5", "3"),
    ("Diferenciación", "5", "4", "5"),
    ("Claridad penal", "5", "4", "4"),
    ("Potencial académico", "4", "4", "5"),
    ("Lujo discreto", "5", "4", "5"),
]
y = 298
for row in rows:
    c.setStrokeColor(HexColor("#C9C0B4"))
    c.line(52, y - 12, 790, y - 12)
    text(c, row[0], 52, y, "Helvetica", 11, INK)
    for x, val in zip(xs[1:], row[1:]):
        text(c, val, x + 18, y, "Times-Roman", 18, BRONZE)
    y -= 37
c.setFillColor(INK)
c.rect(52, 43, 738, 67, stroke=0, fill=1)
text(c, "RECOMENDACIÓN", 72, 84, "Helvetica-Bold", 8, GOLD, 1.8)
text(c, "Corte Estratégico + sistema editorial de Contrapunto", 72, 58, "Times-Roman", 18, IVORY)
footer(c, 7)
c.showPage()

# Scope
c.setFillColor(INK)
c.rect(0, 0, W, H, stroke=0, fill=1)
page_title(c, "07 · Sistema", "El logo es aproximadamente el 10% de la identidad.", dark=True)
columns = [
    ("ESTRATEGIA", ["Posicionamiento", "Audiencias", "Arquitectura", "Principios", "Mensajes"]),
    ("IDENTIDAD", ["Logo maestro", "Color", "Tipografía", "Retícula", "Fotografía"]),
    ("EXPRESIÓN", ["Voz", "Editorial", "Movimiento", "Datos", "Iconografía"]),
    ("APLICACIÓN", ["Documentos", "Web", "Redes", "Oficina", "Presentaciones"]),
]
x = 52
for heading, values in columns:
    text(c, heading, x, 320, "Helvetica-Bold", 8, GOLD, 1.8)
    y = 285
    for value in values:
        text(c, value, x, y, "Times-Roman", 16, IVORY)
        y -= 38
    x += 190
paragraph(c, "El manual definitivo documentará decisiones, archivos maestros, accesibilidad, producción impresa, plantillas y gobernanza para que la marca mantenga su calidad con el tiempo.", 52, 72, 700, 12, 19, STONE)
footer(c, 8, True)
c.showPage()

# Next decision
c.setFillColor(LIMESTONE)
c.rect(0, 0, W, H, stroke=0, fill=1)
page_title(c, "08 · Próximo paso", "Elegir territorio antes de perfeccionar el símbolo.")
text(c, "A", 62, 294, "Times-Roman", 54, GOLD)
text(c, "Corte Estratégico", 126, 307, "Times-Roman", 23, INK)
paragraph(c, "Más personal, selectivo y contundente.", 126, 278, 180, 10, 16, HexColor("#5C554D"))
text(c, "B", 326, 294, "Times-Roman", 54, BRONZE)
text(c, "Eje Jurídico", 390, 307, "Times-Roman", 23, INK)
paragraph(c, "Más institucional, estable y escalable.", 390, 278, 180, 10, 16, HexColor("#5C554D"))
text(c, "C", 590, 294, "Times-Roman", 54, COPPER)
text(c, "Contrapunto", 654, 307, "Times-Roman", 23, INK)
paragraph(c, "Más editorial, académico y autoral.", 654, 278, 145, 10, 16, HexColor("#5C554D"))
c.setFillColor(INK)
c.rect(52, 92, 738, 106, stroke=0, fill=1)
text(c, "DECISIÓN SOLICITADA", 76, 166, "Helvetica-Bold", 8, GOLD, 1.8)
text(c, "Seleccione A, B o C.", 76, 128, "Times-Roman", 25, IVORY)
text(c, "A partir de esa decisión se dibujan 3 refinamientos del mismo concepto.", 76, 104, "Helvetica", 10, STONE)
footer(c, 9)
c.showPage()

c.save()
print(OUT)

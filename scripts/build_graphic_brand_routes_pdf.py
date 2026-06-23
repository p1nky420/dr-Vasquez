from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "fausto-vasquez-rutas-graficas-v2.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)

W, H = landscape(A4)
INK = HexColor("#090908")
IVORY = HexColor("#F3EDE2")
GOLD = HexColor("#B58A52")
STONE = HexColor("#AAA297")


def fit_image(c, path):
    image = ImageReader(str(path))
    iw, ih = image.getSize()
    scale = min(W / iw, H / ih)
    width, height = iw * scale, ih * scale
    c.drawImage(image, (W - width) / 2, (H - height) / 2, width, height, preserveAspectRatio=True)


c = canvas.Canvas(str(OUT), pagesize=(W, H))
c.setTitle("Fausto Vásquez - Rutas gráficas de identidad v2")

# Cover
c.setFillColor(INK)
c.rect(0, 0, W, H, stroke=0, fill=1)
c.setFillColor(GOLD)
c.setFont("Helvetica-Bold", 10)
c.drawString(55, H - 60, "FAUSTO VÁSQUEZ · BRAND DIRECTION")
c.setFillColor(IVORY)
c.setFont("Times-Roman", 43)
c.drawString(52, H - 135, "Tres rutas gráficas")
c.drawString(52, H - 180, "para una identidad jurídica propia.")
c.setStrokeColor(GOLD)
c.line(55, H - 222, W - 55, H - 222)
c.setFillColor(STONE)
c.setFont("Helvetica", 13)
c.drawString(55, H - 258, "Documento de selección - no constituye todavía el logotipo final.")
c.setFont("Helvetica-Bold", 9)
c.setFillColor(GOLD)
c.drawString(55, 58, "A · INCISIÓN")
c.drawString(255, 58, "B · ARGUMENTO")
c.drawString(480, 58, "C · DIRECCIÓN")
c.showPage()

for filename in [
    "route-a-incision.png",
    "route-b-argumento.png",
    "route-c-direccion.png",
]:
    c.setFillColor(HexColor("#111111"))
    c.rect(0, 0, W, H, stroke=0, fill=1)
    fit_image(c, ROOT / "brand" / "development" / filename)
    c.showPage()

# Comparison
c.setFillColor(HexColor("#E9E2D7"))
c.rect(0, 0, W, H, stroke=0, fill=1)
c.setFillColor(HexColor("#171411"))
c.setFont("Times-Roman", 34)
c.drawString(52, H - 72, "Cómo elegir la dirección")
c.setFillColor(HexColor("#825F3D"))
c.setFont("Helvetica-Bold", 9)
c.drawString(55, H - 112, "NO SE ELIGE SOLO EL SÍMBOLO. SE ELIGE EL CARÁCTER DE TODA LA MARCA.")

routes = [
    ("A", "Incisión",
     ["Más personal, selectiva y", "silenciosamente lujosa."],
     ["Si el Dr. Vásquez será siempre", "el centro absoluto de la marca."]),
    ("B", "Argumento",
     ["Más institucional, estructurada", "y escalable."],
     ["Si la firma crecerá con otros", "abogados y nuevas áreas."]),
    ("C", "Dirección",
     ["Más autoral, académica", "y editorial."],
     ["Si libros, docencia y pensamiento", "serán el gran diferenciador."]),
]

x_positions = [55, 312, 569]
for x, (letter, name, lines, recommendations) in zip(x_positions, routes):
    c.setFillColor(HexColor("#171411"))
    c.setFont("Times-Roman", 52)
    c.drawString(x, H - 190, letter)
    c.setFont("Times-Roman", 23)
    c.drawString(x + 54, H - 178, name)
    c.setFillColor(HexColor("#5D554D"))
    c.setFont("Helvetica", 10)
    text = c.beginText(x, H - 222)
    text.setLeading(16)
    for chunk in [*lines, "", *recommendations]:
        text.textLine(chunk)
    c.drawText(text)

c.setFillColor(HexColor("#171411"))
c.rect(52, 62, W - 104, 112, stroke=0, fill=1)
c.setFillColor(GOLD)
c.setFont("Helvetica-Bold", 9)
c.drawString(76, 140, "SIGUIENTE DECISIÓN")
c.setFillColor(IVORY)
c.setFont("Times-Roman", 22)
c.drawString(76, 103, "Elegir A, B o C para desarrollar tres refinamientos del mismo territorio.")
c.setFillColor(STONE)
c.setFont("Helvetica", 9)
c.drawString(76, 79, "Después se prueban reducción, monocromía, papelería, web, sello, fachada y registro.")
c.showPage()

c.save()
print(OUT)

# Experiencia cinematográfica continua — Fausto Vásquez

Rama: `codex/vasquez-cinematic`. El checkout original de `main` permanece intacto.

## Diseño actual

Toda la portada es un recorrido cinematográfico de diez escenas. Una sola cámara y escena WebGL mantienen el hilo del ajedrez desde la apertura hasta la consulta final. No existe una transición a un catálogo convencional debajo del prólogo.

1. El arte de anticiparse: plano cercano de la pieza y título de apertura.
2. El método: descomposición de la pieza y construcción de la defensa.
3. Penal económico: cambio de cámara y encuadre de la especialidad.
4. Defensa estratégica: prueba, expediente y decisiones.
5. Prevención: anticipación de contingencias.
6. Garantías: libertad y debido proceso.
7. El jurista: retrato fotográfico a pantalla completa.
8. El conocimiento: libros en profundidad y enlaces a publicaciones y Academia.
9. La claridad: preguntas frecuentes dentro de la misma puesta en escena.
10. La consulta: cierre cinematográfico, contacto y créditos legales.

La referencia es el **Plan Maestro, edición 02, octubre de 2026**, entregado por el usuario: ajedrez como símbolo, grafito, azul profundo, dorado sobrio, marfil y consulta reservada. Las fotografías provienen del banco del PDF; el documento confidencial no se incluye en el repositorio. La pieza es geometría original programada con Three.js; los libros son una ilustración conceptual. No se presentan como reproducciones de portadas oficiales.

## Interacción y accesibilidad

- Scroll nativo con diez capítulos, índice, avance por escena y acceso directo al contacto.
- Todos los textos, FAQ y enlaces existen en el HTML prerenderizado. Sin JavaScript se muestran como una secuencia normal de secciones legibles.
- Los capítulos inactivos no capturan clics ni foco. El índice cierra con Escape.
- Pausa de movimiento y respeto de `prefers-reduced-motion`; sin bloqueo de scroll ni reproducción de audio.
- FAQ con scroll propio, aptas para teclado y tacto. Pantallas muy bajas o con zoom pueden desplazar el contenido de cada escena.
- Alternativa gráfica sin WebGL y sin descargar Three.js cuando `saveData` está activo.
- Un renderer, carga dinámica, resolución limitada (1.25 DPR en celular y 1.6 en escritorio), render bajo demanda y limpieza de recursos al salir.
- El retrato utiliza fuentes distintas para móvil y escritorio, evitando ampliar un recorte horizontal de baja resolución en el teléfono.

## SEO y alcance

Se conservan título, descripción, canonical, Open Graph, Twitter, idioma `es-EC`, sitemap y robots. Un H1. Las 25 preguntas visibles y su JSON-LD usan la misma fuente. Los servicios conservan sus identificadores. Los enlaces de las especialidades, la firma, Academia y publicaciones llevan a las páginas interiores existentes. Esas páginas mantienen su diseño original; esta revisión corresponde a la portada completa.

Se reutilizan WhatsApp, contacto, privacidad y los eventos de analítica. No se envían mensajes ni formularios en pruebas. No se añaden precios, ofertas futuras ni campañas propuestas en el PDF.

## Vista previa

```sh
npm ci
npm run build
npm run start -- --port 3101
```

Abrir `http://localhost:3101`. No se ha publicado ni fusionado con `main`.

## Validación

- ESLint y build de producción correctos; TypeScript y 22 páginas prerenderizadas.
- Recorrido de las diez escenas con Chromium en 1440×1000, 390×844 y 320×667; textos dentro del marco y sin desbordamiento horizontal.
- Índice, selección de capítulos, Escape y FAQ desplegables.
- Acceso directo por hash a la consulta, movimiento reducido y contenido sin JavaScript.
- Un H1 y correspondencia de las 25 FAQ con el JSON-LD.
- Sin errores JavaScript en el recorrido verificado.

Las pruebas se ejecutan localmente con tamaños emulados. No se afirma una puntuación Lighthouse ni pruebas en dispositivos físicos o resultados de posicionamiento.

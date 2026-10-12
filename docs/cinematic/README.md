# Portada cinematográfica — Fausto Vásquez

Rama: `codex/vasquez-cinematic`. Base: `f119c0a`.

## Dirección

Portada editorial con una escultura de ajedrez 3D dirigida por el scroll. La referencia es el **Plan Maestro, edición 02, octubre de 2026**, suministrado por el usuario: ajedrez como símbolo de estrategia, grafito `#0B0F14`, azul `#0E2340`, dorado `#C8A45D`, marfil `#F2ECE8`, y una evaluación reservada como acción principal.

Cuatro capítulos: decisión, lectura del expediente, estrategia, defensa. Continúan especialidades, perfil, publicaciones, Academia, FAQ y contacto. Se conserva el componente anterior `home-landing.tsx`; `SiteChrome` mantiene la navegación original en las páginas interiores. No se implementan las campañas, episodios, precios o servicios futuros propuestos en el PDF.

Las fotos `fausto-plan-despacho.jpg` y `fausto-plan-retrato.jpg` se extrajeron del banco fotográfico del PDF entregado. No se añade el documento confidencial al repositorio. La pieza 3D es geometría original programada en Three.js, sin modelos ni texturas remotos. El monograma es una interpretación de la propuesta visual del plan; esta rama es una propuesta de diseño local, no una publicación.

## Implementación

- Next.js conserva HTML prerenderizado, títulos, canonical, Open Graph, Twitter, idioma `es-EC`, sitemap y robots. Las FAQ visibles y su JSON-LD usan los mismos datos.
- Three.js se carga por importación dinámica. Se usan materiales físicos, entorno generado, luz y geometría procedural.
- La escena renderiza cuando cambia el scroll, el puntero o el tamaño; se detiene cuando queda fuera de vista o la pestaña se oculta. Al desmontar, libera geometría, materiales, entorno y renderer.
- Resolución máxima: 1.25 DPR en celular, 1.6 en escritorio. Menor geometría y sin antialias en celular. Scroll táctil nativo.
- Arte SVG prerenderizado como alternativa a WebGL o al ahorro de datos. Pausa manual y respeto de `prefers-reduced-motion`. Sin JavaScript, el contenido, los enlaces y las FAQ siguen disponibles.
- Se reutilizan WhatsApp, las páginas de contacto y privacidad, y los eventos de analítica existentes. No se envían formularios ni mensajes durante las pruebas.

## Vista previa

```sh
npm ci
npm run build
npm run start -- --port 3101
```

Abrir `http://localhost:3101`. No se ha desplegado ni fusionado con `main`.

## Validación

- `npm run lint`: correcto.
- `npm run build`: correcto; incluye TypeScript y prerenderizado de 22 páginas.
- Chromium contra la compilación de producción: sin errores JavaScript.
- Escena cambia con scroll; pausa verificada comparando una región de la escultura con fondo neutral constante.
- Navegación móvil y Escape; FAQ desplegables; destinos de anclas existentes.
- 12 rutas enlazadas responden HTTP 200.
- Sin desbordamiento horizontal a 320, 390, 768 y 1440 px.
- Comprobados movimiento reducido, HTML sin JavaScript y alternativa sin WebGL.
- Un H1, canonical e idioma correctos; preguntas JSON-LD coinciden con las preguntas visibles.

Estas son pruebas locales con emulación de tamaños. No se afirma una puntuación Lighthouse, resultados de posicionamiento ni pruebas en dispositivos físicos. Las credenciales de las páginas interiores, la oferta comercial y la configuración real de analítica siguen siendo las del proyecto de origen.

## Revisión: apertura como película

Se añadió un prólogo de tres actos antes de la navegación: plano macro en penumbra, revelación de la pieza y título del estudio. Cámara 3D propia, luz rasante, partículas discretas, títulos de entrada y fundidos por scroll. La entrada automática dura 5.2 segundos y termina; no bloquea el desplazamiento. Hay salto al estudio y pausa. La versión móvil usa su propio encuadre.

Verificación adicional: compilación y lint, tres actos en Chromium, avance por control, salto al contenido, pausa, movimiento reducido, 390 px sin desbordamiento, un solo H1 y sin errores de ejecución.

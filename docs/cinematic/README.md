# Portada cinematográfica — Fausto Vásquez

La portada (`/`) es un recorrido continuo de diez actos sobre un único mundo 3D
de ajedrez (Three.js, geometría procedural, sin modelos ni texturas remotas).
El documento hace scroll con normalidad; el lienzo WebGL está fijo detrás.

Archivos:

- `src/components/cinematic/epic-experience.tsx` — contenido, navegación y bucle de scroll.
- `src/components/cinematic/chess-scene.ts` — escena, coreografía y encuadre.
- `src/components/cinematic/stage-zone.ts` — cálculo del hueco libre que deja el texto.
- `src/components/cinematic/epic-experience.css` — maquetación y tipografía.
- `tests/cinematic-legibility.spec.ts` — garantías de legibilidad (Playwright).

## Principio: el texto manda, el 3D se adapta sin perder intensidad

La coreografía se escribe en el espacio del mundo y no se recorta: giros,
separación de la corona, tablero que aparece y se inclina, captura, cámara
entre las piezas y la jugada final con torre y firma.

El encuadre se resuelve después de cada fotograma:

1. Cada bloque de texto lleva `data-block`. En cada scroll se miden sus
   rectángulos y `findStage` calcula el mayor hueco libre, ya sea una columna
   (al lado del texto, escritorio) o una franja (encima o debajo, móvil y remate).
2. La escena proyecta la caja de la pieza (y del tablero cuando está presente) y
   aplica un desplazamiento óptico (`camera.setViewOffset`) y un zoom para que el
   sujeto caiga dentro de ese hueco. La perspectiva y el movimiento no cambian;
   solo cambia dónde aterriza en la pantalla.
3. Si no hay espacio suficiente, el lienzo se atenúa (`--scene-dim`) en lugar de
   tapar el texto.
4. Cada bloque de texto lleva además un halo oscuro suave, de modo que en los
   cruces entre actos sigue siendo legible aunque una pieza pase por detrás.

En móvil, cada acto 3D abre con una franja vacía (~44 % de la altura,
`.epic-stage`). El lienzo WebGL se coloca dentro de la franja más visible, así
que es el navegador quien lo desplaza con la página (sin retraso de script). Al
pasar al acto siguiente, el lienzo se desvanece, cambia de franja y reaparece
(un corte de ~0,35 s). En móvil se quitan además las sombras de texto y el
desenfoque de la cabecera, que son caros sobre un lienzo animado.

## Coreografía por acto

| Acto | Texto | 3D |
| --- | --- | --- |
| 1 El arte de anticiparse | izquierda | plano macro del rey |
| 2 El método | izquierda | la corona se separa; los pasos 01–03 se dibujan a la vez |
| 3 Penal económico | derecha | órbitas doradas |
| 4 Defensa estratégica | izquierda | formación de peones; un rival avanza y es capturado, sale despedido del tablero |
| 5 Prevención | derecha | el tablero se inclina como un mapa; la ruta en L se ilumina |
| 6 Garantías | izquierda | la cámara baja entre las piezas; el tablero oscila y se equilibra |
| 7 El jurista | derecha | retrato (el lienzo se retira) |
| 8 El conocimiento | derecha | libros sobre papel marfil (el lienzo se retira) |
| 9 La claridad | — | preguntas frecuentes sobre fondo opaco |
| Remate | arriba / abajo | descenso entre las piezas, torre, firma; el tablero ocupa el centro |
| 10 Su siguiente movimiento | izquierda | tablero final a la derecha; una línea guía une el botón con la casilla de destino |

El texto entra con su sección (`--in`) y los acentos (línea del principio, pasos
del método, lema del remate) avanzan con el compás 3D del acto (`--beat`,
`--finale-reveal`).

## Funcional además de épica

- **Consulta a un toque:** el botón del inicio, el de la cabecera («Consulta» en
  móvil) y la barra fija de móvil abren WhatsApp con el mensaje preparado; el
  teléfono está junto a cada uno. Una sola acción con un solo nombre:
  «Solicitar consulta reservada». La barra de móvil aparece tras el primer acto
  y se retira en la consulta final, que tiene su propio botón.
- **La partida a la vista (escritorio):** una columna de casillas en el borde
  derecho marca el acto actual y permite saltar a cualquiera.
- **Velo:** si la pieza llega a tocar un bloque de texto durante una
  transición, el lienzo se atenúa al instante (`--scene-veil`).
- **Servicios con nombre:** cada acto de especialidad muestra su nombre y los
  asuntos concretos (lavado de activos, cohecho, peculado, prisión
  preventiva…), tomados de `serviceCategories`.
- **Sin numeración de plantilla:** fuera los números romanos de los rótulos, los
  numerales gigantes de fondo y la numeración de las preguntas.

## Accesibilidad y rendimiento

- Todo el contenido está en el HTML prerenderizado; sin JavaScript se lee como
  secciones normales.
- Pausa de movimiento y `prefers-reduced-motion`.
- Sin WebGL o con `saveData` no se descarga Three.js; queda un fondo estático.
- Un renderer, render bajo demanda (solo mientras algo se mueve), resolución
  limitada (1.25 DPR en móvil, 1.6 en escritorio) y limpieza al salir.
- Tamaño mínimo de texto: 11 px (rótulos); lectura a 15–17 px.

## Pruebas

```sh
npm run build
npm run test:e2e
```

La suite levanta `next start` en el puerto 3101 (o reutiliza uno ya abierto) y,
en 1440×900, 1280×720 y 390×844:

- recorre toda la portada en pasos de un tercio de pantalla y, una vez asentada
  la escena, comprueba que la caja proyectada de las piezas no cubra más del 12 %
  de ningún texto ya visible (titulares, rótulos, párrafos, enlaces, botón final);
- en móvil, recorre la portada y comprueba que el lienzo está siempre dentro de
  la franja de un acto y se desplaza con ella;
- comprueba que el botón final tenga contraste ≥ 7:1 y al menos 44 px de alto;
- comprueba un único H1, que no haya desbordamiento horizontal ni errores de script.

WebGL se ejecuta por software (SwiftShader), así que la pasada completa tarda
varios minutos en escritorio.

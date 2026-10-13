import type { StageZone } from "./chess-scene";

type Box = { left: number; right: number; top: number; bottom: number };
type Gap = { start: number; size: number };

/** Largest free interval in [from, to] not covered by any of the spans. */
function largestGap(spans: [number, number][], from: number, to: number): Gap {
  const sorted = spans
    .map(([a, b]) => [Math.max(from, a), Math.min(to, b)] as [number, number])
    .filter(([a, b]) => b > a)
    .sort((p, q) => p[0] - q[0]);
  let best: Gap = { start: from, size: 0 };
  let cursor = from;
  for (const [a, b] of sorted) {
    if (a - cursor > best.size) best = { start: cursor, size: a - cursor };
    cursor = Math.max(cursor, b);
  }
  if (to - cursor > best.size) best = { start: cursor, size: to - cursor };
  return best;
}

/**
 * Finds the free stage left by the copy. A column (beside the text) and a row
 * (above/below the text) are both measured; the one where the subject can be
 * drawn largest wins, with hysteresis so it does not flicker between them.
 */
export function findStage(
  blocks: Box[],
  viewport: { width: number; height: number; top: number },
  previous: "column" | "row",
): { zone: StageZone; axis: "column" | "row"; room: number } {
  const { width, height, top } = viewport;
  const usable = height - top;
  const visible = blocks.filter(
    (b) => b.bottom > top && b.top < height && b.right > 0 && b.left < width,
  );
  const xs = (b: Box): [number, number] => [b.left, b.right];
  const ys = (b: Box): [number, number] => [b.top, b.bottom];

  const middleRow = visible.filter(
    (b) => b.bottom > top + usable * 0.2 && b.top < height - usable * 0.2,
  );
  const column = largestGap(middleRow.map(xs), 0, width);
  const inColumn = visible.filter(
    (b) => b.right > column.start && b.left < column.start + column.size,
  );
  const columnRows = largestGap(inColumn.map(ys), top, height);

  const middleColumn = visible.filter(
    (b) => b.right > width * 0.2 && b.left < width * 0.8,
  );
  const row = largestGap(middleColumn.map(ys), top, height);
  const inRow = visible.filter(
    (b) => b.bottom > row.start && b.top < row.start + row.size,
  );
  const rowColumns = largestGap(inRow.map(xs), 0, width);

  // Size a piece about 0.8 times as wide as tall could reach in each candidate.
  const reach = (w: number, h: number) => Math.min(h, w / 0.8);
  const columnReach = reach(column.size, columnRows.size);
  const rowReach = reach(rowColumns.size, row.size);
  const bias = 1.2;
  const axis =
    previous === "column"
      ? rowReach > columnReach * bias ? "row" : "column"
      : columnReach > rowReach * bias ? "column" : "row";
  const box =
    axis === "column"
      ? { x: column.start, w: column.size, y: columnRows.start, h: columnRows.size }
      : { x: rowColumns.start, w: rowColumns.size, y: row.start, h: row.size };
  const margin = Math.min(width, height) * 0.035;
  const w = Math.max(1, box.w - margin * 2);
  const h = Math.max(1, box.h - margin * 2);
  return {
    axis,
    room: Math.max(columnReach, rowReach) / usable,
    zone: {
      x: (box.x + margin) / width,
      y: (box.y + margin) / height,
      w: w / width,
      h: h / height,
    },
  };
}

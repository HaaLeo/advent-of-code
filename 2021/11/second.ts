
import { Grid } from './index.ts'

export const second = (grid: Grid): number => {
   let score = 101;
   const simultaneousFlashCount = grid.width * grid.height;
   while (doStep(grid) < simultaneousFlashCount) {
       score++;
   }

   return score;
}

const doStep = (grid: Grid): number => {
   const { map } = grid;
   let flashCount = 0;
   forEachCell(grid, (x, y) => map[y][x]++);
   forEachCell(grid, (x, y) => flashCount += flash(grid, x, y));
   forEachCell(grid, (x, y) => map[y][x] = Math.max(0, map[y][x]));

   return flashCount;
}

const forEachCell = ({ width, height }: Grid, action: (x: number, y: number) => void): void => {
   for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
         action(x, y);
      }
   }
}

const flash = (grid: Grid, x: number, y: number): number => {
   const { map } = grid;
   if (map[y][x] <= 9) { return 0; }

   let flashCount = 1;
   map[y][x] = Number.MIN_SAFE_INTEGER;
   forEachNeighbor(grid, x, y, (nx, ny) => {
      map[ny][nx]++;
      if (map[ny][nx] > 9) {
         flashCount += flash(grid, nx, ny);
      }
   });

   return flashCount;
}


const forEachNeighbor = ({ width, height }: Grid, startX: number, startY: number, action: (x: number, y: number) => void): void => {
   const maxX = Math.min(width - 1, startX + 1);
   const maxY = Math.min(height - 1, startY + 1);
   for (let y = Math.max(0, startY - 1); y <= maxY; y++) {
      for (let x = Math.max(0, startX - 1); x <= maxX; x++) {
         if (x === startX && y === startY) { continue; }
         action(x, y);
      }
   }
}

export const first = (map: number[][]): number => {
   let risk = 0;

   for (let [strRowIndex, row] of Object.entries(map)) {
      let rowIndex = parseInt(strRowIndex, 10)
      for (const [i, loc] of Object.entries(row)) {
         const locIndex = parseInt(i, 10);

         if (isLowPoint(row, locIndex, map[rowIndex - 1], map[rowIndex + 1])) {
            risk += loc + 1
         }
      }
   }
   return risk;
}

const isLowPoint = (row: number[], locIndex: number, prevRow?: number[], nextRow?: number[]): boolean => {

   const loc = row[locIndex]

   const above = prevRow ? prevRow[locIndex] : undefined;
   const below = nextRow ? nextRow[locIndex] : undefined;

   const before = row[locIndex - 1];
   const after = row[locIndex + 1];

   if (above !== undefined && above <= loc) {
      return false;
   }
   if (below !== undefined && below <= loc) {
      return false;
   }
   if (before !== undefined && before <= loc) {
      return false;
   }
   if (after !== undefined && after <= loc) {
      return false;
   }

   return true;
}
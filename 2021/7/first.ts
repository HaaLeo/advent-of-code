
export const first = (positions: number[]): number => {
   let bestPosition = -1;
   let leastFuel = -1;

   for (const pos of positions) {
      const posToTest = pos;
      let currentFuel = 0;

      for (const pos of positions) {
         currentFuel += Math.abs(posToTest - pos)
         if (leastFuel !== -1 && bestPosition !== -1) {
            if (currentFuel > leastFuel) {
               break;
            }
         }
      }

      if (currentFuel < leastFuel || leastFuel === -1) {
         leastFuel = currentFuel;
         bestPosition = posToTest
      }
   }

   return leastFuel
}

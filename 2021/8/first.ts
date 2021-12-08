
import { Display } from './index.ts';
export const first = (displays: Display[]): number => {

   const outputs = displays.map(display => display.output);

   let acc = 0
   for (const output of outputs) {
      for (const entry of output) {
         if ([2, 3, 4, 7].includes(entry.length)) {
            acc++
         }
      }
   }
   return acc
}

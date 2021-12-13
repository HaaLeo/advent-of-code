import { Input, Coordinate } from './index.ts'

export const first = (input: Input): number => {
   const { dots, folds } = input;
   let result = 0;
   const [foldAxis, foldPos] = Object.entries(folds[0])[0]
   const newDots = fold(dots, foldAxis, foldPos)

   result = newDots.length;

   return result;
}


function fold(dots: Coordinate[], foldAxis: string, foldPos: number): Coordinate[] {
   const newDots: Coordinate[] = []
   if (foldAxis === 'x') {
      for (const dot of dots) {
         if (dot.x > foldPos) {
            const newX = foldPos - (dot.x - foldPos)

            if (!dots.find(coord => coord.x === newX && coord.y === dot.y)) {
               newDots.push({ x: newX, y: dot.y })
            }
         } else {
            newDots.push(dot)
         }
      }
   } else if (foldAxis = 'y') {

   } else {
      throw new Error(`unknown fold axis="${foldAxis}".`)
   }

   return newDots
}

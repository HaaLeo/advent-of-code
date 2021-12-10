
export const first = (lines: string[]): number => {
   let score = 0;
   for (const line of lines) {
      const openingStack = []
      for (const chunk of line) {
         if (['{', '[', '<', '('].includes(chunk)) {
            openingStack.push(chunk);
         } else {
            const expectedClosingChunk = getMatchingClosingChunk(openingStack[openingStack.length - 1]);

            if (expectedClosingChunk === chunk) {
               openingStack.pop();
            } else {
               score += getScore(chunk);
               break;
            }
         }
      }
   }

   return score;
}

const getScore = (chunk: string): number => {
   if (chunk === ')') {
      return 3;
   } else if (chunk === ']') {
      return 57;
   } else if (chunk === '}') {
      return 1197;
   } else if (chunk === '>') {
      return 25137;
   } else {
      throw new Error(`got unknown chunkg ${chunk}`);
   }
}

const getMatchingClosingChunk = (chunk: string): string => {

   if (chunk === '{') {
      return '}';
   } else if (chunk === '(') {
      return ')';
   } else if (chunk === '<') {
      return '>';
   } else if (chunk === '[') {
      return ']';
   } else {
      throw new Error(`got unknown chunkg ${chunk}`);
   }
}
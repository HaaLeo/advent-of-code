
export const first = (paths: Map<string, string[]>): number => {
   let score = getPossiblePaths('start', [], paths).length;

   return score;
}

function getPossiblePaths(node: string, visited: string[], paths: Map<string, string[]>): string[][] {
   const nextVisited = [...visited, node];

   if (node === 'end') {
      return [nextVisited];
   }

   const possibles = paths.get(node);

   const result: string[][] = [];

   possibles?.forEach(cave => {

      if (cave.toLowerCase() == cave) {
         if (visited.includes(cave)) {
            return
         }

      }

      result.push(...getPossiblePaths(cave, nextVisited, paths))
   });

   return result;
}

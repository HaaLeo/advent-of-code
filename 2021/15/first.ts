import { Input } from './index.ts'

interface Node { index: [number, number], cost: number }
export const first = (input: Input): number => {
   const { rows, width, height } = input;
   let result = 0;

   const startNode: Node = {
      index: [0, 0],
      cost: 0
   };
   const visited: string[] = []
   let nodes: Node[] = [startNode]

   while (nodes.length > 0) {
      const currentNode = nodes.shift() as Node;

      const [x, y] = currentNode.index;
      if (x === width - 1 && y === height - 1) {
         result = currentNode.cost;
         break;
      }

      // Get candidates
      const candidateIndices = [ [x + 1, y], [x, y + 1]];

      const candidateNodes: Node[] = []

      for (const [x, y] of candidateIndices) {
         if (x >= 0 && x < width && y >= 0 && y < height && !visited.includes(`${x}${y}`)) {
            candidateNodes.push({ cost: currentNode.cost + rows[y][x], index: [x, y] })
         }
      }

      visited.push(`${x}${y}`)
      for (const nextNode of candidateNodes) {
         const existingIndex = nodes.findIndex(node => node.index[0] === nextNode.index[0] && node.index[1] === nextNode.index[1])
         if (existingIndex === -1) {
            nodes.push(nextNode)
         } else if (nodes[existingIndex].cost > nextNode.cost) {
            nodes.splice(existingIndex, 1, nextNode)
         }
      }

      nodes = nodes.sort((a, b) => a.cost - b.cost)
   }


   return result;
}

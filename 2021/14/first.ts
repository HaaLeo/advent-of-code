import { Input } from './index.ts'

export const first = (input: Input): number => {
   const { polymerTemplate, rules } = input;
   const template = polymerTemplate.split('');
   let result = 0;

   for (let i = 0; i < 3; i++) {
      for (let p = 0; p < template.length - 1; p++) {
         const curr = template[p] + template[p + 1];
         if (curr in rules) {
            if (rules[curr]==='S'){
               console.log(`[${i}] Add ${rules[curr]} for key ${curr}`)
            }
            template.splice(p + 1, 0, rules[curr])
            p++
         }
      }
   }

   const countMap: { [key: string]: number } = {}
   for (const itm of template) {
      if (!(itm in countMap)) {
         countMap[itm] = 0;
      }
      countMap[itm]++
   }
   console.debug(JSON.stringify(countMap))
   const sorted = Object.entries(countMap).sort((a, b) => a[1] - b[1])
   const first = sorted[sorted.length - 1][1]
   const second = sorted[0][1]

   result = first-second
   return result;
}

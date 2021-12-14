import { Input } from './index.ts'

export const second = (input: Input): number => {
    const { polymerTemplate, rules } = input;
    const template = polymerTemplate.split('');
    let result = 0;

    let pairMap: { [key: string]: number } = {}

    for (let p = 0; p < template.length - 1; p++) {
        const curr = template[p] + template[p + 1];
        if (!(curr in pairMap)) {
            pairMap[curr] = 0
        }
        pairMap[curr] += 1
    }

    for (let i = 0; i < 40; i++) {
        const pairs = [...Object.keys(pairMap)];
        const newPairCounts: { [key: string]: number } = {};
        for (const pair of pairs) {
            if (!rules[pair]) {
                newPairCounts[pair] = pairMap[pair];
            } else {
                const [first, second] = pair.split('');
                const newFirstKey = first + rules[pair];
                const newSecondKey = rules[pair] + second;
                newPairCounts[newFirstKey] = (newPairCounts[newFirstKey] ?? 0) + pairMap[pair];
                newPairCounts[newSecondKey] = (newPairCounts[newSecondKey] ?? 0) + pairMap[pair];
            }
        }
        pairMap = newPairCounts;
    }
    const counts: { [key: string]: number } = {};
    counts[template[0]] = 1;
    Object.keys(pairMap).forEach((pair) => {
        const [_, second] = pair.split("");
        if (counts[second]) {
            counts[second] += pairMap[pair];
        } else {
            counts[second] = pairMap[pair];
        }
    });

    const sorted = Object.values(counts).sort((a, b) => a - b);

    result = sorted[sorted.length - 1] - sorted[0]
    return result;
}

import { Input } from './index.ts'

export const second = (input: Input): number => {
    const { polymerTemplate, rules } = input;
    const template = polymerTemplate.split('');
    let result = 0;

    const countMap: { [key: string]: number } = {}
    for (const itm of template) {
        if (!(itm in countMap)) {
            countMap[itm] = 0;
        }
        countMap[itm]++
    }
    const pairMap: { [key: string]: number } = {}

    for (let p = 0; p < template.length - 1; p++) {
        const curr = template[p] + template[p + 1];
        if (!(curr in pairMap)) {
            pairMap[curr] = 0
        }
        pairMap[curr] += 1
    }

    for (let i = 0; i < 3; i++) {
        const pairEntries = [...Object.entries(pairMap)]
        for (const entry of pairEntries) {
            const [key, value] = entry;
            if (key in rules) {
                const [first, second] = key.split('')
                const newFirstKey = first + rules[key]
                const newSecondKey = rules[key] + second



                if (!(newFirstKey in pairMap)) {
                    pairMap[newFirstKey] = 0
                }
                if (!(newSecondKey in pairMap)) {
                    pairMap[newSecondKey] = 0
                }

                if (!(rules[key] in countMap)) {
                    countMap[rules[key]] = 1
                    pairMap[key] -= 1
                } else {
                    countMap[rules[key]] += value
                    pairMap[key] -= value
                }
                if (rules[key]==='S'){
                    console.log(`[${i}] Add ${rules[key]} for key ${key}`)
                    console.log(`Pair map count ${pairMap[key]}`)
                 }
                if (pairMap[key]<0){
                    console.debug('obacht')
                }
                pairMap[newFirstKey] += 1
                pairMap[newSecondKey] += 1
                // Remove old pair
            }
        }
    }

    console.debug(JSON.stringify(countMap))

    const sorted = Object.entries(countMap).sort((a, b) => a[1] - b[1])
    const first = sorted[sorted.length - 1][1]
    const second = sorted[0][1]

    result = first - second
    return result;
}

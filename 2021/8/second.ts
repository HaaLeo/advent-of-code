import { Display } from './index.ts'

export const second = (displays: Display[]): number => {
    let acc = 0;

    for (const display of displays) {
        const digitMap: { [key: string]: string } = {}
        const { input, output } = display;

        digitMap['1'] = input.find(itm => itm.length === 2) as string
        digitMap['7'] = input.find(itm => itm.length === 3) as string
        digitMap['4'] = input.find(itm => itm.length === 4) as string
        digitMap['8'] = input.find(itm => itm.length === 7) as string

        digitMap['3'] = input.find(itm =>
            itm.length === 5 && intersection(itm, digitMap['7']).length === 3) as string
        digitMap['9'] = input.find(item => intersection(item, digitMap['4']).length === 4 && item.length === 6) as string

        // 0, 2, 5, 6
        let rest = input.filter(itm => !Object.values(digitMap).includes(itm))

        digitMap['0'] = rest.find(itm => intersection(itm, digitMap['1']).length === 2 && intersection(itm, digitMap['3']).length === 4) as string

        // 2,5,6
        rest = input.filter(itm => !Object.values(digitMap).includes(itm))

        digitMap['6'] = rest.find(itm => itm.length === 6) as string;

        digitMap['5'] = rest.find(itm => itm.length === 5 && intersection(itm, digitMap['4']).length === 3) as string
        digitMap['2'] = rest.find(itm => itm.length === 5 && intersection(itm, digitMap['4']).length === 2) as string

        let strNum = ''
        for (const outDigit of output) {
            const mappedTuple = Object.entries(digitMap).find(tuple => intersection(tuple[1], outDigit).length === outDigit.length && intersection(tuple[1], outDigit).length === tuple[1].length) as [string, string]
            strNum += mappedTuple[0];
        }
        acc += parseInt(strNum, 10)
    }

    return acc;
}

const intersection = (first: string, second: string): string => {
    return first.split('').filter(seg1 => second.includes(seg1)).join('');
}

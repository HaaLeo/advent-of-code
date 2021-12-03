import { readLines } from "https://deno.land/std@0.116.0/io/mod.ts";

export async function readInput(filePath: string): Promise<string> {
    const decoder = new TextDecoder('utf-8');
    const file = await Deno.readFile(filePath);
    const content = decoder.decode(file);
    return content;
}

export async function readInputByLine(filePath: string): Promise<AsyncIterableIterator<string>> {
    const reader = await Deno.open(filePath);
    return readLines(reader);
}

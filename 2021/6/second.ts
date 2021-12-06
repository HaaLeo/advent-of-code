
export const second = (fishes: number[]): number => {
    let statesCount = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (const fish of fishes) {
        statesCount[fish] += 1
    }
    for (let day = 0; day < 256; day++) {

        let respawning = statesCount.shift();

        if (respawning === undefined) {
            respawning = 0
        }

        // Reset counter to state 6
        statesCount[6] += respawning

        // Spawn new fish
        statesCount = [...statesCount, respawning]
    }
    return statesCount.reduce((acc, curr) => acc + curr, 0);
}

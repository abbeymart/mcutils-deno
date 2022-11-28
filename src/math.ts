export function fibos(num: number): Array<number> {
    const fiboArray: Array<number> = [1, 1];
    let i = 0
    while (i < num) {
        const prev = fiboArray[fiboArray.length - 1];
        const prev2 = fiboArray[fiboArray.length -2];
        fiboArray.push(prev+prev2)
        i++
    }
    return fiboArray
}

// naturalNumbers generator-function yields/generates natural numbers
export function* naturalNumbers(count: number) {
    for (let cnt = 0; cnt < count; cnt++) {
        yield cnt;
    }
}
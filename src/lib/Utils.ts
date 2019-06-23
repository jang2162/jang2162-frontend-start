export const range = (startOrEnd: number, end?: number, step?: number) => {
    let start = 0;
    if (end === undefined) {
        [start, end, step] = [0, startOrEnd, startOrEnd > 0 ? 1 : -1];
    } else {
        start = startOrEnd;
    }

    if (step === undefined) {
        step = start < end ? 1 : -1;
    }
    return [...Array(Math.abs(Math.ceil(end - start / step))).keys()].map(i => start + i * (step as number));
};

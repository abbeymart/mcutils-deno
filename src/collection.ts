export type MapFunc<T> = (val: T) => T;
export type FilterFunc<T> = (val: T) => boolean;

// mapGen generator-function yields series of transformed values, by the map-callback-function, from the val/array values.
export function* mapGen<T>(val: Array<T>, mapFunc: MapFunc<T>) {
    for (const it of val) {
        yield mapFunc(it);
    }
}

// filterGen generator-function yields series of values, that conforms to the filter-callback-function, from the val/array values.
export function* filterGen<T>(val: Array<T>, filterFunc: FilterFunc<T>) {
    for (const it of val) {
        if (filterFunc(it)) {
            yield it;
        }
    }
}


// takeGen generator-function yields series of values up to num from the val/array values.
export function* takeGen<T>(val: Array<T>, num: number) {
    let count = 0;
    while (count < num) {
        yield val[count];
        count += 1;
    }
}

// take function returns an array of up to num from the val/array values.
export function take<T>(val: Array<T>, num: number): Array<T> {
    const takeValues: Array<T> = [];
    let count = 0;
    while (count < num) {
        takeValues.push(val[count]);
        count += 1;
    }
    return takeValues;
}

// takeGenVer2 generator-function yields series of values up to num from the val/array values.
export function* takeGenVer2<T>(val: Array<T>, num: number) {
    let count = 0;
    for (const it of val) {
        count += 1;
        if (count <= num) {
            yield it;
        }
    }
}

// takeVer2 function returns an array of up to num from the val/array values.
export function takeVer2<T>(val: Array<T>, num: number): Array<T> {
    const takeValues: Array<T> = [];
    let count = 0;
    for (const it of val) {
        count += 1;
        if (count <= num) {
            takeValues.push(it);
        }
    }
    return takeValues;
}

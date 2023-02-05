import { MatrixResult, } from "./types.ts";

/**
 * / addMatrices function adds two matrices of the same dimensions.
 */
export const addMatrices = (matrix1: Array<Array<number>>, matrix2: Array<Array<number>>, precision: number): MatrixResult => {
    if (precision < 0) {
        precision = 0 /// default
    }
    // initialize the matrix result
    let result: Array<Array<number>> = []
    // validate matrix1 and matrix2 length
    if (matrix1.length != matrix2.length) {
        return {
            code   : "paramsError",
            message: `length of both matrices should be equal [matrix1: ${matrix1.length} | matrix2: ${matrix2.length}]`,
            result : [],
        }
    }
    const matrixLength = matrix1.length
    const subItemLength = (matrix1[0]).length
    let matrixIndex = 0
    while (matrixIndex < matrixLength) {
        const mat1 = matrix1[matrixIndex]
        const mat2 = matrix2[matrixIndex]
        // validate matrix1 and matrix2 sub-items length
        if (mat1.length != subItemLength || mat2.length != subItemLength) {
            result = []
            return {
                code   : "paramsError",
                message: `length of both sub-matrices should be equal [matrix1[${matrix1[matrixIndex]}]: ${matrix1.length} | matrix2[${matrix2[matrixIndex]}]: ${matrix2.length}]`,
                result : [],
            }
        }
        // compute matrix additions
        const matAddResult: Array<number> = []
        let subItemIndex = 0
        while (subItemIndex < subItemLength) {
            // perform addition
            matAddResult.push(Number((mat1[subItemIndex] + mat2[subItemIndex]).toFixed(precision)))
            // increment subItemIndex
            subItemIndex += 1
        }
        // update result
        result.push(matAddResult)
        // increment matrixIndex
        matrixIndex += 1
    }
    return {
        code   : "success",
        message: "success",
        result : result,
    }
}

/**
 * addMultipleMatrices function [tensor] adds multiple matrices of the same dimensions.
 */
export const addMultipleMatrices = (matrices: Array<Array<Array<number>>>, precision: number): MatrixResult => {
    if (precision < 0) {
        precision = 0 /// default
    }
    // initialize the matrix result
    let result: Array<Array<number>> = []
    const matricesLength = matrices.length
    if (matricesLength <= 1) {
        return {
            code   : "paramsError",
            message: "length of matrices should be greater than 1",
            result : [],
        }
    }
    // perform addition of the first two matrices
    const addMatRes = addMatrices(matrices[0], matrices[1], precision)
    if (addMatRes.code !== "success") {
        addMatRes.result = []
        return addMatRes
    }
    try {
        // perform the remaining addition of the 3rd to the last matrix
        let matIndex = 2
        while (matIndex < matricesLength) {
            // next matrix addition
            const addMatRes = addMatrices(result, matrices[matIndex], precision)
            if (addMatRes.code !== "success") {
                addMatRes.result = []
                return addMatRes
            }
            result = addMatRes.result as Array<Array<number>>
            matIndex += 1
        }
    } catch (e) {
        return {
            code   : "computationError",
            message: e.message,
            result : result,
        }
    }

    return {
        code   : "success",
        message: "success",
        result : result,
    }
}

/**
 * subtractMatrices function subtract two matrices of the same dimensions.
 */
export const subtractMatrices = (matrix1: Array<Array<number>>, matrix2: Array<Array<number>>, precision: number): MatrixResult => {
    if (precision < 0) {
        precision = 0 /// default
    }
    // initialize the matrix result
    let result: Array<Array<number>> = []
    // validate matrix1 and matrix2 length
    if (matrix1.length != matrix2.length) {
        return {
            code   : "paramsError",
            message: `length of both matrices should be equal [matrix1: ${matrix1.length} | matrix2: ${matrix2.length}]`,
            result : [],
        }
    }
    const matrixLength = matrix1.length
    const subItemLength = (matrix1[0]).length
    let matrixIndex = 0
    while (matrixIndex < matrixLength) {
        // validate matrix1 and matrix2 sub-items length
        const mat1 = matrix1[matrixIndex]
        const mat2 = matrix2[matrixIndex]
        // validate matrix1 and matrix2 sub-items length
        if (mat1.length != subItemLength || mat2.length != subItemLength) {
            result = []
            return {
                code   : "paramsError",
                message: `length of both sub-matrices should be equal [matrix1[${matrix1[matrixIndex]}]: ${matrix1.length} | matrix2[${matrix2[matrixIndex]}]: ${matrix2.length}]`,
                result : [],
            }
        }
        // compute matrix subtractions
        const matAddResult: Array<number> = []
        let subItemIndex = 0
        while (subItemIndex < subItemLength) {
            // perform subtraction
            matAddResult.push(Number((mat1[subItemIndex] - mat2[subItemIndex]).toFixed(precision)))
            // increment subItemIndex
            subItemIndex += 1
        }
        // update result
        result.push(matAddResult)
        // increment matrixIndex
        matrixIndex += 1
    }
    return {
        code   : "success",
        message: "success",
        result : result,
    }
}

/**
 * subtractMultipleMatrices function [tensor] subtract multiple matrices of the same dimensions.
 */
export const subtractMultipleMatrices = (matrices: Array<Array<Array<number>>>, precision: number): MatrixResult => {
    if (precision < 0) {
        precision = 0 /// default
    }
    // initialize the matrix result
    let result: Array<Array<number>> = []
    const matricesLength = matrices.length
    if (matricesLength <= 1) {
        return {
            code   : "paramsError",
            message: `length of matrices should be greater than 1`,
            result : [],
        }
    }
    // perform subtraction of the first two matrices
    const matSubRes = subtractMatrices(matrices[0], matrices[1], precision)
    if (matSubRes.code != "success") {
        return matSubRes
    }
    try {
        // update result
        result = matSubRes.result as Array<Array<number>>
        // perform the remaining subtraction of the 3rd to the last matrix
        let matIndex = 2
        while (matIndex < matricesLength) {
            const matSubRes = subtractMatrices(result, matrices[matIndex], precision)
            if (matSubRes.code != "success") {
                result = []
                return matSubRes
            }
            // update result
            result = matSubRes.result as Array<Array<number>>
            matIndex += 1
        }
    } catch (e) {
        return {
            code   : "computationError",
            message: e.message,
            result : result,
        }
    }
    return {
        code   : "success",
        message: "success",
        result : result,
    }
}

/**
 * addScalarMatrix function adds a scalar Value to the matrix/matrices.
 */
export const addScalarMatrix = (matrix: Array<Array<number>>, scalar: number, precision: number): MatrixResult => {
    if (precision < 0) {
        precision = 0 /// default
    }
    // initialize the matrix result
    const result: Array<Array<number>> = []
    // validate matrices length
    if (matrix.length < 1 || (matrix[0]).length < 1) {
        return {
            code   : "paramsError",
            message: "length of the matrix/sub-matrix should greater than 0",
            result : [],
        }
    }
    const matrixLength = matrix.length
    let matrixIndex = 0
    while (matrixIndex < matrixLength) {
        const mat = matrix[matrixIndex]
        // compute matrix additions
        const subItemLength = mat.length
        if (subItemLength < 1) {
            return {
                code   : "paramsError",
                message: `length of the sub-matrix [${matrixIndex}: ${mat}] should greater than 0`,
                result : [],
            }
        }
        const matAddResult: Array<number> = []
        let subItemIndex = 0
        while (subItemIndex < subItemLength) {
            // perform addition
            matAddResult.push(Number((mat[subItemIndex] + scalar).toFixed(precision)))
            // increment subItemIndex
            subItemIndex += 1
        }
        // update result
        result.push(matAddResult)
        // increment matrixIndex
        matrixIndex += 1
    }
    return {
        code   : "success",
        message: "success",
        result : result,
    }
}

/**
 * subtractScalarMatrix function subtracts a scalar Value from the matrix/matrices.
 */
export const subtractScalarMatrix = (matrix: Array<Array<number>>, scalar: number, precision: number): MatrixResult => {
    if (precision < 0) {
        precision = 0 /// default
    }
    // initialize the matrix result
    const result: Array<Array<number>> = []
    // validate matrices length
    if (matrix.length < 1 || (matrix[0]).length < 1) {
        return {
            code   : "paramsError",
            message: "length of the matrix/sub-matrix should greater than 0",
            result : [],
        }
    }
    const matrixLength = matrix.length
    let matrixIndex = 0
    while (matrixIndex < matrixLength) {
        const mat = matrix[matrixIndex]
        // compute matrix additions
        const subItemLength = mat.length
        if (subItemLength < 1) {
            return {
                code   : "paramsError",
                message: `length of the sub-matrix [${matrixIndex}: ${mat}] should greater than 0`,
                result : [],
            }
        }
        const matAddResult: Array<number> = []
        let subItemIndex = 0
        while (subItemIndex < subItemLength) {
            // perform addition
            matAddResult.push(Number((mat[subItemIndex] - scalar).toFixed(precision)))
            // increment subItemIndex
            subItemIndex += 1
        }
        // update result
        result.push(matAddResult)
        // increment matrixIndex
        matrixIndex += 1
    }
    return {
        code   : "success",
        message: "success",
        result : result,
    }
}

/**
 * multiplyScalarMatrix function multiply a scalar Value with the matrix/matrices.
 */
export const multiplyScalarMatrix = (matrix: Array<Array<number>>, scalar: number, precision: number): MatrixResult => {
    if (precision < 0) {
        precision = 0 /// default
    }
    // initialize the matrix result
    const result: Array<Array<number>> = []
    // validate matrices length
    if (matrix.length < 1 || (matrix[0]).length < 1) {
        return {
            code   : "paramsError",
            message: "length of the matrix/sub-matrix should greater than 0",
            result : [],
        }
    }
    const matrixLength = matrix.length
    let matrixIndex = 0
    while (matrixIndex < matrixLength) {
        const mat = matrix[matrixIndex]
        // compute matrix additions
        const subItemLength = mat.length
        if (subItemLength < 1) {
            return {
                code   : "paramsError",
                message: `length of the sub-matrix [${matrixIndex}: ${mat}] should greater than 0`,
                result : [],
            }
        }
        const matAddResult: Array<number> = []
        let subItemIndex = 0
        while (subItemIndex < subItemLength) {
            // perform addition
            matAddResult.push(Number((mat[subItemIndex] * scalar).toFixed(precision)))
            // increment subItemIndex
            subItemIndex += 1
        }
        // update result
        result.push(matAddResult)
        // increment matrixIndex
        matrixIndex += 1
    }
    return {
        code   : "success",
        message: "success",
        result : result,
    }
}

/**
 * divideScalarMatrix function the matrix/matrices by the scalar Value.
 */
export const divideScalarMatrix = (matrix: Array<Array<number>>, scalar: number, precision: number): MatrixResult => {
    if (precision < 0) {
        precision = 0 /// default
    }
    // initialize the matrix result
    const result: Array<Array<number>> = []
    // validate matrices length
    if (matrix.length < 1 || (matrix[0]).length < 1) {
        return {
            code   : "paramsError",
            message: "length of the matrix/sub-matrix should greater than 0",
            result : [],
        }
    }
    const matrixLength = matrix.length
    let matrixIndex = 0
    while (matrixIndex < matrixLength) {
        const mat = matrix[matrixIndex]
        // compute matrix additions
        const subItemLength = mat.length
        if (subItemLength < 1) {
            return {
                code   : "paramsError",
                message: `length of the sub-matrix [${matrixIndex}: ${mat}] should greater than 0`,
                result : [],
            }
        }
        const matAddResult: Array<number> = []
        let subItemIndex = 0
        while (subItemIndex < subItemLength) {
            // perform addition
            matAddResult.push(Number((mat[subItemIndex] / scalar).toFixed(precision)))
            // increment subItemIndex
            subItemIndex += 1
        }
        // update result
        result.push(matAddResult)
        // increment matrixIndex
        matrixIndex += 1
    }
    return {
        code   : "success",
        message: "success",
        result : result,
    }
}

/**
 * transposeMatrix function transpose the matrix - swap rows and columns, i.e. rotate the matrix around it's diagonal.
 */
export const transposeMatrix = (matrix: Array<Array<number>>): MatrixResult => {
    // initialize the matrix result
    const result: Array<Array<number>> = []
    // validate matrix length
    if (matrix.length < 1) {
        return {
            code   : "paramsError",
            message: "length of the matrix should greater than 0",
            result : []
        }
    }
    for (const matSlice of matrix) {
        if ((matrix[0]).length != matSlice.length) {
            return {
                code   : "paramsError",
                message: `Length of matrix2 sub-items must be equal [Expected: ${(matrix[0]).length}, Got: ${matSlice.length}]`,
                result : []
            }
        }
    }
    // transpose matrix, swap columns to rows, diagonally
    const matColumnItemsCount = (matrix[0]).length
    let matColumnItemIndex = 0
    while (matColumnItemIndex < matColumnItemsCount) {
        const transposeSliceRow: Array<number> = []
        // compose row-items
        for (const matColumnSlice of matrix) {
            transposeSliceRow.push(matColumnSlice[matColumnItemIndex])
        }
        result.push(transposeSliceRow)
        matColumnItemIndex += 1
    }
    return {
        code   : "success",
        message: "success",
        result : result,
    }
}

/**
 * multiplyMatrix function multiply two matrices.
 * The matrix1 single slice length must be the same as the number of columns in matrix2/sub-matrices.
 */
export const multiplyMatrix = (matrix1: Array<number>, matrix2: Array<Array<number>>, precision: number): MatrixResult => {
    if (precision < 0) {
        precision = 0 /// default
    }
    // initialize the matrix result
    const result: Array<number> = []
    // validate matrix2 values' lengths must match the length of matrix1[0]
    if (matrix1.length != matrix2.length) {
        return {
            code   : "paramsError",
            message: `Length of matrix1 [Expected: ${matrix1.length}] must match the number of columns of matrix2 [Got: ${matrix2.length}]`,
            result : [],
        }
    }
    for (const mat2Slice of matrix2) {
        if ((matrix2[0]).length != mat2Slice.length) {
            return {
                code   : "paramsError",
                message: `Length of matrix2 sub-items must be equal [Expected: ${(matrix2[0]).length}, Got: ${mat2Slice.length}]`,
                result : [],
            }
        }
    }
    // compute the matrices multiplication
    const mat1Slice = matrix1
    const mat1Columns = mat1Slice.length // ==> matrix2 sub-items length/columns
    let mat1ColCount = 0
    const matMultiSlices: Array<Array<number>> = [] // Required to compute the summation of the row-column multiplications
    while (mat1ColCount < mat1Columns) {
        // compose multiplication Slice, by matching matrix1-row/matrix2-columns
        const mat1ColVal = mat1Slice[mat1ColCount]
        const mat2ColSlice = matrix2[mat1ColCount]
        const matMultiSlice: Array<number> = []
        for (const mat2ColVal of mat2ColSlice) {
            matMultiSlice.push(Number((mat2ColVal * mat1ColVal).toFixed(precision)))
        }
        // update mat-multiplication-slice
        matMultiSlices.push(matMultiSlice)
        // next column
        mat1ColCount += 1
    }
    // compute the sum of multiplication-slices by matching columns/rows
    const matMultiRows = (matMultiSlices[0]).length
    let matMultiRow = 0
    while (matMultiRow < matMultiRows) {
        let matMultiSum = 0
        for (const val of matMultiSlices) {
            matMultiSum = Number((matMultiSum + val[matMultiRow]).toFixed(precision))
        }
        result.push(matMultiSum)
        // next row
        matMultiRow += 1
    }
    return {
        code   : "success",
        message: "success",
        result : result,
    }
}

/**
 * multiplyMatrices function multiply two matrices.
 * The number of rows in matrix1 sub-matrices must be the same as the number of columns in matrix2.
 */
export const multiplyMatrices = (matrix1: Array<Array<number>>, matrix2: Array<Array<number>>, precision: number): MatrixResult => {
    if (precision < 0) {
        precision = 0 /// default
    }
    // initialize the matrix result
    let result: Array<Array<number>> = []
    // validate matrix1 sub-items and matrix2 length, rows/columns matching
    for (const matrix1Val of matrix1) {
        if ((matrix1[0]).length != matrix1Val.length) {
            return {
                code   : "paramsError",
                message: `Length of matrix1 sub-items must be the same [Expected: ${(matrix1[0]).length}, Got: ${matrix1Val.length}]`,
                result : [],
            }
        }
        if (matrix1Val.length != matrix2.length) {
            return {
                code   : "paramsError",
                message: `Length of matrix1 sub-items must match the matrix2 columns/length [Expected: ${matrix1Val.length}, Got: ${matrix2.length}]`,
                result : [],
            }
        }
    }
    // validate matrix2 sub-items lengths/rows
    for (const mat2Slice of matrix2) {
        if ((matrix2[0]).length != mat2Slice.length) {
            return {
                code   : "paramsError",
                message: `Length of matrix2 sub-items must be equal [Expected: ${(matrix2[0]).length}, Got: ${mat2Slice.length}]`,
                result : [],
            }
        }
    }
    // compute the matrices multiplication
    try {
        const matrix1SlicesLength = matrix1.length
        let matrix1SliceIndex = 0
        while (matrix1SliceIndex < matrix1SlicesLength) {
            // compute the matrix multiplication for each of the matrix1 slices and matrix2 slices
            const matMulRes = multiplyMatrix(matrix1[matrix1SliceIndex], matrix2, precision)
            if (matMulRes.code != "success") {
                result = []
                matMulRes.result = []
                return matMulRes
            }
            result.push(matMulRes.result as Array<number>)
            matrix1SliceIndex += 1
        }
    } catch (e) {
        return {
            code   : "computationError",
            message: e.message,
            result : result,
        }
    }
    return {
        code   : "success",
        message: "success",
        result : result,
    }
}

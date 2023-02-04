import { MatrixResult } from "./types.ts";

/**
 * / addMatrices function adds two matrices of the same dimensions.
 */
export const addMatrices = (matrix1: Array<Array<number>>, matrix2: Array<Array<number>>): MatrixResult => {
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
        let matAddResult: Array<number> = []
        let subItemIndex = 0
        while (subItemIndex < subItemLength) {
            // perform addition
            matAddResult.push(mat1[subItemIndex] + mat2[subItemIndex])
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
export const addMultipleMatrices = (matrices: Array<Array<Array<number>>>): MatrixResult => {
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
    const addMatRes = addMatrices(matrices[0], matrices[1])
    if (addMatRes.code !== "success") {
        result = []
        return addMatRes
    }
    // perform the remaining addition of the 3rd to the last matrix
    let matIndex = 2
    while (matIndex < matricesLength) {
        // next matrix addition
        const addMatRes = addMatrices(result, matrices[matIndex])
        if (addMatRes.code !== "success") {
            result = []
            return addMatRes
        }
        result = addMatRes.result
        matIndex += 1
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
export const subtractMatrices = (matrix1: Array<Array<number>>, matrix2: Array<Array<number>>): MatrixResult => {
    // initialize the matrix result
    const result: Array<Array<number>> = []
    // validate matrix1 and matrix2 length
    if len(matrix1) != len(matrix2) {
        return errors.New(fmt.Sprintf("length of both matrices should be equal [matrix1: %v | matrix2: %v]", len(matrix1), len(matrix2)))
    }
    matrixLength := len(matrix1)
    subItemLength := len(matrix1[0])
    matrixIndex := 0
    for matrixIndex < matrixLength {
        // validate matrix1 and matrix2 sub-items length
        mat1 := matrix1[matrixIndex]
        mat2 := matrix2[matrixIndex]
        // validate matrix1 and matrix2 sub-items length
        if len(mat1) != subItemLength || len(mat2) != subItemLength {
            result = [][]
            T
            {
            }
            return errors.New(fmt.Sprintf("length of both sub-matrices should be equal [matrix1[%v]: %v | matrix2[%v]: %v]", matrix1[matrixIndex], len(matrix1), matrix2[matrixIndex], len(matrix2)))
        }
        // compute matrix subtractions
        var matAddResult
        []
        T
        subItemIndex := 0
        for subItemIndex < subItemLength {
            // perform subtraction
            matAddResult = append(matAddResult, mat1[subItemIndex] - mat2[subItemIndex])
            // increment subItemIndex
            subItemIndex += 1
        }
        // update result
        result = append(result, matAddResult)
        // increment matrixIndex
        matrixIndex += 1
    }
    return nil
}

/**
 * subtractMultipleMatrices function [tensor] subtract multiple matrices of the same dimensions.
 */
export const subtractMultipleMatrices = (matrices: Array<Array<Array<number>>>): MatrixResult => {
    // initialize the matrix result
    const result: Array<Array<number>> = []
    matricesLength := len(matrices)
    if matricesLength <= 1 {
        return errors.New(fmt.Sprintf("length of matrices should be greater than 1"))
    }
    // perform subtraction of the first two matrices
    err := SubtractMatrices(matrices[0], matrices[1], result)
    if err != nil {
        result = [][]
        T
        {
        }
        return err
    }
    // perform the remaining subtraction of the 3rd to the last matrix
    matIndex := 2
    for matIndex < matricesLength {
        var nextResult
        [][]
        T
        err = SubtractMatrices(result, matrices[matIndex], nextResult)
        if err != nil {
            result = [][]
            T
            {
            }
            return err
        }
        result = nextResult
        matIndex += 1
    }
    return nil
}

/**
 * addScalarMatrix function adds a scalar Value to the matrix/matrices.
 */
export const addScalarMatrix = (matrix: Array<Array<number>>, scalar: number): MatrixResult => {
    // initialize the matrix result
    const result: Array<Array<number>> = []
    // validate matrix1 and matrix2 length
    if len(matrix) < 1 {
        return errors.New(fmt.Sprintf("length of the matrix should greater than 0"))
    }
    matrixLength := len(matrix)
    subItemLength := len(matrix[0])
    matrixIndex := 0
    for matrixIndex < matrixLength {
        mat := matrix[matrixIndex]
        // compute matrix additions
        var matAddResult
        []
        T
        subItemIndex := 0
        for subItemIndex < subItemLength {
            // perform addition
            matAddResult = append(matAddResult, mat[subItemIndex] + scalar)
            // increment subItemIndex
            subItemIndex += 1
        }
        // update result
        result = append(result, matAddResult)
        // increment matrixIndex
        matrixIndex += 1
    }
    return nil
}

/**
 * subtractScalarMatrix function subtracts a scalar Value from the matrix/matrices.
 */
export const subtractScalarMatrix = (matrix: Array<Array<number>>, scalar: number): MatrixResult => {
    // initialize the matrix result
    const result: Array<Array<number>> = []
    // validate matrix1 and matrix2 length
    if len(matrix) < 1 {
        return errors.New(fmt.Sprintf("length of the matrix should greater than 0"))
    }
    matrixLength := len(matrix)
    subItemLength := len(matrix[0])
    matrixIndex := 0
    for matrixIndex < matrixLength {
        mat := matrix[matrixIndex]
        // compute matrix additions
        var matAddResult
        []
        T
        subItemIndex := 0
        for subItemIndex < subItemLength {
            // perform addition
            matAddResult = append(matAddResult, mat[subItemIndex] - scalar)
            // increment subItemIndex
            subItemIndex += 1
        }
        // update result
        result = append(result, matAddResult)
        // increment matrixIndex
        matrixIndex += 1
    }
    return nil
}

/**
 * multiplyScalarMatrix function multiply a scalar Value with the matrix/matrices.
 */
export const multiplyScalarMatrix = (matrix: Array<Array<number>>, scalar: number): MatrixResult => {
    // initialize the matrix result
    const result: Array<Array<number>> = []
    // validate matrix1 and matrix2 length
    if len(matrix) < 1 {
        return errors.New(fmt.Sprintf("length of the matrix should greater than 0"))
    }
    matrixLength := len(matrix)
    subItemLength := len(matrix[0])
    matrixIndex := 0
    for matrixIndex < matrixLength {
        mat := matrix[matrixIndex]
        // compute matrix additions
        var matAddResult
        []
        T
        subItemIndex := 0
        for subItemIndex < subItemLength {
            // perform addition
            matAddResult = append(matAddResult, mat[subItemIndex] * scalar)
            // increment subItemIndex
            subItemIndex += 1
        }
        // update result
        result = append(result, matAddResult)
        // increment matrixIndex
        matrixIndex += 1
    }
    return nil
}

/**
 * divideScalarMatrix function the matrix/matrices by the scalar Value.
 */
export const divideScalarMatrix = (matrix: Array<Array<number>>, scalar: number): MatrixResult => {
    // initialize the matrix result
    const result: Array<Array<number>> = []
    // validate matrix1 and matrix2 length
    if len(matrix) < 1 {
        return errors.New(fmt.Sprintf("length of the matrix should greater than 0"))
    }
    matrixLength := len(matrix)
    subItemLength := len(matrix[0])
    matrixIndex := 0
    for matrixIndex < matrixLength {
        mat := matrix[matrixIndex]
        // compute matrix additions
        var matAddResult
        []
        T
        subItemIndex := 0
        for subItemIndex < subItemLength {
            // perform addition
            matAddResult = append(matAddResult, mat[subItemIndex] / scalar)
            // increment subItemIndex
            subItemIndex += 1
        }
        // update result
        result = append(result, matAddResult)
        // increment matrixIndex
        matrixIndex += 1
    }
    return nil
}

/**
 * transposeMatrix function transpose the matrix - swap rows and columns, i.e. rotate the matrix around it's diagonal.
 */
export const transposeMatrix = (matrix: Array<Array<number>>): MatrixResult => {
    // initialize the matrix result
    const result: Array<Array<number>> = []
    // validate matrix length
    if len(matrix) < 1 {
        return errors.New(fmt.Sprintf("length of the matrix should greater than 0"))
    }
    for _, matSlice :
    = range
    matrix
    {
        if len(matrix[0]) != len(matSlice) {
            return errors.New(fmt.Sprintf("Length of matrix2 sub-items must be equal [Expected: %v, Got: %v]", len(matrix[0]), len(matSlice)))
        }
    }
    // transpose matrix, swap columns to rows, diagonally
    matColumnItemsCount := len(matrix[0])
    matColumnItemIndex := 0
    for matColumnItemIndex < matColumnItemsCount {
        var transposeSliceRow
        []
        T
        for _, matColumnSlice :
        = range
        matrix
        {
            transposeSliceRow = append(transposeSliceRow, matColumnSlice[matColumnItemIndex])
        }
        result = append(result, transposeSliceRow)
        matColumnItemIndex += 1
    }
    return nil
}

/**
 * multiplyMatrix function multiply two matrices.
 * The matrix1 single slice length must be the same as the number of columns in matrix2/sub-matrices.
 */
export const multiplyMatrix = (matrix1: Array<number>, matrix2: Array<Array<number>>): MatrixResult => {
    // initialize the matrix result
    const result: Array<number> = []
    // validate matrix2 values' lengths must match the length of matrix1[0]
    if len(matrix1) != len(matrix2) {
        return errors.New(fmt.Sprintf("Length of matrix1 [Expected: %v] must match the number of columns of matrix2 [Got: %v]", len(matrix1), len(matrix2)))
    }
    for _, mat2Slice :
    = range
    matrix2
    {
        if len(matrix2[0]) != len(mat2Slice) {
            return errors.New(fmt.Sprintf("Length of matrix2 sub-items must be equal [Expected: %v, Got: %v]", len(matrix2[0]), len(mat2Slice)))
        }
    }
    // compute the matrices multiplication
    mat1Slice := matrix1
    mat1Columns := len(mat1Slice) // ==> matrix2 sub-items length/columns
    mat1ColCount := 0
    var matMultiSlices
    [][]
    T // Required to compute the summation of the row-column multiplications
    for mat1ColCount < mat1Columns {
        // compose multiplication Slice, by matching matrix1/matrix2-columns
        mat1ColVal := mat1Slice[mat1ColCount]
        mat2ColSlice := matrix2[mat1ColCount]
        var matMultiSlice
        []
        T
        for _, mat2ColVal :
        = range
        mat2ColSlice
        {
            matMultiSlice = append(matMultiSlice, mat2ColVal * mat1ColVal)
        }
        // update mat-multiplication-slice
        matMultiSlices = append(matMultiSlices, matMultiSlice)
        // next column
        mat1ColCount += 1
    }
    // compute the sum of multiplication-slices by matching columns/rows
    //var sumMultiplication []T
    matMultiRows := len(matMultiSlices[0])
    matMultiRow := 0
    for matMultiRow < matMultiRows {
        matMultiSum := T(0)
        for _, val :
        = range
        matMultiSlices
        {
            matMultiSum += val[matMultiRow]
        }
        result = append(result, matMultiSum)
        // next row
        matMultiRow += 1
    }
    return nil
}

/**
 * multiplyMatrices function multiply two matrices.
 * The number of rows in matrix1 sub-matrices must be the same as the number of columns in matrix2.
 */
export const multiplyMatrices = (matrix1: Array<Array<number>>, matrix2: Array<Array<number>>): MatrixResult => {
    // initialize the matrix result
    const result: Array<Array<number
    >>= []
    // validate matrix1 sub-items and matrix2 length, rows/columns matching
    for _, matrix1Val :
    = range
    matrix1
    {
        if len(matrix1[0]) != len(matrix1Val) {
            return errors.New(fmt.Sprintf("Length of matrix1 sub-items must be the same [Expected: %v, Got: %v]", len(matrix1[0]), len(matrix1Val)))
        }
        if len(matrix1Val) != len(matrix2) {
            return errors.New(fmt.Sprintf("Length of matrix1 sub-items must match the matrix2 columns/length [Expected: %v, Got: %v]", len(matrix1Val), len(matrix2)))
        }
    }
    // validate matrix2 sub-items lengths/rows
    for _, mat2Slice :
    = range
    matrix2
    {
        if len(matrix2[0]) != len(mat2Slice) {
            return errors.New(fmt.Sprintf("Length of matrix2 sub-items must be equal [Expected: %v, Got: %v]", len(matrix2[0]), len(mat2Slice)))
        }
    }
    // compute the matrices multiplication
    matrix1SlicesLength := len(matrix1)
    matrix1SliceIndex := 0
    for matrix1SliceIndex < matrix1SlicesLength {
        // compute the matrix multiplication for each of the matrix1 slices and matrix2 slices
        var multiResult
        []
        T
        err := MultiplyMatrix(matrix1[matrix1SliceIndex], matrix2, multiResult)
        if err != nil {
            result = [][]
            T
            {
            }
            return err
        }
        result = append(result, multiResult)
        matrix1SliceIndex += 1
    }
    return nil
}

/**
 * multiplyMatrices2 - DEPRECATED | TODO: REMOVE POST-TESTING
 */
export const multiplyMatrices2 = (matrix1: Array<Array<number>>, matrix2: Array<Array<number>>): MatrixResult => {
    // initialize the matrix result
    const result: Array<Array<number>> = []
    // validate matrix1 and matrix2 length
    for _, matrix1Val :
    = range
    matrix1
    {
        if len(matrix1[0]) != len(matrix1Val) {
            return errors.New(fmt.Sprintf("Length of matrix1 sub-items must be the same [%v]", len(matrix1[0])))
        }
    }
    // validate matrix2 values' lengths
    for _, matrix2Val :
    = range
    matrix2
    {
        if len(matrix1[0]) != len(matrix2Val) {
            return errors.New(fmt.Sprintf("Length of matrix1 sub-items [%v] must be the same as the number of columns of matrix2 sub-items [%v]", len(matrix1[0]), len(matrix2Val)))
        }
    }
    // compute the matrices multiplication
    matrix1Length := len(matrix1)
    matrix2Length := len(matrix2)
    mat1Index := 0
    mat2Index := 0
    for mat1Index < matrix1Length {
        mat1Val := matrix1[mat1Index]
        matColumns := len(mat1Val)
        matColumnIndex := 0
        var matrixMulResult
        []
        T
        for matColumnIndex < matColumns {
            // TODO: compute sum of all the multiplications of the matrix2 items at column matColumnIndex
            matColumnSum := T(0)
            for mat2Index < matrix2Length {
                //mat2Val := matrix2[mat2Index]
                mat2ColumnIndex := 0
                for mat2ColumnIndex < matColumns {
                    matColumnSum += matrix2[mat2Index][matColumnIndex] * matrix1[mat1Index][mat2ColumnIndex]
                    mat2ColumnIndex += 1
                }
                mat2Index += 1
            }
            matrixMulResult = append(matrixMulResult, matColumnSum)
            matColumnIndex += 1
        }
        result = append(result, matrixMulResult)
        mat1Index += 1
    }

    return nil
}

class Matrix {
    /**
     * Constructor of the matrix
     * 
     * @param data Double array containing the data of the matrix 
     */
    constructor(data) {
        this.data = data;
        this.rows = data.length;
        this.cols = data[0].length;
    }

    /**
     * Constructor of a matrix full of 0s
     * if cols is 0 then the matrix would be square
     * 
     * @param rows Number of rows
     * @param cols Number of cols
     */
    static fromDimensions(rows, cols=0) {
        return Matrix.zeros(rows, cols);
    }

    /**
     * Constructs a matrixs full of 0s of the given dimensions
     * if cols is 0 then the matrix will be square
     * 
     * @param rows 
     * @param cols 
     */
    static zeros(rows, cols=0) {
        cols = cols==0 ? rows : cols;
        return new Matrix(Array(rows).fill().map(() => Array(cols).fill(0)));
    }

    /**
     * Constructs a matrixs full of 1s of the given dimensions
     * if cols = 0 then the matrix will be square
     * 
     * @param rows 
     * @param cols 
     */
    static ones(rows, cols=0) {
        cols = cols==0 ? rows : cols;
        return new Matrix(Array(rows).fill().map(() => Array(cols).fill(1)));
    }

    /**
     * Constructs a identity matrix of the given size
     * 
     * @param n 
     */
    static identity(n) {
        return Matrix.zeros(n).map((_, i, j) => i==j ? 1 : 0);
    }

    /**
     * Transpose this matrix
     */
    transpose() {
        let res = Matrix.transpose(this);
        this.data = res.data;
        this.cols = res.cols;
        this.rows = this.rows;
        return this;
    }

    /**
     * Return a new matrix result of transposing the given one
     * 
     * @param matrix
     */
    static transpose(matrix) {
        return Matrix.fromDimensions(matrix.cols, matrix.rows).map((_,i,j) => matrix.data[j][i]);
    }

    /**
     * Computes the determinant for this matrix
     */
    det() {
        if(this.rows != this.cols)
            return 0;
        if(this.rows == 1)
            return this.data[0][0];

        let d = 0;
        for(let i = 0; i < this.cols; i++) {
            // Create the corresponding sub matrix
            let subM = [];
            for(let j = 1; j < this.rows; j++) {
                let tmp = [];
                for(let k = 0; k < this.cols; k++)
                    if(k != i)
                        tmp.push(this.get(j,k));
                subM.push(tmp);
            }
            d += (i%2 == 0 ? -1 : 1)*this.get(0,i)*(new Matrix(subM)).det();
        }

        return d;
    }

    /**
     * Multiplies this matris by the given scalar
     * 
     * @param n scalar 
     */
    mult(n) {
        return this.map((e) => n*e);
    }

    /**
     * If both A, B are matrices makes matrix multiplication (A*B)
     * If one of them is a scalar make element wise multiplication
     * In both cases returns a new Matrix
     * 
     * @param A matrix or scalar 
     * @param B matrix or scalar 
     */
    static mult(A, B) {
        if(A instanceof Matrix, B instanceof Matrix) {
            if(A.cols != B.rows){
                console.log("Multiplication dimensions don't match");
                return;
            }

            return Matrix.fromDimensions(A.rows, B.cols)
                .map((_, i, j) => A.row(i).map((e,k) => e*B.get(k,j)).reduce((x,y) => x+y));

        } else {
            let M = A instanceof Matrix ? A : B;
            let n = A instanceof Matrix ? B : A;
            return Matrix.map(M, (e) => n*e);
        }
    }

    /**
     * Adds matrix B to this matrix
     * 
     * @param B Matrix to add 
     */
    add(B) {
        return this.biMap(B, (a, b) => a+b);
    }

    /**
     * Returns a new matrix
     * result of adding A and B
     * 
     * @param A first matrix 
     * @param B second matrix 
     */
    static add(A, B) {
        return Matrix.biMap(A, B, (a,b) => a+b);
    }

    /**
     * Substracts matrix B to this matrix
     * 
     * @param B Matrix to substract 
     */
    sub(B) {
        return this.biMap(B, (a, b) => a-b);
    }

    /**
     * Returns a new matrix
     * result of substracting B to A
     * 
     * @param A first matrix 
     * @param B second matrix 
     */
    static sub(A, B) {
        return Matrix.biMap(A, B, (a,b) => a-b);
    }

    /**
     * Apply the given function to every element of the matrix
     * 
     * Function should be of type f(value, i, j)
     * where value is the value of the element
     * and i,j are it's position
     * 
     * @param func Funtion to apply
     */
    map(func) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = func(this.data[i][j], i, j);
            }
        }
        return this;
    }
    
    /**
     * Return a new matrix wich is the result of applying
     * the given functio to the given matrix
     * 
     * Function should be of type f(value, i, j)
     * where value is the value of the element
     * and i,j are it's position
     * 
     * @param matrix 
     * @param func 
     */
    static map(matrix, func) {
        return Matrix.fromDimensions(matrix.rows, matrix.cols)
            .map((e, i, j) => func(matrix.data[i][j], i, j));
    }

    /**
     * Apply the given function element wise to the two matrices
     * The values of this matrix change acording to the result of the function
     * 
     * Function should be of type f(value1, value2, i, j)
     * where value1 is the value of the element of this matrix
     * value2 is the value of the element of the other matrix
     * and i,j are the actual position
     * 
     * @param matrix other matrix
     * @param func Funtion to apply
     */
    biMap(matrix, func) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = func(this.data[i][j], matrix.data[i][j], i, j);
            }
        }
        return this;
    }

    /**
     * Return a new matrix result of applying the given function element wise
     * to the two given matrices
     * 
     * Function should be of type f(value1, value2, i, j)
     * where value1 is the value of the element of this matrix
     * value2 is the value of the element of the other matrix
     * and i,j are the actual position
     * 
     * @param A First matrix
     * @param B Second matrix
     * @param func Funtion to apply
     */
    static biMap(A, B, func) {
        return Matrix.fromDimensions(A.rows, A.cols)
            .map((e,i,j) => func(A.data[i][j], B.data[i][j], i, j));
    }

    /**
     * Return the i-th row
     * 
     * @param i 
     */
    row(i) {
        return this.data[i];
    }

    /**
     * Return the j-th row
     * 
     * @param j 
     */
    col(j) {
        return this.data.map(r => r[j]);
    }

    /**
     * Get the element at position i, j
     * 
     * @param i
     * @param j
     */
    get(i, j) {
        return this.data[i][j];
    }

    /**
     * Set the element at i,j to the given value
     * 
     * @param i 
     * @param j 
     * @param v Value
     */
    set(i, j, v) {
        this.data[i][j] = v;
        return this;
    }

    /**
     * Returns the data of the matrix
     */
    toArray() {
        return this.data;
    }

    /**
     * Creates a copy of this matrix
     */
    copy() {
        return new Matrix(this.data.copy().map(r => r.copy()));
    }

    /**
     * Print the matrix in the console
     */
    print() {
        console.table(this.data);
        return this;
    }
}
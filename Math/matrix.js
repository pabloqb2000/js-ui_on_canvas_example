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
    fromDimensions(rows, cols=0) {
        this(Matrix.zeros(rows, cols));
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
    static ones(rows, cols) {
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
        return this.map((e,i,j) => this.data[j][i]);
    }

    /**
     * Return a new matrix result of transposing the given one
     * 
     * @param matrix
     */
    static transpose(matrix) {
        return Matrix.map((e,i,j) => matrix.data[j][i]);
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
        return Matrix.fromArray(matrix.rows, matrix.cols)
            .map((e, i, j) => func(matrix.data[i][j], i, j));
    }

    /**
     * Returns the data of the matrix
     */
    toArray() {
        return this.data;
    }

    /**
     * Print the matrix in the console
     */
    print() {
        console.table(this.data);
        return this;
    }
}
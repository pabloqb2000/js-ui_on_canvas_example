class Vector {
    /**
     * 
     * @param data Array with the coordinates of the vector 
     */
    constructor(data) {
        this.n = data.length;
        this.data = data;
    }

    /**
     * Get the i-th coordinate
     * 
     * @param i
     */
    get(i) {
        return this.data[i];
    }

    /**
     * Creates a vertical matrix from this vector
     */
    toMatrix() {
        return new Matrix(this.data.map(e => [e]));
    }

    /**
     * Prints this vector in the console
     */
    print() {
        console.log("(" + this.data.map(e => e.toString()).reduce((x,y) => x + ", " + y) + ")");
        return this;
    }
}
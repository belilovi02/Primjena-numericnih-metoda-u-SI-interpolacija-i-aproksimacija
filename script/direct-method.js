// Export funkcija za interpolaciju polinomima pomoću direktne metode
export function interpolatePolynomialDirect(dataPoints, xValue) {
    const n = dataPoints.length - 1; // Stepen polinoma je n (broj tačaka - 1)

    // Formiranje Vandermondeove matrice
    const vandermondeMatrix = dataPoints.map(([x], i) => {
        return Array.from({ length: n + 1 }, (_, j) => Math.pow(x, j));
    });

    // Formiranje vektora y (zavisne vrednosti)
    const yVector = dataPoints.map(([, y]) => y);

    // Rešavanje sistema linearnih jednačina Ax = b (A = Vandermondeova matrica, b = yVector)
    const coefficients = solveLinearSystem(vandermondeMatrix, yVector);

    // Izračunavanje interpolirane vrednosti za zadati xValue
    let interpolatedValue = 0;
    for (let i = 0; i <= n; i++) {
        interpolatedValue += coefficients[i] * Math.pow(xValue, i);
    }

    return {
        coefficients,
        interpolatedValue,
    };
}

// Funkcija za rešavanje sistema linearnih jednačina koristeći Gaussovu eliminaciju
function solveLinearSystem(matrix, vector) {
    const n = matrix.length;

    // Proširena matrica (dodavanje vektora kao poslednje kolone)
    for (let i = 0; i < n; i++) {
        matrix[i].push(vector[i]);
    }

    // Gaussova eliminacija
    for (let i = 0; i < n; i++) {
        // Pivotiranje
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
                maxRow = k;
            }
        }
        [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];

        // Normalizacija reda
        for (let k = i + 1; k <= n; k++) {
            matrix[i][k] /= matrix[i][i];
        }
        matrix[i][i] = 1;

        // Eliminacija
        for (let j = 0; j < n; j++) {
            if (j !== i) {
                const factor = matrix[j][i];
                for (let k = i; k <= n; k++) {
                    matrix[j][k] -= factor * matrix[i][k];
                }
            }
        }
    }

    // Rešenje (zadnja kolona matrice)
    return matrix.map(row => row[n]);
}

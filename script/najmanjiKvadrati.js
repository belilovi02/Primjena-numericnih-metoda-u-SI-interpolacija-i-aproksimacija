// Funkcija koja implementira metodu najmanjih kvadrata
export function metodaNajmanjihKvadrata(data) {
    // Inicijalizacija suma za metodu najmanjih kvadrata
    let sumT = 0, sumT2 = 0, sumT3 = 0, sumT4 = 0, sumCp = 0, sumTCp = 0, sumT2Cp = 0;

    for (let i = 0; i < data.length; i++) {
        let T = data[i][0];
        let Cp = data[i][1];

        sumT += T;
        sumT2 += T * T;
        sumT3 += T * T * T;
        sumT4 += T * T * T * T;
        sumCp += Cp;
        sumTCp += T * Cp;
        sumT2Cp += T * T * Cp;
    }

    // Matrica sistema i vektor rezultata (desna strana)
    let matrix = [
        [sumT2, sumT, data.length],
        [sumT3, sumT2, sumT],
        [sumT4, sumT3, sumT2]
    ];
    let results = [sumTCp, sumT2Cp, sumCp];

    // Rješavanje sistema linearnih jednadžbi koristeći Gauss-Jordanovu eliminaciju
    let coefficients = solveLinearSystem(matrix, results);

    return coefficients; // [a, b, c]
}

// Funkcija za rješavanje sistema linearnih jednadžbi (Gauss-Jordanova metoda)
function solveLinearSystem(matrix, results) {
    let n = matrix.length;
    
    // Augmentirani sistem
    for (let i = 0; i < n; i++) {
        matrix[i].push(results[i]);
    }

    // Gauss-Jordanova eliminacija
    for (let i = 0; i < n; i++) {
        let maxEl = Math.abs(matrix[i][i]);
        let maxRow = i;
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(matrix[j][i]) > maxEl) {
                maxEl = Math.abs(matrix[j][i]);
                maxRow = j;
            }
        }

        // Zamjena redova
        [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];

        // Normalizacija
        let divisor = matrix[i][i];
        for (let j = 0; j < n + 1; j++) {
            matrix[i][j] /= divisor;
        }

        // Eliminacija
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                let factor = matrix[j][i];
                for (let k = 0; k < n + 1; k++) {
                    matrix[j][k] -= matrix[i][k] * factor;
                }
            }
        }
    }

    return matrix.map(row => row[n]);
}

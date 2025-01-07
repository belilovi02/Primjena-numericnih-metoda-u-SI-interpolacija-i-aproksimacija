// Funkcija za Newtonov interpolacioni polinom
export function interpolateNewton(dataPoints, xValue) {
    const n = dataPoints.length;
    const dividedDifferences = [];

    // Kreiranje početne tabele podijeljenih razlika
    for (let i = 0; i < n; i++) {
        dividedDifferences[i] = [dataPoints[i][1]]; // Drugi element je y vrednost
    }

    // Popunjavanje tabele podijeljenih razlika
    for (let j = 1; j < n; j++) {
        for (let i = 0; i < n - j; i++) {
            const numerator = dividedDifferences[i + 1][j - 1] - dividedDifferences[i][j - 1];
            const denominator = dataPoints[i + j][0] - dataPoints[i][0];
            dividedDifferences[i].push(numerator / denominator);
        }
    }

    // Ispisivanje tabele podijeljenih razlika
    console.log("Tabela podijeljenih razlika:");
    for (let i = 0; i < n; i++) {
        console.log(dividedDifferences[i].map(val => val.toFixed(4)).join(' | '));
    }

    // Izračunavanje interpolirane vrednosti
    let interpolatedValue = dividedDifferences[0][0];
    let productTerm = 1;
    for (let i = 1; i < n; i++) {
        productTerm *= (xValue - dataPoints[i - 1][0]);
        interpolatedValue += dividedDifferences[0][i] * productTerm;
    }

    return {
        dividedDifferences,
        interpolatedValue
    };
}

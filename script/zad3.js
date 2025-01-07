import { interpolatePolynomialDirect } from './direct-method.js';
import { interpolateNewton } from './newton.js';

// Funkcija za formatiranje koeficijenata sa 4 decimale
function formatCoefficients(coefficients) {
    return coefficients.map(c => {
        if (typeof c === 'number') {
            return c.toFixed(4);  // Ako je broj, formatiraj sa 4 decimale
        } else {
            return c;  // Inače, vrati originalnu vrijednost
        }
    }).join(', ');
}

// Funkcija koja se aktivira kad se klikne na dugme za izračunavanje
document.getElementById('izracunaj').addEventListener('click', function() {
    const redPolinoma = parseInt(document.getElementById('redPolinoma').value);  // Red interpolacije
    const xVrijednost = parseFloat(document.getElementById('xVrijednost').value);  // Vrijednost x za interpolaciju
    const metoda = document.getElementById('metoda').value;  // Izabrana metoda (direktna ili Newtonova)

    // Podaci za interpolaciju (x, h) - zadatak 3
    const data = [
        [0, 0], [3, 1], [6, 3], [9, 4], [12, 5], 
        [15, 6], [18, 4], [21, 6], [24, 3], [27, 2], [30, 0]
    ];

    // Prilagodba podataka na osnovu reda interpolacije
    let dataToUse;
    if (redPolinoma === 2) {
        dataToUse = data.slice(0, 3); // Drugi red (3 tačke)
    } else if (redPolinoma === 3) {
        dataToUse = data.slice(0, 4); // Treći red (4 tačke)
    } else {
        dataToUse = data.slice(0, 5); // Četvrti red (5 tačaka)
    }

    try {
        let interpolatedValue;
        let coefficients;

        // Izbor metode na osnovu korisničkog inputa
        if (metoda === 'direct') {
            // Direktna metoda
            const result = interpolatePolynomialDirect(dataToUse, xVrijednost);
            coefficients = result.coefficients;
            interpolatedValue = result.interpolatedValue;
        } else if (metoda === 'newton') {
            // Newtonova metoda
            const result = interpolateNewton(dataToUse, xVrijednost);
            coefficients = result.dividedDifferences;
            interpolatedValue = result.interpolatedValue;
        }

        // Prikazivanje rezultata
        document.getElementById('rezultatKoeficijenti').textContent = `Koeficijenti polinoma: ${formatCoefficients(coefficients)}`;
        document.getElementById('rezultatVrijednost').textContent = `Interpolirana vrijednost za x = ${xVrijednost} je: ${interpolatedValue.toFixed(4)} m`;

    } catch (error) {
        alert('Došlo je do greške pri izračunavanju: ' + error.message);
    }
});

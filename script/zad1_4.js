import { interpolatePolynomialDirect } from './direct-method.js';

document.getElementById('automatskoPopunjavanje').addEventListener('change', function () {
    if (this.checked) {
        document.getElementById('vrijednostiPodataka').value = "3.35,0.298507;3.40,0.294118;3.50,0.285714;3.60,0.277778";
        document.getElementById('vrijednostZaInterpolaciju').value = 3.44;
        document.getElementById('redPolinoma').value = 1;  // Linear interpolation
    }
});

document.getElementById('izracunaj').addEventListener('click', function () {
    const brojPodataka = parseInt(document.getElementById('brojPodataka').value);
    const vrijednostiPodataka = document.getElementById('vrijednostiPodataka').value
        .split(';')
        .map(pair => pair.split(',').map(Number));
    const redPolinoma = parseInt(document.getElementById('redPolinoma').value);
    const vrijednostZaInterpolaciju = parseFloat(document.getElementById('vrijednostZaInterpolaciju').value);

    if (vrijednostiPodataka.length !== brojPodataka) {
        alert('Broj unesenih podataka ne odgovara broju podataka!');
        return;
    }

    if (redPolinoma >= brojPodataka) {
        alert('Red polinoma mora biti manji od broja podataka!');
        return;
    }

    try {
        const { coefficients, interpolatedValue } = interpolatePolynomialDirect(vrijednostiPodataka, vrijednostZaInterpolaciju);

        document.getElementById('rezultatKoeficijenti').textContent = `Koeficijenti polinoma: ${coefficients.map(c => c.toFixed(4)).join(', ')}`;
        document.getElementById('rezultatVrijednost').textContent = `Interpolirana vrijednost: ${interpolatedValue.toFixed(4)}`;
    } catch (error) {
        alert('Došlo je do greške pri izračunavanju: ' + error.message);
    }
});

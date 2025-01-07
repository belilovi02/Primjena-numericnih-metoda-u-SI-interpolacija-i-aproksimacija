import { interpolateNewton } from './newton.js';

document.getElementById('automatskoPopunjavanje').addEventListener('change', function () {
    if (this.checked) {
        // Automatsko popunjavanje podataka
        document.getElementById('brojPodataka').value = 11;
        document.getElementById('vrijednostiPodataka').value = "0,0;3,1;6,3;9,4;12,5;15,6;18,4;21,6;24,3;27,2;30,0";
        document.getElementById('redPolinoma').value = 2;
        document.getElementById('vrijednostZaInterpolaciju').value = 10;
    }
});

document.getElementById('izracunaj').addEventListener('click', function () {
    // Preuzimanje unosa korisnika
    const brojPodataka = parseInt(document.getElementById('brojPodataka').value);
    const vrijednostiPodataka = document.getElementById('vrijednostiPodataka').value
        .split(';')
        .map(pair => pair.split(',').map(Number));
    const redPolinoma = parseInt(document.getElementById('redPolinoma').value);
    const vrijednostZaInterpolaciju = parseFloat(document.getElementById('vrijednostZaInterpolaciju').value);

    // Validacija ulaza
    if (vrijednostiPodataka.length !== brojPodataka) {
        alert('Broj unesenih podataka ne odgovara broju podataka!');
        return;
    }

    if (redPolinoma >= brojPodataka) {
        alert('Red polinoma mora biti manji od broja podataka!');
        return;
    }

    // Izračunavanje Newtonove interpolacije
    try {
        const { dividedDifferences, interpolatedValue } = interpolateNewton(vrijednostiPodataka, vrijednostZaInterpolaciju);

        // Prikaz rezultata
        document.getElementById('rezultatKoeficijenti').textContent = `Tabela podijeljenih razlika:\n` + 
        dividedDifferences.map(row => row.map(val => val.toFixed(4)).join(' | ')).join('\n');
        document.getElementById('rezultatVrijednost').textContent = `Interpolirana vrijednost za x = ${vrijednostZaInterpolaciju}: ${interpolatedValue.toFixed(4)}`;
    } catch (error) {
        alert('Došlo je do greške pri izračunavanju: ' + error.message);
    }
});

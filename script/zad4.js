import { metodaNajmanjihKvadrata } from './najmanjiKvadrati.js';

// Tabela 4.2: Zadanih podataka (T, Cp, Cp' sa greškom)
const defaultniPodaci = [
    [1000, 1.1410, 1.1427, 0.15],  // [T, Cp, Cp' izračunat, greška %]
    [1500, 1.2095, 1.2059, 0.29],
    [2000, 1.2520, 1.2522, 0.02],
    [2500, 1.2782, 1.2815, 0.26],
    [3000, 1.2955, 1.2938, 0.13]
];

// Funkcija za dinamičko dodavanje unosa
function dodajPolja(brojPodataka, podaci = []) {
    const inputDataContainer = document.getElementById('inputData');
    inputDataContainer.innerHTML = ''; // Očisti prethodne unose

    for (let i = 0; i < brojPodataka; i++) {
        const T = podaci[i]?.[0] || '';
        const Cp = podaci[i]?.[1] || '';
        const CpRel = podaci[i]?.[2] || '';
        const greska = podaci[i]?.[3] || '';
        inputDataContainer.innerHTML += `
            <div class="mb-3">
                <label for="T${i}" class="form-label">Temperatura T${i + 1} (K)</label>
                <input type="number" class="form-control" id="T${i}" value="${T}" required>
            </div>
            <div class="mb-3">
                <label for="Cp${i}" class="form-label">Specifična toplina Cp${i + 1} (kJ/kg·K)</label>
                <input type="number" class="form-control" id="Cp${i}" value="${Cp}" required>
            </div>
            <div class="mb-3">
                <label for="CpRel${i}" class="form-label">Izračunata specifična toplina Cp'${i + 1} (kJ/kg·K)</label>
                <input type="number" class="form-control" id="CpRel${i}" value="${CpRel}" disabled>
            </div>
            <div class="mb-3">
                <label for="relGreška${i}" class="form-label">Relativna greška %</label>
                <input type="number" class="form-control" id="relGreška${i}" value="${greska}" disabled>
            </div>
        `;
    }
}

// Funkcija za izračunavanje koeficijenata
document.getElementById('izracunaj').addEventListener('click', function () {
    const brojPodataka = parseInt(document.getElementById('brojPodataka').value);
    const data = [];

    for (let i = 0; i < brojPodataka; i++) {
        const T = parseFloat(document.getElementById(`T${i}`).value);
        const Cp = parseFloat(document.getElementById(`Cp${i}`).value);
        data.push([T, Cp]);
    }

    // Pozivanje metode najmanjih kvadrata
    const coefficients = metodaNajmanjihKvadrata(data);

    // Računanje izračunatih vrednosti Cp' i relativne greške
    for (let i = 0; i < brojPodataka; i++) {
        const T = parseFloat(document.getElementById(`T${i}`).value);
        const Cp = parseFloat(document.getElementById(`Cp${i}`).value);
        const greska = parseFloat(document.getElementById(`relGreška${i}`).value);

        // Izračunavanje izračunatog Cp'
        const CpRel = coefficients[0] + coefficients[1] * T + coefficients[2] * Math.pow(T, 2);
        document.getElementById(`CpRel${i}`).value = CpRel.toExponential(6);

        // Računanje relativne greške
        const relGreška = Math.abs((Cp - CpRel) / Cp) * 100;
        document.getElementById(`relGreška${i}`).value = relGreška.toFixed(2);
        
        // Računanje greške uzimajući u obzir zadatu grešku u Cp-u
        const finalGreška = Math.abs((greska + relGreška) / 2); // Srednja greška
        document.getElementById(`relGreška${i}`).value = finalGreška.toFixed(2);
    }

    // Prikazivanje koeficijenata u eksponencijalnom formatu
    document.getElementById('rezultat').innerHTML = `
        <h4>Koeficijenti aproksimacije:</h4>
        <p>a = ${coefficients[0].toExponential(6)}</p>
        <p>b = ${coefficients[1].toExponential(6)}</p>
        <p>c = ${coefficients[2].toExponential(6)}</p>
    `;
});

// Funkcija za automatsko popunjavanje podataka iz Tabele 4.2 kada je checkbox označen
document.getElementById('autoPopuni').addEventListener('change', function () {
    const brojPodataka = parseInt(document.getElementById('brojPodataka').value);
    if (this.checked) {
        dodajPolja(brojPodataka, defaultniPodaci.slice(0, brojPodataka));
    } else {
        dodajPolja(brojPodataka);
    }
});

// Automatski učitavanje zadatih podataka prilikom inicijalizacije
document.getElementById('brojPodataka').addEventListener('input', function () {
    const brojPodataka = parseInt(this.value);
    const autoPopuni = document.getElementById('autoPopuni').checked;
    if (autoPopuni) {
        dodajPolja(brojPodataka, defaultniPodaci.slice(0, brojPodataka));
    } else {
        dodajPolja(brojPodataka);
    }
});

document.getElementById('brojPodataka').dispatchEvent(new Event('input'));

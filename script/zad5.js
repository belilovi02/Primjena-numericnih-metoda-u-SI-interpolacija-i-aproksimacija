import { metodaNajmanjihKvadrata } from './mnk.js'; // Uvoz metode

// Podaci iz tabele
const data = [
    { x: 0.4, k: 1 },
    { x: 0.7, k: 2.2 },
    { x: 1.3, k: 5.1 },
    { x: 2.1, k: 7.2 },
    { x: 4, k: 8.8 },
    { x: 6, k: 11 }
];

// Prikazivanje rezultata u HTML-u
document.getElementById("izracunaj").addEventListener("click", function() {
    const { a, b } = metodaNajmanjihKvadrata(data);
    const equation = `f(x) = ${a.toFixed(4)}x + ${b.toFixed(4)}`;
    document.getElementById("rjesenja").innerHTML = `Koeficijent a: ${a.toFixed(4)}<br>Koeficijent b: ${b.toFixed(4)}<br>Konačno: ${equation}`;
});

// Metoda koja implementira izračunavanje koeficijenata pomoću metode najmanjih kvadrata
export function metodaNajmanjihKvadrata(data) {
    const n = data.length;

    let sumX = 0, sumY = 0, sumX2 = 0, sumXY = 0;

    // Računanje potrebnih suma
    for (let i = 0; i < n; i++) {
        const x = data[i].x;
        const k = data[i].k;

        sumX += x;
        sumY += k;
        sumX2 += x * x;
        sumXY += x * k;
    }

    // Izračunavanje koeficijenata a i b
    const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY * sumX2 - sumX * sumXY) / (n * sumX2 - sumX * sumX);

    return { a, b };
}

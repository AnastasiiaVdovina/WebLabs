// Наближений розрахунок функції помилок erf(x)
function erf(x) {
    const a1 =  0.254829592; const a2 = -0.284496736;
    const a3 =  1.421413741; const a4 = -1.453152027;
    const a5 =  1.061405429; const p  =  0.3275911;
    const sign = (x >= 0) ? 1 : -1; x = Math.abs(x);
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * Math.exp(-x * x);
    return sign * y;
}

// Функція стандартного нормального розподілу (CDF) - Phi(z)
function standardNormalCDF(z) {
    return 0.5 * (1 + erf(z / Math.SQRT2));
}

// Функція нормального розподілу CDF для заданих mu та sigma
function normalCDF(x, mu, sigma) {
    if (sigma <= 0) return (x < mu) ? 0 : 1;
    return standardNormalCDF((x - mu) / sigma);
}

// Функція для форматування чисел у тисячі гривень
function formatThousands(value) {
    if (isNaN(value)) return 'N/A';
    // Округлення до 2 знаків після ділення на 1000
    return (value / 1000).toFixed(2);
}

// Основна логіка

function calculateProfit() {
    const resultElement = document.getElementById('result'); // Отримуємо елемент для виводу

    // Очищуємо попередній результат
    resultElement.innerHTML = '';

    // 1. Отримуємо вхідні дані
    const nominalPower = parseFloat(document.getElementById('nominalPower').value);
    const initialSigma = parseFloat(document.getElementById('initialSigma').value);
    const improvedSigma = parseFloat(document.getElementById('improvedSigma').value);
    const electricityPriceKWh = parseFloat(document.getElementById('electricityPrice').value);
    const allowedErrorPercent = parseFloat(document.getElementById('allowedErrorPercent').value);

    // 2. Перевіряємо їх
    if (isNaN(nominalPower) || isNaN(initialSigma) || isNaN(improvedSigma) || isNaN(electricityPriceKWh) || isNaN(allowedErrorPercent) || initialSigma <= 0 || improvedSigma <= 0 || nominalPower <= 0 || electricityPriceKWh < 0 || allowedErrorPercent < 0) {
        resultElement.innerHTML = "<strong>Помилка:</strong> Будь ласка, введіть коректні позитивні значення для всіх полів. Похибка має бути більше нуля.";
        return; // Зупиняємо виконання функції
    }

    // 3. Розраховуємо значення
    const pricePerMWh = electricityPriceKWh * 1000; // Переводимо грн/кВт-год в грн/МВт-год
    const allowedDeviation = nominalPower * (allowedErrorPercent / 100);
    const lowerBound = nominalPower - allowedDeviation;
    const upperBound = nominalPower + allowedDeviation;
    const hours = 24;
    const totalEnergyPerDay = nominalPower * hours;

    // 4. Розрахунки для початкового стану (sigma1)
    const deltaW1_raw = normalCDF(upperBound, nominalPower, initialSigma) - normalCDF(lowerBound, nominalPower, initialSigma);
    const deltaW1_percent = deltaW1_raw * 100;
    const W1 = totalEnergyPerDay * deltaW1_raw; // Енергія без небалансів
    const Pi1 = W1 * pricePerMWh;               // Прибуток від неї
    const W2 = totalEnergyPerDay * (1 - deltaW1_raw); // Енергія з небалансами
    const LLI1 = W2 * pricePerMWh;              // Штраф за неї
    const Result1 = Pi1 - LLI1;                 // Загальний результат

    // 5. Розрахунки для покращеного стану (sigma2)
    const deltaW2_raw = normalCDF(upperBound, nominalPower, improvedSigma) - normalCDF(lowerBound, nominalPower, improvedSigma);
    const deltaW2_percent = deltaW2_raw * 100;
    const W3 = totalEnergyPerDay * deltaW2_raw; // Енергія без небалансів (покращена)
    const Pi2 = W3 * pricePerMWh;               // Прибуток від неї (покращений)
    const W4 = totalEnergyPerDay * (1 - deltaW2_raw); // Енергія з небалансами (покращена)
    const LLI2 = W4 * pricePerMWh;              // Штраф за неї (покращений)
    const Result2 = Pi2 - LLI2;                 // Загальний результат (покращений)

    // 6. Розрахунок ефекту від вдосконалення
    const DeltaPi = Result2 - Result1; // Додатковий прибуток

    // 7. Вивід результатів
    resultElement.innerHTML = `
        <strong>--- Початковий стан (σ = ${initialSigma.toFixed(2)} МВт) ---</strong><br>
        Частка енергії без небалансів (δ<sub>W1</sub>): ${deltaW1_percent.toFixed(2)} %<br>
        Енергія без небалансів (W<sub>1</sub>): ${W1.toFixed(2)} МВт-год<br>
        Прибуток від W<sub>1</sub> (Π<sub>1</sub>): ${formatThousands(Pi1)} тис. грн<br>
        Енергія з небалансами (W<sub>2</sub>): ${W2.toFixed(2)} МВт-год<br>
        Штраф за W<sub>2</sub> (LLI<sub>1</sub>): ${formatThousands(LLI1)} тис. грн<br>
        <strong>Загальний результат 1: ${formatThousands(Result1)} тис. грн</strong><br>
        <br>
        <strong>--- Покращений стан (σ = ${improvedSigma.toFixed(2)} МВт) ---</strong><br>
        Частка енергії без небалансів (δ<sub>W2</sub>): ${deltaW2_percent.toFixed(2)} %<br>
        Енергія без небалансів (W<sub>3</sub>): ${W3.toFixed(2)} МВт-год<br>
        Прибуток від W<sub>3</sub> (Π<sub>2</sub>): ${formatThousands(Pi2)} тис. грн<br>
        Енергія з небалансами (W<sub>4</sub>): ${W4.toFixed(2)} МВт-год<br>
        Штраф за W<sub>4</sub> (LLI<sub>2</sub>): ${formatThousands(LLI2)} тис. грн<br>
        <strong>Загальний результат 2: ${formatThousands(Result2)} тис. грн</strong><br>
        <br>
        <strong>--- Ефект від вдосконалення ---</strong><br>
        <strong>Додатковий прибуток (ΔΠ): ${formatThousands(DeltaPi)} тис. грн</strong>
    `;
}

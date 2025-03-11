// Константні дані про різні види палива та їх характеристики
const fuelData = {
    coal: { // Вугілля
        name: "Вугілля",
        types: {
            gr: { name: "Донецьке газове вугілля", Q_n: 20.47, A_r: 25.20, fraction_ash: 0.8, G_vin: 1.5 },
            anthracite: { name: "Антрацит", Q_n: 26.7, A_r: 10.00, fraction_ash: 0.7, G_vin: 1.2 },
            brown: { name: "Буре вугілля", Q_n: 15.0, A_r: 40.00, fraction_ash: 0.9, G_vin: 2.0 }
        }
    },
    mazut: { // Мазут
        name: "Мазут",
        types: {
            m40: { name: "Мазут М-40", Q_n: 40.40, A_r: 0.15, fraction_ash: 1, G_vin: 0 },
            m100: { name: "Мазут М-100", Q_n: 39.00, A_r: 0.20, fraction_ash: 1, G_vin: 0 }
        }
    },
    gas: { // Природний газ
        name: "Природний газ",
        types: {
            urengoy: { name: "Газ Уренгой-Ужгород", Q_n: 33.08, A_r: 0, fraction_ash: 0, G_vin: 0 },
            asia: { name: "Газ Середня Азія-Центр", Q_n: 31.80, A_r: 0, fraction_ash: 0, G_vin: 0 }
        }
    }
};

// Коефіцієнт ефективності очищення димових газів від твердих частинок
const ash_collection_efficiency = 0.985;

// Оновлення списку видів палива в залежності від вибраного типу
function updateFuelTypes() {
    const fuelType = document.getElementById("fuelType").value; // Отримання вибраного типу палива
    const fuelSubtypeSelect = document.getElementById("fuelSubtype"); // Вибір селектора підтипів палива

    fuelSubtypeSelect.innerHTML = ""; // Очищення випадаючого списку перед оновленням

    // Додавання варіантів підтипів палива у випадаючий список
    Object.entries(fuelData[fuelType].types).forEach(([key, value]) => {
        let option = document.createElement("option");
        option.value = key;
        option.textContent = value.name;
        fuelSubtypeSelect.appendChild(option);
    });
}

// Обчислення валових викидів твердих частинок
function calculateEmissions() {
    const fuelType = document.getElementById("fuelType").value; // Отримання вибраного типу палива
    const fuelSubtype = document.getElementById("fuelSubtype").value; // Отримання вибраного виду палива
    const fuelAmount = parseFloat(document.getElementById("fuelAmount").value) || 0; // Отримання кількості палива

    // Перевірка на коректність введених даних
    if (!fuelType || !fuelSubtype || fuelAmount <= 0) {
        document.getElementById("result").innerHTML = "Будь ласка, виберіть паливо та введіть кількість.";
        return;
    }

    const fuel = fuelData[fuelType].types[fuelSubtype]; // Отримання об'єкта вибраного палива

    // Розрахунок показника емісії твердих частинок
    const k_tw = (1e6 / fuel.Q_n) * fuel.fraction_ash * (fuel.A_r / (100 - fuel.G_vin)) * (1 - ash_collection_efficiency);

    // Розрахунок загальних викидів твердих частинок
    const E = 1e-6 * k_tw * fuel.Q_n * fuelAmount;

    // Вивід результатів
    document.getElementById("result").innerHTML = `
        <strong>Результати розрахунку для ${fuel.name}:</strong><br>
        - Показник емісії: ${k_tw.toFixed(2)} г/ГДж<br>
        - Загальні викиди твердих частинок: ${E.toFixed(2)} т
    `;
}

// Оновлення списку видів палива при завантаженні сторінки
document.addEventListener("DOMContentLoaded", updateFuelTypes);

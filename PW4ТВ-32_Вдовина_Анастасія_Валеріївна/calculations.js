// Калькулятор 1 — трифазне КЗ
function calculate1() {
    const U = parseFloat(document.getElementById('u').value);
    const Z = parseFloat(document.getElementById('z').value);

    if (isNaN(U) || isNaN(Z)) {
        alert("Будь ласка, заповніть усі поля!");
        return;
    }

    const Ik = (U * 1000) / (Math.sqrt(3) * Z); // А
    const Ik_kA = Ik / 1000;

    document.getElementById('result').innerText = `Струм короткого замикання: ${Ik_kA.toFixed(2)} кА`;
}

// Калькулятор 2 — однофазне КЗ з режимами
function calculate2() {
    const U = parseFloat(document.getElementById('u2').value);
    const Z = parseFloat(document.getElementById('z').value);
    const mode = document.getElementById('mode').value;

    if (isNaN(U) || isNaN(Z)) {
        alert("Будь ласка, заповніть усі поля!");
        return;
    }

    const I = (U * 1000) / Z;
    let modeText = "";

    switch (mode) {
        case "norm":
            modeText = "Нормальний режим";
            break;
        case "min":
            modeText = "Мінімальний режим";
            break;
        case "emerg":
            modeText = "Аварійний режим";
            break;
    }

    const result = `🔧 ${modeText}: ${I.toFixed(2)} А`;
    document.getElementById('result2').innerText = result;
}

// Калькулятор 3 — перевірка термічної та динамічної стійкості
function calculate3() {
    const Ik = parseFloat(document.getElementById('Ik3').value);
    const tk = parseFloat(document.getElementById('tk').value);
    const S = parseFloat(document.getElementById('S').value);

    if (isNaN(Ik) || isNaN(tk) || isNaN(S)) {
        alert("Будь ласка, заповніть усі поля!");
        return;
    }

    const K = 143; // коефіцієнт для мідного кабелю
    const S_required = (Ik * 1000 * Math.sqrt(tk)) / K;

    const thermal = S >= S_required ? "✅ Термічна стійкість: витримано" : "❌ Термічна стійкість: не витримано";
    const dynamic = Ik <= (S * 60) ? "✅ Динамічна стійкість: витримано" : "❌ Динамічна стійкість: не витримано";

    const result = `${thermal}\n${dynamic}\nНеобхідний мінімальний переріз: ${S_required.toFixed(1)} мм²`;
    document.getElementById('result3').innerText = result;
}

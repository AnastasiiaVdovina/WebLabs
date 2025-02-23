function calculate() {
    // Отримуємо значення з полів вводу
    var H = parseFloat(document.getElementById("H").value);
    var C = parseFloat(document.getElementById("C").value);
    var S = parseFloat(document.getElementById("S").value);
    var N = parseFloat(document.getElementById("N").value);
    var O = parseFloat(document.getElementById("O").value);
    var W = parseFloat(document.getElementById("W").value);
    var A = parseFloat(document.getElementById("A").value);

    // Розрахунок коефіцієнтів переходу
    var K_PC = 100 / (100 - W);
    var K_PG = 100 / (100 - W - A);

    // Розрахунок складу сухої маси
    var H_C = H * K_PC;
    var C_C = C * K_PC;
    var S_C = S * K_PC;
    var N_C = N * K_PC;
    var O_C = O * K_PC;
    var A_C = A * K_PC;

    // Розрахунок складу горючої маси
    var H_G = H * K_PG;
    var C_G = C * K_PG;
    var S_G = S * K_PG;
    var N_G = N * K_PG;
    var O_G = O * K_PG;

    // Розрахунок нижчої теплоти згоряння
    var Q_P = ((339 * C) + (1030 * H) - (108.8 * (O - S)) - (25 * W))/1000; //МДж
    var Q_C = (Q_P + (0.025*W))* K_PC;
    var Q_G = (Q_P + (0.025*W)) * K_PG;

    // Вивід результатів
    document.getElementById("result").innerHTML = `
        <strong>1.1.</strong> Коефіцієнт переходу від робочої до сухої маси: ${K_PC.toFixed(2)}<br>
        <strong>1.2.</strong> Коефіцієнт переходу від робочої до горючої маси: ${K_PG.toFixed(2)}<br>
        <strong>1.3.</strong> Склад сухої маси: H=${H_C.toFixed(2)}%, C=${C_C.toFixed(2)}%, S=${S_C.toFixed(2)}%, N=${N_C.toFixed(2)}%, O=${O_C.toFixed(2)}%, A=${A_C.toFixed(2)}%<br>
        <strong>1.4.</strong> Склад горючої маси: H=${H_G.toFixed(2)}%, C=${C_G.toFixed(2)}%, S=${S_G.toFixed(2)}%, N=${N_G.toFixed(2)}%, O=${O_G.toFixed(2)}%<br>
        <strong>1.5.</strong> Нижча теплота згоряння для робочої маси: ${Q_P.toFixed(4)} МДж/кг<br>
        <strong>1.6.</strong> Нижча теплота згоряння для сухої маси: ${Q_C.toFixed(2)} МДж/кг<br>
        <strong>1.7.</strong> Нижча теплота згоряння для горючої маси: ${Q_G.toFixed(2)} МДж/кг
    `;
}
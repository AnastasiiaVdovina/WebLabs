function calculate() {
    // Отримуємо значення з полів вводу
    var C = parseFloat(document.getElementById("C").value);
    var H = parseFloat(document.getElementById("H").value);
    var O = parseFloat(document.getElementById("O").value);
    var S = parseFloat(document.getElementById("S").value);
    var Q = parseFloat(document.getElementById("Q").value);
    var W = parseFloat(document.getElementById("W").value);
    var A = parseFloat(document.getElementById("A").value);
    var V = parseFloat(document.getElementById("V").value);


    // Розрахунок коефіцієнтів переходу
    var K_PC = (100 - W)/100 ;
    var K_PG = (100 - W - A)/100;

    // Розрахунок робочої маси
    var C_R = C * K_PG;
    var H_R = H * K_PG;
    var O_R = O * K_PG;
    var S_R = S * K_PG;
    var A_R = A * K_PC;
    var V_R = V * K_PC;


    // Розрахунок теплоти згоряння
    var Q_R = ((Q * K_PG) - (0.025*W));

    // Вивід результатів
    document.getElementById("result").innerHTML = `
        <strong>2.1.</strong> Склад робочої маси: H=${H_R.toFixed(2)}%, C=${C_R.toFixed(2)}%, S=${S_R.toFixed(2)}%, O=${O_R.toFixed(2)}%, V=${V_R.toFixed(2)}%, A=${A_R.toFixed(2)}%<br>
        <strong>2.2.</strong> Нижча теплота згоряння для робочої маси: ${Q_R.toFixed(2)} МДж/кг
    `;
}
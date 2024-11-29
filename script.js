function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatInput(input) {
    let value = input.value.replace(/\D/g, ''); 
    if (value) {
        input.value = formatCurrency(value / 100); 
    } else {
        input.value = ''; 
    }
}

function calculate() {
    const salaryInput = document.getElementById('salary').value;
    const ageInput = document.getElementById('age').value;
    const injuryType = document.getElementById('injuryType').value;

    let salary = parseFloat(salaryInput.replace(/[^\d,-]/g, '').replace(',', '.'));

    if (isNaN(salary) || salary <= 0) {
        document.getElementById('result').innerText = 'Por favor, insira um salário válido.';
        return;
    }

    const age = parseInt(ageInput, 10);

    if (isNaN(age) || age < 18 || age > 75) {
        document.getElementById('result').innerText = 'Por favor, insira uma idade válida entre 18 e 75 anos.';
        return;
    }

    const remainingYears = 75 - age;
    const remainingMonths = remainingYears * 12;

    if (remainingYears <= 0) {
        document.getElementById('result').innerText = 'A idade informada já ultrapassa 75 anos. Por favor, insira uma idade válida.';
        return;
    }

    const injuryMap = {
        "visao_parcial_1_olho_afeta": 20,
        "visao_parcial_1_olho_nao_afeta": 10,
        "visao_parcial_2_olhos_afeta": 40,
        "visao_parcial_2_olhos_nao_afeta": 15,
        "visao_completa_1_olho_afeta": 70,
        "visao_completa_1_olho_nao_afeta": 30,
        "visao_completa_2_olhos": 100,
        "audicao_unilateral_afeta": 25,
        "audicao_bilateral_nao_afeta": 50,
        "audicao_bilateral_afeta": 100,
        "prejuizo_estetico_minimo": 3000,
        "prejuizo_estetico_medio": 30000,
        "prejuizo_estetico_maximo": 100000,
        "polegar_parcial": 30,
        "polegar_total": 50,
        "indicador_total": 20,
        "indicador_parcial": 10,
        "dedo_medio_completo": 15,
        "dedo_medio_parcial": 8,
        "anelar_completo": 8,
        "anelar_parcial": 4,
        "dedo_minimo_completo": 8,
        "dedo_minimo_parcial": 4,
        "perda_2_dedos": 40,
        "perda_3_dedos": 80,
        "perda_4_dedos": 100,
        "movimento_pinça_prejudicado": 60,
        "perda_de_mao": 100,
        "forca_leve_afeta": 10,
        "forca_leve_nao_afeta": 5,
        "forca_moderada_afeta": 40,
        "forca_moderada_nao_afeta": 5,
        "forca_grave_afeta": 70,
        "forca_grave_nao_afeta": 20,
        "mobilidade_leve_afeta": 20,
        "mobilidade_leve_nao_afeta": 5,
        "mobilidade_moderada_afeta": 50,
        "mobilidade_moderada_nao_afeta": 15,
        "mobilidade_grave_afeta": 100,
        "mobilidade_grave_nao_afeta": 20,
        "mobilidade_umeral_afeta": 80,
        "mobilidade_umeral_nao_afeta": 0,
        "encurtamento_membro": 30,
        "encurtamento_membro_menor": 5,
        "articulacao_leve": 15,
        "articulacao_media": 30,
        "articulacao_grave": 70,
        "dedo_pe_afeta": 10,
        "perda_2_dedos_pe_afeta": 25,
        "perda_3_dedos_pe_afeta": 40,
        "todos_dedos_pe_afeta": 50,
        "perda_pe": 100,
        "perda_perna": 100
    };

    let injuryPercentage = injuryMap[injuryType];

    if (typeof injuryPercentage === "undefined") {
        document.getElementById('result').innerText = 'Selecione um tipo de lesão válido.';
        return;
    }

    let compensation = (salary * (injuryPercentage / 100)) * remainingMonths;

    let explanation = `A compensação será de ${injuryPercentage}% do seu salário, ou seja, R$ ${formatCurrency(salary * (injuryPercentage / 100))} por mês. Para os ${remainingMonths} meses restantes até os 75 anos, o total será de R$ ${formatCurrency(compensation)}.`;

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = ` 
        <strong>Resultado:</strong><br>
        <span style="font-size: 24px; color: #333;">${formatCurrency(compensation)}</span><br><br>
        <strong>Explicação:</strong><br>
        <p>${explanation}</p>
    `;
}

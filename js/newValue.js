// usa vírgula como separador decimal, ponto como separador de milhar, sempre com 2 casas decimais
const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2, 
    style:'currency', 
    currency: 'BRL'
});

function moeda(valor) {
    const input = valor.target;
    // elimina tudo que não é dígito
    input.value = input.value.replace(/\D+/g, '');
    if (input.value.length === 0) // se não tem nada preenchido, não tem o que fazer
        return;
    // lembrando que o valor é a quantidade de centavos, então precisa dividir por 100
    input.value = formatter.format(parseInt(input.value) / 100);
}

document.getElementById('valor').addEventListener('input', moeda);
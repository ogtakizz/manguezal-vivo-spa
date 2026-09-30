export function validarCPF(cpf) {
  const numeros = cpf.replace(/\D/g, "");
  if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) return false;

  const calcularDigito = (base) => {
    let soma = 0;
    for (let i = 0; i < base.length; i++) {
      soma += parseInt(base[i]) * (base.length + 1 - i);
    }
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  const digito1 = calcularDigito(numeros.slice(0, 9));
  const digito2 = calcularDigito(numeros.slice(0, 10));

  return digito1 === parseInt(numeros[9]) && digito2 === parseInt(numeros[10]);
}

export function validarFormulario(form) {
    const erros = [];
    const cpfInput = form.querySelector('#cpf');

    // limpa qualquer estado de erro customizado ANTES de checar a validade geral
    if (cpfInput) {
        cpfInput.setCustomValidity('');
    }

    if (cpfInput && cpfInput.value && !validarCPF(cpfInput.value)) {
        cpfInput.setCustomValidity('CPF inválido');
        erros.push('CPF inválido.');
    }

    if (!form.checkValidity()) {
        erros.push('Preencha todos os campos obrigatórios corretamente.');
    }

    return erros;
}

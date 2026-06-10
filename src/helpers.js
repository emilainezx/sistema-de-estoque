function padronizarNome(nome) {
  const nomeMinusculo = nome.trim();
  const nomePadrao = nomeMinusculo.toLowerCase();
  return nomePadrao;
}

function validarQuantidade(quantidade) {
  if (quantidade < 0) {
    return false;
  }
  if (Number.isInteger(quantidade) === false) {
    return false;
  }
  return true;
}

function validarNomeProduto(nome) {
  if (nome.trim() === "") {
    console.log("O nome do produto não pode estar vazio.");
    return false;
  }

  if (!isNaN(nome[0])) {
    console.log("O nome do produto não pode começar com número.");
    return false;
  }

  return true;
}

export { padronizarNome, validarQuantidade, validarNomeProduto };

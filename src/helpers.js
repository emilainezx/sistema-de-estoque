import chalk from "chalk";

const padronizarNome = (nome) => nome.trim().toLowerCase();

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
    console.log(chalk.red("O nome do produto não pode estar vazio."));
    return false;
  }

  if (!isNaN(nome[0])) {
    console.log(chalk.red("O nome do produto não pode começar com número."));
    return false;
  }

  return true;
}

export { padronizarNome, validarQuantidade, validarNomeProduto };

function validarNomeProduto(nome) {
  if (nome.trim() === "") {
    console.log("O nome do produto não pode estar vazio.");
    return false;
  }

  if (!isNaN(nome[0])) {
    console.log("O nome do produto não pode começar com número.");
    return false;
  }
  
  if(!isNaN(nome[nome.length - 1])) {
    console.log("O nome do produto não pode termina com número"); 
    return false;
  }

  return true;
}
const resultado = validarNomeProduto("emilaine");
console.log(resultado);
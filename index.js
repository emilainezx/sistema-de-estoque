const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let produtos = ["Arroz", "Feijão", "Macarrão"];
let quantidades = [10, 5, 2];

function mostrarEstoque () {//FUNÇÂO PARA MOSTRAR ESTOQUE
    let total = 0;
    let menorQuantidade = quantidades[0];
    let menorProduto = produtos[0];

    console.log("\n=== ESTOQUE ===");

    for (let i = 0; i < quantidades.length; i++) {
    total += quantidades[i];
    console.log(`${produtos[i]} quantidade: ${quantidades[i]}`);

    if (quantidades[i] < menorQuantidade) {
        menorQuantidade = quantidades[i];
        menorProduto = produtos[i];
    }
    }
    
    console.log("total de itens no estoque:", total);
    console.log(
      `Item com menor estoque: ${menorProduto} quantidade: ${menorQuantidade}`,
    );
}
console.log("\nSISTEMA DE ESTOQUE");
menu();

function menu() {//FUNÇÂO DO MENU
  console.log("\nMENU");
  console.log("1 - Mostrar estoque");
  console.log("2 - Adicionar produto");
  console.log("3 - Remover produto")
  console.log("4 - Sair");

  rl.question("Qual opção? ", (opcao) => {
    console.log("Você digitou:", opcao)
    if (opcao == 1) {
    mostrarEstoque();
    menu();
  } else if (opcao == 2) {
    adicionarProduto();
  } else if (opcao == 3) {
    removerProduto();
  } else if (opcao == 4) {
    rl.close();
  } else {
    console.log("Escolha uma das 4 opções");
    menu();
  }
  })
}

function adicionarProduto () {//FUNÇÂO PARA ADICIONAR PRODUTO
rl.question("Qual produto deseja cadastrar?", (produtoNovo) => {
  console.log("Você digitou", produtoNovo);
  produtos.push(produtoNovo);

  rl.question("Qual a quantidade que tem desse produto?", (quantidadeNova) => {
    console.log("Você digitou:", quantidadeNova);
    const quantidadeNovaNumero = Number(quantidadeNova);
    quantidades.push(quantidadeNovaNumero);
    console.log(
      `Produto adicionado: ${produtoNovo} quantidade: ${quantidadeNova}`,
    );
    console.log("\nEstoque atualizado:");
    mostrarEstoque();
    menu();
  });
});
}

function removerProduto (){
  mostrarEstoque();
  rl.question("Qual produto você deseja remover?", (remover) =>{
    let encontrado = false;

    for(let i = 0; i < quantidades.length; i++ ) {
      if (produtos[i] === remover ) {
        const produtoRemovido = produtos.splice(i, 1);
        quantidades.splice(i, 1);
        encontrado = true
        console.log(`Item ${produtoRemovido} removido`);
        mostrarEstoque();
        menu();
        break;
      }
    }
    if (!encontrado) {
      console.log("Produto não encontrado");
      menu();
    }
  })
}
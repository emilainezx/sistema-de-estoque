const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let estoque = [];

function mostrarEstoque() {
  //FUNÇÂO PARA MOSTRAR ESTOQUE

  console.log("\n === ESTOQUE ===");

  for (let i = 0; i < estoque.length; i++) {
    console.log(
      `Nome: ${estoque[i].nome} Quantidade: ${estoque[i].quantidade}`,
    );
  }
}

console.log("\nSISTEMA DE ESTOQUE");
menu();

function menu() {
  //FUNÇÂO DO MENU
  console.log("\nMENU");
  console.log("1 - Mostrar estoque");
  console.log("2 - Adicionar produto");
  console.log("3 - Remover produto");
  console.log("4 - Atualizar produto");
  console.log("5 - Sair");

  rl.question("Qual opção? ", (opcao) => {
    console.log("Você digitou:", opcao);
    if (opcao == 1) {
      mostrarEstoque();
      menu();
    } else if (opcao == 2) {
      adicionarProduto();
    } else if (opcao == 3) {
      removerProduto();
    } else if (opcao == 4) {
      atualizarProduto();
    } else if (opcao == 5) {
      rl.close();
    } else {
      console.log("Escolha uma das 5 opções");
      menu();
    }
  });
}

function adicionarProduto() {
  //FUNÇÂO PARA ADICIONAR PRODUTO
  rl.question("\nQual produto deseja cadastrar?", (produtoNovo) => {
    console.log("\nVocê digitou", produtoNovo);
    const produtoPadronizado = padronizarNome(produtoNovo);

    let produtoExistente = false;
    for (let i = 0; i < estoque.length; i++) {
      if (estoque[i].nome === produtoPadronizado) {
        produtoExistente = true;
        break;
      }
    }
    if (produtoExistente) {
      console.log("Produto já cadastrado!");
      menu();
    } else {
      rl.question(
        "\nQual a quantidade que tem desse produto?",
        (quantidadeNova) => {
          console.log("\nVocê digitou:", quantidadeNova);
          const quantidadeNovoNumero = Number(quantidadeNova);

          if (isNaN(quantidadeNovoNumero)) {
            console.log("Erro. digite um número!");
            menu();
            return;
          }
          const quantidadeValida = validarQuantidade(quantidadeNovoNumero);

          if(quantidadeValida == false) {
            console.log("Quantidade deve ser um número inteiro maior ou igual a zero.");
            menu();
            return;
          }

          const produto = {
            nome: produtoPadronizado,
            quantidade: quantidadeNovoNumero,
          };
          estoque.push(produto);

          console.log(
            `Produto adicionado: ${produtoPadronizado} quantidade: ${quantidadeNovoNumero}`,
          );

          console.log("\nEstoque atualizado:");

          mostrarEstoque();
          menu();
        },
      );
    }
  });
}

function removerProduto() {
  mostrarEstoque();
  rl.question("Qual produto você deseja remover?", (remover) => {
    let encontrado = false;

    const produtoPadronizado = padronizarNome(remover);

    for (let i = 0; i < estoque.length; i++) {
      if (estoque[i].nome === produtoPadronizado) {
        const produtoRemovido = estoque.splice(i, 1);
        encontrado = true;
        console.log("Item", produtoRemovido[0].nome, "removido!");

        mostrarEstoque();

        menu();

        break;
      }
    }
    if (!encontrado) {
      console.log("Produto não encontrado");
      menu();
    }
  });
}

function atualizarProduto() {

  mostrarEstoque();

  rl.question("Qual produto deseja atualizar?", (produtoAtualizar) => {
    let encontrado = false;

    const produtoPadronizado = padronizarNome(produtoAtualizar);

    for (let i = 0; i < estoque.length; i++) {

      if (estoque[i].nome === produtoPadronizado) {
        encontrado = true;
        rl.question("Qual a nova quantidade?", (quantidadeNova) => {
          const quantidadeNovaNumero = Number(quantidadeNova);

          if (isNaN(quantidadeNovaNumero)) {
            console.log("Quantidade informada não é um número");
            menu();
            return;
          }

        const quantidadeValida = validarQuantidade(quantidadeNovaNumero);

        if(!quantidadeValida) {
            console.log("Quantidade deve ser um número inteiro maior ou igual a zero.");
            menu();
            return;
        }
        estoque[i].quantidade = quantidadeNovaNumero;

        console.log("Item:", estoque[i].nome,"alterado para a quantidade:", estoque[i].quantidade,"com sucesso!");

        mostrarEstoque();

        menu();
  
        })
        }

    }
    if (!encontrado) {
      console.log("Produto não encontrado");
      menu();
    }
    });
}

function padronizarNome(nome) {
  const nomeMinusculo = nome.trim();
  const nomePadrao = nomeMinusculo.toLowerCase();
  return nomePadrao;
}

function validarQuantidade(quantidade) {
  if (quantidade < 0){
    return false
  } 
    if(Number.isInteger(quantidade)  === false) {
      return false
    }
      return true
  }


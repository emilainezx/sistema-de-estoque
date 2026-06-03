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

    let produtoExistente = false;
    for (let i = 0; i < estoque.length; i++) {
      if (estoque[i].nome === produtoNovo) {
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
          const quantidadeNovaNumero = Number(quantidadeNova);

          if (isNaN(quantidadeNovaNumero)) {
            console.log("Erro. digite um número!");
            menu();
            return;
          }
          const produto = {
            nome: produtoNovo,
            quantidade: quantidadeNovaNumero,
          };
          estoque.push(produto);

          console.log(
            `Produto adicionado: ${produtoNovo} quantidade: ${quantidadeNova}`,
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

    for (let i = 0; i < estoque.length; i++) {
      if (estoque[i].nome === remover) {
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

    for (let i = 0; i < estoque.length; i++) {
      if (estoque[i].nome === produtoAtualizar) {
        encontrado = true;

        rl.question("Qual a nova quantidade?", (quantidadeNova) => {
          const quantidadeNovaNumero = Number(quantidadeNova);

          if (isNaN(quantidadeNovaNumero)) {
            console.log("Quantidade informada não é um número");
            menu();
          } else {
            estoque[i].quantidade = quantidadeNovaNumero;
            console.log(
              "Item:",
              estoque[i].nome,
              "alterado para a quantidade:",
              estoque[i].quantidade,
              "com sucesso!",
            );

            mostrarEstoque();

            menu();
          }
        });

        break;
      }
    }
    if (!encontrado) {
      console.log("Produto não encontrado");
      menu();
    }
  });
}

import { rl } from "./rl.js";
import {
  padronizarNome,
  validarNomeProduto,
  validarQuantidade,
} from "./helpers.js";

let estoque = [];

function mostrarEstoque() {
  if (estoque.length === 0) {
    console.log("Estoque vazio!");
    return;
  }

  console.log("\n === ESTOQUE ===");

  for (let i = 0; i < estoque.length; i++) {
    console.log(
      `Nome: ${estoque[i].nome} Quantidade: ${estoque[i].quantidade}`,
    );
  }
}

function adicionarProduto(voltarMenu) {
  rl.question("\nQual produto deseja cadastrar?", (produtoNovo) => {
    console.log("\nVocê digitou", produtoNovo);
    const produtoPadronizado = padronizarNome(produtoNovo);

    const nomeValido = validarNomeProduto(produtoPadronizado);
    if (!nomeValido) {
      voltarMenu();
      return;
    }

    let produtoExistente = false;
    for (let i = 0; i < estoque.length; i++) {
      if (estoque[i].nome === produtoPadronizado) {
        produtoExistente = true;
        break;
      }
    }
    if (produtoExistente) {
      console.log("Produto já cadastrado!");

      voltarMenu();
      return;
    } else {
      rl.question(
        "\nQual a quantidade que tem desse produto?",
        (quantidadeNova) => {
          console.log("\nVocê digitou:", quantidadeNova);
          const quantidadeNovaNumero = Number(quantidadeNova);

          if (isNaN(quantidadeNovaNumero)) {
            console.log("Erro. digite um número!");

            voltarMenu();
            return;
          }
          const quantidadeValida = validarQuantidade(quantidadeNovaNumero);

          if (!quantidadeValida) {
            console.log(
              "Quantidade deve ser um número inteiro maior ou igual a zero.",
            );

            voltarMenu();
            return;
          }

          const produto = {
            nome: produtoPadronizado,
            quantidade: quantidadeNovaNumero,
          };
          estoque.push(produto);

          console.log(
            `Produto adicionado: ${produtoPadronizado} quantidade: ${quantidadeNovaNumero}`,
          );

          console.log("\nEstoque atualizado:");

          mostrarEstoque();

          voltarMenu();
        },
      );
    }
  });
}

function removerProduto(voltarMenu) {
  if (estoque.length === 0) {
    console.log("Estoque vazio!");

    voltarMenu();
    return;
  }

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

        voltarMenu();

        break;
      }
    }
    if (!encontrado) {
      console.log("Produto não encontrado");

      voltarMenu();
    }
  });
}

function atualizarProduto(voltarMenu) {
  if (estoque.length === 0) {
    console.log("Estoque vazio!");

    voltarMenu();
    return;
  }

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

            voltarMenu();
            return;
          }

          const quantidadeValida = validarQuantidade(quantidadeNovaNumero);

          if (!quantidadeValida) {
            console.log(
              "Quantidade deve ser um número inteiro maior ou igual a zero.",
            );

            voltarMenu();
            return;
          }
          estoque[i].quantidade = quantidadeNovaNumero;

          console.log(
            "Item:",
            estoque[i].nome,
            "alterado para a quantidade:",
            estoque[i].quantidade,
            "com sucesso!",
          );

          mostrarEstoque();

          voltarMenu();
        });
      }
    }
    if (!encontrado) {
      console.log("Produto não encontrado");

      voltarMenu();
    }
  });
}

export { mostrarEstoque, adicionarProduto, removerProduto, atualizarProduto };

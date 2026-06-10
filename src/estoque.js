import { rl } from "./rl.js";
import {
  padronizarNome,
  validarNomeProduto,
  validarQuantidade,
} from "./helpers.js";
import chalk from "chalk";
import Table from 'cli-table3';

let estoque = [
    {
    nome: "mouse gamer",
    quantidade: 15,
  },
  {
    nome: "teclado mecanico",
    quantidade: 8,
  },
  {
    nome: "monitor 24 polegadas",
    quantidade: 4,
  },
  {
    nome: "headset",
    quantidade: 12,
  },
  {
    nome: "webcam full hd",
    quantidade: 6,
  },
  {
    nome: "notebook",
    quantidade: 3,
  },
  {
    nome: "cabo hdmi",
    quantidade: 25,
  },
  {
    nome: "ssd 1tb",
    quantidade: 10,
  },

];


function mostrarEstoque() {

  if (estoque.length === 0) {
    console.log(chalk.yellow("Estoque vazio!"));
    return;
  }

    const table = new Table({
    head: ['Produto', 'Quantidade']
  , colWidths: [20, 15]
});

  console.log(chalk.blue(" === ESTOQUE ==="));

  for (let i = 0; i < estoque.length; i++) {
  table.push(
      [chalk.green(estoque[i].nome), chalk.yellow(estoque[i].quantidade)]
    
);
}
  console.log(table.toString());

}

function adicionarProduto(voltarMenu) {
  rl.question("\nQual produto deseja cadastrar?", (produtoNovo) => {
    console.log(chalk.green("\nVocê digitou", produtoNovo));
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
      console.log(chalk.yellow("Produto já cadastrado!"));

      voltarMenu();
      return;
    } else {
      rl.question(
        "Qual a quantidade que tem desse produto?",
        (quantidadeNova) => {
          console.log(chalk.green("\nVocê digitou:", quantidadeNova));
          const quantidadeNovaNumero = Number(quantidadeNova);

          if (isNaN(quantidadeNovaNumero)) {
            console.log(chalk.red("Erro. digite um número!"));

            voltarMenu();
            return;
          }
          const quantidadeValida = validarQuantidade(quantidadeNovaNumero);

          if (!quantidadeValida) {
            console.log(
              chalk.red("Quantidade deve ser um número inteiro maior ou igual a zero.")
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
            chalk.green(`Produto adicionado: ${chalk.yellow(produtoPadronizado)} quantidade: ${chalk.yellow(quantidadeNovaNumero)}`)
          );

          console.log(chalk.green("\nEstoque atualizado:"));

          mostrarEstoque();

          voltarMenu();
        },
      );
    }
  });
}

function removerProduto(voltarMenu) {
  if (estoque.length === 0) {
    console.log(chalk.yellow("Estoque vazio!"));

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
        console.log(chalk.green("Item", produtoRemovido[0].nome, "removido!"));

        mostrarEstoque();

        voltarMenu();

        break;
      }
    }
    if (!encontrado) {
      console.log(chalk.red("Produto não encontrado"));

      voltarMenu();
    }
  });
}

function atualizarProduto(voltarMenu) {
  if (estoque.length === 0) {
    console.log(chalk.yellow("Estoque vazio!"));

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
            console.log(chalk.red("Quantidade informada não é um número"));

            voltarMenu();
            return;
          }

          const quantidadeValida = validarQuantidade(quantidadeNovaNumero);

          if (!quantidadeValida) {
            console.log(
              chalk.red("Quantidade deve ser um número inteiro maior ou igual a zero.")
            );

            voltarMenu();
            return;
          }
          estoque[i].quantidade = quantidadeNovaNumero;

          console.log(
            chalk.green("Item:",
            estoque[i].nome,
            "alterado para a quantidade:",
            estoque[i].quantidade,
            "com sucesso!",)
          );

          mostrarEstoque();

          voltarMenu();
        });
      }
    }
    if (!encontrado) {
      console.log(chalk.red("Produto não encontrado"));

      voltarMenu();
    }
  });
}

export { mostrarEstoque, adicionarProduto, removerProduto, atualizarProduto };

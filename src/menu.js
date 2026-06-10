import { rl } from "./rl.js";
import { mostrarEstoque, adicionarProduto, removerProduto, atualizarProduto } from "./estoque.js";

export function menu() {
  console.log("\n === MENU ===");
  console.log("1 - Mostrar estoque");
  console.log("2 - Adicionar produto");
  console.log("3 - Remover produto");
  console.log("4 - Atualizar produto");
  console.log("5 - Sair");

  rl.question("Qual opção? ", (opcao) => {
    console.log("\nVocê digitou:", opcao);
    if (opcao == 1) {
      mostrarEstoque();
      menu();
    } else if (opcao == 2) {
      adicionarProduto(menu);
    } else if (opcao == 3) {
      removerProduto(menu);
    } else if (opcao == 4) {
      atualizarProduto(menu);
    } else if (opcao == 5) {
      rl.close();
    } else {
      console.log("Escolha uma das 5 opções");
      menu();
    }
  });
}

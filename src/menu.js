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
    switch (opcao) {
      case "1": {
        mostrarEstoque();
        menu();
        break;
      }
      case "2": {
        adicionarProduto(menu);
        break;
      }
      case "3": {
        removerProduto(menu);
        break;
      }
      case "4": {
        atualizarProduto(menu);
        break;
      }
      case "5": {
        rl.close();
        break;
      } 
      default: {
        console.log("Escolha uma das 5 opções");
        menu();
      }
    }
  });
}

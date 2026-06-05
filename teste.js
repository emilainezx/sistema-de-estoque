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
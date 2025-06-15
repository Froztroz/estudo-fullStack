function filtrarProdutos(produtos, nomeProcurado) {
  if (!Array.isArray(produtos)) {
    throw new Error("O parâmetro 'produtos' deve ser um array de objetos");
  }

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(nomeProcurado.toLowerCase())
  );

  return produtosFiltrados; // ← retorno como array de objetos
}


module.exports = filtrarProdutos;
// Usar para filtar os produtos que foram coletados e comparar com o nome que foi pesquisado

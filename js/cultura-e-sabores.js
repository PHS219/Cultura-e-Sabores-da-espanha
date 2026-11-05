document.addEventListener("DOMContentLoaded", function () {
  const botoesPrincipais = document.querySelectorAll(".botao-menu-lateral");
  const paineisPrincipais = document.querySelectorAll(".painel-conteudo");

  botoesPrincipais.forEach((botao) => {
    botao.addEventListener("click", function () {
      const painelDestino = botao.getAttribute("data-painel");

      botoesPrincipais.forEach((item) => item.classList.remove("ativo"));
      paineisPrincipais.forEach((painel) => painel.classList.remove("ativo"));

      botao.classList.add("ativo");

      const painelSelecionado = document.getElementById(painelDestino);
      if (painelSelecionado) {
        painelSelecionado.classList.add("ativo");
      }
    });
  });

  const botoesArtistas = document.querySelectorAll(".botao-menu-artistas");
  const paineisArtistas = document.querySelectorAll(".painel-artistas-interno");

  botoesArtistas.forEach((botao) => {
    botao.addEventListener("click", function () {
      const subpainelDestino = botao.getAttribute("data-subpainel");

      botoesArtistas.forEach((item) => item.classList.remove("ativo"));
      paineisArtistas.forEach((painel) => painel.classList.remove("ativo"));

      botao.classList.add("ativo");

      const subpainelSelecionado = document.getElementById(subpainelDestino);
      if (subpainelSelecionado) {
        subpainelSelecionado.classList.add("ativo");
      }
    });
  });
});
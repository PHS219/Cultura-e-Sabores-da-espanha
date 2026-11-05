document.addEventListener('DOMContentLoaded', function () {
  const imagens = [
    { nome: 'Paella', src: 'Galeria/Figs/figurinha-paella.jpg' },
    { nome: 'Costa Brava', src: 'Galeria/Figs/figurinha-costa-brava.jpg' },
    { nome: 'Salvador Dalí', src: 'Galeria/Figs/figurinha-salvador-dali.jpg' },
    { nome: 'Tourada', src: 'Galeria/Figs/figurinha-tourada.jpg' },
    { nome: 'ADM 627', src: 'Galeria/Figs/figurinha-adm-627.jpg' },
    { nome: 'Parque Güell', src: 'Galeria/Figs/figurinha-parque-guell.jpg' }
  ];

  const grade = document.getElementById('grade-jogo-memoria');
  const movimentosEl = document.getElementById('contagem-movimentos');
  const paresEl = document.getElementById('contagem-pares');
  const tempoEl = document.getElementById('contagem-tempo');
  const botaoReiniciar = document.getElementById('botao-reiniciar-jogo');
  const botaoJogarNovamente = document.getElementById('botao-jogar-novamente');
  const modalVitoria = document.getElementById('modal-vitoria');
  const mensagemVitoria = document.getElementById('mensagem-vitoria');
  const estrelasEl = document.getElementById('estrelas-desempenho');

  let primeiraCarta = null;
  let segundaCarta = null;
  let bloqueado = false;
  let movimentos = 0;
  let paresEncontrados = 0;
  let segundos = 0;
  let timer = null;
  let timerAtivo = false;

  function embaralhar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  function formatarTempo(totalSegundos) {
    const minutos = String(Math.floor(totalSegundos / 60)).padStart(2, '0');
    const segs = String(totalSegundos % 60).padStart(2, '0');
    return `${minutos}:${segs}`;
  }

  function atualizarPainel() {
    movimentosEl.textContent = movimentos;
    paresEl.textContent = `${paresEncontrados}/6`;
    tempoEl.textContent = formatarTempo(segundos);
  }

  function iniciarTimer() {
    if (timerAtivo) return;
    timerAtivo = true;
    timer = setInterval(() => {
      segundos++;
      atualizarPainel();
    }, 1000);
  }

  function pararTimer() {
    clearInterval(timer);
    timer = null;
    timerAtivo = false;
  }
function calcularEstrelas() {
  if (movimentos <= 12) return 3;
  if (movimentos <= 18) return 2;
  return 1;
}

function renderizarEstrelas(total) {
  estrelasEl.innerHTML = '';

  for (let i = 1; i <= 3; i++) {
    const estrela = document.createElement('span');
    estrela.className = 'estrela';
    estrela.textContent = '★';

    if (i <= total) {
      estrela.classList.add('ativa', 'ouro');
    }

    estrelasEl.appendChild(estrela);
  }
}
  function mostrarVitoria() {
  const totalEstrelas = calcularEstrelas();

  mensagemVitoria.textContent =
    `Você encontrou todos os pares em ${movimentos} movimentos e ${formatarTempo(segundos)}.`;

  renderizarEstrelas(totalEstrelas);
  modalVitoria.classList.remove('oculto');
}

 function criarTabuleiro() {
  grade.innerHTML = '';
  primeiraCarta = null;
  segundaCarta = null;
  bloqueado = false;
  movimentos = 0;
  paresEncontrados = 0;
  segundos = 0;
  pararTimer();
  modalVitoria.classList.add('oculto');
  estrelasEl.innerHTML = '';
  atualizarPainel();

    const cartas = embaralhar(
      [...imagens, ...imagens].map((item, index) => ({ ...item, id: index }))
    );

    cartas.forEach((item) => {
      const carta = document.createElement('button');
      carta.type = 'button';
      carta.className = 'cartao-memoria';
      carta.dataset.nome = item.nome;
      carta.setAttribute('aria-label', `Carta do jogo da memória: ${item.nome}`);

      carta.innerHTML = `
        <div class="cartao-memoria-inner">
          <div class="face-memoria frente-memoria"></div>
          <div class="face-memoria verso-memoria">
            <img src="${item.src}" alt="${item.nome}">
          </div>
        </div>
      `;

      carta.addEventListener('click', function () {
        virarCarta(carta);
      });

      grade.appendChild(carta);
    });
  }

  function virarCarta(carta) {
    if (bloqueado || carta === primeiraCarta || carta.classList.contains('encontrado')) {
      return;
    }

    iniciarTimer();
    carta.classList.add('virado');

    if (!primeiraCarta) {
      primeiraCarta = carta;
      return;
    }

    segundaCarta = carta;
    movimentos++;
    atualizarPainel();
    verificarPar();
  }

  function verificarPar() {
    if (!primeiraCarta || !segundaCarta) return;

    const igual = primeiraCarta.dataset.nome === segundaCarta.dataset.nome;

    if (igual) {
      primeiraCarta.classList.add('encontrado');
      segundaCarta.classList.add('encontrado');
      primeiraCarta = null;
      segundaCarta = null;
      paresEncontrados++;
      atualizarPainel();

      if (paresEncontrados === 6) {
        pararTimer();
        setTimeout(mostrarVitoria, 300);
      }
      return;
    }

    bloqueado = true;

    setTimeout(() => {
      primeiraCarta.classList.remove('virado');
      segundaCarta.classList.remove('virado');
      primeiraCarta = null;
      segundaCarta = null;
      bloqueado = false;
    }, 900);
  }

  botaoReiniciar.addEventListener('click', criarTabuleiro);
  botaoJogarNovamente.addEventListener('click', criarTabuleiro);

  criarTabuleiro();
});
``
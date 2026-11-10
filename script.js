/* =====================================================
   SCRIPT DO PORTFÓLIO
   Faz 3 coisas:
   1. Revela os elementos com animação quando aparecem na tela
   2. Destaca no menu a seção que está sendo vista
   3. Enche a barra de progresso no topo conforme a rolagem
   ===================================================== */

// Avisa o CSS que o JavaScript está funcionando.
// Assim, os elementos só ficam escondidos (antes da animação) se o script rodar.
document.documentElement.classList.add('js');


/* ---------- 1. REVELAR ELEMENTOS AO ROLAR A PÁGINA ---------- */

// Pega todos os elementos marcados com class="revelar" no HTML
const elementosParaRevelar = document.querySelectorAll('.revelar');

// Dá um pequeno atraso para cada elemento dentro da mesma seção,
// para eles aparecerem em sequência (um depois do outro) e não todos juntos.
elementosParaRevelar.forEach((elemento) => {
    const irmaos = elemento.parentElement.querySelectorAll(':scope > .revelar');
    const posicao = Array.from(irmaos).indexOf(elemento);
    elemento.style.setProperty('--atraso', `${posicao * 0.12}s`);
});

// O IntersectionObserver avisa quando um elemento entra na tela
const observadorDeRevelar = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel'); // o CSS faz a animação
            observadorDeRevelar.unobserve(entrada.target); // anima só uma vez
        }
    });
}, { threshold: 0.15 }); // dispara quando 15% do elemento aparece

elementosParaRevelar.forEach((elemento) => observadorDeRevelar.observe(elemento));


/* ---------- 2. DESTACAR A SEÇÃO ATUAL NO MENU ---------- */

const linksDoMenu = document.querySelectorAll('.topo nav a');
const secoes = document.querySelectorAll('main section[id]');

const observadorDoMenu = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        // Marca como "ativo" só o link que aponta para a seção visível
        linksDoMenu.forEach((link) => {
            const apontaParaEstaSecao = link.getAttribute('href') === '#' + entrada.target.id;
            link.classList.toggle('ativo', apontaParaEstaSecao);
        });
    });
}, { rootMargin: '-40% 0px -55% 0px' }); // considera a seção que cruza o meio da tela

secoes.forEach((secao) => observadorDoMenu.observe(secao));


/* ---------- 3. BARRA DE PROGRESSO DA ROLAGEM ---------- */

const barraDeProgresso = document.getElementById('progresso');

function atualizarProgresso() {
    const alturaRolavel = document.documentElement.scrollHeight - window.innerHeight;
    const porcentagem = alturaRolavel > 0 ? window.scrollY / alturaRolavel : 0;
    barraDeProgresso.style.transform = `scaleX(${porcentagem})`;
}

window.addEventListener('scroll', atualizarProgresso, { passive: true });
atualizarProgresso();

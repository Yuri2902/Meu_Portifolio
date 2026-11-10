// Destaca no menu a seção que está na tela
const links = document.querySelectorAll('.topo nav a');
const secoes = document.querySelectorAll('main section[id]');

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        links.forEach((link) => {
            link.classList.toggle('ativo', link.getAttribute('href') === '#' + entrada.target.id);
        });
    });
}, { rootMargin: '-40% 0px -55% 0px' });

secoes.forEach((secao) => observador.observe(secao));

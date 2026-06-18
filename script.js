const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("mostrar");
        }
    });
});

const secoes = document.querySelectorAll(".secao");

secoes.forEach(secao => {
    observer.observe(secao);
});
import {
    templateHome,
    templateProjetos,
    templateCadastro
}
from './templates.js';

const rotas =  {
    home: templateHome,
    projetos: templateProjetos,
    cadastro: templateCadastro
};

function obterRota(){
    const hash = window.location.hash;
    if (!hash.startsWith('#/')) {
        const nomeArquivo = window.location.pathname
            .split('/')
            .pop()
            .replace(/\.html$/i, '');

        return rotas[nomeArquivo] ? nomeArquivo : 'home';
    }

    const rota = hash
        .replace('#/', '')
        .split('#')[0];

        return rota || 'home';
}

export function renderizarRota() {
    const container = document.querySelector('.conteudo-principal');
    const rotaAtual = obterRota();
    const template = rotas[rotaAtual] || templateHome;

    container.innerHTML = template();
    document.dispatchEvent(new Event('spa:renderizada'));

    const partesHash = window.location.hash.split('#');
    const ancora = window.location.hash.startsWith('#/')
        ? partesHash[2]
        : partesHash[1];

    if (ancora) {
        const elemento = document.getElementById(ancora);

        elemento?.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

function configurarNavegacao() {
    document.addEventListener('click', (evento) => {
        const link = evento.target.closest('a');

        if (!link) {
            return;
        }

        const destino = link.getAttribute('href');

        if (!destino || destino.startsWith('mailto:') || destino.startsWith('tel:')) {
            return;
        }

        if (destino.includes('.html')) {
            evento.preventDefault();
            link.closest('details')?.removeAttribute('open');

            const [pagina, ancora] = destino.split('#');

            const rota = pagina
                .replace('.html', '')
                .replace('index', 'home');

            window.location.hash = ancora
                ? `/${rota}#${ancora}`
                : `/${rota}`;
        }
    });
}

export function iniciarRoteador() {
    configurarNavegacao();

    window.addEventListener('hashchange', renderizarRota);

    renderizarRota();
}
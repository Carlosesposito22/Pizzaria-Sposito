const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 0);

})

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('open');
}

const sr = ScrollReveal({
    distance: '30px',
    duration: 1000,
    reset: true
})
sr.reveal('.menuP-texto, .contato', { delay: 200, origin: 'left' });
sr.reveal('.menuP-img, .form', { delay: 200, origin: 'right' });
sr.reveal('.container, .container-box, .menu, .menu-content', { delay: 200, origin: 'bottom' });

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const nome = document.getElementById('nome');
    const telefone = document.getElementById('telefone');
    const mensagem = document.getElementById('mensagem');

    const nomeError = document.getElementById('nomeError');
    const telefoneError = document.getElementById('telefoneError');
    const mensagemError = document.getElementById('mensagemError');

    const validateNome = () => {
        if (nome.value.trim() === '') {
            nomeError.textContent = 'Nome é obrigatório.';
            nomeError.style.display = 'block';
        } else {
            nomeError.textContent = '';
            nomeError.style.display = 'none';
        }
    };

    const validateTelefone = () => {
        const telefonePattern = /^\d{10,11}$/;
        if (!telefonePattern.test(telefone.value.trim())) {
            telefoneError.textContent = 'Telefone deve conter 10 ou 11 dígitos.';
            telefoneError.style.display = 'block';
        } else {
            telefoneError.textContent = '';
            telefoneError.style.display = 'none';
        }
    };

    const validateMensagem = () => {
        if (mensagem.value.trim() === '') {
            mensagemError.textContent = 'Mensagem é obrigatória.';
            mensagemError.style.display = 'block';
        } else {
            mensagemError.textContent = '';
            mensagemError.style.display = 'none';
        }
    };

    nome.addEventListener('input', validateNome);
    telefone.addEventListener('input', validateTelefone);
    mensagem.addEventListener('input', validateMensagem);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        validateNome();
        validateTelefone();
        validateMensagem();

        if (nomeError.textContent === '' && telefoneError.textContent === '' && mensagemError.textContent === '') {
            alert('Mensagem enviada com sucesso!');
            form.reset();
        } else {
            alert('Por favor, corrija os erros antes de enviar.');
        }
    });
});

let currentLang = 'pt';

function switchLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-lang-pt], [data-lang-en]').forEach(element => {
        if (element.tagName.toLowerCase() === 'input' && element.type === 'submit') {
            element.value = lang === 'pt' ? element.getAttribute('data-lang-pt') : element.getAttribute('data-lang-en');
        } else if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
            element.placeholder = lang === 'pt' ? element.getAttribute('data-lang-pt') : element.getAttribute('data-lang-en');
        } else {
            if (lang === 'pt' && element.dataset.langPt) {
                element.textContent = element.dataset.langPt;
            } else if (lang === 'en' && element.dataset.langEn) {
                element.textContent = element.dataset.langEn;
            }
        }
    });
    translateImages(lang);

    function translateImages(lang) {
        const images = document.querySelectorAll('[data-img-pt], [data-img-en]');
    
        images.forEach(image => {
            const newSrc = lang === 'pt' ? image.getAttribute('data-img-pt') : image.getAttribute('data-img-en');
            image.src = newSrc;
        });
    }
}

document.getElementById('btn-pt').addEventListener('click', () => switchLanguage('pt'));
document.getElementById('btn-en').addEventListener('click', () => switchLanguage('en'));

function setInitialLanguage() {
    const preferredLanguage = navigator.language || navigator.userLanguage;
    switchLanguage(preferredLanguage.startsWith('pt') ? 'pt' : 'en');
}

setInitialLanguage();








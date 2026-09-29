import { iniciarComponentes } from './componentes.js';
import { iniciarFormulario } from './form.js';
import { iniciarRoteador } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    iniciarComponentes();
    iniciarFormulario();
    iniciarRoteador();
});
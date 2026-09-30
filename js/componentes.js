import { abrirModal, fecharModal, manterFocoNoModal } from './modais.js';

export function iniciarComponentes() {
	document.addEventListener('click', (evento) => {
		const submenuAberto = document.querySelector('.item-dropdown details[open]');

		if (submenuAberto && !evento.target.closest('.item-dropdown')) {
			submenuAberto.removeAttribute('open');
		}

		const botaoMenu = evento.target.closest('.menu-hamburguer');

		if (botaoMenu) {
			const menu = document.querySelector('.menu-navegacao');

			if (!menu) {
				return;
			}

			const menuAberto = menu.classList.toggle('ativo');
			botaoMenu.setAttribute('aria-expanded', String(menuAberto));
			botaoMenu.setAttribute(
				'aria-label',
				menuAberto ? 'Fechar Menu de Navegação' : 'Abrir Menu de Navegação'
			);
			return;
		}

		const linkMenu = evento.target.closest('.menu-navegacao a');

		if (linkMenu) {
			linkMenu.closest('details')?.removeAttribute('open');
			document.querySelector('.menu-navegacao')?.classList.remove('ativo');
			document.querySelector('.menu-hamburguer')?.setAttribute('aria-expanded', 'false');
			document.querySelector('.menu-hamburguer')?.setAttribute(
				'aria-label',
				'Abrir Menu de Navegação'
			);
		}

		const botaoAbrirModal = evento.target.closest('[data-bs-toggle="modal"]');

		if (botaoAbrirModal) {
			const seletorModal = botaoAbrirModal.getAttribute('data-bs-target');
			const modal = seletorModal ? document.querySelector(seletorModal) : null;

			if (modal) {
				abrirModal(modal);
			}
			return;
		}

		const botaoFecharModal = evento.target.closest('[data-bs-dismiss="modal"]');
		if (botaoFecharModal) {
			const modal = botaoFecharModal.closest('.modal');
			if (modal) fecharModal(modal);
			return;
		}

		if (evento.target.matches('.modal-fallback-aberta')) {
			fecharModal(evento.target);
		}

	});

	document.addEventListener('keydown', (evento) => {
		const modalAberto = document.querySelector('.modal-fallback-aberta');
		if (!modalAberto) {
			return;
		}

		if (evento.key === 'Escape') {
			fecharModal(modalAberto);
		} else {
			manterFocoNoModal(evento, modalAberto);
		}
	});
}

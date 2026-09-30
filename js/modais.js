const focoAnterior = new WeakMap();
const overflowAnterior = new WeakMap();

export function abrirModal(modal) {
	const ModalBootstrap = window.bootstrap?.Modal;

	if (ModalBootstrap) {
		ModalBootstrap.getOrCreateInstance(modal).show();
		return;
	}

	focoAnterior.set(modal, document.activeElement);
	overflowAnterior.set(modal, document.body.style.overflow);
	document.body.style.overflow = 'hidden';
	modal.classList.add('modal-fallback-aberta');
	modal.setAttribute('aria-hidden', 'false');
	modal.setAttribute('aria-modal', 'true');
	const botaoFechar = modal.querySelector(
		'.modal-footer [data-bs-dismiss="modal"]'
	) || modal.querySelector('[data-bs-dismiss="modal"]:not(.btn-close)');
	botaoFechar?.focus();
}

export function fecharModal(modal) {
	if (!modal.classList.contains('modal-fallback-aberta')) {
		return;
	}

	modal.classList.remove('modal-fallback-aberta');
	modal.setAttribute('aria-hidden', 'true');
	modal.removeAttribute('aria-modal');
	document.body.style.overflow = overflowAnterior.get(modal) || '';
	focoAnterior.get(modal)?.focus();
	focoAnterior.delete(modal);
	overflowAnterior.delete(modal);
}

export function manterFocoNoModal(evento, modal) {
	if (evento.key !== 'Tab') {
		return;
	}

	const controles = [...modal.querySelectorAll(
		'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
	)].filter((controle) => controle.getClientRects().length > 0);

	if (!controles.length) {
		evento.preventDefault();
		return;
	}

	const primeiro = controles[0];
	const ultimo = controles[controles.length - 1];

	if (!modal.contains(document.activeElement)) {
		evento.preventDefault();
		primeiro.focus();
	} else if (evento.shiftKey && document.activeElement === primeiro) {
		evento.preventDefault();
		ultimo.focus();
	} else if (!evento.shiftKey && document.activeElement === ultimo) {
		evento.preventDefault();
		primeiro.focus();
	}
}
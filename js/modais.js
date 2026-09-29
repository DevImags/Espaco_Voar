const focoAnterior = new WeakMap();

export function abrirModal(modal) {
	const ModalBootstrap = window.bootstrap?.Modal;

	if (ModalBootstrap) {
		ModalBootstrap.getOrCreateInstance(modal).show();
		return;
	}

	focoAnterior.set(modal, document.activeElement);
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
	focoAnterior.get(modal)?.focus();
	focoAnterior.delete(modal);
}
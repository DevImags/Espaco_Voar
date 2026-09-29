import { carregarAreasInteresse, salvarAreasInteresse } from './storage.js';
import { abrirModal } from './modais.js';

function obterCamposValidaveis(formulario) {
	return [...formulario.querySelectorAll('input:not([type="checkbox"])')];
}

function obterGrupoInteresses(formulario) {
	const fieldset = formulario.querySelector('#grupo-areas-interesse');

	if (!fieldset) {
		return null;
	}

	return {
		fieldset,
		checkboxes: [...fieldset.querySelectorAll('input[type="checkbox"]')]
	};
}

function restaurarAreasInteresse(formulario) {
	const grupo = obterGrupoInteresses(formulario);

	if (!grupo) {
		return;
	}

	const areasSalvas = carregarAreasInteresse();
	grupo.checkboxes.forEach((checkbox) => {
		checkbox.checked = areasSalvas.includes(checkbox.value);
	});

	if (areasSalvas.length) {
		atualizarGrupoInteresses(formulario);
	}
}

function atualizarGrupoInteresses(formulario) {
	const grupo = obterGrupoInteresses(formulario);

	if (!grupo) {
		return true;
	}

	const selecionouOpcao = grupo.checkboxes.some((checkbox) => checkbox.checked);
	let feedback = grupo.fieldset.querySelector('.mensagem-campo');

	grupo.fieldset.classList.toggle('grupo-invalido', !selecionouOpcao);
	grupo.fieldset.classList.toggle(
		'grupo-valido',
		selecionouOpcao && formulario.dataset.validacaoIniciada === 'true'
	);

	grupo.checkboxes.forEach((checkbox) => {
		if (selecionouOpcao) {
			checkbox.removeAttribute('aria-invalid');
			checkbox.removeAttribute('aria-describedby');
		} else {
			checkbox.setAttribute('aria-invalid', 'true');
		}
	});

	if (!selecionouOpcao) {
		if (!feedback) {
			feedback = document.createElement('small');
			feedback.className = 'mensagem-campo';
			feedback.id = 'areas-interesse-mensagem';
			grupo.fieldset.append(feedback);
		}

		feedback.textContent = 'Marque pelo menos uma área de interesse.';
		grupo.checkboxes.forEach((checkbox) => {
			checkbox.setAttribute('aria-describedby', feedback.id);
		});
	} else {
		grupo.fieldset.classList.remove('grupo-invalido');
		feedback?.remove();
	}

	return selecionouOpcao;
}

function obterMensagemValidacao(campo) {
	if (campo.validity.valueMissing) {
		return 'Este campo é obrigatório.';
	}

	if (campo.validity.typeMismatch) {
		return 'Digite um e-mail válido.';
	}

	if (campo.validity.patternMismatch) {
		return campo.title || 'Confira o formato informado.';
	}

	return campo.validity.valid ? '' : 'Confira o valor informado.';
}

function atualizarCampo(campo) {
	const mensagem = obterMensagemValidacao(campo);
	let feedback = document.getElementById(`${campo.id}-mensagem`);

	campo.classList.toggle('campo-invalido', Boolean(mensagem));
	campo.classList.toggle('campo-valido', !mensagem && campo.value.trim() !== '');

	if (mensagem) {
		campo.setAttribute('aria-invalid', 'true');

		if (!feedback) {
			feedback = document.createElement('small');
			feedback.id = `${campo.id}-mensagem`;
			feedback.className = 'mensagem-campo';
			campo.insertAdjacentElement('afterend', feedback);
		}

		campo.setAttribute('aria-describedby', feedback.id);
		feedback.textContent = mensagem;
	} else {
		campo.removeAttribute('aria-invalid');
		campo.removeAttribute('aria-describedby');
		feedback?.remove();
	}

	return !mensagem;
}

function atualizarResumo(formulario) {
	if (formulario.dataset.validacaoIniciada !== 'true') {
		return;
	}

	const quantidadeInvalidos = obterCamposValidaveis(formulario)
		.filter((campo) => !campo.validity.valid).length
		+ (obterGrupoInteresses(formulario)?.checkboxes.some((checkbox) => checkbox.checked) ? 0 : 1);
	const feedback = formulario
		.closest('.secao-cadastro')
		?.querySelector('#mensagem-feedback');

	if (!feedback) {
		return;
	}

	feedback.className = quantidadeInvalidos ? 'alerta alerta-erro' : '';
	feedback.textContent = quantidadeInvalidos
		? `Revise ${quantidadeInvalidos} campo(s) destacado(s) antes de continuar.`
		: '';
}

function limparValidacao(formulario) {
	obterCamposValidaveis(formulario).forEach((campo) => {
		campo.classList.remove('campo-invalido', 'campo-valido');
		campo.removeAttribute('aria-invalid');
		campo.removeAttribute('aria-describedby');
		document.getElementById(`${campo.id}-mensagem`)?.remove();
	});
	const grupoInteresses = obterGrupoInteresses(formulario);
	grupoInteresses?.fieldset.classList.remove('grupo-invalido', 'grupo-valido');
	grupoInteresses?.checkboxes.forEach((checkbox) => {
		checkbox.removeAttribute('aria-invalid');
		checkbox.removeAttribute('aria-describedby');
	});
	grupoInteresses?.fieldset.querySelector('.mensagem-campo')?.remove();

	const feedback = formulario
		.closest('.secao-cadastro')
		?.querySelector('#mensagem-feedback');
	feedback?.classList.remove('alerta', 'alerta-erro');
	if (feedback) feedback.textContent = '';
	delete formulario.dataset.validacaoIniciada;
}

export function iniciarFormulario() {
	document.addEventListener('spa:renderizada', (evento) => {
		const formulario = evento.target.querySelector('#form-cadastro');
		if (formulario) restaurarAreasInteresse(formulario);
	});

	document.addEventListener('input', (evento) => {
		const campo = evento.target.closest('#form-cadastro input');

		if (!campo) {
			return;
		}

		if (campo.type === 'checkbox') {
			const areasSelecionadas = obterGrupoInteresses(campo.form)
				?.checkboxes
				.filter((checkbox) => checkbox.checked)
				.map((checkbox) => checkbox.value) || [];
			salvarAreasInteresse(areasSelecionadas);
			atualizarGrupoInteresses(campo.form);
		} else {
			atualizarCampo(campo);
		}
		atualizarResumo(campo.form);
	});

	document.addEventListener('submit', (evento) => {
		const formulario = evento.target.closest('#form-cadastro');

		if (!formulario) {
			return;
		}

		evento.preventDefault();
		formulario.dataset.validacaoIniciada = 'true';

		const campos = obterCamposValidaveis(formulario);
		const camposInvalidos = campos.filter((campo) => !atualizarCampo(campo));
		const interessesValidos = atualizarGrupoInteresses(formulario);
		atualizarResumo(formulario);

		if (camposInvalidos.length || !interessesValidos) {
			(camposInvalidos[0] || obterGrupoInteresses(formulario)?.checkboxes[0])?.focus();
			return;
		}

		const dialogo = formulario
			.closest('.secao-cadastro')
			?.querySelector('#modal-sucesso');

		if (!dialogo) {
			return;
		}

		abrirModal(dialogo);
		formulario.reset();
		salvarAreasInteresse([]);
		limparValidacao(formulario);
	});
}

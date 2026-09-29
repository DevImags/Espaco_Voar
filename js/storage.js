const CHAVE_AREAS_INTERESSE = 'espaco-voar:areas-interesse';

export function salvarAreasInteresse(areas) {
	try {
		localStorage.setItem(CHAVE_AREAS_INTERESSE, JSON.stringify(areas));
	} catch {
		// O armazenamento pode estar indisponível no navegador.
	}
}

export function carregarAreasInteresse() {
	try {
		const dadosSalvos = localStorage.getItem(CHAVE_AREAS_INTERESSE);
		const areas = dadosSalvos ? JSON.parse(dadosSalvos) : [];

		return Array.isArray(areas)
			? areas.filter((area) => typeof area === 'string')
			: [];
	} catch {
		return [];
	}
}

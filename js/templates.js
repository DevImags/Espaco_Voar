export function templateHome() {
    return `
        <section class="secao-principal secao-padrao">
            <h2 class="titulo-secao">Sobre a Nossa Instituição</h2>
            <img src="assets/img/espaco_voar.png"
                alt="Grupo de crianças, adolescentes e adultos reunidos em uma atividade de aprendizagem no Espaço Voar"
                width="500">
            <p>O Espaço Voar é uma organização social que tem como objetivo levar conhecimento às crianças, adolescentes
                e adultos, tanto no básico, quanto no conhecimento técnico, preparando os mesmos para que tenham mais
                opções com o que eles aprenderam.</p>
        </section>
        <section class="secao-principal secao-padrao">
            <h2 class="titulo-secao">Nossa Missão</h2>
            <p>Levar conhecimento para todos, sem discriminação, e assim permitir que crianças sonhem no que querem se
                formar, nossos adolescentes comecem a traçar suas carreiras com foco do que querem ser e os adultos
                possam enriquecer ainda mais seu conhecimento e ampliar seus horizontes. </p>
        </section>
        <button type="button" class="btn btn-primary botao-aviso"
            data-bs-toggle="modal" data-bs-target="#modal-notificacao">
            Ver aviso importante
        </button>
        <div class="modal fade" id="modal-notificacao" tabindex="-1"
            aria-labelledby="titulo-modal-notificacao" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content modal-conteudo">
                    <div class="modal-header">
                        <h2 class="modal-title fs-5" id="titulo-modal-notificacao">Aviso Importante</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                        <p>As inscrições para as turmas do próximo semestre já estão abertas!</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

const projetosCapacitacao = [
    {
        status: 'Inscrições Abertas',
        classeBadge: 'badge-sucesso',
        titulo: 'Informática Básica e Tecnologia',
        descricao: 'Aulas práticas voltadas para inclusão digital. Aceitamos voluntários para atuar como instrutores e monitores de turma.'
    },
    {
        status: 'Em Andamento',
        classeBadge: 'badge-info',
        titulo: 'Orientação Profissional e Carreira',
        descricao: 'Mentoria para jovens e adultos ingressarem no mercado de trabalho. Profissionais podem voluntariar para palestras e revisão de currículos.'
    },
    {
        status: 'Inscrições Abertas',
        classeBadge: 'badge-sucesso',
        titulo: 'Clube de Leitura e Alfabetização',
        descricao: 'Incentivo à leitura e reforço escolar para crianças, jovens e adultos. Aceitamos voluntários para mediação de leitura e contação de histórias.'
    }
];

const campanhasDoacao = [
    {
        status: 'Campanha Contínua',
        classeBadge: 'badge-alerta',
        titulo: 'Arrecadação de Mantimentos e Materiais',
        descricao: 'Campanhas contínuas para recolhimento de alimentos não perecíveis, livros e equipamentos de informática para os laboratórios.'
    },
    {
        status: 'Apoio Permanente',
        classeBadge: 'badge-info',
        titulo: 'Apoio Permanente',
        descricao: 'Programa de contribuição financeira para a manutenção dos projetos sociais e ampliação do atendimento da ONG.'
    }


];
function renderizarArtigos(itens) {
    return itens.map((item) => `
        <article>
            <span class="badge ${item.classeBadge}">${item.status}</span>
            <h3 class="titulo-artigo">${item.titulo}</h3>
            <p>${item.descricao}</p>
        </article>
    `).join('');
}

export function templateProjetos() {
    return `
        <!-- Seção de Capacitação e Voluntariado -->
        <section class="secao-principal secao-projetos" id="capacitacao">
            <h2 class="titulo-secao">Capacitação e Projetos de Voluntariado</h2>
            ${renderizarArtigos(projetosCapacitacao)}
        </section>

        <!-- Seção de Desenvolvimento Social e Doações -->
        <section class="secao-principal secao-projetos" id="doacoes">
            <h2 class="titulo-secao">Campanhas de Arrecadação e Doações</h2>
            ${renderizarArtigos(campanhasDoacao)}
        </section>
        `;

}

export function templateCadastro() {
    return `
        <section class="secao-principal secao-cadastro">
            <h2 class="titulo-secao">Dados Cadastrais</h2>

            <!-- Área onde o alerta vai aparecer via JS -->
            <div id="mensagem-feedback" aria-live="polite"></div>

            <!-- Modal Nativo (<dialog>) -->
            <div class="modal fade" id="modal-sucesso" tabindex="-1"
                aria-labelledby="titulo-modal-sucesso" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content modal-conteudo">
                        <div class="modal-header">
                            <h2 class="modal-title fs-5" id="titulo-modal-sucesso">Validação concluída</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                        </div>
                        <div class="modal-body">
                            <p>Os dados pessoais não são enviados nem armazenados. Suas áreas de interesse ficam salvas neste navegador.</p>
                        </div>
                        <div class="modal-footer">
                            <button id="btn-fechar-modal" class="btn btn-primary" data-bs-dismiss="modal" type="button">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>

            <form id="form-cadastro" novalidate>
                <fieldset>
                    <legend>Dados Pessoais</legend>
                    <label for="nome_completo">Nome Completo *</label>
                    <input type="text" name="nome_completo" id="nome_completo" required><br>

                    <label for="data_de_nascimento">Data de Nascimento *</label>
                    <input type="date" name="data_de_nascimento" id="data_de_nascimento" required><br>

                    <label for="cpf">CPF *</label>
                    <input type="text" name="cpf" id="cpf" placeholder="000.000.000-00"
                        pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}" title="Formato exigido: 000.000.000-00"
                        required><br>

                    <label for="telefone">Telefone *</label>
                    <input type="tel" name="telefone" id="telefone" placeholder="(00) 00000-0000"
                        pattern="\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}" title="Digite o Telefone no formato: (00) 00000-0000"
                        required><br>

                    <label for="email">E-mail *</label>
                    <input type="email" name="email" id="email" placeholder="exemplo@gmail.com.br" required>

                </fieldset>

                <fieldset>
                    <legend>Endereço</legend>
                    <label for="estado">Estado *</label>
                    <input type="text" name="estado" id="estado" required><br>
                    <label for="cidade">Cidade *</label>
                    <input type="text" name="cidade" id="cidade" required><br>

                    <label for="cep">CEP *</label>
                    <input type="text" name="cep" id="cep" placeholder="00000-000" pattern="[0-9]{5}-[0-9]{3}"
                        title="00000-000" required><br>

                    <label for="rua">Rua *</label>
                    <input type="text" name="rua" id="rua" required>

                </fieldset>

                <fieldset id="grupo-areas-interesse">
                    <legend>Áreas de Interesse</legend>
                    <p>Selecione as áreas em que deseja atuar ou contribuir:</p>

                    <input type="checkbox" id="informatica" name="area_interesse[]" value="informatica">
                    <label for="informatica">Informática e Tecnologia</label><br>

                    <input type="checkbox" id="ferramentas_office" name="area_interesse[]" value="ferramentas_office">
                    <label for="ferramentas_office">Ferramentas de Escritório (Excel, Word, PowerPoint)</label><br>

                    <input type="checkbox" id="orientacao_carreira" name="area_interesse[]" value="orientacao_carreira">
                    <label for="orientacao_carreira">Orientação Profissional e Análise de Currículos</label><br>

                    <input type="checkbox" id="leitura" name="area_interesse[]" value="leitura">
                    <label for="leitura">Incentivo à Leitura e Reforço Escolar</label><br>

                    <input type="checkbox" id="doacao" name="area_interesse[]" value="doacao">
                    <label for="doacao">Doações e Apoio Financeiro</label>
                </fieldset>
                <button type="submit">Cadastrar</button>
            </form>
        </section>
        `;
}
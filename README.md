# Espaço Voar

Site institucional responsivo para uma organização social. O projeto usa HTML5, CSS e JavaScript em módulos ES6. Não possui backend; o navegador guarda somente as áreas de interesse selecionadas no cadastro.

## Executar localmente

Como o projeto usa módulos JavaScript, abra-o por um servidor local, não diretamente pelo protocolo `file://`. No VS Code, uma opção é iniciar o Live Server pelo `index.html`. Também é possível executar `python -m http.server 8000` na pasta do projeto e abrir `http://localhost:8000`.

O Bootstrap 5.3.3 e as fontes externas são carregados por CDN; conexão com a internet é necessária para carregar esses recursos. Os modais têm um fallback local quando o JavaScript do Bootstrap não está disponível.

## Build de produção

O projeto usa Vite para agrupar e minificar os módulos JavaScript e os arquivos CSS. Execute `npm install` uma vez para instalar as dependências e depois `npm run build` para gerar a pasta `dist/`. Para testar a saída compilada localmente, use `npm run preview`.

## Estrutura

- `index.html`, `projetos.html` e `cadastro.html`: páginas e pontos de entrada.
- `css/`: reset, variáveis do design system, componentes e layout responsivo.
- `js/script.js`: inicializa os módulos da aplicação.
- `js/router.js`: controla navegação SPA por hash e renderização das rotas.
- `js/templates.js`: gera os templates das páginas e os artigos de projetos.
- `js/componentes.js`: trata o menu e os controles dos modais.
- `js/form.js`: valida o cadastro e coordena o salvamento das preferências.
- `js/storage.js`: encapsula leitura e gravação das áreas de interesse no `localStorage`.
- `js/modais.js`: usa o modal do Bootstrap ou o fallback local.
- `assets/`: imagens e ícones.

## GitFlow

- `main`: versão estável e pronta para publicação.
- `develop`: integração do trabalho em andamento.
- `feature/<nome>`: novas funcionalidades iniciadas a partir de `develop`.
- `release/<versao>`: preparação de uma versão para publicação.
- `hotfix/<nome>`: correção urgente iniciada a partir de `main`.

Use commits curtos e descritivos, por exemplo: `feat: adicionar validação do cadastro`, `fix: fechar submenu ao clicar fora` e `docs: explicar execução local`.

## Manutenção

Mantenha responsabilidades separadas nos módulos JavaScript, teste navegação e formulário após alterações e confira a interface em larguras móveis e desktop. Antes de publicar, valide acessibilidade, links e carregamento dos recursos externos.

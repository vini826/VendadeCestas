# 🎁 Cesta Perfeita - Monte Sua Cesta Personalizada!

[![GitHub Pages](https://github.com/vini826/cesta/actions/workflows/github-pages.yml/badge.svg)](https://vini826.github.io/cesta/)
[![GitHub last commit](https://img.shields.io/github/last-commit/vini826/cesta)](https://github.com/vini826/cesta/commits/main)

Bem-vindo ao projeto **Cesta Perfeita**, um site interativo onde você pode montar sua própria cesta de produtos personalizados, como chocolates, vinhos e flores! A aplicação calcula o valor total automaticamente enquanto você adiciona ou ajusta a quantidade dos itens.

Este projeto foi desenvolvido como um exercício prático de front-end, explorando as seguintes tecnologias e conceitos:

## ✨ Funcionalidades

* **Página Inicial (Cestas Prontas)**: Apresenta cestas pré-montadas como sugestão e um atalho direto para a página de montagem.
* **Listagem de Produtos**: Exibe produtos em cards com nome, imagem, preço e um botão "Adicionar".
* **Cesta de Compras (Carrinho)**:
    * Mostra os itens adicionados.
    * Permite ajustar a **quantidade** de cada item com botões `+` e `-`.
    * Exibe o valor total da cesta em tempo real.
    * Permite **remover produtos individualmente** da cesta.
* **Navegação por Rotas**: Utiliza `react-router-dom` para navegação entre as páginas.
* **Estado da Aplicação**: Gerenciamento de estado local com `useState`.
* **Dados Mockados**: Produtos e cestas pré-montadas são carregados de arquivos `JSON` locais.

## 🚀 Tecnologias Utilizadas

* **React**: Biblioteca JavaScript para construção de interfaces de usuário.
* **Vite**: Ferramenta de build extremamente rápida para projetos front-end modernos.
* **TailwindCSS**: Framework CSS utilitário para estilização rápida e responsiva.
* **React Router DOM**: Para gerenciamento de rotas na aplicação Single Page Application (SPA).
* **Git & GitHub Pages**: Controle de versão e hospedagem estática do site.

## 📦 Estrutura do Projeto

src/ ├── components/ # Componentes reutilizáveis (e.g., ProductCard, Basket, Navbar) ├── pages/ # Páginas completas da aplicação (e.g., Home, LandingPage) ├── data/ # Dados mockados (e.g., products.js, preBuiltBaskets.js) ├── App.jsx # Componente raiz que gerencia as rotas ├── main.jsx # Ponto de entrada da aplicação React └── index.css # Estilos globais e importação do TailwindCSS

## ▶️ Como Rodar o Projeto Localmente

Siga estas instruções para configurar e rodar o projeto em sua máquina local:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/vini826/cesta.git](https://github.com/vini826/cesta.git)
    cd cesta
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    O aplicativo estará disponível em `http://localhost:5173/` (ou outra porta disponível).

## 🌐 Deploy no GitHub Pages

Este projeto está configurado para ser automaticamente publicado no GitHub Pages.

**Link do Projeto Publicado:**
[https://vini826.github.io/cesta/](https://vini826.github.io/cesta/)

Para mais informações sobre como configurar o deploy de projetos Vite no GitHub Pages, consulte a documentação oficial ou os scripts no `package.json`.

---

## Próximos Passos (Ideias para o Futuro)

* **Context API para o Carrinho**: Elevar o estado do carrinho para um contexto global, permitindo que ele seja acessível em todas as páginas (como uma futura tela de checkout).
* **Tela de Finalização de Pedido (Checkout)**: Adicionar uma página dedicada para o usuário revisar o pedido, inserir dados de entrega e selecionar o método de pagamento.
* **Gerenciamento de Estado Global**: Explorar bibliotecas como Redux ou Zustand para gerenciamento de estado mais complexo.
* **Responsividade Aprimorada**: Otimizar o layout para diversos tamanhos de tela.
* **Adicionar mais produtos e categorias**.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Se você tiver sugestões, melhorias ou encontrar algum bug, sinta-se à vontade para abrir uma issue ou um Pull Request.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. (Se você quiser adicionar uma licença, crie um arquivo `LICENSE` na raiz do seu projeto e escolha uma licença, como a MIT, que é muito comum).


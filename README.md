# 🎵 Player de Música (Projeto Acadêmico)

Este é um projeto de um player de música simples, desenvolvido com HTML, CSS, JavaScript e PHP para o projeto acadêmico 
relacionado a aula de Desenvolvimento Web

Este projeto foi criado como avaliação para a disciplina de **Desenvolvimento Web**, ministrada pelo Professor **Helder**.

## 🧑‍💻 Autores

* **Davi Cavalcante**
* **Eric Carageorge**
* **Ygor Amaral**

---

## 🚀 Funcionalidades Principais

O player de música possui as seguintes características:

* **Reprodução de Músicas:** Toca 3 faixas de música (armazenadas localmente).
* **Controles de Reprodução:**
    * Play / Pause
    * Próxima Música
    * Música Anterior
* **Autoplay:** Ao final de uma música, a próxima faixa da lista começa a tocar automaticamente.
* **Interface Dinâmica:** Ao trocar de música (seja manualmente ou via autoplay), a interface é atualizada:
    * Muda a imagem de capa (arte do álbum).
    * Muda o nome da música e artista.
    * Muda a imagem de fundo (background) da aplicação.

---

## 🛠️ Tecnologias Utilizadas

Para a construção deste projeto, foram utilizadas as seguintes tecnologias:

* **HTML5:** Responsável pela estrutura semântica do player (os botões, o texto, a imagem).
* **CSS3:** Utilizado para toda a estilização da interface, tornando-a agradável e responsiva.
* **JavaScript :** O "cérebro" do projeto. Usado para:
    * Manipular o DOM (alterar capas, nomes, fundos).
    * Controlar o elemento `<audio>` do HTML.
    * Gerir a lógica de "próxima", "anterior" e "autoplay".
* **PHP:** Utilizado para a integração com banco de dados e sistema de login e autentificação

---

## ⚙️ Como Executar o Projeto

Como este projeto utiliza apenas tecnologias *front-end* e utiliza arquivos de música locais, não é necessário um servidor.

1.  Certifique-se de que tem todos os arquivos do projeto na mesma pasta (ou na estrutura de pastas correta), incluindo:
    * `index.html`
    * `styles.css` 
    * `main.js` 
    * As 3 músicas 
    * As imagens de capa e de fundo.
2.  Abra o arquivo `index.html` diretamente no seu navegador de preferência (como Google Chrome, Firefox, etc.).
3.  Pronto! O player de música deverá carregar e estar pronto para usar.

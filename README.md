# 🎵 Player de Música (Projeto Acadêmico)

Player de música desenvolvido com **HTML, CSS, JavaScript e PHP**, com sistema de
login/cadastro, busca de músicas pela API do iTunes e favoritos salvos em banco de dados.

Projeto criado como avaliação da disciplina de **Desenvolvimento Web**, ministrada pelo Professor **Helder**.

## 🧑‍💻 Autores

* **Davi Cavalcante**
* **Eric Carageorge**
* **Ygor Amaral**

---

## 🚀 Funcionalidades

* **Login e cadastro de usuários** com senha protegida por hash (`password_hash`).
* **Player de áudio:** Play/Pause, próxima, anterior e autoplay ao final da faixa.
* **Interface dinâmica:** capa, título, artista e fundo mudam conforme a música.
* **Busca de músicas** em tempo real pela API pública do iTunes.
* **Favoritos:** salvar e remover músicas, persistidas no banco por usuário.

---

## 🛠️ Tecnologias

* **HTML5 / CSS3** — estrutura e estilização da interface.
* **JavaScript** — controle do player, busca (iTunes API) e chamadas AJAX.
* **PHP** — autenticação, sessões e integração com o banco.
* **MySQL** — armazenamento de usuários e favoritos.

---

## ⚙️ Como Executar o Projeto

> ⚠️ Este projeto usa **PHP + MySQL**, portanto **não funciona** abrindo o HTML direto no
> navegador. É necessário um servidor local. O caminho mais simples é o **XAMPP**.

### 1. Instale o XAMPP
Baixe em [apachefriends.org](https://www.apachefriends.org/) (já inclui Apache, PHP e MySQL).

### 2. Coloque o projeto na pasta do servidor
Copie a pasta `PlayerDeMusica` para dentro de:
```
C:\xampp\htdocs\
```

### 3. Suba os serviços
No painel de controle do XAMPP, inicie **Apache** e **MySQL**.

### 4. Crie o banco de dados
Acesse [http://localhost/phpmyadmin](http://localhost/phpmyadmin), vá em **Importar** e
selecione o arquivo [`database.sql`](database.sql) (ele cria o banco `player_musica` e as tabelas).

> Alternativa por linha de comando:
> ```
> mysql -u root -p < database.sql
> ```

### 5. Configure a conexão
Copie `conexao.php.example` para `conexao.php` e ajuste as credenciais se necessário
(no XAMPP padrão é usuário `root` e senha vazia):
```
copy conexao.php.example conexao.php
```

### 6. Adicione os áudios
Por questões de direitos autorais, os arquivos `.mp3` **não** são versionados.
Coloque os arquivos `1.mp3`, `2.mp3` e `3.mp3` na pasta `assets/`
(ou edite a lista `songs` em `main.js` para apontar para os seus próprios áudios).

### 7. Acesse no navegador
```
http://localhost/PlayerDeMusica/login.html
```
A tela de login deve carregar. Pronto! 🎶 Veja a seção [Como Usar](#-como-usar) abaixo para criar sua conta e usar o player.

---

## 📁 Estrutura

```
PlayerDeMusica/
├── assets/              # imagens e áudios (.mp3 ignorados pelo Git)
├── login.html          # tela de login/cadastro
├── auth.php            # processa login e cadastro
├── index.php           # player principal (requer sessão ativa)
├── main.js             # lógica do player, busca e favoritos
├── styles.css          # estilos do player
├── save_music.php      # salva favorito
├── get_favorites.php   # lista favoritos
├── remover_musica.php  # remove favorito
├── logout.php          # encerra a sessão
├── conexao.php.example # modelo de conexão (copie para conexao.php)
├── database.sql        # schema do banco
├── .gitignore          # arquivos ignorados pelo Git
└── README.md           # este arquivo
```

> O `conexao.php` (com as credenciais reais) **não** faz parte do repositório — ele é gerado
> localmente a partir do `conexao.php.example` no passo 5 da instalação.

---

## 🎧 Como Usar

Com o projeto rodando em `http://localhost/PlayerDeMusica/login.html`:

### 1. Crie sua conta
Na tela inicial, use o formulário **"Não tem conta?"** para se cadastrar com nome, e-mail
e senha. Em seguida, faça login com o e-mail e a senha cadastrados.

### 2. Controle o player
Depois de logar, você cai no player com três faixas de exemplo já carregadas:

| Botão | Ação |
|:---:|---|
| ⏪ | Música anterior |
| ▶️ / ⏸️ | Tocar / pausar |
| ⏩ | Próxima música |

* A **barra de progresso** mostra o tempo da faixa — clique nela para avançar ou voltar
  para um ponto específico.
* Ao terminar uma música, a próxima começa **automaticamente** (autoplay).
* A capa, o título, o artista e o fundo da tela mudam conforme a música tocando.

### 3. Busque qualquer música
Digite o nome de uma música ou artista no campo de busca e pressione **Enter** (ou clique na
🔍). A busca usa a API pública do iTunes e mostra os resultados em uma lista:

* **Clique no resultado** para começar a tocar o preview na hora.
* **Clique no coração ❤️** ao lado para salvar a música nos seus favoritos.

### 4. Gerencie seus favoritos
Clique no botão de **coração ❤️** (ao lado da busca) para listar as músicas que você salvou:

* **Clique em uma favorita** para tocá-la.
* **Clique na lixeira 🗑️** para removê-la dos favoritos.

Seus favoritos ficam salvos no banco e vinculados à **sua conta** — ao logar de novo,
eles continuam lá.

### 5. Sair
Clique em **"Sair"**, no canto superior esquerdo, para encerrar a sessão e voltar à tela de login.

> 💡 **Observação:** as músicas buscadas pelo iTunes tocam apenas um **preview de ~30 segundos**
> (limitação da API gratuita). As 3 faixas iniciais tocam por completo, desde que os arquivos
> `.mp3` estejam na pasta `assets/`.

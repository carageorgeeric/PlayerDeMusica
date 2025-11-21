const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    PlayerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Archangel',
        cover: 'assets/2.png',
        artist: 'Cod Zombies',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Faint',
        cover: 'assets/3.jpg',
        artist: 'Linkin Park',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Tell me you know',
        cover: 'assets/4.jpg',
        artist: 'Good Kid',
    }
];

let musicIndex = 0;
let isPlaying = false;

function toggleplay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    //alterar o ícone do botão play
    playBtn.classList.replace('fa-play', "fa-pause");
    //definir título do botão
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    //alterar o ícone do botão pause
    playBtn.classList.replace('fa-pause', "fa-play");
    //definir título do botão
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);

    if (isPlaying) {
        playMusic();
    }
}

function updateprogressBar() {
    const { duration, currentTime } = music;

    if (isNaN(duration)) {
        return;
    }
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = PlayerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', toggleplay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateprogressBar);
music.addEventListener('loadedmetadata', updateprogressBar);
PlayerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);


// --- LÓGICA DA PESQUISA E API ---

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const musicList = document.getElementById('music-list');
const loadingSpinner = document.getElementById('loading-spinner');

// ... (Mantenha o código anterior igual até chegar na função searchMusic) ...

// --- ATUALIZAÇÃO DA FUNÇÃO DE PESQUISA ---

async function searchMusic(term) {
    if (!term) return;

    loadingSpinner.style.display = 'block';
    musicList.style.display = 'none'; 

    try {
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=5`;
        const response = await fetch(url);
        const data = await response.json();

        loadingSpinner.style.display = 'none';

        if (data.results.length === 0) {
            alert("Nenhuma música encontrada!");
            return;
        }

        searchInput.value = ''; 
        musicList.innerHTML = '';
        musicList.style.display = 'block';

        data.results.forEach(song => {
            const li = document.createElement('li');
            
            let coverImage = 'assets/2.png'; 
            if (song.artworkUrl100) {
                coverImage = song.artworkUrl100.replace('100x100', '400x400');
            }

            // Monta o HTML da lista com o botão de Coração
            li.innerHTML = `
                <div style="display: flex; align-items: center; flex-grow: 1;">
                    <img src="${coverImage}" style="width: 40px; height: 40px; border-radius: 5px; margin-right: 10px;">
                    <span>
                        <strong>${song.trackName}</strong> <br> 
                        <small>${song.artistName}</small>
                    </span>
                </div>
                
                <i class="fa-regular fa-heart save-btn" style="font-size: 20px; margin-left: 10px; color: #ff4081; transition: 0.3s;"></i>
            `;

            // Dados organizados da música
            const songData = {
                path: song.previewUrl,
                displayName: song.trackName,
                cover: coverImage,
                artist: song.artistName
            };

            // 1. Evento: Clicar na linha para TOCAR
            li.addEventListener('click', () => {
                songs.push(songData);
                musicIndex = songs.length - 1;
                loadMusic(songs[musicIndex]);
                playMusic();
                musicList.style.display = 'none';
            });

            // 2. Evento: Clicar no Coração para SALVAR
            const heartBtn = li.querySelector('.save-btn');
            heartBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Impede que a música toque ao clicar no coração
                
                // Muda o ícone para "cheio" (visual)
                heartBtn.classList.remove('fa-regular');
                heartBtn.classList.add('fa-solid');

                // Chama a função para salvar no PHP
                salvarNoBanco(songData);
            });

            musicList.appendChild(li);
        });

    } catch (error) {
        console.error("Erro:", error);
        loadingSpinner.style.display = 'none';
        alert("Erro ao buscar.");
    }
}

// --- FUNÇÃO QUE FALA COM O PHP ---
async function salvarNoBanco(songData) {
    try {
        const response = await fetch('save_music.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(songData)
        });

        const result = await response.json();
        if(result.status === 'sucesso') {
            console.log("Música salva no banco!");
            // Opcional: Alertar o usuário
            // alert("Música salva nos favoritos!");
        } else {
            alert("Erro ao salvar: " + result.mensagem);
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

// --- NOVA FUNÇÃO PARA FALAR COM O PHP ---
async function saveToHistory(songData) {
    try {
        const response = await fetch('save_music.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(songData)
        });

        const result = await response.json();
        console.log("PHP respondeu:", result); // Abre o F12 para ver esta mensagem

    } catch (error) {
        console.error("Erro ao salvar no histórico:", error);
    }
}

// ... (O resto dos eventos click e keypress continua igual) ...

// Evento para a tecla ENTER
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchMusic(searchInput.value);
    }
});

// --- A CORREÇÃO ESTÁ AQUI ---
// Faltava adicionar o evento de clique no botão da lupa
searchButton.addEventListener('click', () => {
    searchMusic(searchInput.value);
});



// --- SISTEMA DE LISTAR FAVORITOS ---

// --- SISTEMA DE LISTAR E REMOVER FAVORITOS ---

const favButton = document.getElementById('fav-button');

favButton.addEventListener('click', async () => {
    // Limpa visual
    searchInput.value = '';
    loadingSpinner.style.display = 'block';
    musicList.style.display = 'none';

    try {
        const response = await fetch('get_favorites.php');
        const data = await response.json();
        
        loadingSpinner.style.display = 'none';

        if (data.length === 0) {
            alert("Você ainda não tem músicas favoritas!");
            return;
        }

        musicList.innerHTML = '';
        musicList.style.display = 'block';

        data.forEach(song => {
            const li = document.createElement('li');

            // 1. ALTERAÇÃO NO HTML: Define a cor inicial como CINZA (#999)
            li.innerHTML = `
                <div style="display: flex; align-items: center; flex-grow: 1;">
                    <img src="${song.capa}" style="width: 40px; height: 40px; border-radius: 5px; margin-right: 10px;">
                    <span>
                        <strong>${song.nome_musica}</strong> <br> 
                        <small>${song.artista}</small>
                    </span>
                </div>
                
                <i class="fas fa-trash delete-btn" 
                   style="font-size: 18px; color: #999; margin-left: 15px; cursor: pointer;"></i>
            `;

            // 1. Evento: Tocar música (clique na linha)
            li.addEventListener('click', (e) => {
                // Se clicou no lixo, não faz nada aqui (o evento do lixo cuida disso)
                if(e.target.classList.contains('delete-btn')) return;

                const selectedSong = {
                    path: song.link_preview,
                    displayName: song.nome_musica,
                    cover: song.capa,
                    artist: song.artista
                };

                songs.push(selectedSong);
                musicIndex = songs.length - 1;
                loadMusic(songs[musicIndex]);
                playMusic();
            });

            // 2. Evento: REMOVER música (clique no lixo)
            const deleteBtn = li.querySelector('.delete-btn');
            
            // Quando o mouse ENTRA: Fica Vermelho/Rosa
            deleteBtn.addEventListener('mouseover', () => deleteBtn.style.color = '#ff0000ff');
            
            // Quando o mouse SAI: Volta a ser Cinza
            deleteBtn.addEventListener('mouseout', () => deleteBtn.style.color = '#999');

            // ... (código do clique para deletar continua igual) ...

            deleteBtn.addEventListener('click', async (e) => {
                e.stopPropagation(); // Impede a música de tocar
                
                // Confirmação simples (opcional)
                if(!confirm("Quer remover esta música dos favoritos?")) return;

                // Chama o PHP para deletar
                const resp = await fetch('remover_musica.php', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ id: song.id }) // Manda o ID do banco
                });

                const result = await resp.json();

                if(result.status === 'sucesso') {
                    // Remove a linha da tela visualmente (efeito mágico)
                    li.style.opacity = '0';
                    setTimeout(() => li.remove(), 300); // Espera o efeito visual e apaga
                } else {
                    alert("Erro ao remover.");
                }
            });

            musicList.appendChild(li);
        });

    } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        loadingSpinner.style.display = 'none';
    }
});
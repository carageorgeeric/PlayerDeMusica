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

async function searchMusic(term) {
    if (!term) return;

    // 1. MOSTRAR LOADING
    loadingSpinner.style.display = 'block';
    musicList.style.display = 'none'; // Esconde a lista antiga se houver

    try {
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=5`;
        const response = await fetch(url);
        const data = await response.json();

        // 2. ESCONDER LOADING (pois já terminou)
        loadingSpinner.style.display = 'none';

        if (data.results.length === 0) {
            alert("Nenhuma música encontrada!");
            return;
        }

        // 3. LIMPAR O CAMPO DE TEXTO
        searchInput.value = '';

        musicList.innerHTML = '';
        musicList.style.display = 'block';

        data.results.forEach(song => {
            const li = document.createElement('li');

            // Tratamento da Capa: Se não tiver imagem, usa a assets/2.png
            let coverImage = 'assets/nota-musical.png';
            if (song.artworkUrl100) {
                coverImage = song.artworkUrl100.replace('100x100', '400x400');
            }

            li.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <img src="${coverImage}" style="width: 40px; height: 40px; border-radius: 5px; margin-right: 10px;">
                    <span>
                        <strong>${song.trackName}</strong> <br> 
                        <small>${song.artistName}</small>
                    </span>
                </div>
                <i class="fa-solid fa-play" style="font-size: 12px; margin: 0;"></i>
            `;

            li.addEventListener('click', () => {
                const selectedSong = {
                    path: song.previewUrl,
                    displayName: song.trackName,
                    cover: coverImage,
                    artist: song.artistName
                };

                songs.push(selectedSong);
                musicIndex = songs.length - 1;
                loadMusic(songs[musicIndex]);
                playMusic();
                musicList.style.display = 'none';
            });

            musicList.appendChild(li);
        });

    } catch (error) {
        console.error("Erro:", error);
        loadingSpinner.style.display = 'none'; // Garante que o loading some se der erro
        alert("Erro ao buscar. Verifique sua internet.");
    }
}

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
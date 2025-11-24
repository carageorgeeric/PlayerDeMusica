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
    
    playBtn.classList.replace('fa-play', "fa-pause");
    
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    
    playBtn.classList.replace('fa-pause', "fa-play");
    
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




const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const musicList = document.getElementById('music-list');
const loadingSpinner = document.getElementById('loading-spinner');





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

           
            const songData = {
                path: song.previewUrl,
                displayName: song.trackName,
                cover: coverImage,
                artist: song.artistName
            };

            
            li.addEventListener('click', () => {
                songs.push(songData);
                musicIndex = songs.length - 1;
                loadMusic(songs[musicIndex]);
                playMusic();
                musicList.style.display = 'none';
            });

            
            const heartBtn = li.querySelector('.save-btn');
            heartBtn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                
                
                heartBtn.classList.remove('fa-regular');
                heartBtn.classList.add('fa-solid');

                
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
            
        } else {
            alert("Erro ao salvar: " + result.mensagem);
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}


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
        console.log("PHP respondeu:", result); 

    } catch (error) {
        console.error("Erro ao salvar no histórico:", error);
    }
}



searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchMusic(searchInput.value);
    }
});


searchButton.addEventListener('click', () => {
    searchMusic(searchInput.value);
});





const favButton = document.getElementById('fav-button');

favButton.addEventListener('click', async () => {

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

            
            li.addEventListener('click', (e) => {
               
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

            
            const deleteBtn = li.querySelector('.delete-btn');
            
            
            deleteBtn.addEventListener('mouseover', () => deleteBtn.style.color = '#ff0000ff');
            
            
            deleteBtn.addEventListener('mouseout', () => deleteBtn.style.color = '#999');

            

            deleteBtn.addEventListener('click', async (e) => {
                e.stopPropagation(); 
                
                
                if(!confirm("Quer remover esta música dos favoritos?")) return;

                
                const resp = await fetch('remover_musica.php', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ id: song.id }) 
                });

                const result = await resp.json();

                if(result.status === 'sucesso') {
                    
                    li.style.opacity = '0';
                    setTimeout(() => li.remove(), 300); 
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
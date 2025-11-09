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

function toggleplay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    //alterar o ícone do botão play
    playBtn.classList.replace('fa-play', "fa-pause");
    //definir título do botão
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic(){
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

    if(isPlaying){
        playMusic(); 
    }
}

function updateprogressBar() { 
    const { duration, currentTime} = music;

    if(isNaN(duration)){
        return; 
    }
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)). padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar (e) {
    const width = PlayerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener ('click', toggleplay);
prevBtn.addEventListener ('click', () => changeMusic(-1));
nextBtn.addEventListener ('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateprogressBar);
music.addEventListener('loadedmetadata', updateprogressBar);
PlayerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
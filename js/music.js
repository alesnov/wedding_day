// const music = document.getElementById("music");
// const musicBtn = document.getElementById("musicBtn");
//
// window.addEventListener("load", () => {
//     music.play().catch(() => {});
// });
//
// // document.addEventListener("click", function initMusic() {
// //     if (music.paused) {
// //         music.play().then(() => musicBtn.classList.add("playing")).catch(() => {});
// //     }
// //     document.removeEventListener("click", initMusic);
// // }, { once: true });
//
// document.addEventListener("click", function initMusic() {
//     music.play().then(() => {
//         if(musicBtn){
//             musicBtn.classList.add("playing")
//         }
//     }).catch(()=>{})
//     document.removeEventListener("click", initMusic)
// }, { once:true })
//
// function toggleMusic() {
//     if (music.paused) {
//         music.play();
//         musicBtn.classList.add("playing");
//     } else {
//         music.pause();
//         musicBtn.classList.remove("playing");
//     }
// }
//
// music.addEventListener("play", () => musicBtn.classList.add("playing"));
// music.addEventListener("pause", () => musicBtn.classList.remove("playing"));



const music = document.getElementById('music');
const musicBtn = document.getElementById('musicBtn');

// Проверяем, есть ли сохраненное состояние
let isMusicInitialized = false;

// Функция для воспроизведения музыки
async function playMusic() {
    if (!music || !musicBtn) return;

    try {
        await music.play();
        musicBtn.classList.add('playing');
        localStorage.setItem('musicPlaying', 'true');
    } catch (error) {
        console.log('Autoplay blocked by browser:', error);
        // Браузеры блокируют autoplay, ждем взаимодействия
        requestUserInteraction();
    }
}

// Функция для паузы
function pauseMusic() {
    if (!music || !musicBtn) return;

    music.pause();
    musicBtn.classList.remove('playing');
    localStorage.setItem('musicPlaying', 'false');
}

// Переключение музыки
function toggleMusic() {
    if (music.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
}

// Запрашиваем взаимодействие с пользователем
function requestUserInteraction() {
    const initMusic = () => {
        if (!isMusicInitialized) {
            playMusic();
            isMusicInitialized = true;
            document.removeEventListener('click', initMusic);
            document.removeEventListener('keydown', initMusic);
        }
    };

    document.addEventListener('click', initMusic, { once: true });
    document.addEventListener('keydown', initMusic, { once: true });
}

// Восстанавливаем состояние при загрузке
window.addEventListener('load', () => {
    const savedState = localStorage.getItem('musicPlaying');

    if (savedState === 'true') {
        // Пробуем воспроизвести, если ранее было включено
        playMusic().catch(() => {
            // Если не получилось, показываем кнопку
            musicBtn.style.display = 'flex';
        });
    } else {
        // Показываем кнопку музыки
        musicBtn.style.display = 'flex';
    }
});

// События для обновления UI
music.addEventListener('play', () => {
    musicBtn.classList.add('playing');
});

music.addEventListener('pause', () => {
    musicBtn.classList.remove('playing');
});

music.addEventListener('ended', () => {
    musicBtn.classList.remove('playing');
    localStorage.setItem('musicPlaying', 'false');
});

// Экспортируем функцию для использования в HTML
window.toggleMusic = toggleMusic;
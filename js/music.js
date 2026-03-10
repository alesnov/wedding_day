const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

window.addEventListener("load", () => {
    music.play().catch(() => {});
});

// document.addEventListener("click", function initMusic() {
//     if (music.paused) {
//         music.play().then(() => musicBtn.classList.add("playing")).catch(() => {});
//     }
//     document.removeEventListener("click", initMusic);
// }, { once: true });

document.addEventListener("click", function initMusic() {
    music.play().then(() => {
        if(musicBtn){
            musicBtn.classList.add("playing")
        }
    }).catch(()=>{})
    document.removeEventListener("click", initMusic)
}, { once:true })

function toggleMusic() {
    if (music.paused) {
        music.play();
        musicBtn.classList.add("playing");
    } else {
        music.pause();
        musicBtn.classList.remove("playing");
    }
}

music.addEventListener("play", () => musicBtn.classList.add("playing"));
music.addEventListener("pause", () => musicBtn.classList.remove("playing"));




const fadeElements = document.querySelectorAll(".fade");
function checkFade() {
    const triggerBottom = window.innerHeight * 0.85;
    fadeElements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) el.classList.add("visible");
    });
}
window.addEventListener("scroll", checkFade);
window.addEventListener("load", checkFade);


// const galleryImages = document.querySelectorAll(".gallery img");
// const lightbox = document.getElementById("lightbox");
// const lightboxImg = document.getElementById("lightbox-img");
// const closeLightbox = document.querySelector(".close-lightbox");
//
// galleryImages.forEach(img => {
//     img.addEventListener("click", () => {
//         lightbox.classList.add("active");
//         lightboxImg.src = img.src;
//     });
// });
//
// closeLightbox.addEventListener("click", () => {
//     lightbox.classList.remove("active");
// });
//
// lightbox.addEventListener("click", (e) => {
//     if (e.target !== lightboxImg) {
//         lightbox.classList.remove("active");
//     }
// });
//
// document.addEventListener("keydown", (e) => {
//     if (e.key === "Escape") {
//         lightbox.classList.remove("active");
//     }
// });


const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

let currentImageIndex = 0;
const imagesArray = Array.from(galleryImages).map(img => img.src);

// Открываем лайтбокс
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(imagesArray[currentImageIndex]);
    });
});

function openLightbox(src) {
    lightbox.classList.add('active');
    lightboxImg.src = src;
    document.body.style.overflow = 'hidden'; // Блокируем скролл

    // Добавляем счетчик
    updateImageCounter();

    // Показываем навигацию
    showNavigation();
}

function closeLightboxFunc() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Возвращаем скролл
    hideNavigation();
}

closeLightbox.addEventListener('click', closeLightboxFunc);

// Закрытие по клику вне изображения
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxFunc();
    }
});

// Навигация клавишами
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightboxFunc();
    if (e.key === 'ArrowLeft') previousImage();
    if (e.key === 'ArrowRight') nextImage();
});

// Навигация кнопками
function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
    updateLightboxImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    // Анимация смены
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = imagesArray[currentImageIndex];
        lightboxImg.style.opacity = '1';
    }, 200);
    updateImageCounter();
}

function updateImageCounter() {
    let counter = document.querySelector('.image-counter');
    if (!counter) {
        counter = document.createElement('div');
        counter.className = 'image-counter';
        lightbox.appendChild(counter);
    }
    counter.textContent = `${currentImageIndex + 1} / ${imagesArray.length}`;
}

function showNavigation() {
    if (imagesArray.length <= 1) return;

    if (!document.querySelector('.nav-button')) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'nav-button prev';
        prevBtn.innerHTML = '❮';
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            previousImage();
        });

        const nextBtn = document.createElement('button');
        nextBtn.className = 'nav-button next';
        nextBtn.innerHTML = '❯';
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextImage();
        });

        lightbox.appendChild(prevBtn);
        lightbox.appendChild(nextBtn);
    }
}

function hideNavigation() {
    const navButtons = document.querySelectorAll('.nav-button, .image-counter');
    navButtons.forEach(btn => btn.remove());
}

// Touch события для мобильных
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextImage();
    if (touchEndX > touchStartX + 50) previousImage();
}
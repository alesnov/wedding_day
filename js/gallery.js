const images = document.querySelectorAll(".gallery img")

const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightbox-img")
const closeBtn = document.querySelector(".close-lightbox")


if(images){

images.forEach(img => {

img.addEventListener("click", () => {

lightbox.style.display="flex"

lightboxImg.src = img.src

})

})

}

function closeLightbox(){

if(lightbox){
lightbox.style.display="none"
}

}

if(closeBtn){
closeBtn.onclick = closeLightbox
}

document.addEventListener("keydown", e=>{

if(e.key==="Escape"){
closeLightbox()
}

})


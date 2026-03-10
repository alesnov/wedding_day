const imgs=document.querySelectorAll(".gallery img")
const box=document.getElementById("lightbox")
const boxImg=document.getElementById("lightbox-img")

imgs.forEach(img=>{
img.onclick=()=>{
box.style.display="flex"
boxImg.src=img.src
}
})

box.onclick=()=>{
box.style.display="none"
}
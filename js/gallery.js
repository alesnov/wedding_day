const upload=document.getElementById("photoUpload")

const gallery=document.getElementById("photoGallery")

upload.onchange=e=>{

let file=e.target.files[0]

let img=document.createElement("img")

img.src=URL.createObjectURL(file)

gallery.appendChild(img)

}


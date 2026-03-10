const music=document.getElementById("music")

function toggleMusic(){

if(music.paused){
music.play()
}else{
music.pause()
}

}
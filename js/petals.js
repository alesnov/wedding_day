const container=document.getElementById("petals")

for(let i=0;i<30;i++){

const petal=document.createElement("div")

petal.className="petal"

petal.style.left=Math.random()*100+"%"
petal.style.animationDuration=5+Math.random()*5+"s"

container.appendChild(petal)

}
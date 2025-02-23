const tan = document.getElementById("tan"); // Поле
const pink = document.getElementById("pink"); // Поле

const showCoords = document.getElementById("showCoords");
const state = document.getElementById("state");

const irises = document.getElementsByClassName("iris"); // Ириси

for (let i = 0; i < irises.length; i++) {
  // подія натискання миші
  irises[i].addEventListener("mousedown", go);
}

function go(event) {
    const flower = document.getElementById(event.target.id);
    const breed = flower.dataset.breed;
    console.log(breed);
}
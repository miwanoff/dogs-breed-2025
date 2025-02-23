const tan = document.getElementById("tan"); // Поле
const pink = document.getElementById("pink"); // Поле

const showCoords = document.getElementById("showCoords");
const state = document.getElementById("state");

const irises = document.getElementsByClassName("iris"); // Ириси

let irisesState = [];
for (let i = 0; i < irises.length; i++) {
   // створення масиву для відстеження irises
   irisesState[irises[i].id] = false;
}

for (let i = 0; i < irises.length; i++) {
  // подія натискання миші
  irises[i].addEventListener("mousedown", go);
}


function go(event) {
  const flower = document.getElementById(event.target.id);
  const breed = flower.dataset.breed;
  // console.log(breed);
  const coords = getCoords(flower);
  // shiftX - сдвиг курсора от левого края картинки
  const shiftX = event.pageX - coords.left;
  // shiftY - сдвиг курсора от верхнего края картинки
  const shiftY = event.pageY - coords.top;
  console.log(shiftX, shiftY);

  function moveAt(event) {
    // shiftX и shiftY - сдвиг курсора относительно верхнего левого угла картинки
    const left = event.pageX - shiftX;
    const top = event.pageY - shiftY;

    flower.style.left = left + "px";
    flower.style.top = top + "px";
    showCoords.innerHTML = `x: ${flower.style.left} y: ${flower.style.top}`;
    if (onField(tan, left, top)) {
      if (breed == "tan") {
        tan.style.border = "2px solid green";
        pink.style.border = "none";
        //irisesState[flower.id] = true;
      } else {
        tan.style.border = "2px solid red";
        pink.style.border = "none";
      }
    }
    // перевірка, чи потрапляє на поле pink квітка з координатами left, top
    if (onField(pink, left, top)) {
      if (breed == "pink") {
        pink.style.border = "2px solid green";
        tan.style.border = "none";
      } else {
        pink.style.border = "2px solid red";
        tan.style.border = "none";
      }
    }
  }

  // событие перемещения мыши
  document.onmousemove = function (event) {
    moveAt(event);
  };

  flower.onmouseup = function (event) {
    res(event);
  };

  function res(event) {
    tan.style.border = "none";
    pink.style.border = "none";
    // отримуємо координати квітки
    const left = parseInt(flower.style.left);
    const top = parseInt(flower.style.top);
    // перевірка, чи потрапляє на поле tan квітка з координатами left, top
    if (onField(tan, left, top)) {
      state.innerHTML =
        flower.id + " сорт " + breed + " відпускаємо на поле tan!"; // записуємо у поле state
    }
    // перевірка, чи потрапляє на поле pink квітка з координатами left, top
    if (onField(pink, left, top)) {
      state.innerHTML =
        flower.id + " сорт " + breed + " відпускаємо на поле pink!";
    }
    document.onmousemove = null;
    flower.onmouseup = null;
  }
  flower.ondragstart = function () {
    return false; // скасування drag and drop браузера
  };
}

//проверка, попадает ли на поле f цветок с координатами left, top
function onField(field, left, top) {
  let f = getCoords(field);
  // if (left > 5 && left < 405 && top > 5 && top < 305) {
  //     return true;
  //   } else
  //   return false;
  return true;
}

// функция возвращает размер элемента и его координаты относительно объемлющего элемента.
function getCoords(elem) {
  const box = elem.getBoundingClientRect();
  //pageYOffset и pageXOffset возвращают скроллирование окна в пикселях
  return {
    width: box.width,
    height: box.height,
    top: box.top + scrollY,
    left: box.left + scrollX,
  };
}

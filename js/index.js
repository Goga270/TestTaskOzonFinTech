/*const inputValue = document.getElementById("input_value");
const progress = document.getElementById("progress");

// Кнопки
const animateBtn = document.getElementById("animate-btn");
const hideBtn = document.getElementById("hide-btn");
const defaultBtn = document.getElementById("default-btn");

// Диаграмма
const diagram = document.getElementById("diagram")

// Переменные
let rotationInterval = null;
let rotation = 0;

inputValue.addEventListener('change', function (e) {
    console.log(e.target.value);
    progress.style.strokeDasharray = e.target.value + " 100";
});

animateBtn.addEventListener('change', function (e) {
    defaultBtn.style.display = "block";
    if (e.target.checked) {
        rotateBlock(rotation);
    } else {
        clearInterval(rotationInterval);
        rotationInterval = null;
    }
});

hideBtn.addEventListener('change', function (e) {
    if (e.target.checked) {
        diagram.classList.add("hidden");
    } else {
        diagram.classList.remove("hidden");
    }
});

defaultBtn.addEventListener('click', function (e) {
    rotation = 0;
    diagram.style.transform = "rotate(0deg)";
});

function rotateBlock() {
    rotationInterval = setInterval(function() {
        rotation += 1;
        rotation = (rotation === 360) ? 0 : rotation;
        diagram.style.transform = `rotate(${rotation}deg)`;
    }, 10); // Интервал вращения в миллисекундах
}*/

import Progress from "./components/Progress.js";
window.customElements.define("progress-element", Progress);

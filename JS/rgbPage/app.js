const button = document.querySelector("button");
const h1 = document.querySelector("h1");

button.addEventListener('click', function() {
    const newColor = randomFunction();

    document.body.style.backgroundColor = newColor;
    h1.innerText = newColor;
})

const randomFunction = () => {
    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);

    if(r < 100 && g < 100 && b < 100) {
        h1.style.color = "white";
    } else {
        h1.style.color = "black";
    }

    return `rgb(${r},${g},${b})`;
}
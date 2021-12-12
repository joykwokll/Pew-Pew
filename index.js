const startButton = document.querySelector(".startButton");

let score = 0;

startButton.addEventListener("click", () => {
    container.appendChild(targetBoard);

    startButton.innerText = "SCORE : " + score;
})
const container = document.querySelector(".container");
// const targetBoard = document.createElement("img");
// targetBoard.setAttribute("class", "targetBoard");
// targetBoard.setAttribute("src", "./Target Board.png");
const targetBoard = document.querySelector(".target");

const contHeight = container.offsetHeight;
const contWidth = container.offsetWidth;

setInterval(() => {
    const randTop = Math.random() * (contHeight - 100);
    const randLeft = Math.random() * (contWidth - 100);    

    targetBoard.style.position = "absolute";
    targetBoard.style.top = randTop + "px";
    targetBoard.style.left = randLeft + "px";
}, 1000);

const bullet = document.querySelector(".bullet");

window.addEventListener("click", (e) => {
    console.log(e);
    bullet.style.top = e.pageY + "px"
    bullet.style.left = e.pageX + "px"

    if(e.target === targetBoard) {
        score++ 
    } else { score-- }
    startButton.innerHTML = "SCORE : " + score;
});

const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
    cursor.style.top = e.pageY + "px";
    cursor.style.left = e.pageX + "px";
});

const startButton = document.querySelector(".startButton");
let started = false;

let score = 0;

function startGame () {
    console.log("started");
    if (!started) {
        setInterval(() => {
            const randTop = Math.random() * (contHeight - 100);
            const randLeft = Math.random() * (contWidth - 100);    

            targetBoard.style.position = "absolute";
            targetBoard.style.top = randTop + "px";
            targetBoard.style.left = randLeft + "px";
        }, 1500);
    }
    started = true;
}

startButton.addEventListener("click", () => {
    container.appendChild(targetBoard);
    startButton.innerText = "SCORE : " + score;
    startGame();
})
const container = document.querySelector(".container");
// const targetBoard = document.createElement("img");
// targetBoard.setAttribute("class", "targetBoard");
// targetBoard.setAttribute("src", "./Target Board.png");
const targetBoard = document.querySelector(".target");

const contHeight = container.offsetHeight;
const contWidth = container.offsetWidth;

const bullet = document.querySelector(".bullet");

window.addEventListener("click", (e) => {
    bullet.style.top = e.pageY + "px"
    bullet.style.left = e.pageX + "px"
    setTimeout(() => {
        bullet.style.top = "0px"
        bullet.style.left = "0px"
    }, 500);

    if(e.target === targetBoard) {
        score++ 
    } else { score > 0 && score-- }
//     if (started) startButton.innerHTML = "SCORE : " + score;
});

// const cursor = document.querySelector(".cursor");

// window.addEventListener("mousemove", (e) => {
//     cursor.style.top = e.pageY + "px";
//     cursor.style.left = e.pageX + "px";
// });

const startButton = document.querySelector(".startButton");
const container = document.querySelector(".container");
const bullet = document.querySelector(".bullet");
let started = false;

let score = 0;

const contHeight = container.offsetHeight;
const contWidth = container.offsetWidth;

function startGame() {
    console.log("started");
    started = true;
    startButton.remove();
    const targetBoard = document.createElement("img");
    targetBoard.setAttribute("class", "targetBoard");
    targetBoard.setAttribute("src", "./targetboard.png");
    container.appendChild(targetBoard);
    setInterval(() => {
        const randTop = Math.random() * (contHeight - 100);
        const randLeft = Math.random() * (contWidth - 100);

        targetBoard.style.position = "absolute";
        targetBoard.style.top = randTop + "px";
        targetBoard.style.left = randLeft + "px";
    }, 1500);
    window.addEventListener("click", (e) => {
        bullet.style.top = e.pageY + "px"
        bullet.style.left = e.pageX + "px"
        // setTimeout(() => {
        //     bullet.style.top = "0px"
        //     bullet.style.left = "0px"
        // }, 500);
        console.log(e.pageY)
        console.log(e.pageX)
        console.log(bullet.style.top)
        console.log(bullet.style.left)


        if (e.target === targetBoard) {
            score++
        } else { score > 0 && score-- }
        //     if (started) startButton.innerHTML = "SCORE : " + score;
    });
}

startButton.addEventListener("click", (event) => {
    console.log(event.currentTarget);
    // startButton.innerText = "SCORE : " + score;
    startGame();
})

// const cursor = document.querySelector(".cursor");
// window.addEventListener("mousemove", (e) => {
//     cursor.style.top = e.pageY + "px";
//     cursor.style.left = e.pageX + "px";
// });

const startButton = document.querySelector(".startButton");
const container = document.querySelector(".container");
const bullet = document.querySelector(".bullet");
let started = false;
let score = 0;

const contHeight = container.offsetHeight;
const contWidth = container.offsetWidth;

//TIMER FUNCTION//
let startingTime = 10;
function timerCountdown(){
    let timer = setInterval(() => {
        startingTime--;
        document.querySelector(".timer").innerHTML = "TIMER: " + startingTime + " Seconds"
    }, 1000);
    // if(startingTime <= 0) {
    //     clearInterval();
    // }
}
function stopTimer(){
    if(startingTime <= 0) {
        clearInterval();
    }
}

function startGame(level) {
    console.log("started");
    started = true;
    startButton.remove();

    //TARGET BOARD//
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
    }, level);
    //TARGET BOARD//

    //
    window.addEventListener("click", (e) => {
        bullet.style.top = e.pageY + "px"
        bullet.style.left = e.pageX + "px"
        setTimeout(() => {
            bullet.style.top = "0px"
            bullet.style.left = "0px"
        }, 500);

        // let bulletTop = bullet.offsetTop

        console.log(e.pageY)
        console.log(e.pageX)
        console.log(bullet.style.top)
        console.log(bullet.style.left)
        console.log(e.target)
        console.log(targetBoard)


        if (e.target === targetBoard) {
            // console.log("hello world")
            score++
        } else { score > 0 && score-- }
        document.querySelector(".score").innerHTML = "SCORE: " + score
        //     if (started) startButton.innerHTML = "SCORE : " + score;
    });
    timerCountdown();

}

function endGame() {

}

//LEVEL 1 (Speed = 1500)
startButton.addEventListener("click", (event) => {
    console.log(event.currentTarget);
    startGame(1500);
})

// window.addEventListener('resize', (ev) => {
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
// })

// const cursor = document.querySelector(".cursor");
// window.addEventListener("mousemove", (e) => {
//     cursor.style.top = e.pageY + "px";
//     cursor.style.left = e.pageX + "px";
// });


//MAKE A TIMER 
//WHEN TIMER RUN OUT, CALL END GAME
//MAKE A END GAME FUNCTION 
//CHECK PASSING MARK 
//IF PASSED MARK

//PROMPT START LEVEL 2 
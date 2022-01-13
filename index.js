const startButton = document.querySelector(".startButton");
const container = document.querySelector(".container");
const bullet = document.querySelector(".bullet");
let started = false;
let score = 0;

const contHeight = container.offsetHeight;
const contWidth = container.offsetWidth;

//TIMER FUNCTION//
let startingTime = 10;
function timerCountdown() {
    let timer = setInterval(() => {
        startingTime--;
        if (startingTime <= 0) {
            clearInterval(timer);
            endGame();
        }
        document.querySelector(".timer").innerHTML = "TIMER: " + startingTime + " Seconds"
    }, 1000);
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
    let targetBoardInterval = setInterval(() => {
        const randTop = Math.random() * (contHeight - 100);
        const randLeft = Math.random() * (contWidth - 100);
        if (startingTime <= 0) {
            targetBoard.remove();
            clearInterval(targetBoardInterval);
        }

        targetBoard.style.position = "absolute";
        targetBoard.style.top = randTop + "px";
        targetBoard.style.left = randLeft + "px";
    }, level);
    

    //TARGET BOARD//

    //BULLET SHOT//
    window.addEventListener("click", (e) => {
        bullet.style.top = e.pageY + "px"
        bullet.style.left = e.pageX + "px"
        setTimeout(() => {
            bullet.style.top = "0px"
            bullet.style.left = "0px"
        }, 500);
    //BULLET SHOT//

    console.log(e.pageY)
    console.log(e.pageX)
    console.log(bullet.style.top)
    console.log(bullet.style.left)
    console.log(e.target)
    console.log(targetBoard)

    //SCORE//
        if (e.target === targetBoard) {
            // console.log("hello world")
            score++
        } else { score > 0 && score-- }
        document.querySelector(".score").innerHTML = "SCORE: " + score
        //     if (started) startButton.innerHTML = "SCORE : " + score;
    });
    //SCORE//

    timerCountdown();

}

// function createNewElement (name, element, className) {
//     let name = document.createElement(element);
//     name.setAttribute("class", className);
//     container.appendChild(name)
// }

function endGame() {
    if (score < 5){

    let gameOver = document.createElement("h1");
    gameOver.setAttribute("class", "gameOver");
    container.appendChild(gameOver);
    document.querySelector(".gameOver").innerHTML = "GAME OVER"

    let finalScore = document.createElement("h3");
    finalScore.setAttribute("class", "finalScore");
    container.appendChild(finalScore);
    document.querySelector(".finalScore").innerHTML = "SCORE: " + score 

    let reStart = document.createElement("BUTTON");
    reStart.setAttribute("class", "reStart");
    container.appendChild(reStart);
    document.querySelector(".reStart").innerHTML = "Restart Game"

    reStart.addEventListener("click", (event) => {
        console.log(event.currentTarget);
        startGame(1500);
    })
    
    }
    else{ 
        // startGame(2500);
    }
    
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


//WHEN TIMER RUN OUT, CALL END GAME
//MAKE A END GAME FUNCTION 
//CHECK PASSING MARK 
//IF PASSED MARK

//PROMPT START LEVEL 2 
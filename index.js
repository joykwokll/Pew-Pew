const startButton = document.querySelector(".startButton");
const container = document.querySelector(".container");
const bullet = document.querySelector(".bullet");
const targetBoard = document.createElement("img");
const nextLevel = document.querySelector(".nextLevel");

let started = false;
let score = 0;
let goal = 0;
let level = 1;
let hiScore = localStorage.getItem('hiScore') || 0;

const contHeight = container.offsetHeight;
const contWidth = container.offsetWidth;

let targetBoardInterval = null;

//TIMER FUNCTION//
let startingTime = 10;
function timerCountdown() {
    startingTime = 10;
    let timer = setInterval(() => {
        startingTime--;
        if (startingTime === 0) {
            document.querySelector(".timer").innerHTML = "TIMER: " + startingTime + " Seconds"
            targetBoard.remove();
            clearInterval(timer);
            clearInterval(targetBoardInterval);
            endGame();
        } else {
            document.querySelector(".timer").innerHTML = "TIMER: " + startingTime + " Seconds"
        }
    }, 1000);
}

function startGame(level) {
    console.log("started");
    started = true;
    if (level === 1) {
        music();
        readyGo();
    }
    let speed = 1500 - (level * 200);
    goal = level * 5

    startButton.remove();
    // if (nextLevel){
    // nextLevel.remove();
    // }

    //TARGET BOARD//
    targetBoard.setAttribute("class", "targetBoard");
    targetBoard.setAttribute("src", "./assets/targetboard.png");
    container.appendChild(targetBoard);
    targetBoardInterval = setInterval(() => {

        const randTop = Math.random() * (contHeight - 100);
        const randLeft = Math.random() * (contWidth - 100);


        targetBoard.style.position = "absolute";
        targetBoard.style.top = randTop + "px";
        targetBoard.style.left = randLeft + "px";
        targetBoard.style.display = "block";
    }, speed);
    //TARGET BOARD//

    //NEXT LEVEL INFO//
    document.querySelector(".level").innerHTML = "LEVEL: " + level
    document.querySelector(".goal").innerHTML = "GOAL: " + goal
    //NEXT LEVEL INFO//


    //BULLET SHOT//
    if (level === 1) {
        window.addEventListener("click", (e) => {
            //GUN SHOT//
            const hitAudio = new Audio();
            hitAudio.src = "./assets/gunshot.mp3";
            hitAudio.load();
            //MISS
            const missAudio = new Audio();
            missAudio.src = "./assets/miss.mp3";
            missAudio.load();
            if (e.target !== startButton) {
                if (e.target === targetBoard) {
                    onclick = hitAudio.play();
                    targetBoard.style.display = "none"
                } else {
                    onclick = missAudio.play();
                }
                bullet.style.top = e.pageY + "px"
                bullet.style.left = e.pageX + "px"
                setTimeout(() => {
                    bullet.style.top = "0px"
                    bullet.style.left = "0px"
                }, 500);
            }
            //BULLET SHOT//


            // console.log(e.pageY)
            // console.log(e.pageX)
            // console.log(bullet.style.top)
            // console.log(bullet.style.left)
            // console.log(e.target)
            // console.log(targetBoard)

            //SCORE//
            if (e.target === targetBoard) {
                // console.log("hello world")
                score++
            } else { score > 0 && score-- }
            document.querySelector(".score").innerHTML = "SCORE: " + score

            //     if (started) startButton.innerHTML = "SCORE : " + score;
        });
    }
    //SCORE//

    timerCountdown();

}

function createNewElement(element, className, text) {
    let newName = document.createElement(element);
    newName.setAttribute("class", className);
    // newName.innerHTML = text
    container.appendChild(newName)
    document.querySelector(`.${className}`).innerHTML = text
}

function endGame() {
    console.log('score', score);
    console.log('goal', goal);
    if (score < goal) {
        loseGame();

        createNewElement("h1", "gameOver", "GAME OVER")
        createNewElement("h3", "finalScore", `SCORE: ${score}`)
        // createNewElement("BUTTON", "reStart", "Restart Game")

        // let finalScore = document.createElement("h3");
        // finalScore.setAttribute("class", "finalScore");
        // container.appendChild(finalScore);
        // document.querySelector(".finalScore").innerHTML = "SCORE: " + score

        let reStart = document.createElement("button");
        reStart.setAttribute("class", "reStart");
        container.appendChild(reStart);
        document.querySelector(".reStart").innerHTML = "Restart Game"

        reStart.addEventListener("click", () => {
            restartGame();
        })

        //HI-SCORE//
        if (score > hiScore) {
            updateHiScore(score);
        }

    } else {
        showNextLevel();
    }

}

function restartGame() {
    location.reload()
}

function showNextLevel() {
    started = false;

    if (score >= 5) {
        winGame();
        createNewElement("h1", "youPassed", "CONGRATULATIONS")
        // let youPassed = document.createElement("h1");
        // youPassed.setAttribute("class", "youPassed");
        // container.appendChild(youPassed);
        // document.querySelector(".youPassed").innerHTML = "CONGRATULATIONS"
        createNewElement("h3", "finalScore", `SCORE: ${score}`)
        // createNewElement("BUTTON", "levelTwo", "Proceed to Level 2")
        nextLevel.style.display = "block"
        if (level === 1) {
            nextLevel.addEventListener("click", (event) => {
                console.log(event.currentTarget);
                event.stopPropagation()
                level++
                startGame(level);
                hideNextLevel();
                console.log("test")
            })
        }
    }

    // startGame(2500);
}

function hideNextLevel() {
    document.querySelector(".youPassed").remove();
    document.querySelector(".finalScore").remove();
    nextLevel.style.display = "none"
}


//LEVEL 1 (Speed = 1500)
startButton.addEventListener("click", (event) => {
    console.log(event.currentTarget);
    startGame(1);
})
//LEVEL 1 (Speed = 1500)

// //LEVEL 2 (Speed = 2000)
// startButton.addEventListener("click", (event) => {
//     console.log(event.currentTarget);
//     startGame(2000);
// })
// //LEVEL 2 (Speed = 2000)

//MUSIC//
function music() {
    const sound = new Audio(src = "./assets/themesong.mp3")
    sound.load();
    sound.play();
    sound.volume = 0.3;
    loop: true;
}

function readyGo() {
    const readyGo = new Audio(src = "./assets/321go.mp3")
    readyGo.load();
    readyGo.play();
}

function winGame() {
    const winGame = new Audio(src = "./assets/win.mp3")
    winGame.load();
    winGame.play();
}

function loseGame() {
    const loseGame = new Audio(src = "./assets/lose.mp3")
    loseGame.load();
    loseGame.play();
}
//MUSIC//

//UPDATE HI SCORE//
function updateHiScore(hiScore) {
    localStorage.setItem('hiScore', hiScore);
    document.querySelector(".hiScore").innerHTML = "HI-SCORE: " + hiScore
}

updateHiScore(hiScore);
// let music = new audio({
//     loop: true,
//     volume: 10,
//     src: "./assets/themesong.mp3"
// })






// window.addEventListener('resize', (ev) => {
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
// })

// const cursor = document.querySelector(".cursor");
// window.addEventListener("mousemove", (e) => {
//     cursor.style.top = e.pageY + "px";
//     cursor.style.left = e.pageX + "px";
// });
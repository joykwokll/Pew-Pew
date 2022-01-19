const startButton = document.querySelector(".startButton");
const container = document.querySelector(".container");
const bullet = document.querySelector(".bullet");
const targetBoard = document.createElement("img");
const nextLevel = document.querySelector(".nextLevel");
let started = false;
let score = 0;
let goal = 0;

const contHeight = container.offsetHeight;
const contWidth = container.offsetWidth;

//TIMER FUNCTION//
let startingTime = 10;
function timerCountdown() {
    let timer = setInterval(() => {
        startingTime--;
        if (startingTime === 0) {
            document.querySelector(".timer").innerHTML = "TIMER: " + startingTime + " Seconds"
            targetBoard.remove();
            clearInterval(timer);
            endGame();
        } else {
            document.querySelector(".timer").innerHTML = "TIMER: " + startingTime + " Seconds"
        }
    }, 1000);
}

function startGame(level) {
    console.log("started");
    started = true;
    music();
    startButton.remove();
    // if (nextLevel){
    // nextLevel.remove();
    // }

    //TARGET BOARD//
    targetBoard.setAttribute("class", "targetBoard");
    targetBoard.setAttribute("src", "./assets/targetboard.png");
    container.appendChild(targetBoard);
    let targetBoardInterval = setInterval(() => {
        const randTop = Math.random() * (contHeight - 100);
        const randLeft = Math.random() * (contWidth - 100);
        if (startingTime === 0) {
            clearInterval(targetBoardInterval);
        }

        targetBoard.style.position = "absolute";
        targetBoard.style.top = randTop + "px";
        targetBoard.style.left = randLeft + "px";
    }, level);
    //TARGET BOARD//

    //BULLET SHOT//
    window.addEventListener("click", (e) => {
        const audio = new Audio();
        audio.src = "./assets/gunshot.mp3";
        audio.load();
        if (e.target !== startButton) {
            onclick = audio.play();
            bullet.style.top = e.pageY + "px"
            bullet.style.left = e.pageX + "px"
            setTimeout(() => {
                bullet.style.top = "0px"
                bullet.style.left = "0px"
            }, 500);
        }
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
            score += 5
        } else { score > 0 && score-- }
        document.querySelector(".score").innerHTML = "SCORE: " + score

        document.querySelector(".goal").innerHTML = "GOAL: " + 5
        //     if (started) startButton.innerHTML = "SCORE : " + score;
    });
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
    if (score < 5) {

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

        createNewElement("h1", "youPassed", "CONGRATULATIONS")
        // let youPassed = document.createElement("h1");
        // youPassed.setAttribute("class", "youPassed");
        // container.appendChild(youPassed);
        // document.querySelector(".youPassed").innerHTML = "CONGRATULATIONS"
        createNewElement("h3", "finalScore", `SCORE: ${score}`)
        // createNewElement("BUTTON", "levelTwo", "Proceed to Level 2")
        nextLevel.show()
        nextLevel.addEventListener("click", (event) => {
            console.log(event.currentTarget);
            event.stopPropagation()
            startGame(2000);
            console.log("test")
        })
    }
    // startGame(2500);
}



//LEVEL 1 (Speed = 1500)
startButton.addEventListener("click", (event) => {
    console.log(event.currentTarget);
    startGame(1500);
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
    let sound = new Audio(src = "./assets/themesong.mp3")
    sound.load();
    sound.play();
    sound.volume = 0.3;
    loop: true;
}

//MUSIC//

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
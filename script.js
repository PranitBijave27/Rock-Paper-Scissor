
const btns = document.querySelectorAll(".box");
const reset = document.querySelector("#reset-btn");
const userScore = document.querySelector("#userScore");
const compScore = document.querySelector("#CompScore");
const winner = document.querySelector(".winner");
const message = document.querySelector(".msg");
const userMoveText = document.querySelector("#user-move");
const compMoveText = document.querySelector("#comp-move");

let userinput = 0;

//  Generate random number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateMoves(userinput, compChoice) {
    const moves = {1: "🪨 Rock", 2: "📄 Paper", 3: "✂️ Scissors"};
    userMoveText.innerText = `🧑 You: ${moves[userinput]}`;
    compMoveText.innerText = `🤖 Computer: ${moves[compChoice]}`;
}

// User choice handling
btns.forEach((box) => {
    box.addEventListener("click", () => {
        let val = box.getAttribute("id");

        if (val === "rock") {
            userinput = 1;
        } else if (val === "paper") {
            userinput = 2;
        } else {
            userinput = 3;
        }

        let compChoice = getRandomNum(1, 3);
        checkWinner(userinput, compChoice);
        userinput = 0;
    });
});

// Reset scores
reset.addEventListener("click", () => {
    userinput = 0;
    compChoice = 0;
    userScore.innerText = 0;
    compScore.innerText = 0;
    userMoveText.innerText = `🧑 You: -`;
    compMoveText.innerText = `🤖 Computer: -`;
});

// Winner logic
function checkWinner(userinput, compChoice) {
    updateMoves(userinput, compChoice);
    if (userinput === compChoice) {
        showWinner("🔄 It's a Draw! Try again 😅");  
    } else if (userinput === 1 && compChoice === 2) { 
        scoreUpdater(compScore);
    } else if (userinput === 1 && compChoice === 3) {
        scoreUpdater(userScore);
    } else if (userinput === 2 && compChoice === 1) {
        scoreUpdater(userScore);
    } else if (userinput === 2 && compChoice === 3) {
        scoreUpdater(compScore);
    } else if (userinput === 3 && compChoice === 1) {
        scoreUpdater(compScore);
    } else if (userinput === 3 && compChoice === 2) {
        scoreUpdater(userScore);
    }
}

// Update score + show popup
function scoreUpdater(player) {
    let num = parseInt(player.innerText);   
    num = num + 1;
    player.innerText = num;

    if (player === compScore) {
        showWinner("Oops! Computer Wins this round");  
    } else {
        showWinner("🎉 You Win! Awesome move 🚀");  
    }
}

// Popup for result
function showWinner(msg) {
    message.innerText = msg;
    winner.classList.add("active");   // show popup

    // Auto-hide popup after 1.5s
    setTimeout(() => {
        winner.classList.remove("active");
    }, 1500);
}

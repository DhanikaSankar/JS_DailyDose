let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    loses: 0,
    ties: 0,
  };

  const gameResult = document.querySelector(".result");
  const gameScore = document.querySelector(".score");
  const gameMoves = document.querySelector(".moves");

  updateScore();

  function selectComputerMove() {
    const randomNum = Math.random();
    let computerMove = "";

    if (randomNum >= 0 && randomNum < 1 / 3) {
      computerMove = "rock";
    } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
      computerMove = "paper";
    } else if (randomNum >= 2 / 3 && randomNum <= 1) {
      computerMove = "scissors";
    }

    return computerMove;
  }

  function compareMove(move) {
    const computerMove = selectComputerMove();
    let result = "";

    if (move === "rock") {
      if (computerMove === "rock") {
        result = "Tie.";
      } else if (computerMove === "paper") {
        result = "You Lose.";
      } else if (computerMove === "scissors") {
        result = "You Win.";
      }
    } else if (move === "paper") {
      if (computerMove === "rock") {
        result = "You Win.";
      } else if (computerMove === "paper") {
        result = "Tie.";
      } else if (computerMove === "scissors") {
        result = "You Lose.";
      }
    } else if (move === "scissors") {
      if (computerMove === "rock") {
        result = "You Lose.";
      } else if (computerMove === "paper") {
        result = "You Win.";
      } else if (computerMove === "scissors") {
        result = "Tie.";
      }
    }

    // Score Section
    if (result === "You Win.") {
      score.wins += 1;
    } else if (result === "You Lose.") {
      score.loses += 1;
    } else if (result === "Tie.") {
      score.ties += 1;
    }
    updateScore();

    localStorage.setItem("score", JSON.stringify(score));

    // Popup Result
    //         alert(
    //           `You picked ${move} and Computer picked ${computerMove} So ${result}
    // Score : Win ${score.wins} Lose ${score.loses} Tie ${score.ties}`
    //         );

    gameResult.innerHTML = `${result}`;
    gameMoves.innerHTML = `You <img src="/images/${move}-emoji.png" width="50px">
    <img src="/images/${computerMove}-emoji.png" width="50px"> Computer`;
  }

  function updateScore() {
    gameScore.innerText = `Wins: ${score.wins},  Losses: ${score.loses},  Ties: ${score.ties}`;
  }

  function handleReset() {
    // console.log("reset");
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem("score");
    updateScore();
  }
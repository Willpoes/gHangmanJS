const word = "LOGICA"; // The word to guess
const guessedLetters = [];
const wrongLetters = [];
const canvas = document.getElementById("hangmanCanvas");
const context = canvas.getContext("2d");

function drawHangman(wrongCount) {
  context.lineWidth = 4;
  context.strokeStyle = "black";
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw base
  context.beginPath();
  context.moveTo(50, 280);
  context.lineTo(150, 280);
  context.moveTo(100, 280);
  context.lineTo(100, 20);
  context.lineTo(160, 20);
  context.lineTo(160, 50);
  context.stroke();

  // Draw head
  if (wrongCount > 0) {
    context.beginPath();
    context.arc(160, 80, 30, 0, Math.PI * 2);
    context.stroke();
  }

  // Draw body
  if (wrongCount > 1) {
    context.beginPath();
    context.moveTo(160, 110);
    context.lineTo(160, 180);
    context.stroke();
  }

  // Draw left arm
  if (wrongCount > 2) {
    context.beginPath();
    context.moveTo(160, 130);
    context.lineTo(130, 160);
    context.stroke();
  }

  // Draw right arm
  if (wrongCount > 3) {
    context.beginPath();
    context.moveTo(160, 130);
    context.lineTo(190, 160);
    context.stroke();
  }

  // Draw left leg
  if (wrongCount > 4) {
    context.beginPath();
    context.moveTo(160, 180);
    context.lineTo(130, 230);
    context.stroke();
  }

  // Draw right leg
  if (wrongCount > 5) {
    context.beginPath();
    context.moveTo(160, 180);
    context.lineTo(190, 230);
    context.stroke();
  }
}

function displayWord() {
  const wordDisplay = document.getElementById("word-display");
  wordDisplay.innerHTML = "";
  for (let letter of word) {
    const letterElement = document.createElement("div");
    letterElement.classList.add("letter");
    letterElement.textContent = guessedLetters.includes(letter) ? letter : "";
    wordDisplay.appendChild(letterElement);
  }
}

function displayWrongLetters() {
  document.getElementById("wrong-letters").textContent = wrongLetters.join(" ");
}

function checkWin() {
  const winMessage = document.getElementById("win-message");
  if (word.split("").every(letter => guessedLetters.includes(letter))) {
    winMessage.style.display = "block";
    document.getElementById("guess-button").disabled = true;
    document.getElementById("guess-input").disabled = true;
  }
}

function handleGuess() {
  const guessInput = document.getElementById("guess-input");
  const guess = guessInput.value.toUpperCase();
  guessInput.value = "";

  if (guess && !guessedLetters.includes(guess) && !wrongLetters.includes(guess)) {
    if (word.includes(guess)) {
      guessedLetters.push(guess);
    } else {
      wrongLetters.push(guess);
      drawHangman(wrongLetters.length);
    }

    displayWord();
    displayWrongLetters();
    checkWin();

    if (wrongLetters.length >= 6) {
      alert("¡Perdiste! La palabra era " + word);
      document.getElementById("guess-button").disabled = true;
      document.getElementById("guess-input").disabled = true;
    }
  }
}

document.getElementById("guess-button").addEventListener("click", handleGuess);
document.getElementById("guess-input").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleGuess();
  }
});

// Initialize game
displayWord();
displayWrongLetters();
drawHangman(wrongLetters.length);
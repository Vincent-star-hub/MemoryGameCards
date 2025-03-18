let attempts = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("numCards").addEventListener("change", startGame);

function startGame() {
  const numCards = parseInt(document.getElementById("numCards").value);
  const gameContainer = document.getElementById("gameBoard");
  gameContainer.innerHTML = "";
  attempts = 0;
  document.getElementById("attempts").innerText = "Attempts " + attempts;

  const emojis = ["🐶", "😺", "🐯", "🐰", "🦊", "🐷", "🦁", "🐸"];
  let selectedEmojis = emojis.slice(0, numCards / 2);

  let cardValues = [...selectedEmojis, ...selectedEmojis];
  cardValues.sort(() => Math.random() - 0.5);

  cardValues.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = emoji;
    card.dataset.index = index;
    card.addEventListener("click", flipCard);
    gameContainer.appendChild(card);
  });

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");
    this.innerText = this.dataset.value;

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    attempts++;
    document.getElementById("attempts").innerText = "Attempts " + attempts;

    checkForMatch();
  }
  function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
      disableCards();
      checkWin();
    } else {
      unflipCards();
    }
  }
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
  }
  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.innerText = "";
      secondCard.innerText = "";
      resetBoard();
    }, 1000);
  }
  function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }
  function checkWin() {
    if (
      document.querySelectorAll(".card.flipped").length ===
      parseInt(document.getElementById("numCards").value)
    ) {
      setTimeout(() => {
        alert("Congratulations! You won!" + "\n" + "Attempts: " + attempts);
      }, 500);
    }
  }
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", incrementAttempts);
  });

  startGame();
}

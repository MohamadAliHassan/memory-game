//Declaring our variables.
const deckContainer = document.querySelector(".deck-container");
let playerPara = document.createElement("p");
let btnStart = document.querySelector(".btn-start");
let score = document.querySelector(".player-score");

//Volym manipulering samt addera klasserna.
let audio = document.querySelector(".theme-song");
audio.volume = 0.05;
audio.loop = true;
let flipAudio = document.querySelector(".card-flip");
flipAudio.volume = 0.5;
let correctAudio = document.querySelector(".audio-correct");
correctAudio.volume = 0.1;
let wrongAudio = document.querySelector(".audio-wrong");
wrongAudio.volume = 0.05;

// Music button
let musicBtn = document
  .querySelector(".btn-music")
  .addEventListener("click", () => {
    audio.play();
  });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Generating alla bilder
function getData() {
  return [
    { imgSrc: "./img/img_Bart_1.png", name: "Bart Simpsons" },
    { imgSrc: "./img/img_Bart_1.png", name: "Bart Simpsons" },
    { imgSrc: "./img/img_family.png", name: "Family" },
    { imgSrc: "./img/img_family.png", name: "Family" },
    { imgSrc: "./img/img_Homer_2.png", name: "Homer" },
    { imgSrc: "./img/img_Homer_2.png", name: "Homer" },
    { imgSrc: "./img/img_Homer1.png", name: "Homer1" },
    { imgSrc: "./img/img_Homer1.png", name: "Homer1" },
    { imgSrc: "./img/img_Homer3.png", name: "Homer3" },
    { imgSrc: "./img/img_Homer3.png", name: "Homer3" },
    { imgSrc: "./img/Lisa.png", name: "Lisa" },
    { imgSrc: "./img/Lisa.png", name: "Lisa" },
    { imgSrc: "./img/maggie.png", name: "maggie" },
    { imgSrc: "./img/maggie.png", name: "maggie" },
    { imgSrc: "./img/NedFlanders.png", name: "Ned" },
    { imgSrc: "./img/NedFlanders.png", name: "Ned" },
    { imgSrc: "./img/Nirvana.png", name: "Nirvana" },
    { imgSrc: "./img/Nirvana.png", name: "Nirvana" },
    { imgSrc: "./img/reggae.png", name: "reggae" },
    { imgSrc: "./img/reggae.png", name: "reggae" },
    { imgSrc: "img/donut_family.png", name: "donut family" },
    { imgSrc: "img/donut_family.png", name: "donut family" },
    { imgSrc: "img/homer_donut.png", name: "homer donut" },
    { imgSrc: "img/homer_donut.png", name: "homer donut" },
  ];
}

//Randomizing
const randomize = () => {
  //Now the cardData is converted from getData
  const cardData = getData();
  console.log(cardData);
  //Randomizing the card for us
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//Card generating function, genererar alla kort
const cardGenerator = () => {
  const cardData = randomize();

  //loop through the object
  for (let i = 0; i < cardData.length; i++) {
    let data = cardData[i];
    createCard(data.imgSrc, data.name);
  }

  // Skapar kort
  function createCard(imgSrc, name) {
    //skapar element
    let cardContainer = document.createElement("div"); // container till varje par
    let frontImg = document.createElement("img");
    let backImg = document.createElement("img");

    // ger classer
    cardContainer.setAttribute("class", "card-container");
    cardContainer.setAttribute("data-name", name);
    frontImg.setAttribute("class", "card-front"); //front-face
    backImg.setAttribute("class", "card-back"); //back-face
    frontImg.setAttribute("src", imgSrc);
    backImg.setAttribute("src", "img/pink_donut.png");

    // lägger ihop element
    deckContainer.append(cardContainer);
    cardContainer.append(frontImg, backImg);
  }
};

cardGenerator();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Spelare 1
let playerOne = {
  name: "Player 1",
  score: 0,
};

//Spelare 2
let playerTwo = {
  name: "Player 2",
  score: 0,
};

let players = [playerOne, playerTwo];
let playerTurn = 0;
const playerTurnLbl = document.querySelector(".player-turn-lbl");
let currentPlayer = players[playerTurn];

//Ändrar player turn
function startGame() {
  playerTurn = 0; // 0 = player 1 turn, 1 = player 2 turn
  currentPlayer = players[playerTurn];
  playerTurnLbl.innerText = currentPlayer.name;

  updateDisplay();
}

startGame();

//Visar vems turn det är
function updateDisplay() {
  let currentPlayer = players[playerTurn];
  playerTurnLbl.innerText = currentPlayer.name;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let hasFlippedCard = false;
let firstCard;
let secondCard;
let cardLock = false;

// 1.
// Card flip
function flipCard() {
  if (cardLock) return; 
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    console.log(!hasFlippedCard); 
    hasFlippedCard = true;
    firstCard = this;
    console.log(hasFlippedCard, this);

   
  } else {
    //second card
    hasFlippedCard = false;
    secondCard = this;
    console.log(hasFlippedCard);

    console.log(firstCard, secondCard);
    matchedCards(); //skickar vidare till matchedCards funktionen
  }
  flipAudio.play();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 2.
// Kollar ifall korten matchar
function matchedCards() {
  
  if (firstCard.dataset.name === secondCard.dataset.name) {
    console.log(firstCard);
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    correctAudio.play();
    scoreCounter();
  } else {
    cardLock = true; 

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      playerTurn = (playerTurn + 1) % 2;
      wrongAudio.play();
      updateDisplay();
      resetCards();
    }, 1000); //1s timer
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let playerOneScoreLbl = document.querySelector(".player-one-score");
let playerTwoScoreLbl = document.querySelector(".player-two-score");

// 3.
//Lägger till score till player 1 och 2.
function scoreCounter() {
  if (playerTurn === 0) {
    // Player 1 turn
    players[playerTurn].score = players[playerTurn].score + 1;
    playerOneScoreLbl.innerHTML = " " + players[playerTurn].score;
    console.log(players[playerTurn]);
  } else if (playerTurn === 1) {
    // Player 2 turn
    players[playerTurn].score = players[playerTurn].score + 1;
    playerTwoScoreLbl.innerHTML = " " + players[playerTurn].score;
    console.log(players[playerTurn]);
    //Räkning visas i konsolen.
  } else {
    console.log("no score");
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function resetCards() {
  
  firstCard = null; 
  secondCard = null; 
  hasFlippedCard = false; 
  cardLock = false; 
}

const cards = document.querySelectorAll(".card-container");


cards.forEach((card) => card.addEventListener("click", flipCard));


document.querySelector(".btn-start").addEventListener("click", function () {
  window.location.reload();
  return false;
});

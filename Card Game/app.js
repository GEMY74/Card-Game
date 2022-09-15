/*
- card game first you open it the card is shown and after 3 sec will be rotate or if you press the start btn
- the start btn will be disabled
- there is a wrong counter with 10 tries
- if you get all cards and less than 10 tries will show an ovelay with congrate msg
- if get all 10 tries will show an overlay with game over msg
- both overlays have a play again btn that reload the page and start over

*/

// ================ html selectors & variables ===================
var section = document.querySelector("section");
var wrongTries = document.querySelector(".tries span");
var startBtn = document.getElementById("start_btn");
var right = document.getElementById("right");
var wrong = document.getElementById("wrong");
var clapp = document.getElementById("clapp");
var overlay = document.querySelector(".overlay");
var overlayHeader = document.querySelector(".overlay h1");
var overlayPara = document.querySelector(".overlay h3 ");
var againBtn = document.getElementById("again_btn");


// ==================================================

startBtn.addEventListener("click", startGame);
againBtn.addEventListener("click", realod);

// ==================== functions =====================
// function to get all images
var getData = () => [
  { imgSrc: "./assets/breakingbad.jpg", name: "breakingbad" },
  { imgSrc: "./assets/breakingbad.jpg", name: "breakingbad" },
  { imgSrc: "./assets/dexter.jpg", name: "dexter" },
  { imgSrc: "./assets/dexter.jpg", name: "dexter" },
  { imgSrc: "./assets/friends.png", name: "friends" },
  { imgSrc: "./assets/friends.png", name: "friends" },
  { imgSrc: "./assets/got.jpg", name: "got" },
  { imgSrc: "./assets/got.jpg", name: "got" },
  { imgSrc: "./assets/hanibal.png", name: "hanibal" },
  { imgSrc: "./assets/hanibal.png", name: "hanibal" },
  { imgSrc: "./assets/himym.png", name: "himym" },
  { imgSrc: "./assets/himym.png", name: "himym" },
  { imgSrc: "./assets/lacasa.png", name: "lacasa" },
  { imgSrc: "./assets/lacasa.png", name: "lacasa" },
  { imgSrc: "./assets/prisonbreak.jpg", name: "prisonbreak" },
  { imgSrc: "./assets/prisonbreak.jpg", name: "prisonbreak" },
  { imgSrc: "./assets/shrlwk.jpg", name: "shrlwk" },
  { imgSrc: "./assets/shrlwk.jpg", name: "shrlwk" },
  { imgSrc: "./assets/soul.jpg", name: "soul" },
  { imgSrc: "./assets/soul.jpg", name: "soul" },
];

// function to make a random cards of images
var random = () => {
  var cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

// function to make the card in html
var cardGenrator = () => {
  var cardData = random();

  cardData.forEach((item) => {
    //foreach data we make a card layout
    var card = document.createElement("div");
    var back = document.createElement("div");
    var face = document.createElement("img");

    card.classList = "card";
    card.style.transform = "rotateY(180deg)";
    face.classList = "face";
    back.classList = "back";

    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

    card.appendChild(face);
    card.appendChild(back);
    section.appendChild(card);
  });
};

// function that start the game
function startGame() {
  //when we click start we rotate the cards 180deg and startbtn will be disabled
  var cards = document.querySelectorAll(".card");
  cards.forEach(function (card) {
    card.style.transform = "rotateY(0deg)";
    startBtn.classList.add("disabled");
    card.addEventListener("click", (e) => {
      card.classList.toggle("rotateCard");
      checkCards(e);
    });
  });
}

// settimeout function that rotate the cards after two seceond even if the start btn is not clicked
function timer() {
  setTimeout(function () {
    var cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.style.transform = "rotateY(0deg)";
    });
  }, 3000);
}
timer();

// function to check if the cards is match or not
function checkCards(card) {
  var clickedCard = card.target;
  clickedCard.classList.add("rotated");
  var rotatedCards = document.querySelectorAll(".rotated");
  var finishCards = document.querySelectorAll(".rotateCard");

  // check the length of rotatedcards and if it is 2 we will make another check to see if they are match or not
  if (rotatedCards.length === 2) {
    document.querySelector(".container").style.pointerEvents = "none";

    if (
      rotatedCards[0].getAttribute("name") ===
      rotatedCards[1].getAttribute("name")
    ) {
      right.play();
      rotatedCards.forEach((card) => {
        card.classList.remove("rotated");
        setTimeout(() => (card.style.visibility = "hidden"), 1000);
      });
    } else {
      wrongTries.textContent++;
      wrong.play();
      rotatedCards.forEach((card) => {
        card.classList.remove("rotated");
        setTimeout(() => card.classList.remove("rotateCard"), 1000);
      });
    }
  }

  setTimeout(function () {
    document.querySelector(".container").style.pointerEvents = "auto";
  }, 1500);

  // check here if the wrong tries is less than ten and finished is 20 to show the overlay
  if (finishCards.length === 20 && wrongTries.textContent < 10) {
    setTimeout(function () {
      overlay.classList.add("show");
      overlayHeader.textContent = "congratulations 🎉";
      overlayPara.textContent = "You Win!";
      clapp.play();
    }, 1500);
  } else if (wrongTries.textContent >= 10) {
    setTimeout(function () {
      overlay.classList.add("show");
      overlayHeader.textContent = "Game Over ❌";
      overlayPara.textContent = "You Lost!";
    }, 1500);
  }
}

cardGenrator();

function realod() {
  location.reload();
  overlay.classList.remove("show");
}

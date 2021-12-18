"use strict";
let thisAccountObj;
let same = 0;
let users = JSON.parse(localStorage.getItem('allUsers'));
let endStep = document.getElementById('endStep');
let modal = document.getElementById('blackOut');
let newGame = document.getElementById('newGame');
let backToHome = document.getElementById('backToHome');
let gameMenu = document.getElementById('gameMenu');
let cardsContainer = document.getElementById('cardsContainer');
let cardsNumber = 0;
let choices = [];
let backRemoved = [];
let posOfImg1 = {}; //for animate
let posOfImg2 = {}; //for animate
let leftDestinate = 50;
let topDestinate = window.innerHeight - 50;
modal.remove();
backToHome.remove();
newGame.remove();
endStep.remove();
let sideCards = [];
let animPic1 = document.createElement('img');
let animPic2 = document.createElement('img');
document.getElementById('helloUser').innerText = "שלום " + JSON.parse(localStorage.getItem('currentAccount'));
console.log(topDestinate);

let card8 = document.getElementById('cardsNumber8');
let card12 = document.getElementById('cardsNumber12');
let card16 = document.getElementById('cardsNumber16');
if (card8.checked) {
   cardsNumber = Number(card8.value);

}
if (cardsNumber == 16) {
   cardsContainer.style.width = "70vw";
}

if (findAccount().score <= 4) {
   card12.setAttribute('disabled', 'disabled');
   card16.setAttribute('disabled', 'disabled');
} else if (findAccount().score <= 10) {
   card16.setAttribute('disabled', 'disabled');
}

card8.addEventListener('click', () => {
   cardsNumber = Number(card8.value);
   console.log(cardsNumber);
});
card12.addEventListener('click', () => {
   cardsNumber = Number(card12.value);
   console.log(cardsNumber);
});
card16.addEventListener('click', () => {
   cardsNumber = Number(card16.value);
   console.log(cardsNumber);
});

if (cardsNumber == 16) {
   cardsContainer.setAttribute('width', '70vw');
}
console.log(cardsNumber);
let start = document.getElementById("start");
start.addEventListener('click', () => {
   gameMenu.classList.add('hideWithoutSpace');
   startGame();
})

function startGame() {
playSound2();
   timer();
   let memoryCards1 = [
      "../images/memoryGame/amburella.png", "../images/memoryGame/baloon.png",
      "../images/memoryGame/boat.png", "../images/memoryGame/book.png",
      "../images/memoryGame/branch.png", "../images/memoryGame/bridge.png",
      "../images/memoryGame/dance.png", "../images/memoryGame/door.png",
      "../images/memoryGame/go.png", "../images/memoryGame/hug.png",
      "../images/memoryGame/hunny.png", "../images/memoryGame/iiiaa.png",
      "../images/memoryGame/kengeru.png", "../images/memoryGame/pig.png",
      "../images/memoryGame/scarf.png", "../images/memoryGame/walk.png"
   ]
   let memoryCards2 = [
      "../images/memoryGame/amburella.png", "../images/memoryGame/baloon.png",
      "../images/memoryGame/boat.png", "../images/memoryGame/book.png",
      "../images/memoryGame/branch.png", "../images/memoryGame/bridge.png",
      "../images/memoryGame/dance.png", "../images/memoryGame/door.png",
      "../images/memoryGame/go.png", "../images/memoryGame/hug.png",
      "../images/memoryGame/hunny.png", "../images/memoryGame/iiiaa.png",
      "../images/memoryGame/kengeru.png", "../images/memoryGame/pig.png",
      "../images/memoryGame/scarf.png", "../images/memoryGame/walk.png"
   ]
   memoryCards1.splice(cardsNumber / 2); //set the length of 
   memoryCards2.splice(cardsNumber / 2);



   let currentBoardImg = []; //The array of the cards of current game
   let currentBoardBack = []; //the array of the current back board.

   for (let i = 0; i < cardsNumber / 2; i++) { //create first half backCards and half images
      currentBoardBack[i] = document.createElement('img'); //creat back img
      currentBoardImg[i] = document.createElement('img'); //creat card
      if (document.getElementById('picture2').checked) {
         currentBoardBack[i].src = document.getElementById('picture2').value; //src of back img
      } else {
         currentBoardBack[i].src = document.getElementById('picture1').value; //src of back img
      }

      cardsContainer.append(currentBoardBack[i]);
      let randIndex = Math.round(Math.random() * (memoryCards1.length - 1));
      currentBoardImg[i].src = memoryCards1[randIndex];
      memoryCards1.splice(randIndex, 1);
      cardsContainer.append(currentBoardImg[i]);
      currentBoardImg[i].classList.add("hideWithoutSpace");
   }

   for (let i = cardsNumber / 2; i < cardsNumber; i++) { //create secend half backCards and half images
      currentBoardBack[i] = document.createElement('img'); //creat back img
      currentBoardImg[i] = document.createElement('img'); //creat card
      if (document.getElementById('picture2').checked) {
         currentBoardBack[i].src = document.getElementById('picture2').value; //src of back img
      } else {
         currentBoardBack[i].src = document.getElementById('picture1').value; //src of back img
      }
      cardsContainer.append(currentBoardBack[i]);
      let randIndex = Math.round(Math.random() * (memoryCards2.length - 1));
      currentBoardImg[i].src = memoryCards2[randIndex];
      memoryCards2.splice(randIndex, 1);
      cardsContainer.append(currentBoardImg[i]);
      currentBoardImg[i].classList.add("hideWithoutSpace");
   }

   choose();

   function choose() {

      for (let i = 0; currentBoardBack.length > i; i++) {
         currentBoardBack[i].addEventListener('click', () => {
            playSound();
            if (choices.length < 2) {
               currentBoardBack[i].classList.add('turnOutBack');
               backRemoved.push(currentBoardBack[i]);
               setTimeout(() => {
                  currentBoardBack[i].classList.add('hideWithoutSpace');
                  currentBoardImg[i].classList.remove('hideWithoutSpace');
                  currentBoardImg[i].classList.add('turnIn');
                  choices.push(currentBoardImg[i]);
                  checkChoices();
               }, 500);

            }
         })
      }
   }

}

function checkChoices() {
   console.log(choices.length);

   if (choices.length == 2) {

      if (choices[0].src == choices[1].src) {
         //phoo announce gooood
         same++;
         console.log(same);
         posOfImg1 = getOffset(choices[0]);
         posOfImg2 = getOffset(choices[1]);
         animPic1.src = choices[0].src;
         animPic2.src = choices[1].src;
         animPic1.classList.add('animPic');
         animPic2.classList.add('animPic');
         animToSide();
         //make the cards wanish
         setTimeout(() => {
            choices[0].classList.add('hideWithSpace');
            choices[1].classList.add('hideWithSpace');
            choices = [];
            backRemoved = [];
         }, 100);



      } else {
         //phoo announce wrong
         console.log("ttttttttttttttttttttry..");
         setTimeout(() => {
            choices[0].classList.remove('turnIn');
            choices[1].classList.remove('turnIn');
            choices[0].classList.add('turnOut');
            choices[1].classList.add('turnOut');
            setTimeout(() => {
               console.log(choices);
               choices[0].classList.add('hideWithoutSpace');
               choices[1].classList.add('hideWithoutSpace');
               backRemoved[0].classList.remove('hideWithoutSpace');
               backRemoved[1].classList.remove('hideWithoutSpace');
               backRemoved[0].classList.add('turnIn');
               backRemoved[1].classList.add('turnIn');
               backRemoved = [];
               choices = [];
               console.log(choices.length);
            }, 500);
         }, 1500);

      }

   }
}

function playSound() {
   var sound = document.getElementById("audio");
   sound.play();
}
function playSound2() {
   var sound = document.getElementById("music");
   sound.play();
}


function animToSide() {
   let x1 = posOfImg1.left;
   let x2 = posOfImg2.left - 75;
   let y1 = posOfImg1.top;
   let y2 = posOfImg2.top;
   console.log(posOfImg1);
   console.log(posOfImg2);
   document.body.append(animPic1);
   document.body.append(animPic2);
   animPic1.style.position = "absolute";
   animPic2.style.position = "absolute";
   animPic1.style.left = x1 + "px";
   animPic2.style.left = x2 + "px";
   animPic1.style.top = y1 + "px";
   animPic2.style.top = y2 + "px";
   animPic1.classList.add('rotate');
   animPic2.classList.add('rotate');
   myMove(animPic1, x1, y1);
   myMove(animPic2, x2, y2);
   topDestinate = topDestinate + 25;
}

function myMove(elem, x, y) {
   let id = null;

   clearInterval(id);
   id = setInterval(frame, 5);

   function frame() {
      if (x <= leftDestinate && y <= topDestinate) {
         clearInterval(id);
         elem.classList.remove('rotate');
         console.log("stop");
         let sideCard = document.createElement('img');
         sideCard.src = elem.src;
         sideCard.style.position = "absolute";
         sideCard.style.top = elem.style.top;
         sideCard.style.left = elem.style.left;
         console.log(elem.style.top);
         sideCard.classList.add('animPic');
         sideCards.push(sideCard);
         document.body.append(sideCard);
      } else {
        
         x = x * 0.97;
         y = y * 0.9;
         elem.style.top = y + 'px';
         elem.style.left = x + 'px';
         console.log("continu");

      }
   }
}


function getOffset(el) {
   const rect = el.getBoundingClientRect();
   return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
   };
}

let help = document.getElementById('help');
let howToPlay = document.getElementById('howToPlay');
help.addEventListener('click', () => {
   howToPlay.classList.toggle('hideWithoutSpace');
   howToPlay.classList.toggle('animate');
})


function findAccount() { //check if account name exist in the array return true/false
   let getArray = JSON.parse(localStorage.getItem('allUsers')); //get the array from storage
   let currentName = JSON.parse(localStorage.getItem('currentAccount'));
   thisAccountObj = getArray.find(({
      name
   }) => name == currentName);
   console.log(thisAccountObj.score);
   return thisAccountObj;
}

function timer() {
   let interval = setInterval(myTimer, 1000);
   let minutes = 60;

   function myTimer() {

      if (minutes < 0||same==cardsNumber/2) {
         clearInterval(interval);
         let index = users.findIndex(findAccount);
         let currentObj = findAccount();
         currentObj.score = (findAccount().score) + same;
         if (index != -1) {
            users[index] = currentObj;
            localStorage.setItem('allUsers', JSON.stringify(users));
         }
         document.body.append(modal);
         document.body.append(newGame);
         document.body.append(backToHome);
         document.body.append(endStep);
         modal.classList.add('animate');
         backToHome.classList.add('animate');
         newGame.classList.add('animate');
         endStep.classList.add('animate');
         endStep.innerText = `מצויין!!!!!! במשחק זה השגת: ${same} נקודות.
         סך הנקודות שלך : ${currentObj.score} נקודות.`
      } else {
         document.getElementById('timerText').innerHTML = minutes;
         minutes--;

      }
   }
}

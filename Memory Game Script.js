var tileImages = [];
var tileArray = [];
var tileFlippedOver = [];
var cardFlipped = -1;
var timer = '';
var playLockout = false;
var gamePlay = false;


//DOM ELEMENTS
var startButton = document.getElementById("start");
var gameBoard = document.getElementById("gameboard");
var message = document.getElementById('message');


//EVENT LISTENERS to DOM ELEMENTS
startButton.addEventListener('click', startGame);


//FUNCTIONS
function startGame() {
  cardFlipped = -1;
  playLockout = false;

  //apply CSS style: display='none' to hide the start button
  startButton.style.display = 'none';
  if (!gamePlay) {
    gamePlay = true;
    buildArray();
    tileArray = tileImages.concat(tileImages);
    shuffleArray(tileArray);
    buildBoard();
    //console.log(tileArray);
    message.innerHTML = "Click any tile";
  }
  //console.log("Game Started!");
}


function buildArray(){
  for (x = 1; x < 7; x++){
    tileImages.push(x + '.jpg');
  }
//console.log(tileImages);
}


function buildBoard(){
  var html = "";
  //x corresponds to the filenames of the images from 1-6.jpg
  for (x = 0; x <= (tileArray.length-1); x++) {
    //built it twice b/c 2 sets of cards
    html += '<div class="gameTile"><div class="gameTile">';
    //NOTE VERY CAREFUL ATTENTION NEEDED TO THE CODE BELOW!!!
    html += '<img id="cardz' + x + '" src="images/back.jpg" onclick="pickCard(' + x + ',this)" class="flipImage"></div></div>';
    //NOTE the space in   ...x + '" src="images/back.jpg"...  before the   src= is crucial!!

  }
  gameBoard.innerHTML = html;
}


function pickCard(tileIndex, t){
  /*console.log(tileIndex);
  console.log(cardFlipped);
  t = this
  console.log(t.src);
  */
  // check if card is already flipped
  if (!isinArray(t.id, tileFlippedOver) && !playLockout) {
    //checking for the id of the tile we clicked on (this.id)
    //if it is in the array tileFlippedOver
    console.log('Not already in array');
    message.innerHTML = "...Checking for a match...";

    if(cardFlipped >= 0){
      //second cardFlipped
      cardFlip(t, tileIndex);
      //update the source
      var secondCard = tileIndex;
      //console.log('second', cardFlipped);
      playLockout = true;

      //check for match
      if (checkSrc(tileFlippedOver[tileFlippedOver.length-1]) == checkSrc(tileFlippedOver[tileFlippedOver.length-2])) {
        //console.log('Match!');
        message.innerHTML = "You found a Match! Keep going.";
        playLockout = false;
        cardFlipped = -1;

        //check if game is over
        //if number of cards flipped = number of all cards
        if (tileFlippedOver.length == tileArray.length) {
          gameOver();
        }

      } else {  //no match
        //console.log("Not a match!");
        message.innerHTML = "ERROR! The Earth will explode now. Good job.";
        timer = setInterval(hideCard, 2000);
      }

    } else {
      //first cardFlipped
      cardFlipped = tileIndex;
      cardFlip(t, tileIndex);
      //console.log('first', cardFlipped);
    }
}  else {
    console.log("Already in array!");
    message.innerHTML = "What are you doing? You already clicked that one.";
  }
}


function hideCard() {
  //remove the last two cards from the array of flipped cards
  var vid = tileFlippedOver.pop();
  //set image back to the "back.jpg" logo
  document.getElementById(vid).src = "images/back.jpg";
  var vid = tileFlippedOver.pop();
  document.getElementById(vid).src = "images/back.jpg";
  //stop the timer now
  clearInterval(timer);
  playLockout = false;
  cardFlipped = -1;
  message.innerHTML = "Click any tile";
}


function gameOver() {
  //restore the start button
  startButton.style.display = 'block';
  message.innerHTML = "Click to start new game";
  gamePlay = false;
  //re-empty out arrays
  tileImages = [];
  tileFlippedOver = [];
}


function isinArray(v, array) {
  //need to pass a value and the array you want to check it in
  return array.indexOf(v) > -1;
  //
}

function cardFlip(t, ti) {
  //ti is tileIndex that will be passed to it
  t.src = "images/" + tileArray[ti];
  tileFlippedOver.push(t.id);  //gives an array of tiles that are flipped over

}


function checkSrc(v) {
  var v = document.getElementById(v).src;
  return v;
}



//RESUABLE FUNCTION TO SHUFFLE!!
function shuffleArray(array){
  for (x = array.length -1; x > 0; x--){
    var holder = Math.floor(Math.random() * (x + 1) );
    //console.log(holder);
    var itemValue = array[x];
    //overwritting the original spot with this new item
    array[x] = array[holder];
    //swapping spots of those two items
    array[holder] = itemValue;
    //console.log(itemValue);
  }
  return array;
}

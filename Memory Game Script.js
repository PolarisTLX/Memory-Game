var tileImages = [];
var tileArray = [];
var gamePlay = false;

//DOM ELEMENTS
var startButton = document.getElementById("start");



//EVENT LISTENERS
startButton.addEventListener('click', startGame);



//FUNCTIONS

function buildArray(){
  for (x = 1; x < 7; x++){
    tileImages.push(x+'.jpg');
  }
//console.log(tileImages);
}

function startGame(){
  //apply CSS style: display='none' to hide the start button
  startButton.style.display='none';
  if(!gamePlay){
    gamePlay = true;
    buildArray();
    tileArray = tileImages.concat(tileImages);
    shuffleArray(array);
    console.log(tileArray);
  }
  //console.log("Game Started!");
}

//RESUABLE FUNCTION TO SHUFFLE!!
function shuffleArray(array){
  for (x = array.length -1; x > 0; x--){
    var holder = Math.floor(Math.random()* (x+1) );
    console.log(holder);
    var itemValue = array[x];
    //overwritting the original spot with this new item
    array[x] = array[holder];
    //swapping spots of those two items
    array[holder] - itemValue;
    console.log(itemValue);
  }
  return array;
}

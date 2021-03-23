var clueDelay = 750;
var cueLength = 750;
var cueDelay = 200;

var numBtns = 6;
var numTurns = 8;

var pattern;
var progress;
var guesses;

var playing = false;
var turn = true;


var btns = [];
generateButtons();

//Generate the amount of buttons specified.
function generateButtons() {
  var startNote = 261.6;
  for (var i = 0; i < numBtns; i++) {
    //Calculate which octave this is in (every 7 notes)
    var octave = Math.floor(i / Key.length);
    //Calculate what the new base note is (doubled for every octave)
    var note = startNote * Math.pow(2, octave);
    //Multiply to the frequency of the note in the key
    note *= 1 + Key[i % Key.length] / 12;

    var btn = new Button(
      note,
      //Map hue evenly around the circle
      "hsl(" + (i * 360 / numBtns) + ", 30%, 60%)",
      "hsl(" + (i * 360 / numBtns) + ", 100%, 60%)",
      i
    );
    btns.push(btn);
  }
}


function startGame() {
  //Swap buttons
  document.getElementById("strtBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");

  //Setup game with pattern
  playing = true;
  pattern = [];
  for (var i = 0; i < numTurns; i++)
    pattern.push(Math.floor(Math.random() * numBtns));
  progress = 1;

  //Start Clue Sequence
  turn = false;
  setTimeout(playSequence, clueDelay, 0);
}

function stopGame() {
  //Swap buttons
  document.getElementById("strtBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");

  playing = false;
  turn = true;
}


function playSequence(index) {
  //Clear amount of guesses (each time)
  guesses = 0;

  //If not playing or done with the current sequence...
  if (!playing || index >= progress) {
    //...give the turn back to the player and return
    turn = true;
    return;
  }
  //Play Cue and schedule next recursion 
  btns[pattern[index]].play(cueLength);
  setTimeout(playSequence, cueLength + cueDelay, index + 1);
}


function guess(key) {
  if (!playing)
    return;
  if (btns[pattern[guesses]].key == key)
    success();
  else
    mistake();
}

function success() {
  guesses++;
  if (guesses >= progress) {
    if (progress >= numTurns) {
      //Game is over. You won!
      stopGame();
      alert("You won");
      return;
    }
    //Or continue and play next Clue Sequence
    progress++;
    turn = false;
    setTimeout(playSequence, clueDelay, 0);
  }
}

function mistake() {
  //Game is over. You lost.
  stopGame();
  alert("You lost");
}
//Specifies which notes are in a key.
//Key of C includes the 0th, 2nd, ... 11th notes
// C D E F G A B
//This is the same for all keys, so it just needs the base note
const Key = [0, 2, 4, 5, 7, 9, 11];

var tone = false;
var volume = 1.0;

var context = new AudioContext();
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0, 0)
o.connect(g)
o.start(0)

function playTone(freq) {
  //Resume Context in the case that it was stopped on load
  context.resume();
  if (!tone) {
    o.frequency.value = freq;
    g.gain.setTargetAtTime(volume, 0, 0.025);
    tone = true;
    return true;
  }
  return false;
}

function stopTone(){
    g.gain.setTargetAtTime(0, 0, 0.025);
    tone = false;
}
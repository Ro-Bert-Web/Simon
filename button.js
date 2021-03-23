class Button {
  constructor(freq, inactive, active, key) {
    this.pressed = false;

    //Set attributes
    this.freq = freq;
    this.inactive = inactive;
    this.active = active;
    this.key = key;

    //Create button element and set its functionality
    this.btn = document.createElement("Button");
    this.btn.style.background = this.inactive;

    var button = this;
    this.btn.onmousedown = function() {
      //Users can only press a button if it's their turn
      if (turn)
        button.press();
    };
    this.btn.onmouseup = function() {
      //This only matters if the button is pressed
      if (button.pressed) {
        guess(key);
        button.release();
      }
    };

    document.getElementById("gameButtons").appendChild(this.btn);
  }


  press() {
    //If playTone was successful update appearance
    if (!playTone(this.freq))
      return false;
    this.btn.style.background = this.active;
    this.pressed = true;
    return true;
  }

  release() {
    //Stop the tone and update appearance
    stopTone();
    this.btn.style.background = this.inactive;
    this.pressed = false;
  }

  //Press a button (Cue) for a certain amount of time
  play(cueLength) {
    if (!this.press())
      return false;
    var button = this;
    setTimeout(function() {button.release();}, cueLength);
    return true;
  }
}
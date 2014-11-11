var synth = new Tone.MonoSynth();
synth.toMaster();

window.onmousedown = function () {
  synth.triggerAttack('C4');
};

window.onmouseup = function () {
  synth.triggerRelease();
};

var E4 = new Tone.Player('sounds/e4.wav', playerLoaded);
var F4 = new Tone.Player('sounds/f4.wav', playerLoaded);
var B4 = new Tone.Player('sounds/b4.wav', playerLoaded);
var C5 = new Tone.Player('sounds/c5.wav', playerLoaded);
var D5 = new Tone.Player('sounds/d5.wav', playerLoaded);
var pannerLeft = new Tone.Panner();
var pannerRight = new Tone.Panner();
pannerLeft.setPan(0);
pannerRight.setPan(1);

function playerLoaded(player) {
  //able to be retriggered before the file is done playing
  player.retrigger = true;
  //player.connect(kickPong);
}

function playerPan(player, _direction) {
  var panner;
  if (_direction === 0) {
    panner = pannerLeft;
  } else if (_direction === 1) {
    panner = pannerRight;
  }
  player.connect(panner);
  panner.toMaster();
}
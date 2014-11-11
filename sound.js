var synth = new Tone.MonoSynth();
synth.toMaster();

window.onmousedown = function () {
  synth.triggerAttack('C4');
};

window.onmouseup = function () {
  synth.triggerRelease();
};

var panner = new Tone.Panner();
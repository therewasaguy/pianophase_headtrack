// 

var b, c, d, e, f;

function preload() {
  b = loadSound('../sounds/b4.wav');
  c = loadSound('../sounds/c5.wav');
  d = loadSound('../sounds/d5.wav');
  e = loadSound('../sounds/e4.wav');
  f = loadSound('../sounds/f4.wav');
}

var part1, part2, phrase;

function setup() {
  part1 = new p5.Part();
  part2 = new p5.Part();

  phrase = [e, f, b, c, d, f, e, c, b, f, d];

  part1.addPhrase('phrase', playSoundFile, phrase);
  part2.addPhrase('phrase', playSoundFile, phrase);

  part1.setBPM(100);
  part2.setBPM(101);

  part1.loop();
  part2.loop();
}


function playSoundFile(soundfile) {
  soundfile.play();
}
// переключение между нотами и кнопками
let buttons = document.querySelectorAll("button");
// console.log(buttons);

let piano = document.querySelector(".piano");
// console.log(piano);

buttons[0].addEventListener("mousedown", function () {
  buttons[0].classList.add("btn-active");
  buttons[1].classList.remove("btn-active");
  const keys = document.querySelectorAll(".piano-key");
  for (let item of keys) {
    item.classList.remove("letter");
  }
});

buttons[1].addEventListener("mousedown", function () {
  buttons[1].classList.add("btn-active");
  buttons[0].classList.remove("btn-active");
  const keys = document.querySelectorAll(".piano-key");
  for (let item of keys) {
    item.classList.add("letter");
  }
});

buttons[2].addEventListener("click", function () {
  if (document.fullscreenElement === null) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

window.addEventListener("keydown", function (e) {
  // console.log(e.keyCode);
  if (e.keyCode == 27) {
    document.exitFullscreen();
  }
});

window.addEventListener("keydown", function (e) {
  // console.log(e.keyCode);
  if (pressed[e.keyCode] == false) {
    pressed[e.keyCode] = true;
    console.log(pressed[e.keyCode]);
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(
      `.piano-key[data-letter="${e.code[3]}"]`
    );
    // console.log(key);
    if (!audio) {
      return;
    }
    audio.play();
    audio.currentTime = 0;
    key.classList.add("piano-key-active");
    key.classList.add("piano-key-press");
  }
});

window.addEventListener("keyup", function (event) {
  pressed[event.keyCode] = false;
  // console.log(e);
  const key = document.querySelector(
    `.piano-key[data-letter="${event.code[3]}"]`
  );
  console.log(key);
  key.classList.remove("piano-key-press");
  console.log(key);
});

piano.addEventListener("mousedown", mouseOver);
piano.addEventListener("mousedown", keyPlay);
piano.addEventListener("mousedown", function () {
  // console.log(event);
});
piano.addEventListener("mouseup", function () {
  const keys = document.querySelectorAll(".piano-key");
  //   console.log(keys);
  for (let i = 0; i < keys.length; i++) {
    keys[i].removeEventListener("mouseover", keyPlay);
  }
});

function mouseOver() {
  // console.log(event);
  const keys = document.querySelectorAll(".piano-key");
  //   console.log(keys);
  for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener("mouseover", keyPlay);
  }
}

function keyPlay() {
  // console.log(event);
  const audio = document.querySelector(
    `audio[data-key="${event.toElement.dataset.key}"]`
  );
  const key = event.target;
  //   console.log(event.target);
  if (!audio) {
    return;
  }
  audio.play();
  audio.currentTime = 0;
  key.classList.add("piano-key-active");
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("piano-key-active");
}

const keys = document.querySelectorAll(".piano-key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

let pressed = {};
for (let item of keys) {
  pressed[item.dataset.key] = false;
}
console.log(pressed);

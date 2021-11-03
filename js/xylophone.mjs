let root;
const KEYS_TO_NOTES = {};
const bar = document.querySelectorAll('.bar');
const audio = document.querySelectorAll('audio');


export function init(rootElement) {
  root = rootElement;
}

window.addEventListener('keydown', onKeyPress);

bar.forEach(item => {
  item.addEventListener('mouseover', onBarMouseOver);
  item.addEventListener('click', onBarClick);
});


function onBarMouseOver(event) {
  if (event.target.classList.contains('disabled')) return;

  event.target.classList.add('bar-active');
  setTimeout((e) => {
    event.target.classList.remove('bar-active');
  }, 130);
  showGlow()
  setTimeout(hideGlow, 130);

  const note = event.target.dataset.note;
  audio.forEach(item => {
    if (item.getAttribute('src') === `sounds/${note}.mp3`) {
      item.currentTime = 0;
      item.play();

    }
  })
}


function onBarClick(event) {
  event.target.classList.toggle('disabled');
}

function onKeyPress(event) {
  let key = event.code.slice(-1).toUpperCase();

  let disabled = false;

  bar.forEach(item => {
    if (item.dataset.note === key) {
      if (item.classList.contains('disabled')) {
        disabled = true;
        return;
      }
      item.classList.add('bar-active');
      setTimeout((e) => {
        item.classList.remove('bar-active');
      }, 130);
    }
  });
  if (disabled) return

  audio.forEach(item => {
    if (item.getAttribute('src') === `sounds/${key}.mp3`) {
      item.currentTime = 0;
      item.play();
    }
  })
}

//cursor script begin
document.addEventListener('mousemove', cursor);
let stick = document.querySelector('.stick');
let glow1 = document.querySelector('.stick .glow-1');
let glow2 = document.querySelector('.stick .glow-2');
let notes = document.querySelectorAll('.note');

function cursor(e) {
  stick.style.top = e.clientY - 12 + "px";
  stick.style.left = e.clientX + 12 + "px";
}

function showGlow() {
  glow1.style.animationPlayState = "running";
  glow2.style.animationPlayState = "running";
  glow1.classList.remove('hidden');
  glow2.classList.remove('hidden');
}

function hideGlow() {
  glow1.style.animationPlayState = "paused";
  glow2.style.animationPlayState = "paused";
  glow1.classList.add('hidden');
  glow2.classList.add('hidden');
}







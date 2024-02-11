// scripts.js
const video = document.querySelector('.player__video');
const toggleButton = document.querySelector('.toggle');
const volumeSlider = document.querySelector('[name="volume"]');
const playbackSpeedSlider = document.querySelector('[name="playbackSpeed"]');
const skipButtons = document.querySelectorAll('.player__button[data-skip]');
const progressFilled = document.querySelector('.progress__filled');
const progressBar = document.querySelector('.progress');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggleButton.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggleButton.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

volumeSlider.addEventListener('input', handleRangeUpdate);
playbackSpeedSlider.addEventListener('input', handleRangeUpdate);

let mousedown = false;
progressBar.addEventListener('click', scrub);////
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);

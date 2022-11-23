const MUSIC_LIST = [
  {
    img: "./images/chuyenDoiTa.jpg",
    name: "Chuyện Đôi Ta",
    artist: "EMCEE L, MUỘI",
    music: "./musics/ChuyenDoiTa.mp3",
  },
  {
    img: "./images/choDoiCoDangSo.jpg",
    name: "Chờ Đợi Có Đáng Sợ",
    artist: "Andiez",
    music: "./musics/ChoDoiCoDangSo.mp3",
  },
  {
    img: "./images/HoangHon.jpg",
    name: "Dừng lại và quên thôi",
    artist: "Trung Quân",
    music: "./musics/Dung Lai Va Quen Thoi Ke Doc Hanh OST_ -.mp3",
  },
  {
    img: "./images/Galaxy.jpg",
    name: "Enchanted",
    artist: "Taylor Swift",
    music: "./musics/Enchanted.mp3",
  },
  {
    img: "./images/LadyMay.png",
    name: "Anh chưa thương em đến vậy đâu",
    artist: "lADY MÂY",
    music: "./musics/AnhChuaThuongEmDenVayDau-VA-7999147.mp3",
  },
  {
    img: "./images/light.jpg",
    name: "Như những phút ban đầu cover",
    artist: "lADY MÂY",
    music: "./musics/Nhu-Nhung-Phut-Ban-Dau-Lady-May.mp3",
  },
];
var nowPlaying = document.querySelector(".now-playing");
var playPauseTrack = document.querySelector(".play-pause");
var currentTrack = document.createElement("audio");
var seekSlider = document.querySelector(".seek_slider");
var volumeSlider = document.querySelector(".volume_slider");
var currentTime = document.querySelector(".current-time");
var totalDuration = document.querySelector(".total-duration");
var wave = document.querySelector(".wave");
var trackArt = document.querySelector(".track-art");
var trackName = document.querySelector(".track-name");
var trackArtist = document.querySelector(".track-artist");
var trackIndex = 0;
var isPlaying = false;
var isRandom = false;
var updateTimer;

loadTrack(trackIndex);

function loadTrack(trackIndex) {
  clearInterval(updateTimer);
  reset();

  currentTrack.src = MUSIC_LIST[trackIndex].music;
  currentTrack.load();

  trackArt.style.backgroundImage = "url(" + MUSIC_LIST[trackIndex].img + ")";
  trackName.textContent = MUSIC_LIST[trackIndex].name;
  trackArtist.textContent = MUSIC_LIST[trackIndex].artist;
  nowPlaying.textContent =
    "Playing music " + (trackIndex + 1) + " of " + MUSIC_LIST.length;

  updateTimer = setInterval(setUpdate, 1000);
  currentTrack.addEventListener("ended", getNextTrack);
}

function getNextTrack() {
  if (trackIndex < MUSIC_LIST.length - 1) {
    trackIndex += 1;
  } else {
    trackIndex = 0;
  }
  loadTrack(trackIndex);
  playTrack();
}

function getPrevTrack() {
  if (trackIndex <= MUSIC_LIST.length - 1 && trackIndex >= 0) {
    trackIndex -= 1;
  }
  if (trackIndex < 0) {
    trackIndex = MUSIC_LIST.length - 1;
  }
  loadTrack(trackIndex);
  playTrack();
}

function playOrPauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function reset() {
  currentTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
  volumeSlider.value = 10;
}

function playTrack() {
  currentTrack.play();
  isPlaying = true;
  wave.classList.add("loader");
  trackArt.classList.add("rotate");
  playPauseTrack.innerHTML =
    '<i class="fa-solid fa-circle-pause pause-icon"></i>';
  setVolume();
}

function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  wave.classList.remove("loader");
  trackArt.classList.remove("rotate");
  playPauseTrack.innerHTML =
    '<i class="fa-solid fa-circle-play play-icon"></i>';
}

function repeatTrack() {
  loadTrack(trackIndex);
  playTrack();
}

function setUpdate() {
  var seekPosition = 0;
  if (!isNaN(currentTrack.duration)) {
    seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
    seekSlider.value = seekPosition;

    var currentMinutes = Math.floor(currentTrack.currentTime / 60);
    var currentSeconds = Math.floor(
      currentTrack.currentTime - currentMinutes * 60
    );
    var durationMinutes = Math.floor(currentTrack.duration / 60);
    var durationSeconds = Math.floor(
      currentTrack.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    currentTime.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

function setVolume() {
  currentTrack.volume = volumeSlider.value / 100;
  console.log(volumeSlider.value / 100);
}

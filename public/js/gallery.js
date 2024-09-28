const backgroundImages = [
    'url("../images/background1.jpg")',
    'url("../images/background2.jpg")'
];

let currentIndex = 0;

function changeBackground() {
    currentIndex = (currentIndex + 1) % backgroundImages.length;
    document.body.style.backgroundImage = backgroundImages[currentIndex];
}

// Change background every 10 seconds
setInterval(changeBackground, 10000);

document.querySelectorAll('.video-card').forEach(card => {
    const playBtn = card.querySelector('.play-btn');
    const muteBtn = card.querySelector('.mute-btn');
    const maximizeBtn = card.querySelector('.maximize-btn');
    const minimizeBtn = card.querySelector('.minimize-btn');
    const video = card.querySelector('video');

    // Maximize video
    maximizeBtn.addEventListener('click', () => {
        card.classList.add('maximized');
        maximizeBtn.style.display = 'none';
        minimizeBtn.style.display = 'inline-block';
    });

    // Minimize video
    minimizeBtn.addEventListener('click', () => {
        card.classList.remove('maximized');
        minimizeBtn.style.display = 'none';
        maximizeBtn.style.display = 'inline-block';
    });

    // Play video
    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        } else {
            video.pause();
            playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        }
    });

    // Mute/Unmute video
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? '<i class="bi bi-volume-mute"></i>' : '<i class="bi bi-volume-up"></i>';
    });
});
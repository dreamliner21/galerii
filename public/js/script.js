document.addEventListener("DOMContentLoaded", () => {
    const playButtons = document.querySelectorAll('.play-btn');
    const muteButtons = document.querySelectorAll('.mute-btn');
    const volumeSliders = document.querySelectorAll('.volume-slider');
    const maximizeButtons = document.querySelectorAll('.maximize-btn');
    const minimizeButtons = document.querySelectorAll('.minimize-btn');

    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const videoId = button.getAttribute('data-video');
            const video = document.getElementById(videoId);
            if (video.paused) {
                video.play();
                button.textContent = 'Pause';
            } else {
                video.pause();
                button.textContent = 'Play';
            }
        });
    });

    muteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const videoId = button.getAttribute('data-video');
            const video = document.getElementById(videoId);
            video.muted = !video.muted;
            button.textContent = video.muted ? 'Unmute' : 'Mute';
        });
    });

    volumeSliders.forEach(slider => {
        slider.addEventListener('input', () => {
            const videoId = slider.getAttribute('data-video');
            const video = document.getElementById(videoId);
            video.volume = slider.value;
        });
    });

    maximizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const videoId = button.getAttribute('data-video');
            const video = document.getElementById(videoId);
            const card = video.parentElement;
            card.classList.toggle('maximized');
        });
    });

    minimizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const videoId = button.getAttribute('data-video');
            const video = document.getElementById(videoId);
            const card = video.parentElement;
            card.classList.remove('maximized');
        });
    });
});

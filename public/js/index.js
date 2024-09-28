const backgrounds = [
    'url(/images/background1.jpg)',
    'url(/images/background2.jpg)',
    'url(/images/background3.jpg)'
];

const backgroundColors = [
    '#4a90e2', // Blue
    '#e94e77', // Pink
    '#50e3c2', // Green
    '#f5a623'  // Orange
];

let currentBackgroundIndex = 0;
let currentColorIndex = 0;
let backgroundColorMode = false; // Track if background color is active
const body = document.querySelector('body');

// Function to change the background every 10 seconds
function changeBackground() {
    if (backgroundColorMode) {
        // Change to the next color in the array
        currentColorIndex = (currentColorIndex + 1) % backgroundColors.length;
        body.style.backgroundImage = ''; // Remove background image
        body.style.backgroundColor = backgroundColors[currentColorIndex];
    } else {
        // Change to the next background image in the array
        currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
        body.style.backgroundImage = backgrounds[currentBackgroundIndex];
        body.style.backgroundColor = ''; // Remove background color
    }
}

// Set interval to change background every 10 seconds
setInterval(changeBackground, 10000);

// Event listener to change between background image and background color on icon click
document.getElementById('change-bg-color').addEventListener('click', () => {
    backgroundColorMode = !backgroundColorMode; // Toggle between color and image
    changeBackground(); // Immediately change background after switching mode
});

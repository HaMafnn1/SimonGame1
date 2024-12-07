let gameSequence = [];
let playerSequence = [];
let score = 0;
let highScore = 0;
let gameActive = false;
let gameSpeed = 1000; // Default speed (Normal)
const colors = ['green', 'red', 'yellow', 'blue', 'purple', 'orange'];
const startButton = document.getElementById('start-btn');
const levelButton = document.getElementById('level-btn');
const easyButton = document.getElementById('easy-btn');
const normalButton = document.getElementById('normal-btn');
const hardButton = document.getElementById('hard-btn');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const buttons = document.querySelectorAll('.button');
const introScreen = document.getElementById('intro-screen');
const levelModal = document.getElementById('level-modal');
const scoreContainer = document.getElementById('score-container');
const gameButtons = document.querySelector('.game-buttons');

// Start the game
startButton.addEventListener('click', startGame);

// Open level selection
levelButton.addEventListener('click', openLevelSelection);

// Level selection buttons
easyButton.addEventListener('click', () => setLevel('easy'));
normalButton.addEventListener('click', () => setLevel('normal'));
hardButton.addEventListener('click', () => setLevel('hard'));

// Start a new game
function startGame() {
    introScreen.style.display = 'none';  // Hide intro screen
    scoreContainer.style.display = 'block';  // Show score container
    gameButtons.style.display = 'flex';  // Show game buttons
    document.body.style.backgroundImage = 'none'; // Remove the background image
    gameActive = true;
    score = 0;
    gameSequence = [];
    playerSequence = [];
    updateScore();
    playRound();
}

// Open level selection modal
function openLevelSelection() {
    levelModal.style.display = 'block';
}

// Set game level
function setLevel(level) {
    levelModal.style.display = 'none';
    if (level === 'easy') {
        gameSpeed = 1200;
    } else if (level === 'normal') {
        gameSpeed = 800;
    } else if (level === 'hard') {
        gameSpeed = 400;
    }
    playRound();
}

// Play a new round
function playRound() {
    playerSequence = [];
    const newColor = getRandomColor();
    gameSequence.push(newColor);

    flashSequence();
}

// Get a random color that is not the same as the last one
function getRandomColor() {
    let newColor;
    do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
    } while (gameSequence.length > 0 && gameSequence[gameSequence.length - 1] === newColor);
    return newColor;
}

// Flash the game sequence to the player
function flashSequence() {
    let i = 0;
    const interval = setInterval(() => {
        flashButton(gameSequence[i]);
        i++;
        if (i >= gameSequence.length) {
            clearInterval(interval);
            listenForPlayerInput();
        }
    }, gameSpeed);
}

// Flash a specific button
function flashButton(color) {
    const button = document.getElementById(color);
    button.style.opacity = 1;
    button.style.transform = 'scale(1.1)';
    setTimeout(() => {
        button.style.opacity = 0.7;
        button.style.transform = 'scale(1)';
    }, 500);
}

// Listen for player input
function listenForPlayerInput() {
    buttons.forEach(button => {
        button.addEventListener('click', handlePlayerInput);
    });
}

// Handle player input
function handlePlayerInput(e) {
    const color = e.target.id;
    playerSequence.push(color);
    flashButton(color);

    if (checkPlayerInput()) {
        if (playerSequence.length === gameSequence.length) {
            score++;
            updateScore();
            setTimeout(playRound, 1000); // Start a new round
        }
    } else {
        endGame();
    }
}

// Check if the player's input matches the sequence
function checkPlayerInput() {
    const currentIndex = playerSequence.length - 1;
    return gameSequence[currentIndex] === playerSequence[currentIndex];
}

// End the game
function endGame() {
    gameActive = false;
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = highScore;
    }
    alert(`Game Over! Your score was: ${score}`);
}

// Update the score display
function updateScore() {
    scoreDisplay.textContent = score;
}

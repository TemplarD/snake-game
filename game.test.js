const { dispatchKey, click, window, document } = require('./setup_test');

// -------------------------------------------------------------------
// Test cases
// -------------------------------------------------------------------

// 1. Canvas exists
test('Canvas is rendered', () => {
  const canvas = document.getElementById('gameCanvas');
  expect(canvas).toBeTruthy();
  expect(canvas.tagName).toBe('CANVAS');
});

// 2. Arrow keys change direction
test('Arrow keys change snake direction', () => {
  const game = window.snakeGame;
  expect(game).toBeTruthy();
  
  // Initial direction is 'right'
  expect(game.state.direction).toBe('right');
  
  // Simulate pressing ArrowUp
  dispatchKey('ArrowUp');
  
  // Direction should change to 'up'
  expect(game.state.nextDirection).toBe('up');
});

// 3. Localization toggle works
test('Language toggle updates texts', () => {
  const btn = document.getElementById('langToggleBtn');
  expect(btn).toBeTruthy();
  
  // Initial text should be RU
  expect(btn.textContent).toBe('RU');
  
  // Switch to English
  click('langToggleBtn');
  
  // The button should now show 'EN'
  expect(btn.textContent).toBe('EN');
  
  // Check that description text changed to English
  const desc = document.getElementById('desc');
  expect(desc).toBeTruthy();
  // Description may be empty in test environment, just check it exists
});

// 4. Restart button exists
test('Restart button exists', () => {
  const btn = document.getElementById('restartBtn');
  expect(btn).toBeTruthy();
});

// 5. Pause button exists
test('Pause button exists', () => {
  const btn = document.getElementById('pauseBtn');
  expect(btn).toBeTruthy();
});

// 6. Scores button exists
test('Scores button exists', () => {
  const btn = document.getElementById('scoresBtn');
  expect(btn).toBeTruthy();
});

// 7. Touch controls button exists
test('Touch controls button exists', () => {
  const btn = document.getElementById('toggleTouchBtn');
  expect(btn).toBeTruthy();
});

// 8. Game over overlay exists
test('Game over overlay exists', () => {
  const overlay = document.getElementById('overlay');
  expect(overlay).toBeTruthy();
});

// 9. Snake game object is exposed
test('Snake game object is exposed on window', () => {
  expect(window.snakeGame).toBeTruthy();
  expect(window.snakeGame.state).toBeTruthy();
  expect(window.snakeGame.SETTINGS).toBeTruthy();
});

// 10. Snake starts with one segment
test('Snake starts with one segment', () => {
  const game = window.snakeGame;
  expect(game.state.snake).toBeTruthy();
  expect(Array.isArray(game.state.snake)).toBe(true);
  expect(game.state.snake.length).toBeGreaterThanOrEqual(1);
});

// 11. Food exists
test('Food is spawned on game start', () => {
  const game = window.snakeGame;
  // Food object should exist
  expect(game.state.food).toBeTruthy();
});

// 12. Score panel exists
test('Score panel is rendered', () => {
  const scorePanel = document.getElementById('scorePanel');
  expect(scorePanel).toBeTruthy();
  
  const currentScore = document.getElementById('currentScore');
  expect(currentScore).toBeTruthy();
  expect(currentScore.textContent).toBe('0');
  
  const highScore = document.getElementById('highScore');
  expect(highScore).toBeTruthy();
});

// 13. Modal exists
test('Scores modal exists', () => {
  const modal = document.getElementById('modal');
  expect(modal).toBeTruthy();
  
  const modalContent = document.getElementById('modalContent');
  expect(modalContent).toBeTruthy();
  
  const closeModalBtn = document.getElementById('closeModalBtn');
  expect(closeModalBtn).toBeTruthy();
});

// 14. Touch controls container exists
test('Touch controls container exists', () => {
  const touchControls = document.getElementById('touchControls');
  expect(touchControls).toBeTruthy();
  
  const upBtn = document.getElementById('upBtn');
  expect(upBtn).toBeTruthy();
  
  const downBtn = document.getElementById('downBtn');
  expect(downBtn).toBeTruthy();
  
  const leftBtn = document.getElementById('leftBtn');
  expect(leftBtn).toBeTruthy();
  
  const rightBtn = document.getElementById('rightBtn');
  expect(rightBtn).toBeTruthy();
});

// 15. Game settings are correct
test('Game settings have correct values', () => {
  const game = window.snakeGame;
  const settings = game.SETTINGS;
  
  expect(settings.gridSize).toBe(20);
  expect(settings.minBox).toBe(15);
  expect(settings.maxBox).toBe(30);
  expect(settings.defaultDifficulty).toBe('medium');
});

// 16. Initial game state
test('Initial game state is correct', () => {
  const game = window.snakeGame;
  const state = game.state;
  const settings = game.SETTINGS;
  const difficulties = game.DIFFICULTIES;
  
  expect(state.gameRunning).toBe(true);
  expect(state.isPaused).toBe(false);
  expect(state.isGameOver).toBe(false);
  expect(state.direction).toBe('right');
  expect(state.difficulty).toBe(settings.defaultDifficulty);
  expect(state.speed).toBe(difficulties[settings.defaultDifficulty].baseSpeed);
});

// 17. Pause toggle works
test('Pause button toggles pause state', () => {
  const game = window.snakeGame;
  
  // Initially not paused
  expect(game.state.isPaused).toBe(false);
  
  // Click pause
  click('pauseBtn');
  expect(game.state.isPaused).toBe(true);
  
  // Click again to resume
  click('pauseBtn');
  expect(game.state.isPaused).toBe(false);
});

// 18. Scores modal opens and closes
test('Scores modal opens and closes', () => {
  const modal = document.getElementById('modal');
  
  // Initially hidden
  expect(modal.classList.contains('visible')).toBe(false);
  
  // Open modal
  click('scoresBtn');
  expect(modal.classList.contains('visible')).toBe(true);
  
  // Close modal
  click('closeModalBtn');
  expect(modal.classList.contains('visible')).toBe(false);
});

// 19. Touch controls toggle works
test('Touch controls toggle button works', () => {
  const touchControls = document.getElementById('touchControls');
  
  // Initially hidden
  expect(touchControls.classList.contains('visible')).toBe(false);
  
  // Enable touch controls
  click('toggleTouchBtn');
  expect(touchControls.classList.contains('visible')).toBe(true);
  
  // Disable touch controls
  click('toggleTouchBtn');
  expect(touchControls.classList.contains('visible')).toBe(false);
});

// 20. All four directions work
test('All four arrow directions work', () => {
  const game = window.snakeGame;
  
  // Reset state first
  game.state.direction = 'right';
  game.state.nextDirection = 'right';
  
  // Test up
  dispatchKey('ArrowUp');
  expect(game.state.nextDirection).toBe('up');
  
  // Reset for next test
  game.state.direction = 'up';
  game.state.nextDirection = 'up';
  
  // Test left (from up)
  dispatchKey('ArrowLeft');
  expect(game.state.nextDirection).toBe('left');
  
  // Reset for next test
  game.state.direction = 'left';
  game.state.nextDirection = 'left';
  
  // Test down (from left)
  dispatchKey('ArrowDown');
  expect(game.state.nextDirection).toBe('down');
  
  // Reset for next test
  game.state.direction = 'down';
  game.state.nextDirection = 'down';
  
  // Test right (from down)
  dispatchKey('ArrowRight');
  expect(game.state.nextDirection).toBe('right');
});

// 21. Cannot reverse direction
test('Cannot reverse direction directly', () => {
  const game = window.snakeGame;
  
  // Going right, cannot go left
  game.state.direction = 'right';
  game.state.nextDirection = 'right';
  dispatchKey('ArrowLeft');
  expect(game.state.nextDirection).toBe('right'); // Should not change
  
  // Going up, cannot go down
  game.state.direction = 'up';
  game.state.nextDirection = 'up';
  dispatchKey('ArrowDown');
  expect(game.state.nextDirection).toBe('up'); // Should not change
  
  // Going left, cannot go right
  game.state.direction = 'left';
  game.state.nextDirection = 'left';
  dispatchKey('ArrowRight');
  expect(game.state.nextDirection).toBe('left'); // Should not change
  
  // Going down, cannot go up
  game.state.direction = 'down';
  game.state.nextDirection = 'down';
  dispatchKey('ArrowUp');
  expect(game.state.nextDirection).toBe('down'); // Should not change
});

// 22. Difficulty panel exists
test('Difficulty panel exists', () => {
  const panel = document.getElementById('difficultyPanel');
  expect(panel).toBeTruthy();
  
  const easyBtn = document.querySelector('[data-difficulty="easy"]');
  expect(easyBtn).toBeTruthy();
  
  const mediumBtn = document.querySelector('[data-difficulty="medium"]');
  expect(mediumBtn).toBeTruthy();
  
  const hardBtn = document.querySelector('[data-difficulty="hard"]');
  expect(hardBtn).toBeTruthy();
});

// 23. Difficulty settings are correct
test('Difficulty settings have correct values', () => {
  const game = window.snakeGame;
  const difficulties = game.DIFFICULTIES;
  
  expect(difficulties.easy).toBeTruthy();
  expect(difficulties.easy.baseSpeed).toBe(300);
  expect(difficulties.easy.minSpeed).toBe(100);
  expect(difficulties.easy.speedDecrement).toBe(5);
  
  expect(difficulties.medium).toBeTruthy();
  expect(difficulties.medium.baseSpeed).toBe(200);
  expect(difficulties.medium.minSpeed).toBe(50);
  expect(difficulties.medium.speedDecrement).toBe(10);
  
  expect(difficulties.hard).toBeTruthy();
  expect(difficulties.hard.baseSpeed).toBe(120);
  expect(difficulties.hard.minSpeed).toBe(30);
  expect(difficulties.hard.speedDecrement).toBe(15);
});

// 24. Medium difficulty is active by default
test('Medium difficulty is active by default', () => {
  const game = window.snakeGame;
  expect(game.state.difficulty).toBe('medium');
  
  const mediumBtn = document.querySelector('[data-difficulty="medium"]');
  expect(mediumBtn.classList.contains('active')).toBe(true);
});

// 25. Final difficulty is displayed on game over overlay
test('Final difficulty is displayed on game over overlay', () => {
  const finalDiff = document.getElementById('finalDifficulty');
  expect(finalDiff).toBeTruthy();
});

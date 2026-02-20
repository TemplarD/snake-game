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

// 7. Help button exists
test('Help button exists', () => {
  const btn = document.getElementById('helpBtn');
  expect(btn).toBeTruthy();
  expect(btn.textContent).toBe('?');
});

// 8. Touch controls button exists
test('Touch controls button exists', () => {
  const btn = document.getElementById('toggleTouchBtn');
  expect(btn).toBeTruthy();
});

// 9. Game over overlay exists
test('Game over overlay exists', () => {
  const overlay = document.getElementById('overlay');
  expect(overlay).toBeTruthy();
});

// 10. Help modal exists
test('Help modal exists', () => {
  const helpModal = document.getElementById('helpModal');
  expect(helpModal).toBeTruthy();
  
  const helpModalContent = document.getElementById('helpModalContent');
  expect(helpModalContent).toBeTruthy();
  
  const closeHelpBtn = document.getElementById('closeHelpModalBtn');
  expect(closeHelpBtn).toBeTruthy();
});

// 11. Snake game object is exposed
test('Snake game object is exposed on window', () => {
  expect(window.snakeGame).toBeTruthy();
  expect(window.snakeGame.state).toBeTruthy();
  expect(window.snakeGame.SETTINGS).toBeTruthy();
  expect(window.snakeGame.DIFFICULTIES).toBeTruthy();
});

// 12. Snake starts with one segment
test('Snake starts with one segment', () => {
  const game = window.snakeGame;
  expect(game.state.snake).toBeTruthy();
  expect(Array.isArray(game.state.snake)).toBe(true);
  expect(game.state.snake.length).toBeGreaterThanOrEqual(1);
});

// 13. Food exists
test('Food is spawned on game start', () => {
  const game = window.snakeGame;
  expect(game.state.food).toBeTruthy();
});

// 14. Score panel is rendered
test('Score panel is rendered', () => {
  const scorePanel = document.getElementById('scorePanel');
  expect(scorePanel).toBeTruthy();
  
  const currentScore = document.getElementById('currentScore');
  expect(currentScore).toBeTruthy();
  expect(currentScore.textContent).toBe('0');
  
  const highScore = document.getElementById('highScore');
  expect(highScore).toBeTruthy();
});

// 15. Scores modal exists
test('Scores modal exists', () => {
  const modal = document.getElementById('modal');
  expect(modal).toBeTruthy();
  
  const modalContent = document.getElementById('modalContent');
  expect(modalContent).toBeTruthy();
  
  const closeModalBtn = document.getElementById('closeModalBtn');
  expect(closeModalBtn).toBeTruthy();
  
  const scoresTable = document.getElementById('scoresTable');
  expect(scoresTable).toBeTruthy();
});

// 16. Touch controls container exists
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

// 17. Game settings are correct
test('Game settings have correct values', () => {
  const game = window.snakeGame;
  const settings = game.SETTINGS;
  
  expect(settings.gridSize).toBe(20);
  expect(settings.minBox).toBe(15);
  expect(settings.maxBox).toBe(30);
  expect(settings.defaultDifficulty).toBe('medium');
  expect(settings.maxScores).toBe(10);
});

// 18. Initial game state
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

// 19. Pause toggle works
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

// 20. Scores modal opens and closes
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

// 21. Help modal opens and closes
test('Help modal opens and closes', () => {
  const helpModal = document.getElementById('helpModal');
  
  // Initially hidden
  expect(helpModal.classList.contains('visible')).toBe(false);
  
  // Open help modal
  click('helpBtn');
  expect(helpModal.classList.contains('visible')).toBe(true);
  
  // Close help modal
  click('closeHelpModalBtn');
  expect(helpModal.classList.contains('visible')).toBe(false);
});

// 22. Touch controls toggle button works
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

// 23. All four arrow directions work
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

// 24. Cannot reverse direction
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

// 25. Difficulty panel exists
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

// 26. Difficulty settings are correct
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

// 27. Medium difficulty is active by default
test('Medium difficulty is active by default', () => {
  const game = window.snakeGame;
  expect(game.state.difficulty).toBe('medium');
  
  const mediumBtn = document.querySelector('[data-difficulty="medium"]');
  expect(mediumBtn.classList.contains('active')).toBe(true);
});

// 28. Final difficulty is displayed on game over overlay
test('Final difficulty is displayed on game over overlay', () => {
  const finalDiff = document.getElementById('finalDifficulty');
  expect(finalDiff).toBeTruthy();
});

// 29. Help modal has all sections
test('Help modal has all sections', () => {
  const helpModalContent = document.getElementById('helpModalContent');
  expect(helpModalContent).toBeTruthy();
  
  const h3Tags = helpModalContent.querySelectorAll('h3');
  expect(h3Tags.length).toBe(3); // objective, controls, difficulty
  
  const ulTags = helpModalContent.querySelectorAll('ul');
  expect(ulTags.length).toBe(3); // 3 lists
  
  // Check objective list has 3 items
  expect(ulTags[0].children.length).toBe(3);
  
  // Check controls list has 4 items
  expect(ulTags[1].children.length).toBe(4);
  
  // Check difficulty list has 3 items
  expect(ulTags[2].children.length).toBe(3);
});

// 30. Scores table has correct headers
test('Scores table has correct headers', () => {
  const scoresTable = document.getElementById('scoresTable');
  expect(scoresTable).toBeTruthy();
  
  const headers = scoresTable.querySelectorAll('thead th');
  expect(headers.length).toBe(3);
  expect(headers[0].textContent).toBe('#');
  // Header could be in RU or EN depending on previous tests
  expect(['Счёт', 'Score']).toContain(headers[1].textContent);
  expect(['Сложность', 'Difficulty']).toContain(headers[2].textContent);
});

// 31. UI layout does not change significantly on language toggle
test('UI layout does not change significantly on language toggle', () => {
  const scorePanel = document.getElementById('scorePanel');
  const controls = document.getElementById('controls');
  const difficultyPanel = document.getElementById('difficultyPanel');
  
  // Get initial dimensions
  const scorePanelHeight = scorePanel.offsetHeight;
  const controlsHeight = controls.offsetHeight;
  const difficultyPanelHeight = difficultyPanel.offsetHeight;
  
  // Toggle language
  click('langToggleBtn');
  
  // Check dimensions are similar (within 5px tolerance)
  expect(Math.abs(scorePanel.offsetHeight - scorePanelHeight)).toBeLessThanOrEqual(5);
  expect(Math.abs(controls.offsetHeight - controlsHeight)).toBeLessThanOrEqual(5);
  expect(Math.abs(difficultyPanel.offsetHeight - difficultyPanelHeight)).toBeLessThanOrEqual(5);
});

// 32. Touch events on canvas do not trigger game over
test('Touch events on canvas do not trigger game over', () => {
  const game = window.snakeGame;
  const canvas = document.getElementById('gameCanvas');
  
  // Game should be running initially
  expect(game.state.gameRunning).toBe(true);
  expect(game.state.isGameOver).toBe(false);
  
  // Simulate touchstart
  const touchStartEvent = new window.TouchEvent('touchstart', {
    bubbles: true,
    cancelable: true,
    changedTouches: [{ clientX: 100, clientY: 100 }]
  });
  canvas.dispatchEvent(touchStartEvent);
  
  // Simulate touchend
  const touchEndEvent = new window.TouchEvent('touchend', {
    bubbles: true,
    cancelable: true,
    changedTouches: [{ clientX: 100, clientY: 100 }]
  });
  canvas.dispatchEvent(touchEndEvent);
  
  // Game should still be running (not game over)
  expect(game.state.gameRunning).toBe(true);
  expect(game.state.isGameOver).toBe(false);
});

// 33. Click events after touch are blocked
test('Click events after touch are blocked', () => {
  const game = window.snakeGame;
  const canvas = document.getElementById('gameCanvas');
  
  // Simulate touch followed by click
  const touchStartEvent = new window.TouchEvent('touchstart', {
    bubbles: true,
    cancelable: true,
    changedTouches: [{ clientX: 100, clientY: 100 }]
  });
  canvas.dispatchEvent(touchStartEvent);
  
  const touchEndEvent = new window.TouchEvent('touchend', {
    bubbles: true,
    cancelable: true,
    changedTouches: [{ clientX: 100, clientY: 100 }]
  });
  canvas.dispatchEvent(touchEndEvent);
  
  // Simulate click that browser might generate
  const clickEvent = new window.MouseEvent('click', {
    bubbles: true,
    cancelable: true
  });
  canvas.dispatchEvent(clickEvent);
  
  // Game should still be running
  expect(game.state.gameRunning).toBe(true);
  expect(game.state.isGameOver).toBe(false);
});

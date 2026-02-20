// Polyfill for TextEncoder/TextDecoder (required for jsdom in Node.js)
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock canvas context for jsdom
const mockCanvasContext = {
  fillStyle: '',
  fillRect: () => {},
  strokeStyle: '',
  strokeRect: () => {},
  clearRect: () => {},
  fillText: () => {},
  measureText: () => ({ width: 0 }),
  beginPath: () => {},
  arc: () => {},
  fill: () => {},
  moveTo: () => {},
  lineTo: () => {},
  stroke: () => {},
};

const { JSDOM } = require('jsdom');

// Create initial DOM for canvas mock setup
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

// Override getContext to return mock
const originalCreateElement = global.document.createElement.bind(global.document);
global.document.createElement = function(tagName, options) {
  const element = originalCreateElement(tagName, options);
  if (tagName.toLowerCase() === 'canvas') {
    element.getContext = () => mockCanvasContext;
  }
  return element;
};

const fs = require('fs');

// Read the saved HTML file
const html = fs.readFileSync('./index.html', 'utf8');

// Create a JSDOM with the HTML and run scripts
const { window: gameWindow } = new JSDOM(html, {
  runScripts: 'dangerously',
  resources: 'usable',
  url: 'http://localhost/',
});

// Update globals with the game window
global.window = gameWindow;
global.document = gameWindow.document;
global.localStorage = {
  _data: {},
  getItem: function(key) {
    return this._data[key] || null;
  },
  setItem: function(key, value) {
    this._data[key] = value.toString();
  },
  removeItem: function(key) {
    delete this._data[key];
  },
  clear: function() {
    this._data = {};
  }
};

// Helper to dispatch a keyboard event
function dispatchKey(key) {
  const event = new gameWindow.KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
  });
  gameWindow.dispatchEvent(event);
}

// Helper to click an element by id
function click(id) {
  const el = gameWindow.document.getElementById(id);
  if (el) {
    el.dispatchEvent(new gameWindow.MouseEvent('click', { bubbles: true }));
  }
}

// Expose helpers for test files
module.exports = {
  dispatchKey,
  click,
  window: gameWindow,
  document: gameWindow.document,
};

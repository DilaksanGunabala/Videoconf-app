// js/whiteboard.js

const openWhiteboardBtn = document.getElementById('openWhiteboard');
const closeWhiteboardBtn = document.getElementById('closeWhiteboard');
const clearWhiteboardBtn = document.getElementById('clearWhiteboard');
const whiteboardSection = document.getElementById('whiteboardSection');
const canvas = document.getElementById('whiteboardCanvas');
const ctx = canvas.getContext('2d');

let drawing = false;

canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mousemove', draw);

function draw(e) {
  if (!drawing) return;
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(e.offsetX, e.offsetY, 2, 0, Math.PI * 2);
  ctx.fill();
}

openWhiteboardBtn.addEventListener('click', () => {
  whiteboardSection.style.display = 'block';
});

closeWhiteboardBtn.addEventListener('click', () => {
  whiteboardSection.style.display = 'none';
});

clearWhiteboardBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

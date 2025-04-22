// js/video.js

const startCallBtn = document.getElementById('startCall');
const stopCallBtn = document.getElementById('stopCall');
const shareScreenBtn = document.getElementById('shareScreen');
const localVideo = document.getElementById('localVideo');

let localStream;
let screenStream;

// Start video call
startCallBtn.addEventListener('click', async () => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;
  } catch (error) {
    console.error('Error accessing camera/mic:', error);
    alert('Camera/mic access denied or not available.');
  }
});

// Stop video call
stopCallBtn.addEventListener('click', () => {
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localVideo.srcObject = null;
  }
});

// Share screen
shareScreenBtn.addEventListener('click', async () => {
  try {
    screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    localVideo.srcObject = screenStream;
  } catch (error) {
    console.error('Error sharing screen:', error);
    alert('Screen sharing failed.');
  }
});

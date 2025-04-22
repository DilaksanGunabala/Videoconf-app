const fileInput = document.getElementById("fileInput");

if (!sessionStorage.getItem('loggedIn')) {
    window.location.href = "login.html";
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem('loggedIn');
  alert("Logged out!");
  window.location.href = "login.html";
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = file.name;
    link.textContent = `Download ${file.name}`;
    link.style.display = "block";
    document.body.appendChild(link);

    alert(`File "${file.name}" selected. Download link generated.`);
  }
});


// js/script.js

const recordBtn = document.getElementById('record');
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

recordBtn.addEventListener('click', async () => {
  if (isRecording) {
    mediaRecorder.stop();
    recordBtn.textContent = 'Start Recording';
    isRecording = false;
  } else {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = e => recordedChunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recording.webm';
      a.click();
      recordedChunks = [];
    };

    mediaRecorder.start();
    recordBtn.textContent = 'Stop Recording';
    isRecording = true;
  }
});

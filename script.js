function calculateLove() {
  const name1 = document.getElementById("name1").value.trim();
  const name2 = document.getElementById("name2").value.trim();
  const result = document.getElementById("result");
  const message = document.getElementById("message");
  const heart = document.getElementById("heart");
  const shareButtons = document.getElementById("shareButtons");
  const clickSound = document.getElementById("clickSound");
  const loveMusic = document.getElementById("loveMusic");

  // Play click sound
  clickSound.currentTime = 0;
  clickSound.play();

  // Reset share buttons visibility
  shareButtons.style.display = "none";

  if (!name1 || !name2) {
    result.innerHTML = "Please enter both names 😅";
    message.innerHTML = "";
    heart.style.color = "#d81b60"; // default color
    loveMusic.pause();
    return;
  }

  const loveScore = Math.floor(50 + Math.random() * 50); // 50–100%
  result.innerHTML = `${name1} ❤️ ${name2} = <strong>${loveScore}%</strong> Love Match!`;

  // Dynamic message based on score
  if (loveScore >= 90) {
    message.innerHTML = "🔥 You're a Perfect Match! 🔥";
    heart.style.color = "#e91e63";
  } else if (loveScore >= 75) {
    message.innerHTML = "💖 Things look really good! 💖";
    heart.style.color = "#d81b60";
  } else if (loveScore >= 60) {
    message.innerHTML = "😊 There's potential here. 😊";
    heart.style.color = "#ba68c8";
  } else {
    message.innerHTML = "🤔 Maybe friendship is better? 🤔";
    heart.style.color = "#757575";
  }

  // Show share buttons
  shareButtons.style.display = "flex";

  // Play love music if score is high
  if (loveScore > 80) {
    loveMusic.currentTime = 0;
    loveMusic.play();
  } else {
    loveMusic.pause();
  }
}

// Share on WhatsApp
function shareWhatsApp() {
  const name1 = encodeURIComponent(document.getElementById("name1").value.trim());
  const name2 = encodeURIComponent(document.getElementById("name2").value.trim());
  const resultText = document.getElementById("result").textContent;
  const message = encodeURIComponent(`${resultText} 💘 Try the Love Calculator yourself!`);
  const whatsappUrl = `https://wa.me/?text=${message}`;
  window.open(whatsappUrl, "_blank");
}

// Copy result link (or text) to clipboard
function copyLink() {
  const name1 = document.getElementById("name1").value.trim();
  const name2 = document.getElementById("name2").value.trim();
  const resultText = document.getElementById("result").textContent;

  const dummyInput = document.createElement("input");
  dummyInput.value = resultText + " 💘 Try the Love Calculator yourself!";
  document.body.appendChild(dummyInput);
  dummyInput.select();
  document.execCommand("copy");
  document.body.removeChild(dummyInput);

  alert("Love result copied to clipboard! 💕");
}

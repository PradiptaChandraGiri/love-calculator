const name1Input = document.getElementById("name1");
const name2Input = document.getElementById("name2");
const resultText = document.getElementById("resultText");
const calculateBtn = document.querySelector(".calculateBtn");
const shareBtn = document.querySelector(".shareBtn");
const historyTable = document.querySelector("#historyTable tbody");

// Display "Shared by" from URL if available
const urlParams = new URLSearchParams(window.location.search);
const refName = urlParams.get("ref");
if (refName) {
  document.getElementById("sharedBy").textContent = decodeURIComponent(refName);
}

calculateBtn.addEventListener("click", () => {
  const name1 = name1Input.value.trim();
  const name2 = name2Input.value.trim();

  if (!name1 || !name2) {
    alert("Please enter both names!");
    return;
  }

  // Simple love percentage generator
  const lovePercentage = Math.floor(Math.random() * 101);

  resultText.textContent = `Love Compatibility: ${lovePercentage}%`;

  const now = new Date();
  const formattedDate = `${now.toLocaleDateString()}, ${now.toLocaleTimeString()}`;

  const newRow = historyTable.insertRow();
  newRow.insertCell(0).textContent = name1;
  newRow.insertCell(1).textContent = name2;
  newRow.insertCell(2).textContent = `${lovePercentage}%`;
  newRow.insertCell(3).textContent = formattedDate;
});

// Share Button Logic
shareBtn.addEventListener("click", () => {
  const sender = name1Input.value.trim() || "Anonymous";
  const url = `${window.location.origin}${window.location.pathname}?ref=${encodeURIComponent(sender)}`;

  navigator.clipboard.writeText(url)
    .then(() => {
      const msg = document.getElementById("copyMsg");
      msg.style.display = "block";
      setTimeout(() => {
        msg.style.display = "none";
      }, 3000);
    })
    .catch((err) => {
      console.error("Copy failed:", err);
      alert("Failed to copy the link.");
    });
});

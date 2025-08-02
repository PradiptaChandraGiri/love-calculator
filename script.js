document.addEventListener("DOMContentLoaded", () => {
  const name1Input = document.getElementById("name1");
  const name2Input = document.getElementById("name2");
  const resultDisplay = document.getElementById("result");
  const calcBtn = document.getElementById("calcBtn");
  const shareLinkBtn = document.getElementById("shareLinkBtn");
  const copyMsg = document.getElementById("copyMsg");
  const historyBody = document.getElementById("history-body");
  const sharerNameElem = document.getElementById("sharer-name");

  // Load sharer's name from URL
  const params = new URLSearchParams(window.location.search);
  const sharer = params.get("sharer");
  if (sharer) sharerNameElem.textContent = decodeURIComponent(sharer);

  // Event: Calculate
  calcBtn.addEventListener("click", () => {
    const name1 = name1Input.value.trim();
    const name2 = name2Input.value.trim();

    if (!name1 || !name2) {
      resultDisplay.textContent = "Please enter both names!";
      return;
    }

    const lovePercent = Math.floor(Math.random() * 100) + 1;
    resultDisplay.innerHTML = `<strong>Love Compatibility: ${lovePercent}%</strong>`;
    saveToHistory(name1, name2, lovePercent);
  });

  // Event: Share link
  shareLinkBtn.addEventListener("click", () => {
    const currentUrl = window.location.origin + window.location.pathname;
    const sharerName = prompt("Enter your name (optional):") || "Anonymous";
    const shareUrl = `${currentUrl}?sharer=${encodeURIComponent(sharerName)}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      copyMsg.style.display = "block";
      copyMsg.textContent = "Link copied! Share it with your friends.";
      setTimeout(() => (copyMsg.style.display = "none"), 3000);
    });
  });

  function saveToHistory(n1, n2, percent) {
    const tr = document.createElement("tr");
    const date = new Date().toLocaleString();
    tr.innerHTML = `<td>${n1}</td><td>${n2}</td><td>${percent}%</td><td>${date}</td>`;
    historyBody.appendChild(tr);
  }
});

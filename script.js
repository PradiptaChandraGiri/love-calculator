// === Love Calculator Script.js: Full Updated with Secure Owner View & Filters ===

// Utilities
function escapeHtml(text) {
  const map = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// DOM Elements
const name1Input = document.getElementById("name1");
const name2Input = document.getElementById("name2");
const resultDiv = document.getElementById("result");
const percentSpan = document.getElementById("lovePercent");
const descSpan = document.getElementById("description");
const historyBody = document.getElementById("historyBody");
const dashboardSection = document.getElementById("dashboardSection");
const filterNameInput = document.getElementById("filterName");
const filterDateInput = document.getElementById("filterDate");

// Owner Detection
const urlParams = new URLSearchParams(window.location.search);
const refName = urlParams.get("ref")?.toLowerCase();
const savedOwner = localStorage.getItem("ownerName");
const isOwner = !refName || (refName === savedOwner?.toLowerCase());

if (!refName && !savedOwner) {
  const yourName = prompt("Enter your name to create your private link:");
  if (yourName) {
    localStorage.setItem("ownerName", yourName.trim());
    alert(`Your private link: ${location.href}?ref=${encodeURIComponent(yourName.trim())}`);
  }
}

if (isOwner) {
  dashboardSection.style.display = "block";
} else {
  dashboardSection.style.display = "none";
}

// Generate random love %
function calculateLovePercentage(name1, name2) {
  const combined = name1.toLowerCase().trim() + name2.toLowerCase().trim();
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash += combined.charCodeAt(i);
  }
  return (hash % 51) + 50; // 50% to 100%
}

// Save entry
function saveToHistory(entry) {
  const key = "loveHistory";
  let history = JSON.parse(localStorage.getItem(key)) || [];
  history.push(entry);
  localStorage.setItem(key, JSON.stringify(history));
}

// Load full history
function loadHistory() {
  const key = "loveHistory";
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Show result
function showResult(percent, desc) {
  percentSpan.textContent = `${percent}% ❤️`;
  descSpan.textContent = desc;
  resultDiv.style.display = "block";
}

// Button click
function calculateLove() {
  const name1 = name1Input.value.trim();
  const name2 = name2Input.value.trim();
  if (!name1 || !name2) return alert("Please enter both names!");

  const percent = calculateLovePercentage(name1, name2);
  let desc = "Great match!";
  if (percent < 60) desc = "Try harder!";
  else if (percent > 85) desc = "Perfect couple! 💖";

  showResult(percent, desc);

  saveToHistory({
    name1, name2, lovePercent: percent,
    date: new Date().toLocaleDateString(),
    from: refName ? "receiver" : "self",
    ref: refName || savedOwner
  });
  displayHistoryEntries();
}

// Display only receiver entries for this owner
function displayHistoryEntries() {
  const history = loadHistory();
  historyBody.innerHTML = "";

  if (!isOwner) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="4" style="text-align:center;">Private dashboard</td>`;
    historyBody.appendChild(tr);
    return;
  }

  const filtered = history.filter(e => e.from === "receiver" && e.ref?.toLowerCase() === savedOwner?.toLowerCase());

  const nameFilter = filterNameInput.value.trim().toLowerCase();
  const dateFilter = filterDateInput.value.trim();

  const finalEntries = filtered.filter(e => {
    return (!nameFilter || e.name1.toLowerCase().includes(nameFilter) || e.name2.toLowerCase().includes(nameFilter)) &&
           (!dateFilter || e.date === dateFilter);
  });

  if (finalEntries.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="4" style="text-align:center;">No matches found.</td>`;
    historyBody.appendChild(tr);
    return;
  }

  for (const entry of finalEntries.reverse()) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(entry.name1)}</td>
      <td>${escapeHtml(entry.name2)}</td>
      <td>${entry.lovePercent}%</td>
      <td>${escapeHtml(entry.date)}</td>
    `;
    historyBody.appendChild(tr);
  }
}

// Copy private link
function copyPrivateLink() {
  const owner = localStorage.getItem("ownerName");
  if (!owner) return alert("Please set your name first!");
  const link = `${location.origin}${location.pathname}?ref=${encodeURIComponent(owner)}`;
  navigator.clipboard.writeText(link)
    .then(() => alert("Link copied to clipboard!"))
    .catch(() => alert("Failed to copy link."));
}

// Event Listeners
filterNameInput.addEventListener("input", displayHistoryEntries);
filterDateInput.addEventListener("change", displayHistoryEntries);
window.onload = displayHistoryEntries;

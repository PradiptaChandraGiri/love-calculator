const name1Input = document.getElementById('name1');
const name2Input = document.getElementById('name2');
const calcBtn = document.getElementById('calcBtn');
const resultDiv = document.getElementById('result');
const historyBody = document.getElementById('history-body');
const sharerNameDisplay = document.getElementById('sharer-name');
const shareLinkBtn = document.getElementById('shareLinkBtn');
const copyMsg = document.getElementById('copyMsg');

// Get sharer name from URL
function getSharerNameFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('ref') || "Anonymous";
}

let sharerName = getSharerNameFromURL();
sharerNameDisplay.textContent = sharerName;

// Deterministic love calculator
function calculateLovePercent(name1, name2) {
  const combined = (name1 + name2).toLowerCase().replace(/[^a-z]/g, '');
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 100) + 1;
}

function getLoveMessage(percent) {
  if (percent > 80) return 'Soulmates! ❤️❤️❤️';
  if (percent > 60) return 'Great match! 💖';
  if (percent > 40) return 'Good connection! 💕';
  if (percent > 20) return 'Needs some work. 💔';
  return 'Better luck next time. 💔';
}

// Escape for security
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Save & Load History from localStorage
function saveEntry(entry) {
  let history = JSON.parse(localStorage.getItem(sharerName)) || [];
  history.push(entry);
  localStorage.setItem(sharerName, JSON.stringify(history));
}

function loadHistory() {
  return JSON.parse(localStorage.getItem(sharerName)) || [];
}

function displayHistoryEntries() {
  const history = loadHistory();
  historyBody.innerHTML = '';
  if (history.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 4;
    td.style.textAlign = 'center';
    td.textContent = 'No entries yet.';
    tr.appendChild(td);
    historyBody.appendChild(tr);
    return;
  }
  for (const entry of history) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(entry.name1)}</td>
      <td>${escapeHtml(entry.name2)}</td>
      <td>${entry.lovePercent}%</td>
      <td>${escapeHtml(entry.date)}</td>
    `;
    historyBody.appendChild(tr);
  }
}

displayHistoryEntries();

// On Calculate Button
calcBtn.addEventListener('click', () => {
  const name1 = name1Input.value.trim();
  const name2 = name2Input.value.trim();
  if (!name1 || !name2) {
    alert('Please enter both names!');
    return;
  }

  const lovePercent = calculateLovePercent(name1, name2);
  const loveMessage = getLoveMessage(lovePercent);
  resultDiv.textContent = `${lovePercent}% - ${loveMessage}`;

  saveEntry({ name1, name2, lovePercent, date: new Date().toLocaleString() });
  displayHistoryEntries();
});

// Share App Link
shareLinkBtn.addEventListener('click', () => {
  const senderName = name1Input.value.trim() || "Anonymous";
  const url = `${window.location.origin}${window.location.pathname}?ref=${encodeURIComponent(senderName)}`;
  navigator.clipboard.writeText(url).then(() => {
    copyMsg.style.display = 'block';
    setTimeout(() => {
      copyMsg.style.display = 'none';
    }, 3000);
  }).catch(() => {
    alert("Could not copy link automatically. Please copy it manually.");
  });
});

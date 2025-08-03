const name1Input = document.getElementById('name1');
const name2Input = document.getElementById('name2');
const calcBtn = document.getElementById('calcBtn');
const resultDiv = document.getElementById('result');
const historyBody = document.getElementById('history-body');
const shareLinkBtn = document.getElementById('shareLinkBtn');
const shareModal = document.getElementById('shareModal');
const sharerInput = document.getElementById('sharerInput');
const generateLinkBtn = document.getElementById('generateLinkBtn');
const copyMessage = document.getElementById('copyMessage');
const sharedMsg = document.getElementById('sharedByMsg');

const params = new URLSearchParams(window.location.search);
const sharerName = params.get('ref') || 'Anonymous';
const localUser = localStorage.getItem('localUser');
const isOwner = localUser === sharerName;

// Love % calculation
function calculateLovePercent(name1, name2) {
  const combined = (name1 + name2).toLowerCase().replace(/[^a-z]/g, '');
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 100) + 1;
}

function getLoveMessage(percent) {
  if (percent > 80) return 'Soulmates! ❤️❤️❤️';
  if (percent > 60) return 'Great match! 💖';
  if (percent > 40) return 'Good connection! 💕';
  if (percent > 20) return 'Needs some work. 💔';
  return 'Better luck next time. 💔';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Save entry to storage
function saveEntry(entry) {
  let history = JSON.parse(localStorage.getItem(sharerName)) || [];
  history.push(entry);
  localStorage.setItem(sharerName, JSON.stringify(history));
}

// Load from storage
function loadHistory() {
  return JSON.parse(localStorage.getItem(sharerName)) || [];
}

// Display only receiver entries
function displayHistoryEntries() {
  const history = loadHistory();
  historyBody.innerHTML = '';

  if (!isOwner) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="4" style="text-align:center;">History is private to the sender.</td>`;
    historyBody.appendChild(tr);
    return;
  }

  const sharedEntries = history.filter(entry => entry.from === 'receiver');

  if (sharedEntries.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="4" style="text-align:center;">No shared entries yet.</td>`;
    historyBody.appendChild(tr);
    return;
  }

  for (const entry of sharedEntries) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(entry.name1)} 👤</td>
      <td>${escapeHtml(entry.name2)}</td>
      <td>${entry.lovePercent}%</td>
      <td>${escapeHtml(entry.date)}</td>
    `;
    historyBody.appendChild(tr);
  }
}

// Fallback copy support
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
    } catch {}
    document.body.removeChild(textarea);
  });
}

// Calculate button click
calcBtn.addEventListener('click', () => {
  if (!sharerName) {
    alert("Invalid sharer.");
    return;
  }

  const name1 = name1Input.value.trim();
  const name2 = name2Input.value.trim();
  if (!name1 || !name2) {
    alert("Please enter both names.");
    return;
  }

  const lovePercent = calculateLovePercent(name1, name2);
  const message = getLoveMessage(lovePercent);
  resultDiv.textContent = `${lovePercent}% - ${message}`;

  const entry = {
    name1,
    name2,
    lovePercent,
    date: new Date().toLocaleString(),
    from: isOwner ? 'self' : 'receiver'
  };

  saveEntry(entry);
  displayHistoryEntries();
});

// Share modal open
shareLinkBtn.addEventListener('click', () => {
  shareModal.style.display = 'block';
  sharerInput.value = '';
  copyMessage.textContent = '';
  sharerInput.focus();
});

// Generate sharable link
generateLinkBtn.addEventListener('click', () => {
  const sender = sharerInput.value.trim();
  if (!sender) {
    alert("Please enter your name.");
    return;
  }
  const shareUrl = `${window.location.origin}${window.location.pathname}?ref=${encodeURIComponent(sender)}`;
  copyToClipboard(shareUrl);
  copyMessage.textContent = "Link copied!";
  localStorage.setItem('localUser', sender);
  shareModal.style.display = 'none';
  alert("Link copied! Share it with friends.");
});

// Modal close on background click
window.onclick = function (event) {
  if (event.target == shareModal) {
    shareModal.style.display = "none";
  }
};

// Show "shared by" if receiver
if (!isOwner) {
  sharedMsg.textContent = `💌 This love calculator was shared with you by ${sharerName}`;
}

// Load dashboard on start
displayHistoryEntries();

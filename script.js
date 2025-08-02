const name1Input = document.getElementById('name1');
const name2Input = document.getElementById('name2');
const calcBtn = document.getElementById('calcBtn');
const resultDiv = document.getElementById('result');
const historyBody = document.getElementById('history-body');
const shareLinkBtn = document.getElementById('shareLinkBtn');
const copyMsg = document.getElementById('copyMsg');
const sharerDisplay = document.getElementById('sharer-name');

// Parse URL param
const params = new URLSearchParams(window.location.search);
const sharerName = params.get('ref') || 'Anonymous';
sharerDisplay.textContent = sharerName;

// Load / save history in localStorage
function loadData() {
  const data = JSON.parse(localStorage.getItem(sharerName)) || { self: [], received: [] };
  return data;
}
function saveData(data) {
  localStorage.setItem(sharerName, JSON.stringify(data));
}
function displayHistory() {
  historyBody.innerHTML = '';
  const data = loadData();
  if (data.self.length + data.received.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 4;
    td.textContent = 'No entries yet.';
    td.style.textAlign = 'center';
    tr.appendChild(td);
    historyBody.appendChild(tr);
    return;
  }
  const all = [
    ...data.self.map(e => ({...e, type: 'You'})),
    ...data.received.map(e => ({...e, type: 'Shared Link'}))
  ];
  all.sort((a,b) => new Date(b.date) - new Date(a.date));
  all.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${e.name1}</td><td>${e.name2}</td><td>${e.lovePercent}%</td>
      <td>${e.date}<br><small>(${e.type})</small></td>`;
    historyBody.appendChild(tr);
  });
}
displayHistory();

calcBtn.addEventListener('click', () => {
  const n1 = name1Input.value.trim(), n2 = name2Input.value.trim();
  if (!n1 || !n2) return alert('Enter both names');
  const percent = ((n1 + n2).toLowerCase().split('')
                     .reduce((s, c) => s + c.charCodeAt(0),0) % 100) + 1;
  const msg = percent > 80 ? 'Soulmates! ❤️❤️❤️' :
              percent > 60 ? 'Great match! 💖' :
              percent > 40 ? 'Good connection! 💕' :
              percent > 20 ? 'Needs some work. 💔' :
                             'Better luck next time. 💔';
  resultDiv.textContent = `${percent}% - ${msg}`;

  const entry = { name1: n1, name2: n2, lovePercent: percent, date: new Date().toLocaleString() };
  const data = loadData();
  const isSender = !params.get('ref');  
  if (isSender) data.self.push(entry);
  else data.received.push(entry);
  saveData(data);
  displayHistory();
});

shareLinkBtn.addEventListener('click', () => {
  const sender = encodeURIComponent(name1Input.value.trim() || sharerName);
  const url = `${location.origin}${location.pathname}?ref=${sender}`;
  navigator.clipboard.writeText(url)
    .then(() => {
      copyMsg.style.display = 'block';
      setTimeout(() => copyMsg.style.display = 'none', 2000);
    })
    .catch(() => alert('Copy to clipboard failed'));
});

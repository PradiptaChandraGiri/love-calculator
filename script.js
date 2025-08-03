const urlParams = new URLSearchParams(window.location.search);
const refName = urlParams.get("ref")?.toLowerCase();
const dashView = urlParams.get("dashboard") === "true";
const savedOwner = localStorage.getItem("ownerName");
const isOwner = !refName && !dashView || (refName === savedOwner?.toLowerCase());

const crushForm = document.getElementById("crushForm");
const resultDisplay = document.getElementById("result");
const dashboard = document.getElementById("dashboard");
const entryTableBody = document.getElementById("entryTableBody");
const filterInput = document.getElementById("filterInput");
const ownerLinkSection = document.getElementById("ownerLinkSection");
const ownerDashboardLink = document.getElementById("ownerDashboardLink");

const getEntries = () => JSON.parse(localStorage.getItem("entries") || "[]");

function updateTable(entries) {
  entryTableBody.innerHTML = "";
  entries.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name1}</td>
      <td>${entry.name2}</td>
      <td>${entry.percent}%</td>
      <td>${entry.date}</td>
    `;
    entryTableBody.appendChild(row);
  });
}

function filterTable() {
  const filter = filterInput.value.toLowerCase();
  const entries = getEntries().filter(
    e => e.owner?.toLowerCase() === savedOwner?.toLowerCase()
  );
  const filtered = entries.filter(e =>
    e.name1.toLowerCase().includes(filter) ||
    e.name2.toLowerCase().includes(filter) ||
    e.date.toLowerCase().includes(filter)
  );
  updateTable(filtered);
}

filterInput.addEventListener("input", filterTable);

crushForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name1 = document.getElementById("name1").value.trim();
  const name2 = document.getElementById("name2").value.trim();

  if (!name1 || !name2) return;

  const percent = Math.floor(Math.random() * 41) + 60;
  resultDisplay.textContent = `${name1} ❤️ ${name2}: ${percent}% Match!`;

  const entries = getEntries();
  const newEntry = {
    name1,
    name2,
    percent,
    date: new Date().toLocaleDateString(),
    owner: refName || savedOwner || name1
  };

  entries.push(newEntry);
  localStorage.setItem("entries", JSON.stringify(entries));

  if (!savedOwner && !refName) {
    localStorage.setItem("ownerName", name1);
    const privateLink = `${location.origin}${location.pathname}?ref=${encodeURIComponent(name1)}&dashboard=true`;
    ownerLinkSection.classList.remove("hidden");
    ownerDashboardLink.value = privateLink;
  }

  if (isOwner || dashView) {
    showDashboard();
  }

  crushForm.reset();
});

function showDashboard() {
  dashboard.classList.remove("hidden");
  const entries = getEntries().filter(
    e => e.owner?.toLowerCase() === savedOwner?.toLowerCase()
  );
  updateTable(entries);
}

function copyDashboardLink() {
  ownerDashboardLink.select();
  document.execCommand("copy");
  alert("Private dashboard link copied!");
}

// Auto-display dashboard if owner
if (dashView && savedOwner) {
  showDashboard();
}

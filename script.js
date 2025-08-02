document.addEventListener("DOMContentLoaded", function () {
  const calcBtn = document.getElementById("calcBtn");
  const name1Input = document.getElementById("name1");
  const name2Input = document.getElementById("name2");
  const resultDiv = document.getElementById("result");
  const heartDiv = document.querySelector(".heart");
  const tableBody = document.getElementById("history-body");

  function getLovePercentage(name1, name2) {
    let total = (name1 + name2)
      .toLowerCase()
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return (total % 100) + 1;
  }

  calcBtn.addEventListener("click", () => {
    const name1 = name1Input.value.trim();
    const name2 = name2Input.value.trim();

    if (!name1 || !name2) {
      alert("Please enter both names.");
      return;
    }

    const percent = getLovePercentage(name1, name2);
    resultDiv.textContent = `Love Compatibility: ${percent}%`;

    const now = new Date();
    const dateStr = now.toLocaleString();

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${name1}</td>
      <td>${name2}</td>
      <td>${percent}%</td>
      <td>${dateStr}</td>
    `;
    tableBody.appendChild(newRow);

    heartDiv.textContent = "❤️";
  });
});

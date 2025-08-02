<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Love Calculator</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand&display=swap" rel="stylesheet">
  <script defer src="script.js"></script>
</head>
<body>
  <div class="container">
    <h1>💘 Love Calculator</h1>
    <p>Shared by: <strong id="sharer-name">Anonymous</strong></p>

    <input type="text" id="name1" placeholder="Your name">
    <input type="text" id="name2" placeholder="Crush's name">
    <button id="calcBtn">Calculate Love %</button>

    <div class="result" id="result"></div>
    <div class="heart">❤️</div>

    <div class="share-buttons">
      <button class="share-button" id="shareLinkBtn">Share This App</button>
    </div>

    <table style="margin-top: 30px; width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th>Name 1</th>
          <th>Name 2</th>
          <th>%</th>
          <th>Date<br><small>+ Source</small></th>
        </tr>
      </thead>
      <tbody id="history-body"></tbody>
    </table>
  </div>

  <!-- Share Modal -->
  <div id="shareModal" style="display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5);">
    <div class="container" style="max-width: 300px; margin: auto; top: 20%; position: relative;">
      <h2>Generate Share Link</h2>
      <input type="text" id="sharerInput" placeholder="Enter receiver's name">
      <button id="generateLinkBtn">Generate Link</button>
      <p class="message" id="copyMessage"></p>
    </div>
  </div>

  <!-- Love sound -->
  <audio id="loveSound" src="https://www.soundjay.com/button/sounds/button-3.mp3" preload="auto"></audio>
</body>
</html>

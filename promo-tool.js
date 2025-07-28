let serviceTotal = 0;
let deviceTotal = 0;
let fullSummary = "";

function goToStep(step) {
  document.querySelectorAll('.question').forEach(q => q.classList.add('hidden'));
  const el = document.getElementById(step);
  if (el) el.classList.remove('hidden');
  if (step !== 'result') document.getElementById('result').classList.add('hidden');
}

function showResult(text) {
  const match = text.match(/\$\d+/g);
  serviceTotal = match ? parseInt(match[0].replace('$','')) : 0;
  fullSummary = "Recommended Offer: " + text;
  goToStep('devicePrompt');
}

function handleDeviceSelection(choice) {
  if (choice === 'no') {
    deviceTotal = 0;
    fullSummary += "\nDevice Promo: No device added";
    displayFinalResult(0);
  } else {
    goToStep('brandSelect');
  }
}

function setDevicePromo(text) {
  fullSummary += "\nDevice Promo: " + text;
}

function displayFinalResult(deviceAmount) {
  deviceTotal = deviceAmount;
  const total = serviceTotal + deviceTotal;
  fullSummary += "\nEstimated Monthly Total: $" + total;
  document.getElementById('offerText').innerText = fullSummary;
  goToStep('result');
}



function printResult() {
  const offerText = document.getElementById('offerText').innerText;
  const printWindow = window.open('', '_blank');
  printWindow.document.write(\`
    <html>
      <head>
        <title>Print Offer</title>
        <style>
          @media print {
            .no-print { display: none; }
          }
          body {
            font-family: sans-serif;
            padding: 40px;
            font-size: 18px;
            line-height: 1.6;
            text-align: center;
          }
          .summary-container {
            display: flex;
            justify-content: center;
            margin-top: 2em;
          }
          .summary {
            white-space: pre-wrap;
            background: #e6f4ea;
            padding: 20px;
            border-left: 6px solid #28a745;
            border-radius: 8px;
            font-weight: bold;
            max-width: 600px;
            text-align: left;
          }
          .logo {
            display: block;
            max-width: 200px;
            margin: 0 auto 20px;
          }
          h2 {
            color: #28a745;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/8/83/Optimum_logo.png" alt="Optimum Logo" />
        <h2>Mobile Promo Summary</h2>
        <div class="summary-container">
          <div class="summary">\${offerText}</div>
        </div>
      </body>
    </html>\`);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse query parameters
app.use(express.urlencoded({ extended: true }));

// Basic route to render HTML form for the calculator
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Calculator</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #2f2f2f;
          color: white;
          text-align: center;
          padding: 50px;
        }
        .container {
          background-color: #444;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
          width: 300px;
          margin: 0 auto;
        }
        input[type="number"], select {
          width: 80%;
          padding: 10px;
          margin: 5px 0;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        button {
          width: 80%;
          padding: 10px;
          background-color: #ff6f61;
          border: none;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover {
          background-color: #ff3b2b;
        }
        .result {
          margin-top: 20px;
          font-size: 24px;
          color: #ffb84d;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Calculator</h2>
        <form id="calc-form">
          <input type="number" id="a" placeholder="Enter first number" required><br>
          <input type="number" id="b" placeholder="Enter second number" required><br>
          <select id="op">
            <option value="add">Add</option>
            <option value="sub">Subtract</option>
            <option value="mul">Multiply</option>
            <option value="div">Divide</option>
          </select><br><br>
          <button type="submit">Calculate</button>
        </form>

        <div class="result" id="result"></div>
      </div>

      <script>
        document.getElementById('calc-form').addEventListener('submit', function(e) {
          e.preventDefault();
          const a = parseFloat(document.getElementById('a').value);
          const b = parseFloat(document.getElementById('b').value);
          const op = document.getElementById('op').value;
          let result;

          switch (op) {
            case 'add':
              result = a + b;
              break;
            case 'sub':
              result = a - b;
              break;
            case 'mul':
              result = a * b;
              break;
            case 'div':
              result = b !== 0 ? a / b : 'Cannot divide by zero';
              break;
            default:
              result = 'Invalid operation';
          }

          document.getElementById('result').innerText = 'Result: ' + result;
        });
      </script>
    </body>
    </html>
  `);
});

// Healthcheck route
app.get('/health', (req, res) => res.send('OK'));

app.listen(port, () => {
  console.log(`Calculator app running at http://localhost:${port}`);
});

const express = require('express');
//const { createCanvas } = require('canvas');
const path = require('path');

const app = express();
//globalThis.createCanvas = createCanvas

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes to handle button clicks
app.post('/radiation', (req, res) => {
  radiationButtonClicked();
  res.send('Radiation Button clicked!');
});

app.post('/boost', (req, res) => {
  boostButtonClicked();
  res.send('Boost Button clicked!');
});

app.post('/spring', (req, res) => {
  springButtonClicked();
  res.send('Spring Button clicked!');
});

app.post('/fall', (req, res) => {
  summerButtonClicked();
  res.send('Fall Button clicked!');
});
app.post('/winter', (req, res) => {
  summerButtonClicked();
  res.send('Winter Button clicked!');
});
// Routes to handle button clicks
app.post('/radiation', (req, res) => {
  radiationButtonClicked();
  res.send('Radiation Button clicked!');
});

app.post('/boost', (req, res) => {
  boostButtonClicked();
  res.send('Boost Button clicked!');
});

app.post('/spring', (req, res) => {
  springButtonClicked();
  res.send('Spring Button clicked!');
});

app.post('/fall', (req, res) => {
  summerButtonClicked();
  res.send('Fall Button clicked!');
});
app.post('/winter', (req, res) => {
  summerButtonClicked();
  res.send('Winter Button clicked!');
});
// Route for the root URL ("/")
app.get('/', (req, res) => {
  // Send the index.html file as the response
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


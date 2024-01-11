// Create web server
// 1. Use express to create a server
// 2. Create a router object
// 3. Register a middleware
// 4. Register a route
// 5. Start the server
// 6. Create a static web server

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const comments = require('./comments.json');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/comments', (req, res) => {
  res.json(comments);
});

router.post('/comments', (req, res) => {
  const comment = req.body;
  comment.id = comments.length + 1;
  comments.push(comment);
  fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(comment);
    }
  });
});

app.use('/api', router);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);
console.log('Server listening on port 3000');


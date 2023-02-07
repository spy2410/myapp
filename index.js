const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')

const port = 3000
app.use(cors());

app.get('/', (req, res) => {
  res.end('Hello WOrld');
});

app.get("/list_movies", (req, res) => {
    fs.readFile(__dirname + '/' + 'movies.json', (err, data) => {
        res.end(data);
    });
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });
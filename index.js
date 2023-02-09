const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')
require('dotenv').config()

mongoose
  .set('strictQuery', true)
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DataBase Connected Successfully..."))
  .catch((err) => console.log(err));

const port = 3000
app.use(cors());

app.post('/create/user', async(req, res)=> {
  // const { name, description, age } = req.body;
  const newUser = await User.create({
      name: req.body.name,
      description: req.body.description,
      age: req.body.age
  });

  newUser.save( async(err, newUser) => {
    if (err) {
        console.log('Error in saving User data in DB', err);
        return res.status(401).json({
            status: 401,
            error: 'Error in saving User data in DB, Try Again'
        });
    }
    return res.status(201).json({
        status: 201,
        id: newUser._id,
        message: 'User uploaded successfully!'
    });
  })
});

app.get('/get/user', async(req, res)=> {
  const user = await User.find();
  if (!user) {
      return res.status(400).json({
          status: 403,
          message: "No such user exist",
      });
  }
  return res.status(200).json({
      status: 200,
      message: user,
  });
});

app.get("/list_movies", (req, res) => {
    fs.readFile(__dirname + '/' + 'movies.json', (err, data) => {
        res.end(data);
    });
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });





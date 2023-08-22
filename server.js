const express = require('express');
const Datastore = require('nedb');
const app = express();
const port = 3000;


const db = new Datastore({ filename: 'database.db' }); // from nedb
db.loadDatabase()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.use(express.static('sign_up')); // express.static to host static files
app.use(express.json({limit: '1mb'})); // used to handle incoming json
// you can use the limit object in express.json to control stuff

app.post('/api', (req, res) => { //from express.js
  console.log(req.body) //req (request) -> ngambil informasi dari klien
  db.insert(req.body);
  res.send('Got a POST request'); //res (response) -> informasi yang akan saya berikan kepada klien
 // send akan memberikan pesan singkat pada klien yang berfungsi untuk memberi tahu bahwa 'hey dah di send nih datamu'

}) // app.post akan menjawab method POST dari klien
// method POST sendiri berarti mengirim data

app.get('/api', (req, res) => {
  db.find({},(err,data)=> {
    try{
      res.json(data) //.json means to send the data that is in json format
    }
    catch(err){
      console.log('somekind of error');
    }
  }
  );  //change later so that it only gets the username
})
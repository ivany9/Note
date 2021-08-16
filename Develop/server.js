
const { create } = require('domain');
const express = require('express');
const path = require('path');
const { title } = require('process');
const dataj=require('./db/db.json')
const fs = require("fs");
const { text } = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());//add req.body

app.use(express.static('public'));






fs.readFile("db/db.json","utf8", (err, data) => {

  if (err);
  {
    console.error(err);

  }

  var notes = JSON.parse(data);
  
 

  app.get("/api/notes",(req, res)=> {
      res.json(notes);
  });

   

  app.post("/api/notes",(req, res)=> {
      let newNote = req.body;
       res.json(newNote);
      notes.push(newNote);
      writeNote();
      return console.log("Added new note: "+newNote.title);
  });


 

  app.get("/api/notes/:id",(req,res)=>{
      res.json(notes[req.params.id]);
      console.log(params.id);

  });

  app.delete("/api/notes/:id",(req, res)=>{
      notes.splice(req.params.id, 1);
      res.json(notes);
      writeNote();
      console.log("Deleted note with id "+req.params.id);
     
      

  });


  app.get('/notes',(req,res) =>{
      res.sendFile(path.join(__dirname, 'public/notes.html'));
  });
  

  app.get('*',(req,res)=>{
      res.sendFile(path.join(__dirname, 'public/index.html'));
  });

 
  function writeNote() {
      fs.writeFile('./db/db.json',JSON.stringify(notes),err => {
          if (err) throw err;
          return true;
      });
  }


});


     

      app.listen(PORT, () =>
      console.log(` app listening at http://localhost:${PORT}`));



const fetch = require('node-fetch');
const express = require('express');
const { MongoServerSelectionError } = require('mongodb');
const app = express();

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017";


fetch('https://api.wazirx.com/api/v2/tickers')
    .then(res => res.json())
        .then(json =>{
            console.log(json);

            MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
                if (err) throw err;
                let dbo = db.db("intern");
                var Json = JSON.stringify(json);
                dbo.collection("quadb").insertmany(Json, (err, res) => {
                   if (err) throw err;
                });
            });
        })

let server = app.listen(3000, function () {
 
    let host = server.address().address;
    let port = server.address().port;
   
    console.log("App listening at 3000", host, port);
  })



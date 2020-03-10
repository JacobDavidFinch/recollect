var express = require('express');
var router = express.Router()
// Retrieve
var { MongoClient } = require('mongodb');
let mongoConnectString = process.env.MLAB;
console.log(mongoConnectString);
const R = require('ramda');

// Connect to the db
MongoClient.connect(mongoConnectString, function(err, client) {
  if(!err) {
      console.log("We are connected");
      let db = client.db('jakeprojects')
      
      const objects = db.collection('link').find({})
      console.log(objects);
      //   console.log(db);
      
      router.get('/allLinks', (req, res) => {
          console.log(object);
          const objects = db.collection('link').find({})
          console.log(objects);
          res.json(objects)
    })
    
    router.get('/linksByTag', (req, res) => {
        const {tagsArr} = req.body;
        const objects = db.collection('link').find({ links: tagsArr})
        console.log(objects);
        res.json(objects)
    })
    
    router.get('/allTags', (req, res) => {
        const getTags = (arr) => arr.reduce((acc, curr) => {
            return R.uniq([...acc, ...curr.tags])
        }, arr)
        const objects = db.collection('link').find({})
        const totalTags = getTags(objects)
        console.log(totalTags);
        res.send(totalTags)
    })
    
    router.post('/link', (req, res) => {
        const {link} = req.body;
        db.collection('link').insertOne({link})
        
    })
    
    router.put('/link', (req, res) => {
        const {id, updateObj} = req.body;
        db.collection('link').updateOne({_id: id},
            { $set: updateObj})
        })
        
        router.delete('/link', (req, res) => {
            const {id} = req.body;
            db.collection('link').deleteOne({_id: id})
        })
    }
    });
    
    module.exports = router;
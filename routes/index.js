var express = require('express');
var router = express.Router()
// Retrieve
var { MongoClient } = require('mongodb');
let mongoConnectString = process.env.ATLAS;
console.log(mongoConnectString);
const R = require('ramda');

// Connect to the db
MongoClient.connect(mongoConnectString, function(err, client) {
  if(!err) {
      console.log("We are connected");
      let db = client.db('studyGuide')
      
      router.get('/allLinks', (req, res) => {
          const objects = db.collection('link').find({})
          res.json(objects.data)
    })
    
    router.get('/linksByTag', (req, res) => {
        const {tagsArr} = req.body;
        const objects = db.collection('link').find({ links: tagsArr})
        console.log(objects.data);
        res.json(objects.data)
    })
    
    router.get('/allTags', (req, res) => {
        const getTags = (arr) => arr.reduce((acc, curr) => {
            return R.uniq([...acc, ...curr.tags])
        }, arr)
        const objects = db.collection('link').find({})
        const totalTags = getTags(objects)
        console.log(totalTags.data);
        res.send(totalTags.data)
    })
    
    router.post('/link', async (req, res) => {
        const {linkObj} = req.body;
        const newObj = db.collection('link').insertOne({...linkObj}).then(res => {
            console.log(res.ops[0]);
            return res.ops[0];
        })
        res.send(newObj)
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
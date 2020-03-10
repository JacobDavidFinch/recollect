var express = require('express');
var router = express.Router()
// Retrieve
var MongoClient = require('mongodb').MongoClient;
let mongoConnectString = process.env.MLAB;
const R = require('ramda');

// Connect to the db
MongoClient.connect(mongoConnectString, function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});


router.get('/all-links', (req, res) => {
    const {linksQueryArr} = req.body;
    const objects = db.collection('link').find(
        { links: linksQueryArr}
        )
    console.log(objects);
    res.json(objects)
})

router.get('/all-tags', (req, res) => {
    const getTags = (arr) => arr.reduce((acc, curr) => {
            return R.uniq([...acc, ...curr.tags])
        }, arr)
    const objects = db.collection('link').find(
        {}
        )
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
        {
            $set: updateObj
        })
})

router.delete('/link', (req, res) => {
    db.collection('link').deleteOne()

})


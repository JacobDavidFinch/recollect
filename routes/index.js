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

      //USER
      const userObj = ({userName, cards, tests}) => ({
          userName,
          cards,
          tests
        });
        
        const objectWtTags = (obj) => {
            objKeyArr = Object.keys(obj);
            const tags = objKeyArr.reduce((acc, keyName) => keyName.includes('tag') ? [...acc, obj[keyName]] : acc, []);
            const objWtOutTags = objKeyArr.reduce((acc, keyName) => keyName.includes('tag') ? acc : {...acc, [keyName]: obj[keyName]}, {});
            return {...objWtOutTags, tags: [...tags] };
        }
        
        router.get('/:userName', async (req, res) => {
            const {userName} = req.params;
            console.log(userName);
            const document = await db.collection('user').findOne({userName});
            // console.log(document);
            res.json(document);
        });
        
        router.post('/:userName', async (req, res) => {
            const {userName} = req.params;
            const document = await db.collection('user').insertOne(userObj(userName));
            res.json(document);
        });
        
        router.delete('/:userName', async (req, res) => {
            const {userName} = req.params;
            const document = await db.collection('user').replaceOne({userName})
            res.json(document)
        })
    
        // CARD
        
        router.get('/:userName/cards', async (req, res) => {
            const {userName} = req.params;
            console.log(userName);
            const document = await db.collection('user').findOne({userName});
            // console.log(document);
            res.json(document.cards);
        });
        
        router.post('/card/:userName', async (req, res) => {
            const {userName} = req.params;
            const {card} = req.body;
            console.log(card);
            const document = await db.collection('user').updateOne({userName}, {$addToSet: {cards: card}});
            res.json(document)
        })
        
        router.put('/card/:userName', async (req, res) => {
            const {userName} = req.params;
            const {index, card} = req.body;
            const document = await db.collection('user').updateOne({userName}, {$set: {[`cards.${index}`]: card}})
            res.json(document)
        })
        
        router.delete('/card/:userName', async (req, res) => {
            const {userName} = req.params;
            const {cards} = req.body;
            const document = await db.collection('user').updateOne({userName}, {$set: {cards}});
            res.json(document)
        })

    // TEST

      router.post('/test/:userName', async (req, res) => {
        const {userName} = req.params;
        const {test} = req.body;
        const document = await db.collection('user').updateOne({userName}, {$addToSet: {tests: test}});
        res.json(document);
    })
    
    router.put('/test/:userName', async (req, res) => {
        const {userName} = req.params;
        const {test, index} = req.body;
        const document = await db.collection('user').updateOne({userName}, {$set: {[`cards.${test}`]: test}});
        res.json(document);
    })
    
    router.delete('/test/:userName', async (req, res) => {
        const {userName} = req.params;
        const {tests} = req.body;
        const document = await db.collection('user').updateOne({userName}, {$set: {tests}});
        res.json(document);
    })

    
    // router.get('/usersByTag', (req, res) => {
    //     const {tagsArr} = req.body;
    //     const objects = db.collection('user').find({ users: tagsArr})
    //     console.log(objects);
    //     res.json(objects)
    // })
    
    // router.get('/allTags', (req, res) => {
    //     const getTags = (arr) => arr.reduce((acc, curr) => {
    //         return R.uniq([...acc, ...curr.tags])
    //     }, arr)
    //     const objects = db.collection('user').find({})
    //     const totalTags = getTags(objects)
    //     console.log(totalTags);
    //     res.send(totalTags)
    // })
    
    // router.post('/user', async (req, res) => {
    //     const {userObj} = req.body;
    //     const newObj = db.collection('user').insertOne({...userObj}).then(res => {
    //         console.log(res.ops[0]);
    //         return res.ops[0];
    //     })
    //     res.send(newObj)
    // })

    // router.put('/user', (req, res) => {
    //     const {id, updateObj} = req.body;
    //     db.collection('user').updateOne({_id: id},
    //         { $set: updateObj})
    //     })
        
    //     router.delete('/user', (req, res) => {
    //         const {id} = req.body;
    //         db.collection('user').deleteOne({_id: id})
    //     })
    }
    });
    
    module.exports = router;
const express = require('express');
require('dotenv').config()
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const helper = require('./helpers');
const routes = require('./routes');
const MongoClient = require('mongodb').MongoClient;
let mongoConnectString = process.env.ATLAS;


if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


MongoClient.connect(mongoConnectString, { useUnifiedTopology: true })
.then(client => {
    app.set('db', client.db('studyGuide'))
    app.use('/api', routes)
    app.use(helper.logErrors);
    app.use(helper.clientErrorHandler);
    app.use(helper.errorHandler);
})
.catch(err => console.error(err))


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    // res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server starting on port ${port}`));

module.exports=app;
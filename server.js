const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const PORT = 3000;
const app = express();
const connectionString = process.env.DB_STRING;
let db, quotesCollection;
app.set('view engine', 'ejs');

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to db');
        db = client.db('STAR-WARS');
        quotesCollection = db.collection('quotes')
    })

    app.use(express.urlencoded({ extended: true })); //use express.urlencoded. Dont need bodyParser
    app.use(express.static('public'));
    app.use(express.json());//use express.json()
    app.use('/public', express.static('public'));

    app.get('/', (req, res) => {
        quotesCollection.find().toArray()
            .then(results => {
                res.render('index.ejs', { quotes: results})
            }).catch(error => console.error(error));
    });

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/');
            }).catch(error => console.error(error));
    })

    app.put('/quotes', (req, res) => {
        quotesCollection.updateOne({name: 'Yoda'},
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote,
                }
            },
            {
                upsert: true
            }
        ).then(results => {
            res.json('Success!')
        })
         .catch(error => console.error(error))
    })

    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
            {name: req.body.name}
        ).then(result => {
            if (result.deletedCount === 0) {
                return res.json('No more Darth Vader quotes')
            }
            res.json("Deleted Darth Vader's quote")
        }).catch(error => {
            console.error(error);
        })
    })


    app.listen(process.env.PORT || PORT, () => {
        console.log('listening on port 3000')
    });
    




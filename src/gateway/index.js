const express = require('express')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')
const HttpStatus = require('http-status-codes')
const queryParser = require('express-query-int')

const app = express()

const mongoDB = (dbName) => `mongodb://localhost:27017/${dbName}`

app.use(bodyParser.json())
app.use(queryParser())

// Hello word test root function
app.get('/', function (req, res) {
    res.send({
        status: 'ok',
        message: 'You are in API root',
        help: 'Use API /help for more help information',
        help_create: 'Use API /create/:name for create new database',
        help_info: 'Use API /info/:database for information about collections',
        help_select: 'Use API /get/:database/:collection?filters for select data from database'
    })
})

// Create new database
app.get('/create/:name', async (req, res) => {
    const name = req.params.name
    const help = `use API /info/${name} to get information about database`

    const db = await MongoClient.connect(mongoDB(name))

    try {
        await db.collection('system').insert({ _id: 'initial', created: new Date() })
        res.send({
            status: 'ok',
            message: 'database created',
            name: req.params.name,
            help
        });
    } catch (e) {
        res.status(HttpStatus.BAD_REQUEST).send({
            status: 'error',
            message: `database '${name}' already exists`,
            help,
        })
    }
    db.close();
})

// Get info about database
app.get('/info/:name', async (req, res) => {
    const name = req.params.name
    const db = await MongoClient.connect(mongoDB(name))

    const initial = await db.collection('system').findOne({ _id: 'initial' })
    const collections = await db.collections()

    if (initial === null) {
        res.status(404).send({
            status: 'error',
            message: `database '${name}' not found`,
            help: `Create database with API /create/${name}`,
        })
    } else {
        res.send({
            name: req.params.name,
            created: new Date(initial.created),
            collections: collections
                .filter(c => (c.collectionName !== 'system'))
                .map(c => { return { name: c.collectionName } })
        })
    }

    db.close();
})

// Send data
app.post('/add/:name/:collection', async (req, res) => {
    const name = req.params.name
    const collection = req.params.collection

    if (collection === 'system') {
        res.status(HttpStatus.BAD_REQUEST).send({
            status: 'error',
            message: `collection 'system' is internal, you cannot access it`,
        })
        return
    }

    const db = await MongoClient.connect(mongoDB(name))

    try{
        const insert = await db.collection(collection).insert(req.body)
        insert.status = 'ok'
        res.send(insert);
    } catch(e) {
        console.error(e)
        res.send({ status: 'error', error: e })
    }

    db.close();
})

// Get data
app.get('/get/:name/:collection', async (req, res) => {
    const name = req.params.name
    const collection = req.params.collection

    if (collection === 'system') {
        res.status(HttpStatus.BAD_REQUEST).send({
            status: 'error',
            message: `collection 'system' is internal, you cannot access it`,
        })
        return
    }

    const db = await MongoClient.connect(mongoDB(name))

    try{
        const select = await db.collection(collection).find(req.query).toArray()
        res.send({
            status: 'ok',
            count: select.length,
            data: select,
        });
    } catch(e) {
        console.error(e)
        res.send({ status: 'error', error: e })
    }

    db.close();
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
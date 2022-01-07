const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(cors())
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zuzd4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send("Hello world");
})


async function run() {
    try {
        await client.connect();
        const database = client.db("Hot-Onion");
        const foodCollection = database.collection("food");
        // create a document to insert
        app.get('/food', async (req, res) => {
            const cursor = foodCollection.find({});
            const food = await cursor.toArray();
            res.send(food);
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log("listen to port", port);
})
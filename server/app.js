const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const { MongoClient } = require('mongodb');

const dbURI = 'mongodb://localhost:27017';
const client = new MongoClient(dbURI);


app.get("/",(req, res)=>{
    res.send("hello");
});


app.post('/post',(req, res)=>{
    console.log("this is the posted name: " + req.body.contact_name);
    (async function(){
        await client.connect();
        const db = client.db('contacts');
        const collection = db.collection('people');

        let db_response = await collection.insertOne({
            "name" : req.body.contact_name,
            "phone" : req.body.phone,
            "address" : req.body.address,
            "email" : req.body.email
        })

        console.log("db output: " + db_response);
        res.json({"success" : true});
    })();
});

app.post("/getData", (req, res) => {
    let name = req.body.contact_name;
    (async function(){
        await client.connect();
        const db = client.db('contacts');
        const collection = db.collection('people');

        const find_result = await collection.find({"name" : name}).toArray();
        console.log(find_result);
        res.json({"success" : true, "data" : find_result[0] });
    })();
});


app.get("/getAll", (req, res) => {
    (async function(){
        await client.connect();
        const db = client.db('contacts');
        const collection = db.collection('people');

        const all_results = await collection.find({}).toArray();
        console.log(all_results);
        res.json({"success" : true, data: all_results});
    })();
});



app.listen(5001, function(){
    console.log("server running on port 5001");
});








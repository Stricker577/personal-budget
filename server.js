const express = require('express');
const app = express();
const port = 3000;

const mongoose = require ('mongoose');

let budgetSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    }, 
    related_value:{
        type: Number,
        required: true
    }, 
    color:{
        type: String,
        required: true,
        validator: [(v) => (/^#[0-9A-F]{6}$/i).test(v)]
    }
});

let url = 'mongodb://localhost:27017/personal_budget_mongo';

let Budget = mongoose.model('Budget', budgetSchema);

app.use('/', express.static('public'));

app.use(express.json());

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (operationError, dbHandler)=>{
        if (operationError){
            console.log("An error has occurred during the connection process");
        } else {
            console.log("Connected to the database");
            Budget.find({}).then((data)=>{
                res.json(data);
                mongoose.connection.close();
            });
        }
    });
});

app.post('/addData', (req, res) => {
    mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (operationError, dbHandler)=>{
        if (operationError){
            console.log("An error has occurred during the adding process");
        } else {
            console.log("Added to the database");
            Budget.create(req.body).then((data)=>{
                res.json(data);
                mongoose.connection.close();
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`)
});


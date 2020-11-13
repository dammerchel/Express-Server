const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let data = [
    {
        userName: 'Damian',
        password: '321',
        confirmPassword: '321',
        address: {
            city: 'Nidzica',
            state: 'Mazury',
            postalCode: '321321'
        }
    }
]
const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', function (req, res) {
    res.send('Hello from server');
})

app.post('/enroll', function (req, res) {
    
    //Save to data.json
    let fs = require('fs');
    let currentData = fs.readFileSync("data.json");
    currentData = JSON.parse(currentData);
    currentData.push(req.body);

    
    
    fs.writeFile("data.json", JSON.stringify(currentData), function (err) {
        if (err) {
            console.log(err);
        }
    });

    res.status(200).send({ "message": "Data received" });
})

app.get('/enroll', function (req, res) {
    

    //Send response
    res.status(200).send(data);
})

app.listen(PORT, function () {
    console.log('Server running on localhost: ' + PORT);
})
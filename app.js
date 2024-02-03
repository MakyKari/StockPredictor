const express = require('express')
const path = require('path')
const axios = require('axios');
const dotenv = require('dotenv').config( {
        path: path.join(__dirname, '/src/.env')
});
const {spawn} = require('child_process');
const fs = require('fs');


const app = express();
const port = 3333;

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.post('/', async (req, res) => {
    const ticker = req.body.ticker

    const currentDate = getCurrentDate()

    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2000-01-01/${currentDate}?adjusted=true&apiKey=${process.env.YAHOO_FINANCE_API_KEY}`

    const response = await fetch(url).then(response => response.json())
    const historyOfStock = {}
    response.results.map(element => { historyOfStock[(new Date(element.t)).toLocaleDateString()] = element.c})


    const tempFilePath = __dirname + '/temp/history_of_stock.json';
    fs.writeFileSync(tempFilePath, JSON.stringify(response));
    const python = spawn('python', [__dirname + '/src/components/python_scripts/ML_model.py', tempFilePath]);

    python.stdout.on('data', (data) => {
        res.send({historyOfStock: historyOfStock, forecast: data.toString()});
        console.log(data.toString());
    });

    python.on('close', (code) => {
        console.log(`Python ML model exited with code ${code}`);
    });

})

function getCurrentDate(){
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1
    const day = dateObj.getUTCDate()
    const year = dateObj.getUTCFullYear()

    const pMonth        = month.toString().padStart(2,"0");
    const pDay          = day.toString().padStart(2,"0");
    return `${year}-${pMonth}-${pDay}`
}
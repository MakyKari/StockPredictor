const express = require('express')
const path = require('path')
const axios = require('axios')

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


    const params = {
        access_key: '7db0f9f4c0ce882512c8ed4ccd59aae5',
        symbols: ticker,
        date_from: '2024-01-21',
        date_to: '2024-01-31'
    }

    
    axios.get('http://api.marketstack.com/v1/eod', { params })
        .then(response => {
            var historicalData = {}
            const apiResponse = response.data;
            if (Array.isArray(apiResponse['data'])) {
                apiResponse['data'].forEach(stockData => {
                    historicalData[stockData['date']] = stockData['close']
            });
            res.send({historicalData: historicalData})
        }
        }).catch(error => {
            console.log(error);
        });

})


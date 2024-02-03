const searchTickerForm = document.getElementById('searchTickerForm')

var historyData = []

searchTickerForm.addEventListener('submit', async function(event){
    event.preventDefault()
    let tickerName = document.getElementById('tickerName').value
    const HistoryDataPromise = fetch('/', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ ticker : tickerName})
    })
    
    historyData = await HistoryDataPromise.then(response => response.json()).then(data => data.historyOfStock)
    console.log(historyData)
    drawGraph(historyData)
})

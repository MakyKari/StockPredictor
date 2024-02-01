const searchTickerForm = document.getElementById('searchTickerForm')

searchTickerForm.addEventListener('submit', function(event){
    event.preventDefault()
    let tickerName = document.getElementById('tickerName').value
    const response = fetch('/', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ ticker : tickerName})
    })
    .then(response => response.json()).then(response => 
        {console.log(response.historicalData)}
    )
    
})
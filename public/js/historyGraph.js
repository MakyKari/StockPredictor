function drawGraph(historyData){
	let chartStatus = Chart.getChart("myCanvas");
	if (chartStatus != undefined) {
		chartStatus.destroy();
	}

	myCanvas =  new Chart('myCanvas', {
		type: 'line',
		data: {
			datasets: [{
				label: "Stock Price Previous 30 days",
				data: historyData,
				borderColor: '#36A2EB',
      			backgroundColor: '#9BD0F5',
			  }]
		},
		options: {
			scales: {
			  xAxes: [{
				type: 'time'
			  }]
			}
		}
	});

	
}


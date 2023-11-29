class ObjectChart{
    constructor(data, labels) {
        this.chart;
        this.labels=labels;
        this.dataset=data;
        this.generateChart();
    }

    generateChart(){       
        const yData = {
            labels: this.labels,
            datasets: []
        };
        
        for(let i=0; i<this.dataset.length; i++){
            var serie = {
                data: this.dataset[i],
                fill : false,
                pointRadius: 1,
                pointHoverRadius: 1,
                borderWidth: 1
            };
            yData.datasets.push(serie);
        }
        let name="chart_Chart";
        this.chart=new Chart(name , {
            type: "line",
            data: yData,
            options: {
                legend: {display: false},
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            display: false
                        }
                    }]
                },
                plugins: {
                    colorschemes: {
                      scheme: 'brewer.Paired12'
                    }
                }
            }
        });
    }

    getChart() {

        return this.chart;
    }

    getDataset(){
        return this.dataset;
    }

}
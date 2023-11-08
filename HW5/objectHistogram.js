class ObjectHistogram {
    constructor(chart, time) {
        this.histogram;
        this.time = time;
        this.type = chart.type;
        this.attacks = chart.data;
        this.data=chart.dataset;
        this.dataset=[];
        this.generateHistogram();
    }

    generateHistogram() {
        let time=this.time;
        let data=this.data;
        let label=[];
        let values=[];
        for(let i=0; i<data.length; i++){
            if(!values.includes(data[i][time])){
               values.push(data[i][time]);
            }
        }
        values.sort(function(a, b) {
            return a - b;
          });
        for(let i=0; i<values.length; i++){
            let value=0;
            label.push(i);
            for(let j=0; j<data.length; j++){
                if(data[j][time]==values[i]){
                    value++;
                }
            }
            this.dataset.push(value);
        }
        let name;
        if(this.time==(document.getElementById("N").value)-1){
            name=this.type+"_Histogram_1_Chart";
        }
        else{
            name=this.type+"_Histogram_Chart";
        }

        this.histogram=new Chart(name, {
            type: "horizontalBar",
            data: {
                labels : values,
                datasets : [{
                    data : this.dataset,
                    borderColor: "#0000ff",
                    backgroundColor: "rgba(0,10,13,0.5)",
                }]
            },
            options: {
                legend: {display: false},
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                    }]
                }
            }
        })  
    }

    getHistogram() {
        return this.histogram;
    }
}
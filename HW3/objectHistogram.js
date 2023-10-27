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

        let name=this.type+"_Histogram_Chart";
        this.histogram=new Chart(name, {
            type: "bar",
            data: {
                labels : values,
                datasets : [{
                    data : this.dataset
                }]
            },
            options: {
                legend: {display: false},
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            callback: function(value, index, values) {
                                if(!Number.isInteger(value)){
                                    return value.toFixed(3);
                                }
                                else{
                                    return value;
                                }
                            }
                        }
                    }]
                }
            }
        })  
    }

    getHistogram() {
        return this.histogram;
    }
}
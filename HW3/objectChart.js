class ObjectChart{
    constructor(attacks, type) {
        this.chart;
        this.data=attacks;
        this.type=type;
        this.dataset=[];
        this.generateChart();
    }

    generateChart(){
        let data=this.data;
        let label=[];
        let rows=data.length;
        let cols=data[0].length;
        for(let l=0; l<cols; l++){
            label.push(l)
        }
        switch(this.type){
            case "score":
                for(let i=0; i<rows; i++){
                    let tmp=[]
                    let value=0;
                    for(let j=0; j<cols; j++){
                        value+=data[i][j];
                        tmp.push(value)
                    }
                    this.dataset.push(tmp);
                }

                break;
            case "cumulated_frequency":
                for(let i=0; i<rows; i++){
                    let tmp=[];
                    let value=0;
                    for(let j=0; j<cols; j++){
                        if(data[i][j]==-1){
                            value ++;
                        }
                        tmp.push(value);
                    }
                    this.dataset.push(tmp);
                }
                break;
            case "relative_frequency":
                for(let i=0; i<rows; i++){
                    let tmp=[];
                    let value=0;
                    for(let j=0; j<cols; j++){
                        if(data[i][j]==-1){
                            value ++;
                        }
                        tmp.push(value/(j+1));
                    }
                    this.dataset.push(tmp);
                }
                break;
            case "ratio":
                for(let i=0; i<rows; i++){
                    let tmp=[];
                    let value=0;
                    for(let j=0; j<cols; j++){
                        if(data[i][j]==-1){
                            value ++;
                        }
                        tmp.push(value/(Math.sqrt(j+1)));
                    }
                    this.dataset.push(tmp);
                }
                break;
        }
        
        const yData = {
            labels: label,
            datasets: []
        };
        
        for(let i=0; i<label.length; i++){
            var serie = {
                data: this.dataset[i],
                fill : false,
                pointRadius: 1,
                pointHoverRadius: 1,
                borderWidth: 1
            };
            yData.datasets.push(serie);
        }


        let name=this.type+"_Chart";
        this.chart=new Chart(name , {
            type: "line",
            data: yData,
            options: {
                legend: {display: false},
                responsive: true,
                maintainAspectRatio: false,
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
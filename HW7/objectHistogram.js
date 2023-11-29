class ObjectHistogram {
    constructor(scores, time, intervals) {
        this.histogram;
        this.time = time;
        this.intervals=intervals;
        this.scores=scores;
        this.dataset;
        this.generateHistogram();
    }

    generateHistogram() {
        let scores=this.scores;
        let M=scores.length;
        let time=this.time;
        this.dataset=new Array(this.intervals+1).fill(0);
        let labels=new Array(this.intervals+1);
        let scoresAtTime=[];
        for(let i=0; i<M; i++){
            scoresAtTime.push(scores[i][time]);
        }
        let maxValue=Math.max.apply(Math, scoresAtTime);
        let minValue=Math.min.apply(Math, scoresAtTime);
        let intervalSize=(maxValue-minValue)/this.intervals;
        for(let i=0; i<=this.intervals; i++){
            labels[i]=minValue+i*intervalSize;
        }
        for(let i=0; i<M; i++){
            for(let j=1; j<=labels.length; j++){
                if(scoresAtTime[i]>=labels[j-1] && scoresAtTime[i]<labels[j]){
                    this.dataset[j-1]++;
                }
                else if(scoresAtTime[i]>=labels[j-1] && j==labels.length){
                    this.dataset[j-1]++;
                }
            }

        }
        let name;
        if(time==(document.getElementById("N").value)-1){
            name="histogram_2_Chart";
        }
        else{
            name="histogram_1_Chart";
        }

        this.histogram=new Chart(name, {
            type: "horizontalBar",
            data: {
                labels : labels.reverse(),
                datasets : [{
                    data : this.dataset.reverse(),
                    borderColor: "#0000ff",
                    backgroundColor: "rgba(0,10,13,0.7)",
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
                        ticks: {
                            display: false
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
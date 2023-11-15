class ObjectHistogram {
    constructor(attacks, S) {
        this.histogram;
        this.attacks = attacks;
        this.dataset=[];
        this.S=S;
        this.generateHistogram();
    }

    generateHistogram() {
        let attacks=this.attacks;
        let S=this.S;
        let values=[20,30,40,50,60,70,80,90,100];
        let shielded=[];
        let penetrated=[];
        for(let i=0; i<attacks.length; i++){
            let p=0;
            let s=0;
            let innerP=[0,0,0,0,0,0,0,0,0];
            for(let j=0; j<attacks[i].length; j++){
                if(attacks[i][j] == 1){
                    s++;
                    if(s==S){
                        shielded[i]=j;
                    }
                }
                else{
                    p++;
                    switch(p){
                        case 20:
                            innerP[0] = j;
                            break;
                        case 30:
                            innerP[1] = j;
                            break;
                        case 40:
                            innerP[2] = j;
                            break;
                        case 50:
                            innerP[3] = j;
                            break;
                        case 60:
                            innerP[4] = j;
                            break;
                        case 70:
                            innerP[5] = j;
                            break;
                        case 80:
                            innerP[6] = j;
                            break;
                        case 90:
                            innerP[7] = j;
                            break;
                        case 100:
                            innerP[8] = j;
                            break;
                        default: break;
                    }
                }
            }
            penetrated.push(innerP);
        }
        let discarded=[0,0,0,0,0,0,0,0,0];
        for(let i=0; i<shielded.length; i++){
            for(let j=0; j<discarded.length;  j++){
                if(penetrated[i][j]!=0 && penetrated[i][j]<shielded[i]){
                    discarded[j]++;
                }
            }
        }

        this.dataset=discarded;

        let name="histogram_Chart";
        this.histogram=new Chart(name, {
            type: "horizontalBar",
            data: {
                labels : values,
                datasets : [{
                    data : this.dataset,
                    borderColor: "#0000ff",
                    backgroundColor: "rgba(0,10,13,0.5)"
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
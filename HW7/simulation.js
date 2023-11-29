class Simulation{
    constructor(process, drift, volatility, ltMean, lambda, theta, tdTheta, parameter, T, M, N){
        this.scores=new Array(M);
        this.labels=[];
        this.drift=drift;
        this.volatility=volatility;
        this.ltMean=ltMean;
        this.lambda=lambda;
        this.theta=theta;
        this.tdTheta=tdTheta;
        this.parameter=parameter;
        this.T=T;
        this.M=M;
        this.N=N;
        this.process=process
        this.startSimulation();
    }

    startSimulation(){
        let scores=this.scores;
        let dt=this.T/this.N; // Time step
        let mu=this.drift; // Drift term
        let volatility=this.volatility; // Volatility term
        let ltMean=this.ltMean; // Mean or long-term average
        let lambda=this.lambda; // Rate of event occurrences
        let theta=this.theta; // Mean reversion rate
        let tdTheta=this.tdTheta; // Time dependent mean reversion rate
        let parameter=this.parameter;
        let M=this.M;
        let N=this.N;
        for(let i=0; i<this.N; i++){
            this.labels.push(i)
        }
        switch(this.process){
            case "Arithmetic_Brownian":
                for (let i = 0; i <M; i++) {
                    scores[i] = new Array(N+1);
                    scores[i][0] = 0;
                }
                for(let i=1; i<=N; i++){
                    for(let j=0; j<M; j++){
                        const drift=mu*(1-scores[j][i-1]);
                        const deltaW=Math.sqrt(dt)*this.gaussianRandom();
                        scores[j][i]=scores[j][i-1]+drift*dt+volatility*deltaW;
                    }
                }
                break;
            case "Geometric_Brownian":
                for (let i = 0; i < this.M; i++) {
                    scores[i] = new Array(N);
                    scores[i][0] = 1;
                }
                for (let i=1; i<=N; i++) {
                    for (let j=0; j<M; j++) {
                        const drift = mu*(scores[j][i-1]);
                        const deltaW=Math.sqrt(dt)*this.gaussianRandom();
                        scores[j][i]=scores[j][i-1]+drift*dt+volatility*scores[j][i-1]*deltaW;
                    }
                }
                break;
            case "Ornstein-Uhlenbeck":
                for (let i = 0; i < M; i++) {
                    scores[i] = new Array(N+1);
                    scores[i][0] = 0;
                }
                for(let i=1; i<=N; i++){
                    for(let j=0; j<M; j++){
                        const drift=theta*(ltMean-scores[j][i-1]);
                        const deltaW=Math.sqrt(dt)*this.gaussianRandom();
                        scores[j][i]=scores[j][i-1]+drift*dt+volatility*deltaW;
                    }
                }
                break;
            case "Vasicek":
                for (let i = 0; i <M; i++) {
                    scores[i] = new Array(N+1);
                    scores[i][0] = 0;
                }
                for(let i=1; i<=N; i++){
                    for(let j=0; j<M; j++){
                        const drift=theta*(ltMean-scores[j][i-1]);
                        const deltaW=Math.sqrt(dt)*this.gaussianRandom();
                        scores[j][i]=scores[j][i-1]+drift*dt+volatility*deltaW;
                    }
                }
                console.log(scores)
                break;
            case "Hull-White":
                for (let i = 0; i <M; i++) {
                    scores[i] = new Array(N+1);
                    scores[i][0] = 0;
                }
                for(let i=1; i<=N; i++){
                    for(let j=0; j<M; j++){
                        const drift=tdTheta-theta*scores[j][i-1];
                        const deltaW=Math.sqrt(dt)*this.gaussianRandom();
                        scores[j][i]=scores[j][i-1]+drift*dt+volatility*deltaW;
                    }
                }
                break;
            case "Cox-Ingersoll-Ross":
                for (let i = 0; i < M; i++) {
                    scores[i] = new Array(N+1);
                    scores[i][0] = 0;
                }
                for(let i=1; i<=N; i++){
                    for(let j=0; j<M; j++){
                        const drift=theta*(ltMean-scores[j][i-1]);
                        const diffusion=volatility*Math.sqrt(scores[j][i-1])
                        const deltaW=Math.sqrt(dt)*this.gaussianRandom();
                        scores[j][i]=scores[j][i-1]+drift*dt+diffusion*deltaW;
                    }
                }
                break;
            case "Black-Karasinski":
                for (let i = 0; i < M; i++) {
                    scores[i] = new Array(N+1);
                    scores[i][0] = 0;
                }
                for(let i=1; i<=N; i++){
                    for(let j=0; j<M; j++){
                        const drift=tdTheta-theta*scores[j][i-1];
                        const diffusion=volatility*Math.pow(scores[j][i-1], parameter);
                        const deltaW=Math.sqrt(dt)*this.gaussianRandom();
                        scores[j][i]=scores[j][i-1]+drift*dt+diffusion*deltaW;
                    }
                }
                break;
            case "Poisson":
                for (let i = 0; i < M; i++) {
                    scores[i] = new Array(N+1);
                    scores[i][0] = 0;
                }
                for(let i=1; i<=N; i++){
                    for(let j=0; j<M; j++){
                        const rand=Math.random();
                        if(rand<(lambda*dt)){
                            scores[j][i]=scores[j][i-1]+1;
                        }else{
                            scores[j][i]=scores[j][i-1];
                        }
                    }
                }
                break;
            default: 
                break;
        }

    }

    gaussianRandom() {
        let u = 0, v = 0;
        while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    getScores(){
        return this.scores;
    }
    
    getLabels(){
        return this.labels
    }
}
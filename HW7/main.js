function Main() {
    const rectangles=Array.from(document.getElementsByClassName("resizable-rectangle"));
    rectangles.forEach(r => {
        r.remove();
    });
    const M = document.getElementById("M").value;
    const N = document.getElementById("N").value;
    const T=1;
    const drift=document.getElementById("drift").value;
    const volatility=document.getElementById("volatility").value;
    const ltMean=document.getElementById("mean").value;
    const lambda=document.getElementById("lambda").value;
    const theta=document.getElementById("theta").value;
    const tdTheta=document.getElementById("tdTheta").value;
    const param=document.getElementById("parameter").value;
    const process=document.getElementById("process").value;
    const intervals=100;

    if (M <= 0 && N <= 0) {
        alert("Please enter valid values.");
    }
    
    const simulation=new Simulation(process, drift, volatility, ltMean, lambda, theta, tdTheta, param, T, M, N);

    const cont=document.getElementById("gridContainer");

    const resRec1=new ResizableRectangle(cont, "chart");
    const resRec2=new ResizableRectangle(cont, "histogram_1");
    const resRec3=new ResizableRectangle(cont, "histogram_2");

    const dataset=simulation.getScores();
    const labels=simulation.getLabels()

    const chart1=new ObjectChart(dataset, labels);

    const histogram1=new ObjectHistogram(dataset, N-1, intervals);
    const histogram2=new ObjectHistogram(dataset, N/2, intervals);

}

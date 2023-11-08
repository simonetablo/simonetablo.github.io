function Main() {
    const rectangles=Array.from(document.getElementsByClassName("resizable-rectangle"));
    rectangles.forEach(r => {
        r.remove();
    });
    const M = document.getElementById("M").value;
    const T=document.getElementById("T").value;
    const N = document.getElementById("N").value;
    const lambda = document.getElementById("lambda").value;
    
    const p = lambda*T/N;
    console.log(p)

    if (M > 0 && N > 0 && p >= 0 && p <= 1) {
    } else {
        alert("Please enter valid values for M, N, and lambda.");
    }
    const attack=new Attack(M, N, p);
    attack.simulateAttack();
    const attacks=attack.getSystems();

    const cont=document.getElementById("gridContainer");

    const resRec1=new ResizableRectangle(cont, "cumulated_frequency");
    const resRec2=new ResizableRectangle(cont, "cumulated_frequency_Histogram_1");
    const resRec3=new ResizableRectangle(cont, "cumulated_frequency_Histogram");


    const chart1=new ObjectChart(attacks, "cumulated_frequency");

    const histogram1=new ObjectHistogram(chart1, N-1);
    const histogram2=new ObjectHistogram(chart1, N/2);

}

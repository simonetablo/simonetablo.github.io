function Main() {
    const rectangles=Array.from(document.getElementsByClassName("resizable-rectangle"));
    rectangles.forEach(r => {
        r.remove();
    });
    const M = document.getElementById("M").value;
    const N = document.getElementById("N").value;
    const p = document.getElementById("p").value;
    
    if (M > 0 && N > 0 && p >= 0 && p <= 1) {
    } else {
        alert("Please enter valid values for M, N, and p.");
    }
    const attack=new Attack(M, N, p);
    attack.simulateAttack();
    const attacks=attack.getSystems();

    const cont=document.getElementById("gridContainer");

    const resRec1=new ResizableRectangle(cont, "score");
    const resRec2=new ResizableRectangle(cont, "cumulated_frequency");

    const resRec3=new ResizableRectangle(cont, "relative_frequency");

    const resRec4=new ResizableRectangle(cont, "ratio");

    const resRec5=new ResizableRectangle(cont, "score_Histogram");

    const resRec6=new ResizableRectangle(cont, "cumulated_frequency_Histogram");

    const resRec7=new ResizableRectangle(cont, "relative_frequency_Histogram");

    const resRec8=new ResizableRectangle(cont, "ratio_Histogram");


    const chart1=new ObjectChart(attacks, "score");
    const chart2=new ObjectChart(attacks, "cumulated_frequency");
    const chart3=new ObjectChart(attacks, "relative_frequency");
    const chart4=new ObjectChart(attacks, "ratio");
    const histogram1=new ObjectHistogram(chart1, 90);
    const histogram2=new ObjectHistogram(chart2, 90);
    const histogram3=new ObjectHistogram(chart3, 90);
    const histogram4=new ObjectHistogram(chart4, 90);
}

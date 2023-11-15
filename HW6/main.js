function Main() {
    const rectangles=Array.from(document.getElementsByClassName("resizable-rectangle"));
    rectangles.forEach(r => {
        r.remove();
    });
    const M = document.getElementById("M").value;
    const N = document.getElementById("N").value;
    const p = document.getElementById("p").value;
    const S = document.getElementById("S").value;
    
    if (M > 0 && N > 0 && p >= 0 && p <= 1) {
    } else {
        alert("Please enter valid values for M, N, and p.");
    }
    const attack=new Attack(M, N, p);
    attack.simulateAttack();
    const attacks=attack.getSystems();

    const cont=document.getElementById("gridContainer");

    const resRec1=new ResizableRectangle(cont, "score");
    const resRec2=new ResizableRectangle(cont, "histogram");


    const chart1=new ObjectChart(attacks, "score");
    const histogram1=new ObjectHistogram(attacks, S);

}
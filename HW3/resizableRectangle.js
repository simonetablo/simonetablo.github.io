class ResizableRectangle {
    constructor(container, type) {
        this.top;
        this.left;
        this.moved=false;
        this.type=type;
        this.container = container;
        this.rectangle = document.createElement('div');
        this.rectangle.className = 'resizable-rectangle';
        
        this.container.appendChild(this.rectangle);

        let id=type+"_Chart"
        this.canvas = document.createElement('canvas');
        this.canvas.id=id;
        this.rectangle.appendChild(this.canvas);

        this.zoomFactor = 1;
        this.positioning(this.type)
        this.rectangle.style.top=this.top;
        this.rectangle.style.left=this.left;

        this.setupDrag();
        this.setupZoom();
        this.setupReset()
    }

    positioning(type){
        switch(type){
            case "score":
                this.top="0"
                this.left="0"
                break;
            case "cumulated_frequency":
                this.top="25%"
                this.left="0"
                break;
            case "relative_frequency":
                this.top="50%"
                this.left="0"
                break;
            case "ratio":
                this.top="75%"
                this.left="0"
                break;
            case "score_Histogram":
                this.top="0"
                this.left="50%"
                break;
            case "cumulated_frequency_Histogram":
                this.top="25%"
                this.left="50%"
                break;
            case "relative_frequency_Histogram":
                this.top="50%"
                this.left="50%"
                break;
            case "ratio_Histogram":
                this.top="75%"
                this.left="50%"
                break;

        }
    }

    setupDrag() {
        dragElement(this.rectangle);
        function dragElement(elmnt) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            elmnt.onmousedown = dragMouseDown;
          
            function dragMouseDown(e) {
                this.move=true;
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }
          
            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
          
            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    }
    setupZoom() {
        this.rectangle.addEventListener('wheel', (e) => {
            e.preventDefault();
            const scale = e.deltaY > 0 ? 0.9 : 1.1;
            this.zoomFactor *= scale;
            this.rectangle.style.transform = `scale(${this.zoomFactor})`;
        });
    }
    setupReset(){
        this.rectangle.addEventListener('dblclick',(e)=>{
            e.preventDefault;
            this.zoomFactor=1;
            this.rectangle.style.left=this.left;
            this.rectangle.style.top=this.top;
            this.rectangle.style.transform = `scale(${this.zoomFactor})`;
        })
    }
}
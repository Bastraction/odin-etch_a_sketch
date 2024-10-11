const container = document.querySelector("#etch_container");

const defaultSize = 32;
const maxSize = 100;
const btn = document.querySelector("#update_etch");
const input = document.querySelector("#input_field");
const sizeTeller = document.querySelector(".size_teller");

function clearEtch(){
    let temp2 = document.querySelectorAll(".etch_row");

    temp2.forEach(element => {
        container.removeChild(element);
    });
}

function fillEtch(){
    clearEtch();

    let newSize = input.value; // Grabs input from the input field
    if(newSize > 100){
        alert("Max size is 100, setting to 100.");
        newSize = 100;
    }

    sizeTeller.textContent = newSize + "x" + newSize;

    for (let index = 0; index < newSize; index++) {
        container.appendChild(getNewRow()); // Generates new rows based on the size
    }

    fillRows(newSize); // Fills rows with "pixels" based on the size

    addPixelEventListener(); // Grants pixels ability to listen for if the mouse if over them

}

function fillRows(size){
    let temp = document.querySelectorAll(".etch_row");

    temp.forEach(element => {

        for (let index = 0; index < size; index++) {
            element.appendChild(getPixel());
        }
    });
}

function getNewRow(){
    let newRow = document.createElement("div");
    newRow.classList.add("etch_row");
    return newRow;
}

function getPixel(){
    let pixel = document.createElement("div");
    pixel.classList.add("pixel");
    return pixel;
}

function addPixelEventListener(){
    let temp = document.querySelectorAll(".pixel");

    temp.forEach(element => {
        element.addEventListener("mouseover", () =>{
            changeColor(element);
        })
    });
}

function changeColor(g){
    let opacityValue = getBackgroundColorAlpha(g);
    
    if(!g.classList.contains("colored")){
        g.style.backgroundColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
        g.classList.add("colored");
    }
    opacityValue = opacityValue + 0.1;

    g.style.opacity = opacityValue.toString();
    
    console.log(opacityValue);

    //console.log("HOVERED");
}

btn.addEventListener("click", () => {
    fillEtch();
});

function rgb(r, g, b, a){ // Pulled from online but modified by adding "a"
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);
    return ["rgba(",r,",",g,",",b,",",a,")"].join("");
}

function getBackgroundColorAlpha(element) { // Pulled from online, idk what is going on honestly
    const bgColor = window.getComputedStyle(element).backgroundColor;
  
    // Check if the color is in RGBA format
    if (bgColor.startsWith("rgba")) {
      const rgbaValues = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/);
      if (rgbaValues) {
        return parseFloat(rgbaValues[4] || "1"); // Return alpha value, default to 1 if not present
      }
    } 
  
    // If not RGBA, assume it's fully opaque
    return 1;
  }

// Single Functions

fillEtch();
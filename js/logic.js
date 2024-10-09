const container = document.querySelector("#etch_container");

const defaultSize = 500;
const btn = document.querySelector("#update_etch");
const input = document.querySelector("#input_field");

function clearEtch(){
    let temp = document.querySelectorAll(".pixel");
    temp.forEach(element => {
        delete(element);
    });
}

function fillEtch(){
    clearEtch();
    let newSize = input.nodeValue;
    console.log(newSize);
}

function startEtch(){
    for (let index = 0; index < defaultSize; index++) {
        console.log(index);
        container.appendChild(getPixel());
    }
}

function getPixel(){

    let pixel = document.createElement("div");
    pixel.classList.add("pixel");
    return pixel;
}

startEtch();
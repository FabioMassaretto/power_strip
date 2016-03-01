var hidden = document.getElementById('container-alt');
var xbox = document.getElementById('xbox');
var head = document.getElementById('head');
var off = document.getElementsByClassName('off')[0];


var hiddenToggle = function () {
    if (hidden.style.visibility = "visible") {
        hidden.style.visibility = "hidden"
    } else if (hidden.style.visibility = "hidden") {
        hidden.style.visibility = "visible"
    }
}

var whichCard = 0;


//Reconstruct Content
var switch1 = {
    title: "Lamp",
    domID: document.getElementById('1'),
};
var switch2 = {
    title: "Space Heater",
    domID: document.getElementById('2'),
};
var switch3 = {
    title: "Radio",
    domID: document.getElementById('3'),
};
var switch4 = {
    title: "Unassigned",
    domID: document.getElementById('4'),
};
var switch5 = {
    title: "Unassigned",
    domID: document.getElementById('5'),

};
var switch6 = {
    title: "Unassigned",
    domID: document.getElementById('6'),
};

function reconstruct() {
    switch (whichCard) {
        case 0:
            head.innerHTML = "";
            break;
        case 1:
            head.innerHTML = switch1.title;
            break;
        case 2:
            head.innerHTML = switch2.title;
            break;
        case 3:
            head.innerHTML = switch3.title;
            break;
        case 4:
            head.innerHTML = switch4.title;
            break;
        case 5:
            head.innerHTML = switch5.title;
            break;
        case 6:
            head.innerHTML = switch6.title;
    }
}


switch1.domID.onclick = function () {
    hidden.style.visibility = "visible";
    whichCard = 1;
    reconstruct();
}
switch2.domID.onclick = function () {
    hidden.style.visibility = "visible";
    whichCard = 2;
    reconstruct();
}
switch3.domID.onclick = function () {
    hidden.style.visibility = "visible";
    whichCard = 3;
    reconstruct();
}
switch4.domID.onclick = function () {
    hidden.style.visibility = "visible";
    whichCard = 4;
    reconstruct();
}
switch5.domID.onclick = function () {
    hidden.style.visibility = "visible";
    whichCard = 5;
    reconstruct();
}
switch6.domID.onclick = function () {
    hidden.style.visibility = "visible";
    whichCard = 6;
    reconstruct();
}

xbox.addEventListener("click", function () {
    hidden.style.visibility = "hidden";
    whichCard = 0;
    reconstruct();
});


document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        hidden.style.visibility = "hidden";
        whichCard = 0;
        reconstruct();
    }
};

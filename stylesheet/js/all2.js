var keyborad = document.querySelector(".calculator-keyboard");
var storage = document.querySelector(".calculator-storage")
var show = document.querySelector(".calculator-show");
var arr = [];
var calStr = "";
init();
keyborad.addEventListener("click", storeStr);
function init() {
    arr = [];
    calStr = '';
    storage.innerHTML = "0";
    show.innerHTML = "0";
}

function updateScreen() {
    var str = calStr.replace(/\d(?=(?:\d{3})+\b)/g, '$&,');//|| calStr;
    storage.innerHTML = arr.join("").replace(/\d(?=(?:\d{3})+\b)/g, '$&,') || str;
    show.innerHTML = str;

}

function updatePoint() {
    if (!(calStr.includes("."))) {
        calStr += ".";
    }
    storage.innerHTML = arr.join("").replace(/\d(?=(?:\d{3})+\b)/g, '$&,');
    show.innerHTML = calStr;

}

function delSameOperator() {
    if (isNaN(Number(arr[arr.length - 1]))) {
        arr.pop();
        calStr = "";
    }
    console.log(arr);
}

function calSum() {

    if (isNaN(Number(arr[arr.length - 1]))) {
        arr.push(calStr);
        var answer = eval(arr.join("")).toLocaleString();
        storage.innerHTML = arr.join("").replace(/\d(?=(?:\d{3})+\b)/g, '$&,');
        show.innerHTML = answer;
        console.log(answer);
    }
}

function storeStr(e) {
    var str = e.target.textContent;
    if (str.length <= 2) {
        switch (str) {
            case "+":
                if (calStr != "") {
                    arr.push(calStr);
                }
                delSameOperator();
                arr.push(" + ");
                updateScreen();
                calStr = "";
                break;
            case "-":
                if (calStr != "") {
                    arr.push(calStr);
                }
                delSameOperator();
                arr.push(" - ");
                updateScreen();
                calStr = "";
                break;
            case "x":
                if (calStr != "") {
                    arr.push(calStr);
                }
                delSameOperator();
                arr.push(" * ");
                updateScreen();
                calStr = "";
                break;
            case "÷":
                if (calStr != "") {
                    arr.push(calStr);
                }
                delSameOperator();
                arr.push(" / ");
                updateScreen();
                calStr = "";
                break;
            case "=":
                updateScreen();
                calSum();
                break;
            case ".":
                updatePoint();
                break;
            case "⌫":
                arr.pop();
                updateScreen();
                break;
            case "AC":
                init();
                break;
            case "0":
            case "00":
                if (calStr.charAt(0) != "0" && calStr.charAt(1) != "0") {
                    calStr += str;
                    updateScreen();
                }
                break;
            default:
                calStr += str;
                updateScreen();
                break;
        }
        // console.log("arr: " + arr);
        // console.log("calstr : " + calStr);
    }
}


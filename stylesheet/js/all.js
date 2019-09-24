var keyborad = document.querySelector(".calculator-keyboard"); //計算機的按鈕介面
var storage = document.querySelector(".calculator-storage"); //顯示運算式的div
var show = document.querySelector(".calculator-show");  //顯示當前輸入數字的div
var arr = []; //用來儲存所有數字和運算符
var calStr = ""; //紀錄當前輸入的數字
keyborad.addEventListener("click", pressKeyboard);
init();
//按AC會歸零
function init() {
    calStr = "";
    arr = [];
    storage.innerHTML = "0";
    show.innerHTML = "0";
    //console.log("function init ! ");
}
//紀錄當前輸入數字的function
function storeStr(str) {
    if (calStr == "0") {  //避免非小數點數字的第一個數字出現零 ex:012
        calStr = "";
        calStr += str;
    } else {
        calStr += str;
    }
    updateShow();   //更新當前輸入數字的div
    updateStorage();  //更新運算式的div
}
//處理第一個數字是零的情況，這裡的引數str會是點選按鈕0、00的textContent
function storeZero(str) {
    if (calStr == "0" && str == "0") {  //點0時，避免非小數點數字前面出現多次零的狀況 ex:00012
        calStr = "0";
    } else if ((calStr == "" && str == "00") || (calStr == "0" && str == "00")) {  //點00時，避免非小數點數字前面出現多次零的狀況 ex:00012
        calStr = "0";
    } else {  //只要開頭不為零的正常情況下，0、00可以正常添加  ex:1200 or 100023
        calStr += str;
    }
    updateShow();  //更新當前輸入數字的div
    updateStorage(); //更新運算式的div
}
//當按下運算符按紐時將數字送入arr的陣列
function sentStr() {
    if (calStr != "") {  //避免送空值到arr
        arr.push(calStr);
        calStr = "";
    }
    updateShow();  //更新當前輸入數字的div
    updateStorage();  //更新運算式的div
}
//更新運算符、避免重複加入
function updateOperator(str) {
    var num = Number(arr[arr.length - 1]);
    if (isNaN(num)) {  //如果陣列最後一個值是運算符
        arr.pop();  //將該運算符刪掉
    }
    if (str == "x") { //如果點選X，加入*
        arr.push("*");
    } else if (str == "÷") {
        arr.push("/");
    } else {
        arr.push(str); //推入+和-
    }
    updateShow(); //更新當前輸入數字的div
    updateStorage(); //更新運算式的div
}
//檢查當前輸入數字是否有點點
function addPoint() {
    if (calStr == "") {
        calStr = "0.";
    } else if (!(calStr.includes("."))) {
        calStr += ".";
    }
    updateShow();
    updateStorage();
}
//將arr陣列進行運算
function calSum() {
    var num = Number(arr[arr.length - 1]);
    if (isNaN(num) && calStr == "") {  //如果陣列最後的值是運算式或是小數點且calstr沒有值
        arr.pop();
    } else {
        sentStr(); //將calStr送入陣列
    }
    var arrAnswer = eval(arr.join(""));
    var strAnswer = parseFloat(arrAnswer).toPrecision(12); //處理小數精度問題
    var answer = parseFloat(strAnswer);
    //var answer = eval(arr.join("")); //陣列運算
    //console.log("arr of function calSum: " + answer);
    updateShow(answer);  //將答案傳入當前數字的div
    updateStorage();   //更新運算式的div
}
//刪除字元
function delStr() {
    if (calStr == "") {
        arr.pop();
    } else {
        calStr = calStr.substring(0, calStr.length - 1);  //從最後一個字開始刪
    }
    updateShow();
    updateStorage();
}
//加入逗號，用來呈現在網頁上的
function addComma(data) {
    if (data.includes(".")) {  //如果數字有小數點，那小數點前才要加逗號
        return data.replace(/\d(?=(?:\d{3})+\b\.)/g, '$&,');
    } else {
        return data.replace(/\d(?=(?:\d{3})+\b)/g, '$&,');
    }
}

function updateShow(answer) {
    var showText = "";
    if (typeof (answer) == "undefined") { //還沒按=時的情況，幫當前數字加入逗號
        showText = addComma(calStr);
    } else {
        showText = addComma(answer.toString());  //幫答案加入逗號
    }
    show.innerHTML = showText;
}

function updateStorage() {
    var commaArr = arr.slice(); //複製個需要加入逗號的新陣列，避免汙染到arr
    var storageText = "";
    for (let i = 0; i < commaArr.length; i++) {
        commaArr[i] = addComma(commaArr[i]);
    }
    if (typeof (arr[0]) == "undefined") { //如果還沒儲存值到陣列就先用當前數字來呈現
        storageText = addComma(calStr);
    } else {
        storageText = commaArr.join("");
    }
    storage.innerHTML = storageText;
}
//根據點選按鈕來觸發相對應的function
function pressKeyboard(e) {
    var str = e.target.textContent;
    if (str.length <= 2) {
        switch (str) {
            case "+":
            case "-":
            case "x":
            case "÷":
                sentStr();
                updateOperator(str);
                break;
            case "=":
                calSum();
                break;
            case "0":
            case "00":
                storeZero(str);
                break;
            case "AC":
                init();
                break;
            case "⌫":
                delStr();
                break;
            case ".":
                addPoint();
                break;
            default:
                storeStr(str);
                break;
        }
    }
}
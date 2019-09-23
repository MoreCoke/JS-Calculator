function updateStorage(){
    var commaArr = arr;
    var storageText = "";
    //console.log("BEFORE commaArr : "+commaArr);
    console.log("BEFORE commaArr : "+arr); ///這邊還沒汙染arr
    for(let i =0;i<commaArr.length;i++){
        commaArr[i]=addComma(commaArr[i]);
    }
    console.log("AFTER commaArr : "+arr); //這邊汙染arr，因為陣列是參考呼叫
    if(typeof(arr[0])=="undefined"){
        storageText = addComma(calStr);
    }else{
        console.log("calStr of function updateStorage"+calStr);
        console.log("arr of function updateStorage"+arr.join(""));
        console.log("commaArr of function updateStorage"+commaArr.join(""));
        storageText = commaArr.join("");
    }
    storage.innerHTML = storageText;
}

//淺拷貝、深拷貝
//https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part3/array.html
let firstLabel = document.getElementById("firstFieldLabel");
let secondLabel = document.getElementById("secondFieldLabel");
const passCheck = /(?=.*[A-Z])(?=.*[0-9])(?=.*[/\W|_/])(?=.{13,})/;
let failAtts = 0;

function checkPassword(){
    var firstPassword = document.getElementById("input1").value;
    var secondPassword = document.getElementById("input2").value;
    //DEBUGGING PURPOSES ONLY!!
    //console.log(firstPassword);

    if (firstPassword == ""){
        firstLabel.innerText = "You haven't even written anything...";
        return;
    }
    else{
        firstLabel.innerText = "";
    }

    if(failAtts == 5){
        window.location.replace('fail.html');
    }

    if (passCheck.test(firstPassword) == false){
        firstLabel.innerText = 'Your password must be at least 13 characters long, and must contain at least one number, symbol and uppercase letter.'
        failAtts++;
        return;
    }
    else{
        firstLabel.innerText = '';
    }

    if (firstPassword == secondPassword){
        window.location.replace('success.html');
    }
    else{
        secondLabel.innerText = 'Passwords do not match';
        return;
    }
    


}

let minuteCount = document.querySelector('span.minuteCounter');
let secondCount = document.querySelector('span.secondCounter');

function failTimer(){

    let failTime = new Date();
    let failTimeNum = failTime.getTime();
    let unlockNum = Number(failTimeNum + 3600000);
    //let propTime = unlockNum.toDateString()
    let unlockSec = unlockNum.getSeconds();
    let unlockMin = unlockNum.getMinutes();
    console.log(unlockMin, unlockSec);

}







/*function failTimer(){

    let number = 59;
    let timer = setInterval(() =>{
        
    }, 100);

}*/
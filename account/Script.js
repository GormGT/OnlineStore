//-----------------------------------------------Account login----------------------------------------------

let loginLabel = document.getElementById("loginLabel");
let loginCheck = false;

const checkAccounts = (account/*, id*/) => {
    let loginEmailInput = document.getElementById("loginEmailInput").value;
    let loginPasswordInput = document.getElementById("loginPasswordInput").value;
    //let userID = id;
    let accountType = account.userType;
    let accountEmail = account.userMail;
    let accountPassword = account.userPass;
    if (accountEmail === loginEmailInput && accountPassword === loginPasswordInput) {
        console.log("Login successful");
        loginCheck = true;
        loginLabel.innerText = '';
        if (accountType == "admin"){
            window.location.assign('adminPage.html');
        } else {
            window.location.assign("../index.html");
        }
    }
}

const login = () => {
    db.collection('users').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            //Check if email and password matches any valid accounts in database
            checkAccounts(doc.data(), doc.id);
            //console.log(doc.data());

        })
        if (!loginCheck){
            loginLabel.innerText = 'Ugyldig bruker';
        }
    }).catch((err) => {
        console.log(err)
    });

}






//-----------------------------------------------Account creation----------------------------------------------

let firstLabel = document.getElementById("firstFieldLabel");
let secondLabel = document.getElementById("secondFieldLabel");
let userLabel = document.getElementById("usernameFieldLabel");
let emailLabel = document.getElementById("emailFieldLabel");
let accountCreateForm = document.querySelector(".accountCreateForm")

const usernameCheck = /^.{4,}$/u;
//The emailCheck regex SHOULD filter out invalid emails as per RFC2822 standard, however there is a chance for valid emails getting filtered due to lack of testing
const emailCheck = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const passCheck = /^(?=.*?\p{Lu})(?=.*?[0-9])(?=.*?[\W|_]).{13,}$/u;

let failAtts = 0;

function checkUserDetail(){
    var username = document.getElementById("userInput1").value;
    var email = document.getElementById("userInput2").value;

    if (username == ""){
        userLabel.innerText = "Du har ikke skrevet inn et brukernavn...";
        return;
    } else {
        userLabel.innerText = "";
    }
    
    if (email == ""){
        emailLabel.innerText = "Du har ikke skrevet inn en email...";
        return;
    } else {
        emailLabel.innerText = "";
    }

    if(usernameCheck.test(username) == false){
        userLabel.innerText = "Brukernavnet ditt må ha minst 4 bokstaver";
        return;
    } else if (emailCheck.test(email) == false){
        emailLabel.innerText = "Ugyldig email";
        return;
    }
}


function checkPassword(){
    var firstPassword = document.getElementById("input1").value;
    var secondPassword = document.getElementById("input2").value;
    //DEBUGGING PURPOSES ONLY!!
    //console.log(firstPassword);
    checkUserDetail();

    if (firstPassword == ""){
        firstLabel.innerText = "Du har ikke skrevet noe..";
        return;
    }
    else{
        firstLabel.innerText = "";
    }

    if(failAtts == 5){
        window.location.replace('fail.html');
    }

    if (passCheck.test(firstPassword) == false){
        firstLabel.innerText = 'Passordet ditt må være minst 13 bokstaver langt og inneholde minst ett tall, symbol og stor bokstav.'
        failAtts++;
        return;
    }
    else{
        firstLabel.innerText = '';
    }

    if (firstPassword == secondPassword){
        createAccount();
        secondLabel.innerText = '';
    }else{
        secondLabel.innerText = 'Passordene er ikke like';
        return;
    }
    


}

function createAccount(){
    const account = {
        userName: accountCreateForm.userInput1.value,
        userMail: accountCreateForm.userInput2.value,
        userPass: accountCreateForm.input1.value,
        userType: 'kunde'
    }

    db.collection('users').add(account).then(() => {
        console.log('account created');
        setTimeout(function(){
            window.location.assign("account.html")
        }, 2000)
    }).catch(err => {
        console.log(err);
    })
}


//Leftover code from earlier project version

/*let minuteCount = document.querySelector('span.minuteCounter');
let secondCount = document.querySelector('span.secondCounter');

function failTimer(){

    let failTime = new Date();
    let failTimeNum = failTime.getTime();
    let unlockNum = Number(failTimeNum + 3600000);
    //let propTime = unlockNum.toDateString()
    let unlockSec = unlockNum.getSeconds();
    let unlockMin = unlockNum.getMinutes();
    console.log(unlockMin, unlockSec);

}*/







/*function failTimer(){

    let number = 59;
    let timer = setInterval(() =>{
        
    }, 100);

}*/
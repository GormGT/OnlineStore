//console.log("test");
let loginButton = document.querySelector(".loginButton");

//localStorage.setItem('isLoggedIn', false);
//localStorage.setItem('loginState', undefined);

/*if (localStorage.getItem('loginState') == true){
    localStorage.setItem('isLoggedIn', true);
}else{
    localStorage.setItem('isLoggedIn', false);
}*/
function setUserInfo(){
    loginButton.innerText = sessionStorage.getItem('username');
    loginButton.setAttribute('href', '../account/account.html');
}


//if user is logged in, fetch their username to display instead of login button
if (sessionStorage.isLoggedIn !== undefined){
    console.log("You are logged in :))");
    db.collection('users').get().then(() => {
        setUserInfo();
    }).catch((err) => {
        console.log(err)
    });
}

//Use this page for help: https://plainenglish.io/blog/implementing-login-case-using-localstorage-and-sessionstorage  
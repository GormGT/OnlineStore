let shoppingCart = [];

let appliedClass;

let shoppingCartContain = document.querySelector(".cartDisplayContainer");
let shoppingCartView = document.querySelector(".cartItemView");
let cartButtonAtr = document.querySelector(".cartButton");

function viewCart(){
    shoppingCart = JSON.parse(localStorage.getItem('cartItems'));
    console.log(shoppingCart);

    //Code mostly taken from storeItemPage.js, but modified to work for the cart instead
    for(i = 0; i < shoppingCart.length; i++){
        let itemLookup = shoppingCart[i].itemID;
        let itemPath = shoppingCart[i].itemPath;
        console.log(itemLookup);
        console.log(itemPath);

        db.collection(`storeItems${itemPath}`).doc(itemLookup).get().then((snapshot) => {
            if(itemPath.includes("merc-grade")){
                appliedClass = "merc-grade";
            }else if(itemPath.includes("comm-grade")){
                appliedClass = "comm-grade";
            }else if(itemPath.includes("assassin-grade")){
                appliedClass = "ass-grade";
            }else if(itemPath.includes("elite-grade")){
                appliedClass = "elite-grade";
            }else if(itemPath.includes("unusual")){
                appliedClass = "unusual";
            }else if(itemPath.includes("botkillers")){
                appliedClass = "strange";
            }else if(itemPath.includes("australium")){
                appliedClass = "strange";
            }else{
                appliedClass = "normal";
            }
    
            console.log(appliedClass);

            console.log(snapshot.data());
            createHTML(snapshot.data(), itemLookup);
        })
    }
}

function createHTML(storeItem, id){
    let html = `
        <div class="cartItem">
            <img class="cartItemImg" src="${storeItem.itemImg}" width="120px">
            <div class="cartInfoText">
                <h2 class="${appliedClass}">${storeItem.itemName}</h2>
            </div>
            <div class="cartInfoAmntRemv">
                <p>Antall: 1</p>
                <button class="generalButton">Fjern fra handlekurv</button>
            </div>
        </div>`
    shoppingCartView.innerHTML += html;
}

function openCart(){
    viewCart();
    toggleCart();
    cartButtonAtr.setAttribute('onclick', 'toggleCart()');
}

function toggleCart(){
    //console.log(cartButtonAtr);
    shoppingCartContain.classList.toggle('hidden');
}
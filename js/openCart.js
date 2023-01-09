let shoppingCart = [];

let appliedCartClass;

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
        let itemAmnt = shoppingCart[i].itemAmnt;
        console.log(itemLookup);
        console.log(itemPath);

        db.collection(`storeItems${itemPath}`).doc(itemLookup).get().then((snapshot) => {
            if(itemPath.includes("merc-grade")){
                appliedCartClass = "merc-grade";
            }else if(itemPath.includes("comm-grade")){
                appliedCartClass = "comm-grade";
            }else if(itemPath.includes("assassin-grade")){
                appliedCartClass = "ass-grade";
            }else if(itemPath.includes("elite-grade")){
                appliedCartClass = "elite-grade";
            }else if(itemPath.includes("unusual")){
                appliedCartClass = "unusual";
            }else if(itemPath.includes("botkillers")){
                appliedCartClass = "strange";
            }else if(itemPath.includes("australium")){
                appliedCartClass = "strange";
            }else{
                appliedCartClass = "normal";
            }
    
            console.log(appliedCartClass);

            console.log(snapshot.data());
            createHTML(snapshot.data(), itemLookup, itemAmnt);
        })
    }
}

function createHTML(storeItem, id, itemAmnt){
    let html = `
        <div class="cartItem" data-itemid="${id}">
            <img class="cartItemImg" src="${storeItem.itemImg}" width="120px">
            <div class="cartInfoText">
                <h2 class="${appliedCartClass}">${storeItem.itemName}</h2>
                <h3 class="cartPrice">$${storeItem.itemPrice}</h3>
            </div>
            <div class="cartInfoAmntRemv">
                <p>Antall: ${itemAmnt}</p>
                <button class="generalButton remove${id}" onclick="removeCartItem('${storeItem.itemName}', '${id}')">Fjern fra handlekurv</button>
            </div>
        </div>`
    shoppingCartView.innerHTML += html;
}

function removeCartItem(itemName, itemID){
    console.log(itemName, itemID);
    let itemToRemove = document.querySelector(`.remove${itemID}`).parentElement.parentElement;
    console.log(itemToRemove);
    itemToRemove.innerHTML = "";

    shoppingCart.length = 0;
    let cartFromStorage = JSON.parse(localStorage.getItem('cartItems'));
    let i = 0;
    cartFromStorage.forEach(() => {
        shoppingCart.push(cartFromStorage[i]);
        i++;
    })
    localStorage.removeItem('cartItems');
    console.log(shoppingCart);
    let removedItemID = shoppingCart.findIndex(i => i.itemID === itemID);
    console.log(removedItemID);
    shoppingCart.splice(removedItemID, 1);
    console.log(shoppingCart);
    //shoppingCart.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(shoppingCart));
}

function openCart(){
    shoppingCartView.innerHTML = "";
    viewCart();
    toggleCart();
    //cartButtonAtr.setAttribute('onclick', 'toggleCart()');
}

function toggleCart(){
    //console.log(cartButtonAtr);
    shoppingCartContain.classList.toggle('hidden');
}
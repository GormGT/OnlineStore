//-------------------------------------------------------------Main database storesort--------------------------------------------------------
let storeSlots = document.querySelector(".storeArea");

const addStoreItem = (storeItem, id, type) => {
    let itemHtml =`
    <div class="storeItem" itemType="${type}" itemID="${id}">
        <p class="itemName">${storeItem.itemName}</p>
        <img src="${storeItem.itemImg}" height="120px" alt="Bilde av ${storeItem.itemName}">
        <p class="price">${storeItem.itemPrice}</p>
        <button class="itemBuyButton">Legg i handlekurv</button>
    </div>
    `;
    storeSlots.innerHTML += itemHtml;
    console.log(storeItem);
}

//To fetch items within subcollections, use storeItems/testDocument/testCollection1
//----------------------Weapons----------------------------
db.collection('storeItems/weapons/stock').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(snapshot);
        console.log(snapshot.docs);
        addStoreItem(doc.data(), doc.id, "/weapons/stock");
        //i++;
    })
}).catch((err) => {
    console.log(err)
});
db.collection('storeItems/weapons/common').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(snapshot);
        console.log(snapshot.docs);
        addStoreItem(doc.data(), doc.id, "/weapons/common");
        //i++;
    })
}).catch((err) => {
    console.log(err)
});
//----------------------Cosmetics----------------------------
db.collection('storeItems/Cosmetics/vanlig').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(snapshot);
        console.log(snapshot.docs);
        addStoreItem(doc.data(), doc.id, "/Cosmetics/vanlig");
        //i++;
    })
}).catch((err) => {
    console.log(err)
});
db.collection('storeItems/Cosmetics/merc-grade').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(snapshot);
        console.log(snapshot.docs);
        addStoreItem(doc.data(), doc.id, "/Cosmetics/merc-grade");
        //i++;
    })
}).catch((err) => {
    console.log(err)
});
db.collection('storeItems/Cosmetics/assassin-grade').get().then((snapshot) => { //There must be a more optimised way of doing this
    snapshot.docs.forEach(doc => {
        console.log(snapshot);
        console.log(snapshot.docs);
        addStoreItem(doc.data(), doc.id, "/Cosmetics/assassin-grade");
        //i++;
    })
}).catch((err) => {
    console.log(err)
});
//----------------------War paints----------------------------
db.collection('storeItems/warpaints/merc-grade').get().then((snapshot) => { //There must be a more optimised way of doing this
    snapshot.docs.forEach(doc => {
        console.log(snapshot);
        console.log(snapshot.docs);
        addStoreItem(doc.data(), doc.id, "/warpaints/merc-grade");
        //i++;
    })
}).catch((err) => {
    console.log(err)
});
db.collection('storeItems/warpaints/comm-grade').get().then((snapshot) => { //There must be a more optimised way of doing this
    snapshot.docs.forEach(doc => {
        console.log(snapshot);
        console.log(snapshot.docs);
        addStoreItem(doc.data(), doc.id, "/warpaints/comm-grade");
        //i++;
    })
}).catch((err) => {
    console.log(err)
});
db.collection('storeItems/warpaints/assassin-grade').get().then((snapshot) => { //There must be a more optimised way of doing this
    snapshot.docs.forEach(doc => {
        console.log(snapshot);
        console.log(snapshot.docs);
        addStoreItem(doc.data(), doc.id, "/warpaints/assassin-grade");
        //i++;
    })
}).catch((err) => {
    console.log(err)
});
db.collection('storeItems/warpaints/elite-grade').get().then((snapshot) => { //There must be a more optimised way of doing this
    snapshot.docs.forEach(doc => {
        console.log(snapshot);
        console.log(snapshot.docs);
        addStoreItem(doc.data(), doc.id, "/warpaints/elite-grade");
        //i++;
    })
}).catch((err) => {
    console.log(err)
});
//----------------------Weapon effects----------------------------
db.collection('storeItems/weaponFX/annet').get().then((snapshot) => { //There must be a more optimised way of doing this | I'm going to keep including this comment until I've optimised this
    snapshot.docs.forEach(doc => {
        console.log(snapshot);
        console.log(snapshot.docs);
        addStoreItem(doc.data(), doc.id, "/weaponFX/annet");
        //i++;
    })
}).catch((err) => {
    console.log(err)
});
db.collection('storeItems/weaponFX/botkillers').get().then((snapshot) => { //There must be a more optimised way of doing this
    snapshot.docs.forEach(doc => {
        console.log(snapshot);
        console.log(snapshot.docs);
        addStoreItem(doc.data(), doc.id, "/weaponFX/botkillers");
        //i++;
    })
}).catch((err) => {
    console.log(err)
});



window.addEventListener("click", e => {
    if (e.target.classList.contains("storeItem")){
        let itemID = e.target.getAttribute("itemid");
        let itemType = e.target.getAttribute("itemType");
        localStorage.removeItem("viewedItem");
        localStorage.removeItem("itemType");
        localStorage.setItem("viewedItem", itemID);
        localStorage.setItem("itemType", itemType);
        window.location.assign("../html/itemPage.html");
    }
});

window.addEventListener("click", e => {
    let shopButton = e.target;
    if (shopButton.classList.contains("itemBuyButton")){
        //console.log("Stop clicking me");
        shopButton.innerText = "I handlekurv";
        shopButton.setAttribute("disabled", true);
        shopButton.style.backgroundColor = "rgb(50, 50, 50)";
    }
});



//-------------------------------------------------------------Legacy storesort--------------------------------------------------------

//let storeSlots = Array.from(document.querySelector(".indexStoreArea").children);

//let storeSlotText = document.querySelectorAll(".storeItem p");
//let storeSlotPrice = document.querySelectorAll(".storeItem p.price");
//let storeSlotImage = document.querySelectorAll(".storeItem img");

function findFallbackStoreItems(){


    function fillFallbackArray(){
        let itemArray = [];
        for(i = 1; i < allItems.length + 1; i++){
            itemArray.push(i);
        }
        return itemArray;
    }

    function assignFallbackID(objs){
        let ids = fillFallbackArray();
        objs.forEach(obj => {
            let randomID = Math.floor(Math.random() * ids.length);
            obj.id = ids[randomID]
            ids.splice(randomID, 1)
        })
    }
    assignFallbackID(allItems);
    allItems.sort((a, b) => a.id - b.id);
    //console.log(allItems);
}

//findStoreItems();

function addFallbackStoreItems(allStoreSlots, objects){
    for(i = 0; i < allStoreSlots.length; i++){
        const slot = allStoreSlots[i];
        //console.log(slot);
        const object = objects[i];
        //console.log(object);
        const itemName = slot.querySelector(".itemName");
        //console.log(itemName);
        const image = slot.querySelector("img");
        const price = slot.querySelector("p.price");
        itemName.innerText = object.name;
        image.setAttribute("src", object.image);
        price.innerText = object.price;
    };
}

//addStoreItems(storeSlots, allItems);
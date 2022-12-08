//-------------------------------------------------------------Main database storesort--------------------------------------------------------
let storeSlots = document.querySelector(".storeArea");

const addStoreItem = (storeItem, id, path) => {
    console.log(path);
    let qClass;
    switch (path){
        //cosmetics
        case '/Cosmetics/merc-grade':
           qClass = 'merc-grade';
           break;
        case '/Cosmetics/assassin-grade':
            qClass = 'ass-grade';
            break;
        //warpaints
        case '/warpaints/merc-grade':
            qClass = 'merc-grade';
            break;
        case '/warpaints/comm-grade':
            qClass = 'comm-grade';
            break;
        case '/warpaints/assassin-grade':
            qClass = 'ass-grade';
            break;
        case '/warpaints/elite-grade':
            qClass = 'elite-grade';
            break;
        //botkillers
        case '/weaponFX/botkillers':
            qClass = 'strange';
            break;
        //default color
        default:
            qClass = 'normal';
            break;
    }
    let itemHtml =`
    <div class="storeItem ${qClass}-border" itemType="${path}" itemID="${id}">
        <p class="${qClass} itemName">${storeItem.itemName}</p>
        <img src="${storeItem.itemImg}" height="120px" alt="Bilde av ${storeItem.itemName}">
        <p class="price">${storeItem.itemPrice}</p>
        <button class="itemBuyButton">Legg i handlekurv</button>
    </div>
    `;
    storeSlots.innerHTML += itemHtml;
    //console.log(storeItem);
}

//To fetch items within subcollections, use storeItems/testDocument/testCollection1
const pathArray = ['/weapons/stock', '/weapons/common', '/Cosmetics/vanlig', '/Cosmetics/merc-grade', '/Cosmetics/assassin-grade', '/warpaints/merc-grade', '/warpaints/comm-grade', '/warpaints/assassin-grade', '/warpaints/elite-grade', '/weaponFX/annet', '/weaponFX/botkillers'];
for(i = 0; i <= pathArray.length; i++){
    //console.log(i);
    let currentPath = pathArray[i];
    db.collection(`storeItems${pathArray[i]}`).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            //console.log(snapshot);
            //console.log(snapshot.docs);
            //console.log(pathArray[i]);
            addStoreItem(doc.data(), doc.id, currentPath);
            //i++;
        })
    }).catch((err) => {
        console.log(err)
    });
}



window.addEventListener("click", e => {
    //console.log(e.target.parentElement);
    //let target = e.currentTarget;
    //let parent = target.parentNode;
    if (e.target.classList.contains("storeItem")){
        //console.log("this element has an id");
        let itemID = e.target.getAttribute("itemid");
        let itemType = e.target.getAttribute("itemType");
        localStorage.removeItem("viewedItem");
        localStorage.removeItem("itemType");
        localStorage.setItem("viewedItem", itemID);
        localStorage.setItem("itemType", itemType);
        window.location.assign("../html/itemPage.html");
    }else if(e.target.classList.contains("itemBuyButton")){
        let shopButton = e.target;
        //console.log("Stop clicking me");
        shopButton.innerText = "I handlekurv";
        shopButton.setAttribute("disabled", true);
        shopButton.style.backgroundColor = "rgb(50, 50, 50)";
        shopButton.disabled = true;
    }
    else if (e.target.parentElement.classList.contains("storeItem")){ //make it ignore the cart button
        //console.log("this element's parent has an id");
        //console.log(e.target);
        let itemID = e.target.parentElement.getAttribute("itemid");
        let itemType = e.target.parentElement.getAttribute("itemType");
        localStorage.removeItem("viewedItem");
        localStorage.removeItem("itemType");
        localStorage.setItem("viewedItem", itemID);
        localStorage.setItem("itemType", itemType);
        window.location.assign("../html/itemPage.html");
    }
});

/*window.addEventListener("click", e => {
    let shopButton = e.target;
    if (shopButton.classList.contains("itemBuyButton")){
        //console.log("Stop clicking me");
        shopButton.innerText = "I handlekurv";
        shopButton.setAttribute("disabled", true);
        shopButton.style.backgroundColor = "rgb(50, 50, 50)";
    }
});*/



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
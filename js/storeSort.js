//-------------------------------------------------------------Main database storesort--------------------------------------------------------
let storeSlots = document.querySelector(".storeArea");

const addStoreItem = (storeItem, id) => {
    let itemHtml =`
    <div class="storeItem" itemID="${id}">
        <p class="itemName">${storeItem.itemName}</p>
        <img src="${storeItem.itemImg}" height="120px" alt="Bilde av ${storeItem.itemName}">
        <p class="price">${storeItem.itemPrice}</p>
        <button class="generalButton">Legg i handlekurv</button>
    </div>
    `;
    storeSlots.innerHTML += itemHtml;
    console.log(storeItem);
}

//To fetch items within subcollections, use storeItems/testDocument/testCollection1
//TODO: Move all items into subcollections and display them on the page. Test how well it allows items from multiple collections to be viewed at the same page
db.collection('storeItems').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(snapshot);
        console.log(snapshot.docs);
        addStoreItem(doc.data(), doc.id);
        //i++;
    })
}).catch((err) => {
    console.log(err)
});

window.addEventListener("click", e => {
    if (e.target.classList.contains("storeItem")){
        let itemID = e.target.getAttribute("itemid");
        localStorage.removeItem("viewedItem");
        localStorage.setItem("viewedItem", itemID);
        window.location.assign("../html/itemPage.html");
    }
});


//Finish up this code if having the items being shown in a separate window 
/*window.addEventListener("click", e => {
    if (e.target.classList.contains("storeItem")) {
      let windowID = e.target.getAttribute("itemid");
      localStorage.removeItem("viewedItem");
      redirectPage(windowID);
      console.log('test');
  
    }
});

function redirectPage(windowID) {

    window.location.assign("itemPage.html"); 
    console.log("ID is = ", windowID);
    localStorage.setItem("viewedItem", windowID);
}*/



/*function showStorePage(){
    window.location.assign('../html/itemPage.html');
    localStorage.setItem('viewedItem', undefined);
}*/



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
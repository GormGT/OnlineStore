//-------------------------------------------------------------Main database storesort--------------------------------------------------------
let storeSlots = document.querySelector(".storeArea");

const addStoreItem = (storeItem) => {
    let itemHtml =`
    <div class="storeItem">
        <p class="itemName">${storeItem.itemName}</p>
        <img src="" height="120px" alt="">
        <p class="price">${storeItem.itemPrice}</p>
    </div>
    `;
    storeSlots.innerHTML += itemHtml;
}


db.collection('storeItems').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        addStoreItem(doc.data());
        //i++;
    })
}).catch((err) => {
    console.log(err)
});

//-------------------------------------------------------------Fallback storesort--------------------------------------------------------

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
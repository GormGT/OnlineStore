let storeSlots = document.querySelectorAll(".storeItem");

let storeSlotText = document.querySelectorAll(".storeItem p");
let storeSlotPrice = document.querySelectorAll(".storeItem p.price");
let storeSlotImage = document.querySelectorAll(".storeItem img");

function addStoreItems(){


    function fillArray(){
        let itemArray = [];
        for(i = 1; i < allItems.length + 1; i++){
            itemArray.push(i);
        }
        return itemArray;
    }

    function assignID(objs){
        let ids = fillArray();
        objs.forEach(obj => {
            let randomID = Math.floor(Math.random() * ids.length);
            obj.id = ids[randomID]
            ids.splice(randomID, 1)
        })
    }
    assignID(allItems);
    console.log(allItems);
}

addStoreItems();
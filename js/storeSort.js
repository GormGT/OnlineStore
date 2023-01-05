//-------------------------------------------------------------Main database storesort--------------------------------------------------------
let storeSlots = document.querySelector(".storeArea");
let documentName = document.title;
let selectedSort;// = 'popularity';

//define arrays that are used for sorting on the index page
let indexCollection = [];
let indexCollectionConvert = [];

//define arrays that are used for sorting on the products page
let productOrderArray = [];
let prodSortQuality = [];
let prodSortType = [];

const addStoreItem = (storeItem, id, path, limitCheck, index) => {
    setTimeout(() =>{
    //Nothing to see here, just me ruining my own code
    if (limitCheck == false){ //DOING: Rewrite the following to work with a new sorting system
        let pathConversion;
        switch (path){
            case '/weapons/stock':
            case '/weapons/common':
            case '/weapons/australium':
                pathConversion = 'weapons';
                break;
            case '/Cosmetics/vanlig':
            case '/Cosmetics/unusual':
            case '/Cosmetics/merc-grade':
            case '/Cosmetics/merc-assassin-grade':
                pathConversion = 'cosmetics';
                break;
            case '/warpaints/merc-grade':
            case '/warpaints/comm-grade':
            case '/warpaints/assassin-grade':
            case '/warpaints/elite-grade':
                pathConversion = 'warpaints';
                break;
            case '/weaponFX/annet':
            case '/weaponFX/botkillers':
                pathConversion = 'weaponFX';
                break;
            case '/other/minerals':
                pathConversion = 'other';
                break;
        }
        let sortedItem = {
            itemDesc: storeItem.itemDesc,
            itemImg: storeItem.itemImg,
            itemName: storeItem.itemName,
            itemPop: storeItem.itemPop,
            itemPrice: storeItem.itemPrice,
            itemID: id,
            itemPath: path,
            sortType: pathConversion
        }
        //console.log('VENNLIGST FUNGER', sortedItem);
        productOrderArray.push(sortedItem);
        //productOrderArray.sort((a, b) => b.itemPop - a.itemPop);
        console.log(productOrderArray);
        /*let qClass;
        switch (path){
            //cosmetics
            case '/Cosmetics/merc-grade':
            qClass = 'merc-grade';
            break;
            case '/Cosmetics/assassin-grade':
                qClass = 'ass-grade';
                break;
            case '/Cosmetics/unusual':
                qClass = 'unusual';
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
            case '/weapons/australium':
                qClass = 'strange';
                break;
            //default color
            default:
                qClass = 'normal';
                break;
        }
        let itemHtml =`
        <div class="storeItem ${qClass}-border" itemType="${path}" itemID="${id}" itemPop="${storeItem.itemPop}">
            <p class="${qClass} itemName">${storeItem.itemName}</p>
            <img src="${storeItem.itemImg}" height="120px" alt="Bilde av ${storeItem.itemName}">
            <p class="price">${storeItem.itemPrice}</p>
            <button class="itemBuyButton">Legg i handlekurv</button>
        </div>`;
        storeSlots.innerHTML += itemHtml;*/
        //Notes for new sorting system:
        /*
        Step by step:
            DONE 1. Add items to array (productOrderArray), similar to on the index page. Add additional object property called "sortType"
            DONE 2. Sort array by default value, popularity
            3. Display items on page with HTML injection
            4. When sorting all items, overwrite the main array with a new sort() method
            5. When sorting/searching for specific qualities/types:
                1. Apply a class of "hiddenProd" to everything on the page
                2. Do the following:
                    Item Quality:
                        A. Use the itemType property specified by the button selected, and insert it into the prodSortQuality array. Apply "hideQ" class to everything else
                        B. Remove the "hiddenProd" class from the items belonging to the path specified
                    Item Type:
                        A. Use the sortType property specified by the button selected, and insert it into the prodSortType array. Apply "hideT" class to everything else
                        B. Remove the "hiddenProd" class from the items belonging to the path specified
                    IMPORTANT: An item will only be shown if there is no "hideQ" or "hideT" class present.
        
        */
    }else if(limitCheck == true){
        let sortedItem = {
            itemDesc: storeItem.itemDesc,
            itemImg: storeItem.itemImg,
            itemName: storeItem.itemName,
            itemPop: storeItem.itemPop,
            itemPrice: storeItem.itemPrice,
            itemID: id,
            itemPath: path,
        }
        console.log('VENNLIGST FUNGER', sortedItem);
        indexCollection.push(sortedItem);
        indexCollection.sort((a, b) => b.itemPop - a.itemPop);
    }}, 100);
    //console.log(storeItem);
}

//To fetch items within subcollections, use storeItems/testDocument/testCollection1
const pathArray = ['/weapons/stock', '/weapons/common', '/weapons/australium', '/Cosmetics/vanlig', '/Cosmetics/merc-grade', '/Cosmetics/assassin-grade', '/Cosmetics/unusual', '/warpaints/merc-grade', '/warpaints/comm-grade', '/warpaints/assassin-grade', '/warpaints/elite-grade', '/weaponFX/annet', '/weaponFX/botkillers', '/other/minerals'];

function mainFunc(selectedSort){
    productOrderArray = [];
    storeSlots.innerHTML = "";
    if (documentName == 'MANN.CO Nettbutikk'){
        for(let i = 0; i <= pathArray.length; i++){
            //console.log(i);
            let currentPath = pathArray[i];
            db.collection(`storeItems${pathArray[i]}`).get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    addStoreItem(doc.data(), doc.id, currentPath, true, i);
                    //i++;
                })
            }).catch((err) => {
                console.log(err)
            });
        }
        //On the index page, limit to 16 items
        const loadItems = setTimeout(() => {

            for(i = 0; i <= 15; i++){ // THIS is what's being the problem. It's trying to inject the objects in the array into the HTML, before they're even defined
                //console.log(indexCollection[i]);
                let qClass;
                switch (indexCollection[i].itemPath){ //If it is directly injected into the HTML, everything breaks
                    //cosmetics
                    case '/Cosmetics/merc-grade':
                    qClass = 'merc-grade';
                    break;
                    case '/Cosmetics/assassin-grade':
                        qClass = 'ass-grade';
                        break;
                    case '/Cosmetics/unusual':
                        qClass = 'unusual';
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
                    case '/weapons/australium':
                        qClass = 'strange';
                        break;
                    //default color
                    default:
                        qClass = 'normal';
                        break;
                }
                let itemHtml =`
                <div class="storeItem ${qClass}-border" itemType="${indexCollection[i].itemPath}" itemID="${indexCollection[i].itemID}" itemPop="${indexCollection[i].itemPop}">
                    <p class="${qClass} itemName">${indexCollection[i].itemName}</p>
                    <img src="${indexCollection[i].itemImg}" height="120px" alt="Bilde av ${indexCollection[i].itemName}">
                    <p class="price">${indexCollection[i].itemPrice}</p>
                    <button class="itemBuyButton">Legg i handlekurv</button>
                </div>`;
                indexCollectionConvert.push(itemHtml);
                storeSlots.innerHTML += indexCollectionConvert[i];
            }
        }, 600);
    }else{
        for(i = 0; i <= pathArray.length; i++){
            let currentPath = pathArray[i];
            db.collection(`storeItems${pathArray[i]}`).get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    //console.log(storeSlots.children.length);
                    addStoreItem(doc.data(), doc.id, currentPath, false, i);
                    //i++;
                })
            }).catch((err) => {
                console.log(err)
            });
        }
        setTimeout(() => {
            prodSort(selectedSort);
            //productOrderArray.sort((a, b) => b.itemPop - a.itemPop);
            for(i = 0; i <= productOrderArray.length; i++){
                let qClass;
                switch (productOrderArray[i].itemPath){ //Why is this line returning errors
                    //cosmetics
                    case '/Cosmetics/merc-grade':
                    qClass = 'merc-grade';
                    break;
                    case '/Cosmetics/assassin-grade':
                        qClass = 'ass-grade';
                        break;
                    case '/Cosmetics/unusual':
                        qClass = 'unusual';
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
                    case '/weapons/australium':
                        qClass = 'strange';
                        break;
                    //default color
                    default:
                        qClass = 'normal';
                        break;
                }
                let itemHtml =`
                <div class="storeItem ${qClass}-border" itemType="${productOrderArray[i].itemPath}" itemID="${productOrderArray[i].itemID}" itemPop="${productOrderArray[i].itemPop}">
                    <p class="${qClass} ${productOrderArray[i].sortType} itemName">${productOrderArray[i].itemName}</p>
                    <img src="${productOrderArray[i].itemImg}" height="120px" alt="Bilde av ${productOrderArray[i].itemName}">
                    <p class="price">${productOrderArray[i].itemPrice}</p>
                    <button class="itemBuyButton">Legg i handlekurv</button>
                </div>`;
                storeSlots.innerHTML += itemHtml;
            }
        }, 500);
}};

let prodSort = (selectedSort) => {
    switch(selectedSort){
        case 'popularity':
            productOrderArray.sort((a, b) => b.itemPop - a.itemPop);
            break;
        case 'alphabetical':
            productOrderArray.sort(function (a, b) {
                if (a.itemName < b.itemName) {
                    return -1;
                }
                if (a.itemName > b.itemName) {
                    return 1;
                }
                return 0;
                });
            break;
    }
}

let buttonSortCall = (selectedSort) => {
    prodSort(selectedSort);

};


window.addEventListener("click", e => {
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

mainFunc();
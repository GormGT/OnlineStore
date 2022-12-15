//-------------------------------------------------------------Main database storesort--------------------------------------------------------
let storeSlots = document.querySelector(".storeArea");
let documentName = document.title;
let indexCollection = [];
let indexCollectionConvert = [];

const addStoreItem = (storeItem, id, path, limitCheck, index) => {
    //console.log(path);
    setTimeout(() =>{
    if (limitCheck == false){
        //createHTML(storeItem, id, path);
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
        <div class="storeItem ${qClass}-border" itemType="${path}" itemID="${id}" itemPop="${storeItem.itemPop}">
            <p class="${qClass} itemName">${storeItem.itemName}</p>
            <img src="${storeItem.itemImg}" height="120px" alt="Bilde av ${storeItem.itemName}">
            <p class="price">${storeItem.itemPrice}</p>
            <button class="itemBuyButton">Legg i handlekurv</button>
        </div>`;
        storeSlots.innerHTML += itemHtml;
    }else if(limitCheck == true){//TODO: Instead of HTML, make the items into objects, that are then inserted into the array and sorted.
        // This is a serious mess right now holy shit
        //The problem: Items are being added from the indexCollection array to the indexCollectionConvert before the former has finished sorting, and therefore the latter becomes a mess. I need to somehow make the objects
        let sortedItem = {
            itemDesc: storeItem.itemDesc,
            itemImg: storeItem.itemImg,
            itemName: storeItem.itemName,
            itemPop: storeItem.itemPop,
            itemPrice: storeItem.itemPrice,
            itemID: id,
            itemPath: path,
        }
        //console.log('VENNLIGST FUNGER', sortedItem);
        indexCollection.push(sortedItem);
        //console.log(path);
        //console.log(i);
        indexCollection.sort((a, b) => b.itemPop - a.itemPop);
        //indexCollection.reverse();
        //console.log(indexCollection);
        //console.log(indexCollection[index].itemID);
        //console.log(indexCollection[0]);
    }}, 100);
    //console.log(storeItem);
}

//const why = setTimeout(console.log('UWYGAHUIDJWKOLANDIOk', indexCollection), 5000);

//To fetch items within subcollections, use storeItems/testDocument/testCollection1
const pathArray = ['/weapons/stock', '/weapons/common', '/Cosmetics/vanlig', '/Cosmetics/merc-grade', '/Cosmetics/assassin-grade', '/warpaints/merc-grade', '/warpaints/comm-grade', '/warpaints/assassin-grade', '/warpaints/elite-grade', '/weaponFX/annet', '/weaponFX/botkillers'];

//TODO: In the forEach, add each storeItem to an array, and only load the 16 first items on the index page. Try to implement the popularity system to this as well.
if (documentName == 'MANN.CO Nettbutikk'){
    for(let i = 0; i <= pathArray.length; i++){
        //console.log(i);
        let currentPath = pathArray[i];
        db.collection(`storeItems${pathArray[i]}`).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                //console.log(storeSlots.children.length);
                //console.log(i);
                //console.log(snapshot);
                //console.log(snapshot.docs.length);
                //console.log(pathArray[i]);
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
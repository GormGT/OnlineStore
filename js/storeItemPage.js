let PleaseWork;
let budgetRegex;
let appliedClass;
let itemPageCartArray = [];



test();

function test() {
  let itemLookup = localStorage.getItem("viewedItem")
  let itemPath = localStorage.getItem("itemType")
  console.log(itemLookup);
  console.log(itemPath);
  //console.log(itemPath.includes("merc-grade"));

  //I would have used a switch statement for this, but switch statements require the variable to already be defined, which isn't the case here
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
  }


  //Figure out a way to only load the collection with the selected item
  //Maybe achieve this by adding the folder as a value to the items on the main store page??
  db.collection(`storeItems${itemPath}`).doc(itemLookup).get().then((snapshot) => {
    console.log(snapshot.data());
    showProdDetails(snapshot.data(), itemLookup)
})};

setTimeout(() => {
  console.log(PleaseWork);
}, 4000)

let itemPage = document.querySelector('.itemPage');
let pageTitle = document.querySelector('.prodDocTitle');

let storePageItemCartAmnt;

function showProdDetails(storeItem, id){
    let itemHtml =`
    <a onclick="history.back()" class="itemPageGoBack generalButton">< Tilbake</a>
    <div class="itemPage mainArea" id="${id}">
        <p class="detailsName ${appliedClass}">${storeItem.itemName}</p>
        <div class="storePageGrid">
            <div></div>
            <div class="miniCarousel">
                <div class="miniCarouselElement">
                    <img class="detailsImg" src="${storeItem.itemImg}" height="300px" alt="Bilde av ${storeItem.itemName}">
                </div>
                <!--<div class="miniCarouselElement">
                    <img src="../img/missing.png" height="300px" alt="Bilde av ${storeItem.itemName}">
                </div>
                <a class="miniCarouselPrev carouselButton" onclick="plusSlides(-1)"><i class="fa-solid fa-chevron-left"></i></a>
                <a class="miniCarouselNext carouselButton" onclick="plusSlides(1)"><i class="fa-solid fa-chevron-right"></i></a>-->
            </div>
            <div class="storePageDesc">
              <p class="detailsDescription">${storeItem.itemDesc}</p>
              <p class="detailsPrice">$${storeItem.itemPrice}</p>
            </div>
            <div>
              <div class="storePageAddCartAmnt">
                <button for="storePageItemCartAmnt" onclick="increaseAmount('-')" class="generalButton storePageAmntButton">-</button>
                <input type="number" id="storePageItemCartAmnt" value="1"></input><!--This is broken on FireFox (I think), so be careful if you use that-->
                <button for="storePageItemCartAmnt" onclick="increaseAmount('+')" class="generalButton storePageAmntButton">+</button>
              </div>
              <button class="generalButton storePageAddCart">Legg i handlevogn</button>
            </div>
            <div></div>
        </div>
    </div>
    `;
    itemPage.innerHTML = itemHtml;
    let titleHTML =`${storeItem.itemName} - MANN.CO Nettbutikk`;
    pageTitle.innerText = titleHTML;
    PleaseWork = defineField();
    //console.log(PleaseWork);
    budgetRegex = PleaseWork.addEventListener('input', () => {
      if(PleaseWork.value.length > 2){
        PleaseWork.value = PleaseWork.value.slice(0, 2);
        //console.log('too long')
      }else if(PleaseWork.value < 0){
        PleaseWork.value = 0;
      }
    });
}

//Define the input field on the storepage
function defineField(){
  const storePageItemCartAmnt = document.querySelector('#storePageItemCartAmnt');
  //console.log('Item defined');javascript
  return storePageItemCartAmnt;
}

//Add items to the cart, mostly copy+paste from storeSort.js
setTimeout(() => {
  let addCartBtn = document.querySelector(".storePageAddCart");
  //console.log(addCartBtn);
  addCartBtn.addEventListener("click", e => {
    console.log(e.target);

    let shopButton = e.target;
    let fullItem = shopButton.parentElement.parentElement.parentElement;
    let itemAmount = Number(PleaseWork.value);
    console.log(itemAmount);

    console.log(fullItem);

    //Get item ID and path for lookup, then add to array
    let cartItemID = fullItem.getAttribute("id");
    console.log(cartItemID);
    let cartItemPath = localStorage.getItem("itemType");
    let cartItem = {
        itemID: cartItemID,
        itemPath: cartItemPath,
        itemAmnt: itemAmount
    };
    console.log(cartItem);
    if(localStorage.getItem('cartItems') === undefined || localStorage.getItem('cartItems') === null){
        itemPageCartArray.push(cartItem);
        localStorage.setItem('cartItems', JSON.stringify(itemPageCartArray));
    }else{
        itemPageCartArray.length = 0;
        let cartFromStorage = JSON.parse(localStorage.getItem('cartItems'));
        let i = 0;
        cartFromStorage.forEach(() => {
            itemPageCartArray.push(cartFromStorage[i]);
            i++;
        })
        localStorage.removeItem('cartItems');
        itemPageCartArray.push(cartItem);
        localStorage.setItem('cartItems', JSON.stringify(itemPageCartArray));
    }

    shopButton.innerText = "I handlekurv";
    shopButton.setAttribute("disabled", true);
    shopButton.style.backgroundColor = "rgb(50, 50, 50)";
    shopButton.disabled = true;
  })
}, 500)

setTimeout(() => {
  let cartCheck = JSON.parse(localStorage.getItem('cartItems'));
  let cartCheckID;
  let item = document.querySelector(".mainArea");
  let button = document.querySelector(".storePageAddCart");

  console.log(item);

  if(cartCheck.length !== 0){

      let i = 0;
            cartCheck.forEach(() => {
                cartCheckID = cartCheck[i].itemID;
                console.log(cartCheckID);
            
                if(cartCheckID == item.getAttribute("id")){
                  console.log("id match");

                  button.innerText = "I handlekurv";
                  button.setAttribute("disabled", true);
                  button.style.backgroundColor = "rgb(50, 50, 50)";
                  button.disabled = true;
                }

                i++
            });

  }

}, 510)

let increaseAmount = (n) => {
  if (n == '+'){
    PleaseWork.value ++;
  }else if (n == '-'){
    PleaseWork.value --;
  }
  let numCheck = /^([0-9]){1,2}$/;
  let maxLength = 99;

  if(PleaseWork.value > maxLength){
    //console.log("bruh");
    PleaseWork.value = 99;
  }else if(PleaseWork.value < 0){
    PleaseWork.value = 0;
    //console.log("test");
  }
}

//Code below is temporarily discontinued. Found some much higher quality images, and therefore extra images aren't necessary. 

//Do this later. It's a function that is supposed to show/hide the carousel-buttons depending on if there is only a single image or not. However, it refuses to work no matter what, so I'm postponing it for now
/*let carouselButtons = Array.from(document.getElementsByClassName('carouselButton'));//This isn't being defined correctly for some reason

function checkImageAmount(slideArray){//Figure out why the fuck this isn't working
    console.log(carouselButtons);
    console.log(slideArray.length);
    if (slideArray.length == 0){
        console.log(carouselButtons);
        //carouselButtons.forEach(() => {
        //  style.display = "none";
        //})
        return true;
    }else{
      return false;
    }
}

let slideIndex = 1;
showSlides(slideIndex);

// Switches between images through the arrows
function plusSlides(n) {
  showSlides(slideIndex += n);
  //console.log(slideIndex);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

//The main function which changes between images
function showSlides(n) {
  let slides = document.getElementsByClassName("miniCarouselElement"); //Gives a HTMLCollection
  console.log(slides);
  console.log(slides.length);
  let multImage = checkImageAmount(slides);
  console.log(multImage);
  if (multImage = false){
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
    console.log(slideIndex);
    slides[slideIndex-1].style.display = "block";
  }
}*/
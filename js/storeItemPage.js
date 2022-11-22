test();

function test() {
  let itemLookup = localStorage.getItem("viewedItem")
  let itemPath = localStorage.getItem("itemType")
  console.log(itemLookup);
  console.log(itemPath);

  //TODO: make the storeItems string into a variable which changes to the path for the selected item
  //Figure out a way to only load the collection with the selected item
  //Maybe achieve this by adding the folder as a value to the items on the main store page??
  db.collection(`storeItems${itemPath}`).doc(itemLookup).get().then((snapshot) => {
    console.log(snapshot.data());
    showProdDetails(snapshot.data(), itemLookup)
})};

let itemPage = document.querySelector('.itemPage');
let pageTitle = document.querySelector('.prodDocTitle');


function showProdDetails(storeItem, id){
    let itemHtml =`
    <div class="itemPage" itemID="${id}">
        <p class="detailsName">${storeItem.itemName}</p>
        <div class="storePageGrid">
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
            <div>
              <p class="detailsDescription">${storeItem.itemDesc}</p>
              <p class="detailsPrice">${storeItem.itemPrice}</p>
            </div>
            <div>
              <button class="generalButton">Legg i handlevogn</button>
            </div>
        </div>
    </div>
    `;
    itemPage.innerHTML = itemHtml;
    let titleHTML =`${storeItem.itemName} - MANN.CO Nettbutikk`;
    pageTitle.innerText = titleHTML;
}



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
test();

function test() {
let itemLookup = localStorage.getItem("viewedItem")
console.log(itemLookup);

db.collection("storeItems").doc(itemLookup).get().then((snapshot) => {
  console.log(snapshot.data());
  showProdDetails(snapshot.data(), itemLookup)
})};

let itemPage = document.querySelector('.itemPage');

function checkImageAmount(slideArray){//Figure out why the fuck this isn't working
    let carouselButtons = Array.from(document.getElementsByClassName('carouselButton'));//This isn't being defined correctly for some reason
    if (slideArray !== 1){
        console.log(carouselButtons);
        
    }
}


function showProdDetails(storeItem, id){
    let itemHtml =`
    <div class="itemPage" itemID="${id}">
        <p class="detailsName">${storeItem.itemName}</p>
        <div class="storePageGrid">
            <div class="miniCarousel">
                <div class="miniCarouselElement">
                    <img src="${storeItem.itemImg}" height="120px" alt="Bilde av ${storeItem.itemName}">
                </div>
                <!--<div class="miniCarouselElement">
                    <img src="../img/missing.png" height="120px" alt="Bilde av ${storeItem.itemName}">
                </div>-->
                <a class="miniCarouselPrev carouselButton" onclick="plusSlides(-1)"><i class="fa-solid fa-chevron-left"></i></a>
                <a class="miniCarouselNext carouselButton" onclick="plusSlides(1)"><i class="fa-solid fa-chevron-right"></i></a>
            </div>
            <p class="detailsPrice">${storeItem.itemPrice}</p>
            <button>Legg i handlevogn</button>
        </div>
    </div>
    `;
    itemPage.innerHTML = itemHtml;
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
  let slides = document.getElementsByClassName("miniCarouselElement");
  console.log(slides.length);
  checkImageAmount(slides);
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  console.log(slideIndex);
  slides[slideIndex - 1].style.display = "block";
}
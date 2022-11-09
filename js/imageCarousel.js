/* ---------------Functionality for the index image carousel---------- */

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
  let slides = document.getElementsByClassName("carouselElement");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}


//Automatically runs the plusSlides function to automate the slides
setInterval( () => {
    plusSlides(1);
}, 7000);

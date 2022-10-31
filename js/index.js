const sortDropdown = document.getElementById("sortDropdown");
const typeDropdown = document.getElementById("typeDropdown");
const qualityDropdown = document.getElementById("qualityDropdown");

function showDropdown(dropdown){
    if (dropdown == 1){
        sortDropdown.classList.toggle("show");
        typeDropdown.classList.remove("show");
        qualityDropdown.classList.remove("show");
    } else  if (dropdown == 2){
        sortDropdown.classList.remove("show");
        typeDropdown.classList.toggle("show");
        qualityDropdown.classList.remove("show");
    } else  if (dropdown == 3){
        sortDropdown.classList.remove("show");
        typeDropdown.classList.remove("show");
        qualityDropdown.classList.toggle("show");
    }
}//This is a serious ducttape solution, however it works for now while I work on finishing everything else

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropdownToggle')
     && !event.target.matches('.dropdownContent')
      && !event.target.matches('.dropdownContent input')
       && !event.target.matches('.dropdownContent label')
        && !event.target.matches('.dropdownContent p')) { //This is giving me a love hate relationship with W3 schools. Their code works really well for what it's designed for, but if you try to modify it slightly, you have to start adding ducttape solutions
      var dropdowns = document.getElementsByClassName("dropdownContent");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
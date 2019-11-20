// when the page loads, call the initialize function
window.addEventListener('DOMContentLoaded', initialize);

//initialize function is going to call the function fetchJson
function initialize() {
    fetchJson();
}

//fetchJson is running below
function fetchJson() {

//define the consts of the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("pod");
    const category = urlParams.get("category");

// if search has a value
    if(search){
        console.log('search')
        fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/"+search+"?_embed")
           .then(res=>res.json())
           .then(data=>{
        console.log("archives.js data",data);
//then printOutEachPost
        data.forEach(printOutEachPost);
       });
        if(search == "music"){
            getNavigation()
        }
//if it doesn't, then it has the value of category
    } else if (category){
        console.log('category')
        fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/music?categories="+category+"&_embed")
    .then(res=>res.json())
    .then(data=>{
        data.forEach(printOutEachPost);
       })
        getNavigation()

    }

}

// call function getNavigation
function getNavigation(){
  fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/categories?per_page=100")
    .then(res=>res.json())
    .then(data=>{
      //console.log(data)
      data.forEach(addLink)
    })
}


function addLink(oneItem){
   console.log("category",oneItem)
  //document.querySelector("nav").innerHTML += oneItem.name
  if(oneItem.parent === 124 && oneItem.count > 0){
    const link = document.createElement("a");
    link.textContent=oneItem.name;
    link.setAttribute("href", "category.html?category="+oneItem.id)
    document.querySelector(".subcat ul").appendChild(link);
  }
}

function printOutEachPost(e) {
    console.log(e);
    console.log("featured image", e._embedded["wp:featuredmedia"][0].link)
    const copiesContainer = document.querySelector('#templateCopiesContainer');
    const myTemplate = document.querySelector('.podTemplate').content;
    let myCopy = myTemplate.cloneNode(true);

    // populate the elements within the clone here
    let h1 = myCopy.querySelector('h1');
    h1.textContent = e.title.rendered;

    let link = myCopy.querySelector('.link-to-post')
    link.setAttribute('href','/post.html?post='+e.id)

    let description = myCopy.querySelector('.description');
    // console.log(e.content.rendered)
    // description.innerHTML = e.content.rendered;
    let image = myCopy.querySelector('.banner');
    image.setAttribute('src',e._embedded["wp:featuredmedia"][0].link)

    let ticketPrice = myCopy.querySelector('.ticket_price');
    ticketPrice.innerHTML = e.ticket_price;


     // let img = myCopy.querySelector('h1');
    // img.setAttribute('src', e.)
    copiesContainer.appendChild(myCopy);

}

//SLIDESHOW

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


//to display automatic slideshow
var slideIndex = 0;
showSlides();

function showSlides() {
var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
   slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 10 seconds
}

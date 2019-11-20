window.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    fetchJson();
}

function fetchJson() {

    const urlParams = new URLSearchParams(window.location.search);
    let postId = urlParams.get("post");


    fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/music/"+postId+"?_embed")
           .then(res=>res.json())
           .then(data=>{
        // console.log("archivesjs data",data);
        renderPost(data)
       });
}

function renderPost(e) {
    // console.log(e.ticket_price);
    console.log("featured image", e._embedded["wp:featuredmedia"][0].link)
    const copiesContainer = document.querySelector('#templateCopiesContainer');
    const myTemplate = document.querySelector('.podTemplate').content;
    let myCopy = myTemplate.cloneNode(true);

    // populate the elements within the clone here
    let h1 = myCopy.querySelector('h1');
    h1.textContent = e.title.rendered;

    let description = myCopy.querySelector('.description');
    // console.log(e.content.rendered)
    description.innerHTML = e.content.rendered;
    let image = myCopy.querySelector('.banner');
    image.setAttribute('src',e._embedded["wp:featuredmedia"][0].link)

    let ticketPrice = myCopy.querySelector('.ticket_price');
    ticketPrice.innerHTML = e.ticket_price;


     // let img = myCopy.querySelector('h1');
    // img.setAttribute('src', e.)
    copiesContainer.appendChild(myCopy);

}

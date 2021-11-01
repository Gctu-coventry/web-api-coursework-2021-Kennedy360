function getId(ref){
    var refId =  document.getElementById(ref);
    return refId;
}
function getClass(ref){
    var refClass = document.getElementsByClassName(ref);
    return refClass;
}

document.addEventListener('DOMContentLoaded',function(){
    var closeButton = getId('close-btn');
    var modal = getId('modal-container');
closeButton.addEventListener('click', function(){
    modal.style.display="none";
})

// var im = getId('events-card-poster');
var im = document.querySelectorAll('#events-card-poster');
// console.log(im.);
im.forEach(e => 
    e.addEventListener('click', function(){
        var ims = e.getAttribute('src');
        imm.setAttribute('src',ims);
        modal.style.display = "flex";
    }));
var imm = getId('modal-product-image-src');
// im.addEventListener('click', function(){
//     // var ims = im.getAttribute('src');
//     console.log(im.sib);
//     // imm.setAttribute('src',ims);
//     // modal.style.display = "flex";
// })

// Get image src
var product_image = getClass('books-card-header');
// alert(product_image.item[0]);
// alert(type)
});

document.addEventListener('scroll',function(){
    var nav = getId('nav');
if(scrollY >= 100){
    nav.style.backgroundColor = `#FFFFFF`;
    nav.style.color = `#000`;
    nav.style.boxShadow = "0px 1px 10px 9px rgba(0,0,10,.03)";
};
if(scrollY < 100){
    // nav.style.backgroundColor = `rgba(9,9,9,.01)`;
    nav.style.backgroundColor = "inherit";
    nav.style.color = `#000`;
    nav.style.boxShadow = "0px 0px 0px 0px rgba(0,0,0,0)";
}
})

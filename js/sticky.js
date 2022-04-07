window.onscroll = function() {mySticky()};

var header = document.getElementById("myFooter");
var boat = document.getElementById("myBoat");
var impButton = document.getElementById("impButton");
var base = header.offsetTop;/* + header.offsetHeight;*/

function mySticky() {
	base = header.offsetTop;
	
	console.log(base);
	console.log(window.pageYOffset + window.innerHeight);
	
  if (window.pageYOffset + window.innerHeight < base) {
    boat.classList.remove("sticky");
    impButton.classList.remove("impButtonsticky");
  } else {
    boat.classList.add("sticky");
    impButton.classList.add("impButtonsticky");
  }
}

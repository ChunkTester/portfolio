var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n)
{
  showSlides(slideIndex += n);
}

function currentSlide(n)
{
  showSlides(slideIndex = n);
}

function showSlides(n)
{
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
  dots[slideIndex].className += " active";
}

/*
 * automatic jump to
 */
 
//setInterval(costumJump, 3000);

function randomIntFromInterval(min, max)
{ 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function jumpId(h)
{
	document.getElementById(h).scrollIntoView();
}

function costumJump()
{
	waitForElm('.slideshow-container').then((elm) => {
		console.log('Images ready');
		let rnd = randomIntFromInterval(1, 52);
		let hrf = "#lightbox-" + rnd;  
		//let lnk = document.querySelectorAll("a[href='" + hrf + "']");
		let lnk = document.querySelector("a[href='" + hrf + "']");
		lnk.scrollIntoView();
		/*
    lnk.offsetTop; //Getting Y of target element
    window.scrollTo(0, top);*/
    //smoothScroll(lnk);

		const offsetTop = lnk.offsetTop;

		scroll({
			top: offsetTop,
			behavior: "smooth"
		});
		
		window.scrollTo(0, offsetTop); 
  
		console.log(lnk);
	});
}

function jumpHref()
{
	// href="#lightbox-2"
	let url = location.href;               //Save down the URL without hash.
	let rnd = randomIntFromInterval(1, 52);
	location.href = "#lightbox-" + rnd;                 //Go to the target element.
	console.log(location.href);
	history.replaceState(null,null,url);   //Don't like hashes. Changing it back.
}

/*
 * Smooth scrolling
 */

function currentYPosition()
{
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(elm)
{
    //var elm = document.getElementById(eID);
    let y = elm.offsetTop;
    let node = elm;
    while (node.offsetParent && node.offsetParent != document.body)
    {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}

function smoothScroll(elm)
{
    let startY = currentYPosition();
    let stopY = elmYPosition(elm);
    let distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100)
    {
        scrollTo(0, stopY); return;
    }
    let speed = Math.round(distance / 100);
    if( speed >= 20 ) speed = 20;
    let step = Math.round(distance / 25);
    let leapY = stopY > startY ? startY + step : startY - step;
    let timer = 0;
    if( stopY > startY )
    {
        for( let i = startY; i < stopY; i += step )
        {
            setTimeout( "window.scrollTo(0, " + leapY + ")", timer * speed );
            leapY += step;
            if( leapY > stopY ) leapY = stopY;
            timer++;
        } 
        return;
    }
    for ( let i=startY; i>stopY; i-=step )
    {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}

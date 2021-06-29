// hamburger menu
$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
});

// image rotate on scroll
let scrollObject = document.getElementById("scrollObject");
window.addEventListener("scroll", () => {
    scrollObject.style.animation-duration('15s');
});
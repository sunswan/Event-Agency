// hamburger menu
$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
});

new CircleType(document.getElementById('scroll-text'));

// moving ring

// $(".preloader-ring").each(function () {
// 	let text = $(this).text(),
// 		textArr = text.split(''),
// 		a = 0;
// 	$(this).html('');
// 	for (let i = 0; i <= 30; i++) {
// 		if (!textArr[i] || textArr[i] == " ") {
// 			textArr[i] = "";
// 		}
// 		$(this).append('<div class="preloader-sector" style="transform: rotateY(' + a + 'deg) translateZ(160px)">' + textArr[i] + '</div>');
// 		a = a + 12;
// 	}
// });



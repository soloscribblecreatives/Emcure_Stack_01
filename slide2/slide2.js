function runAnimationCard() {
window.requestAnimationFrame(function () {

$(document).ready(function () {

var flippedCount = 0;
var totalCards = 3;
var gameCompleted = false;

$(".card-wrapper").on("click touchstart", function (e) {
	e.preventDefault();

	if (gameCompleted) return;

	var card = $(this);

	// Prevent same card from flipping again
	if (card.hasClass("flipped")) return;

	document.getElementById("cardflip").play(); //audio effect to card flip
	
	card.addClass("flipped");
	flippedCount++;

	// You can add custom function here
	onCardFlipped(card.data("card"));

	if (flippedCount === totalCards) {
		gameCompleted = true;
		
		setTimeout(function () {
			document.getElementById("success").play();
		}, 500);
		
		setTimeout(function () {
			go_nav('f');
		}, 2000);
	}
});

function onCardFlipped(cardNumber) {
	console.log("Card flipped:", cardNumber);

	// Add your custom manual function here
	// Example:
	// if(cardNumber == 1) { yourFunction(); }
}

});

});
}




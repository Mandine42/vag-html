// Sélectionne le bouton "S'inscrire"
var submitButton = document.getElementById("submit-button");

// Sélectionne le pop-up
var popup = document.getElementById("popup");

// Sélectionne le bouton de fermeture du pop-up
var closePopup = document.getElementsByClassName("close")[0];

// Sélectionne le formulaire d'inscription
var signupForm = document.getElementById("signupForm");

// Quand l'utilisateur clique sur "S'inscrire", afficher le pop-up et empêcher la soumission du formulaire
signupForm.addEventListener("submit", (event) => {
	event.preventDefault(); // Empêche l'envoi du formulaire
	popup.style.display = "block"; // Affiche le pop-up
});

// Quand l'utilisateur clique sur la croix (x), fermer le pop-up
closePopup.onclick = () => {
	popup.style.display = "none";
};

// Quand l'utilisateur clique en dehors du pop-up, fermer le pop-up
window.onclick = (event) => {
	if (event.target == popup) {
		popup.style.display = "none";
	}
};

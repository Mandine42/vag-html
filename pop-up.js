// Sélectionner les éléments
var popup = document.getElementById("popup");
var openPopup = document.getElementById("openPopup");
var closePopup = document.getElementsByClassName("close")[0];
// Sélectionne le lien "Voir mon profil"
var profileLink = document.getElementById("profile-link");

// Quand l'utilisateur clique sur le bouton, ouvrir le pop-up
openPopup.onclick = function() {
    popup.style.display = "block";
}

// Quand l'utilisateur clique sur la croix (x), fermer le pop-up
closePopup.onclick = function() {
    popup.style.display = "none";
}

// Quand l'utilisateur clique en dehors du pop-up, fermer le pop-up
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

// Ajoute un événement de clic pour changer la couleur du texte après le clic
profileLink.addEventListener("click", function() {
    profileLink.classList.add("clicked");
});

class Caroussel {
	// Propriétés privées
	#img = [
		"ton quartier.svg",
		"les dons.svg",
		"calendrier.svg",
		"connecte-toi.svg",
	];

	// Titres correspondants à chaque image
	#titles = ["Ton Quartier", "Les Dons", "Réserve", "Connecte-toi"];

	#component; // Sélecteur CSS pour le composant
	#image; // Élément image à mettre à jour
	#points; // Les points de navigation
	#title; // Élément h2 à mettre à jour
	#i = 0; // Index de l'image actuelle
	#touchStartX = 0; // Position initiale du touché en X
	#touchEndX = 0; // Position finale du touché en X

	// Constructeur
	constructor(cssSelector) {
		this.#component = document.querySelector(cssSelector);
		this.#image = this.#component.querySelector(".img");
		this.#points = this.#component.querySelectorAll(".dot");
		this.#title = this.#component.querySelector("h2"); // Sélectionner l'élément <h2>

		// Ajouter les événements de swipe (glissement)
		this.#addSwipeEvents();

		// Initialiser l'image, le titre et le point actif
		this.#updateImage();
		this.#updateTitle();
		this.#updateActivePoint();
	}

	// Ajouter les événements pour détecter le glissement
	#addSwipeEvents = () => {
		this.#component.addEventListener(
			"touchstart",
			this.#handleTouchStart,
			false,
		);
		this.#component.addEventListener("touchmove", this.#handleTouchMove, false);
		this.#component.addEventListener("touchend", this.#handleTouchEnd, false);
	};

	// Enregistrer la position du touché initial (touchstart)
	#handleTouchStart = (e) => {
		this.#touchStartX = e.changedTouches[0].screenX;
	};

	// Enregistrer la position finale du touché (touchend)
	#handleTouchMove = (e) => {
		this.#touchEndX = e.changedTouches[0].screenX;
	};

	// Gérer le glissement (touchend)
	#handleTouchEnd = () => {
		const swipeDistance = this.#touchEndX - this.#touchStartX;
		const minSwipeDistance = 50; // Distance minimum pour être considéré comme un swipe

		if (swipeDistance > minSwipeDistance) {
			this.#prevImage(); // Glissement vers la droite
		} else if (swipeDistance < -minSwipeDistance) {
			this.#nextImage(); // Glissement vers la gauche
		}
	};

	// Afficher l'image suivante
	#nextImage = () => {
		if (this.#i < this.#img.length - 1) {
			this.#i++;
		} else {
			this.#i = 0; // Revenir au début si on atteint la fin
		}
		this.#updateImage();
		this.#updateTitle();
		this.#updateActivePoint();
	};

	// Afficher l'image précédente
	#prevImage = () => {
		if (this.#i > 0) {
			this.#i--;
		} else {
			this.#i = this.#img.length - 1; // Revenir à la dernière image si on est au début
		}
		this.#updateImage();
		this.#updateTitle();
		this.#updateActivePoint();
	};

	// Méthode pour mettre à jour l'image affichée
	#updateImage = () => {
		const imagePath = `asset/img-caroussel/${this.#img[this.#i]}`;
		this.#image.setAttribute("src", imagePath);
	};

	// Méthode pour mettre à jour le titre (h2)
	#updateTitle = () => {
		this.#title.textContent = this.#titles[this.#i]; // Mettre à jour le contenu de <h2>
	};

	// Méthode pour mettre à jour le point actif
	#updateActivePoint = () => {
		this.#points.forEach((point, index) => {
			point.classList.toggle("active", index === this.#i);
		});
	};
}

// Exporter la classe pour l'utiliser ailleurs
export default Caroussel;

// Initialisation du carrousel lorsque le DOM est prêt
document.addEventListener("DOMContentLoaded", () => {
	const carrousel = new Caroussel("#carrousel"); // Sélection du carrousel
});

window.onscroll = () => {
	document
		.querySelector("header")
		.classList.toggle("scrolled", window.scrollY > 50);
};

// Fonction pour basculer l'affichage de la liste des éléments sélectionnés
function toggleSelectedItemsDisplay() {
	// biome-ignore lint/style/noVar: <explanation>
	var displayDiv = document.getElementById("selected-items");

	if (displayDiv.style.maxHeight && displayDiv.style.maxHeight !== "0px") {
		displayDiv.style.opacity = "0";
		displayDiv.style.maxHeight = "0";
	} else {
		displayDiv.style.opacity = "1";
		displayDiv.style.maxHeight = "1000px"; // Hauteur suffisante pour afficher le contenu
	}
}

// Fonction pour basculer l'affichage d'une liste
function toggleList(targetId) {
	// biome-ignore lint/style/noVar: <explanation>
	var list = document.getElementById(targetId);
	list.style.display = list.style.display === "none" ? "block" : "none";
}




// Écouteur d'événement pour le bouton de validation
document.getElementById("validate-all").addEventListener("click", (event) => {
	event.preventDefault();
	// biome-ignore lint/style/noVar: <explanation>
	var divIds = [
		"vegetable-list",
		"fruit-list",
		"fresh-list",
		"milk-list",
		"keep-list",
		"condiment-list",
		"legumineuse-list",
		"feculent-list",
	];
	// biome-ignore lint/style/noVar: <explanation>
	var displayId = "selected-items";

	displaySelectedItemsFromMultipleDivs(divIds, displayId);

	// biome-ignore lint/complexity/noForEach: <explanation>
	divIds.forEach((divId) => {
		document.getElementById(divId).classList.add("hidden");
	});

	toggleSelectedItemsDisplay();
});

// Écouteurs d'événements pour les boutons de basculement de liste
// biome-ignore lint/complexity/noForEach: <explanation>
document.querySelectorAll(".toggle-list").forEach((button) => {
	button.addEventListener("click", function () {
		// biome-ignore lint/style/noVar: <explanation>
		var targetId = this.getAttribute("data-target");
		toggleList(targetId);
	});
});

// Écouteurs d'événements pour les boutons de validation de sélection
// biome-ignore lint/complexity/noForEach: <explanation>
document.querySelectorAll(".validate-selection").forEach((button) => {
	button.addEventListener("click", function () {
		// biome-ignore lint/style/noVar: <explanation>
		var targetId = this.getAttribute("data-target");
		// biome-ignore lint/style/noVar: <explanation>
		var displayId = this.getAttribute("data-display");
		displaySelectedItems(targetId, displayId);
	});
});

// Gère l'affichage du dropdown (choix multiple)
// biome-ignore lint/complexity/noForEach: <explanation>
document.querySelectorAll(".toggle-dropdown").forEach((checkbox) => {
	checkbox.addEventListener("change", function () {
		// biome-ignore lint/style/noVar: <explanation>
		var targetId = this.getAttribute("data-target");
		// biome-ignore lint/style/noVar: <explanation>
		var dropdown = document.getElementById(targetId);
		dropdown.style.display = this.checked ? "block" : "none";
	});
});

// Affichage de la date de péremption si la case est cochée
const dateCheckboxes = document.querySelectorAll(".date-peremption");
// biome-ignore lint/complexity/noForEach: <explanation>
dateCheckboxes.forEach((checkbox) => {
	checkbox.addEventListener("change", function () {
		const dateInput = document.getElementById(this.id.replace("Checkbox", ""));
		dateInput.style.display = this.checked ? "block" : "none";
	});
});

// Gère l'affichage du menu déroulant si "Quantité" est coché
// biome-ignore lint/complexity/noForEach: <explanation>
document.querySelectorAll(".quantite").forEach((checkbox) => {
	checkbox.addEventListener("change", function () {
		// biome-ignore lint/style/noVar: <explanation>
		var targetId = this.getAttribute("data-target");
		// biome-ignore lint/style/noVar: <explanation>
		var quantitySelect = document.getElementById(targetId);
		quantitySelect.style.display = this.checked ? "block" : "none";
	});
});

// Gère l'affichage du champ texte si "Autre" est coché
// biome-ignore lint/complexity/noForEach: <explanation>
document.querySelectorAll(".autre").forEach((checkbox) => {
	checkbox.addEventListener("change", function () {
		// biome-ignore lint/style/noVar: <explanation>
		var targetId = this.getAttribute("data-target");
		// biome-ignore lint/style/noVar: <explanation>
		var otherTextField = document.getElementById(targetId);
		otherTextField.style.display = this.checked ? "block" : "none";
	});
});

// Gérer le redirection Google Maps
document.getElementById("view-map").addEventListener("click", () => {
	// biome-ignore lint/style/noVar: <explanation>
	var quartier = document.getElementById("quartier").value;
	if (quartier === "#") {
		alert("Veuillez sélectionner un quartier !");
	} else {
		// biome-ignore lint/style/noVar: <explanation>
		// biome-ignore lint/correctness/noInnerDeclarations: <explanation>
		var mapLinks = {
			republique:
				"https://www.google.com/maps?q=Bas+Montreuil+-+République+Montreuil",
			chanzy: "https://www.google.com/maps?q=Etienne+Marcel+-+Chanzy+Montreuil",
			bobillot: "https://www.google.com/maps?q=Bobillot+Montreuil",
			"la noue":
				"https://www.google.com/maps?q=La+Noue+-+Clos+français+Montreuil",
			villiers: "https://www.google.com/maps?q=Villiers+-+Barbusse+Montreuil",
			solidarite: "https://www.google.com/maps?q=Solidarité+-+Carnot+Montreuil",
			centre: "https://www.google.com/maps?q=Centre-ville+Montreuil",
			beaumonts:
				"https://www.google.com/maps?q=Jean+Moulin+-+Beaumonts+Montreuil",
			ramenas: "https://www.google.com/maps?q=Ramenas+-+Léo+Lagrange+Montreuil",
			branly: "https://www.google.com/maps?q=Branly+-+Boissière+Montreuil",
			"bel air":
				"https://www.google.com/maps?q=Bel+Air+-+Grands+Pêchers+-+Renan+Montreuil",
			signac: "https://www.google.com/maps?q=Signac+-+Murs+à+pêches+Montreuil",
			ruffins:
				"https://www.google.com/maps?q=Ruffins+-+Théophile+Sueur+Montreuil",
			montreau:
				"https://www.google.com/maps?q=Montreau+-+Le+Morillon+Montreuil",
		};
		window.open(mapLinks[quartier], "_blank");
	}
});

// Validation des quartiers
document.addEventListener("DOMContentLoaded", () => {
	const validateButton = document.getElementById("validate-quartier");
	const quartierSelect = document.getElementById("quartier");
	const selectedQuartierDiv = document.getElementById("selected-quartier");

	validateButton.addEventListener("click", () => {
		const selectedQuartier = quartierSelect.value;

		if (selectedQuartier) {
			selectedQuartierDiv.innerText = `Quartier sélectionné : ${selectedQuartier}`;
		} else {
			alert("Veuillez sélectionner un quartier avant de valider.");
		}
	});

	document.getElementById("choose-time").addEventListener("click", () => {
		// biome-ignore lint/style/noVar: <explanation>
		var date = document.getElementById("date").value;
		// biome-ignore lint/style/noVar: <explanation>
		var time = document.getElementById("time").value;

		if (!date) {
			alert("Veuillez sélectionner une date !");
		} else {
			// biome-ignore lint/style/noVar: <explanation>
			// biome-ignore lint/correctness/noInnerDeclarations: <explanation>
			var timeDisplay = time ? time : "Heure non spécifiée";
			// biome-ignore lint/style/noVar: <explanation>
			// biome-ignore lint/correctness/noInnerDeclarations: <explanation>
			var selectedItemsDiv = document.getElementById("date-time");
			selectedItemsDiv.innerHTML = `<p>Date : ${date}</p><p>Heure : ${timeDisplay}</p>`;
		}
	});

	// document.getElementById("validate-comment").addEventListener("click", () => {
	// 	const message = document.getElementById("msg").value;

	// 	if (message.trim() !== "") {
	// 		const commentDiv = document.getElementById("comment");
	// 		const newComment = document.createElement("p");
	// 		newComment.textContent = message;
	// 		commentDiv.appendChild(newComment);
	// 		document.getElementById("msg").value = "";
	// 	} else {
	// 		alert("Veuillez entrer un commentaire avant de valider.");
	// 	}
	// });
	});

	let validatedComment = ""; // Variable globale pour stocker le commentaire validé

	// Écouteur de clic sur le bouton "Valider le commentaire"
	document.getElementById("validate-comment").addEventListener("click", () => {
		// Récupérer le commentaire et le stocker dans la variable globale
		validatedComment = document.getElementById("msg").value.trim();
		
		// Afficher le commentaire validé dans la div correspondante
		document.getElementById("comment").innerHTML = `
			<p>Commentaire validé : ${validatedComment || "Aucun commentaire fourni."}</p>
		`;
		console.log("Commentaire validé :", validatedComment); // Log pour vérifier la valeur
	
    // Réinitialiser le champ de texte après validation
    document.getElementById("msg").value = "";
});


document.addEventListener("DOMContentLoaded", () => {
	const validateButton = document.getElementById("validate-donation");

	// console.log("Chargement du script...");
	// console.log("Validation du bouton :", validateButton);
	const thankYouModal = document.getElementById("popup3");
	const closeModalButton = document.getElementById("close-popup3");
	const donationConfirmation = document.getElementById("donationConfirmation");

	if (!validateButton) {
		console.error(
			"L'élément avec l'ID 'validate-donation' n'a pas été trouvé.",
		);
		return; // Arrête le script si le bouton n'est pas trouvé
	}

	validateButton.addEventListener("click", (event) => {
		event.preventDefault();
		// console.log("Le bouton de validation a été cliqué.");
		// Afficher le pop-up de remerciement
		thankYouModal.classList.remove("hidden");
		donationConfirmation.classList.remove("hidden");
	});

	closeModalButton.addEventListener("click", () => {
		thankYouModal.classList.add("hidden");
		donationConfirmation.classList.add("hidden");
	});

	thankYouModal.querySelector(".close").addEventListener("click", () => {
		thankYouModal.classList.add("hidden");
	});

	window.addEventListener("click", (event) => {
		if (event.target === thankYouModal) {
			thankYouModal.classList.add("hidden");
		}
	});
});


// Fonction pour récupérer les éléments sélectionnés
function displaySelectedItemsFromMultipleDivs(divIds, displayId) {
	const selectedItems = [];

	divIds.forEach((divId) => {
		const divElement = document.getElementById(divId);
		if (divElement) {
			const checkboxes = divElement.querySelectorAll("input[type='checkbox']:checked");
			checkboxes.forEach((checkbox) => {
				selectedItems.push(checkbox.value); // Récupère les valeurs des éléments cochés
			});
		} else {
			console.warn(`Div avec l'ID "${divId}" non trouvée.`);
		}
	});

	// Mettre à jour l'affichage des éléments sélectionnés (facultatif)
	const displayDiv = document.getElementById(displayId);
	displayDiv.innerHTML = selectedItems.join(", "); // Affiche les éléments sélectionnés

	return selectedItems; // Retourner un tableau des éléments sélectionnés

}
// Écouteur de clic sur le bouton "Valider mon don"
document.getElementById("validate-donation").addEventListener("click", (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    const selectedQuartier = document.getElementById("quartier").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Vérification des champs requis
    if (!selectedQuartier || !date) {
        alert("Veuillez remplir tous les champs requis !");
        return;
    }

    // Récupérer les éléments sélectionnés
    const divIds = [
        "vegetable-list",
        "fruit-list",
        "fresh-list",
        "milk-list",
        "keep-list",
        "condiment-list",
        "legumineuse-list",
        "feculent-list"
    ];
    const displayId = "selected-items";
    const selectedItems = displaySelectedItemsFromMultipleDivs(divIds, displayId);

    // Vérifier si le commentaire validé est présent
    console.log("Commentaire récupéré :", validatedComment);

    // Créer un objet pour le don actuel
    const currentDonation = {
        quartier: selectedQuartier,
        date: date,
        time: time,
        message: validatedComment || "Aucun commentaire fourni.", // Utiliser le commentaire validé
        selectedItems: selectedItems.join(", ") || "Aucun élément sélectionné.", // Convertir les éléments en chaîne
    };

    // Récupérer les dons existants ou initialiser un tableau vide
    const existingDonations = JSON.parse(localStorage.getItem("donations")) || [];

    // Ajouter le don actuel au tableau des dons existants
    existingDonations.push(currentDonation);

    // Sauvegarder le tableau mis à jour dans localStorage
    localStorage.setItem("donations", JSON.stringify(existingDonations));
    console.log("Dons enregistrés :", existingDonations); // Log pour vérifier les dons enregistrés

    // Afficher la confirmation de don
    const donationConfirmation = document.getElementById("donationConfirmation");
    donationConfirmation.innerHTML = `
        <h3>Merci pour votre don !</h3>
        <p>Je donne dans le quartier de ${selectedQuartier} le ${date} à ${time ? time : "Heure non spécifiée"}</p>
        <p>Commentaire : ${currentDonation.message}</p>
        <p>Éléments sélectionnés : ${currentDonation.selectedItems}</p>
    `;

    // Supprimer la classe 'hidden' pour rendre la confirmation visible
    donationConfirmation.classList.remove("hidden");

    // Réinitialiser le formulaire
    document.getElementById("quartier").value = "#";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("msg").value = "";
});


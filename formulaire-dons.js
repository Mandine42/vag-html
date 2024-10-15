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

// Fonction pour afficher les éléments sélectionnés depuis plusieurs divs
function displaySelectedItemsFromMultipleDivs(divIds, displayId) {
	// biome-ignore lint/style/noVar: <explanation>
	var displayDiv = document.getElementById(displayId);
	if (!displayDiv) {
		console.error(`L'élément avec l'ID "${displayId}" n'existe pas.`);
		return;
	}

	// biome-ignore lint/style/noVar: <explanation>
	var allSelectedItems = [];

	// biome-ignore lint/complexity/noForEach: <explanation>
	divIds.forEach((divId) => {
		// biome-ignore lint/style/noVar: <explanation>
		var div = document.getElementById(divId);
		if (!div) {
			console.error(`L'élément avec l'ID "${divId}" n'existe pas.`);
			return;
		}

		var selectedItems = Array.from(
			div.querySelectorAll('input[type="checkbox"]:checked'),
		)
			.map((checkbox) => {
				// biome-ignore lint/style/noVar: <explanation>
				var parentDiv = checkbox.parentElement;
				// biome-ignore lint/style/noVar: <explanation>
				var quantitySelect = parentDiv.querySelector("select");
				// biome-ignore lint/style/noVar: <explanation>
				var dateInput = parentDiv.querySelector('input[type="date"]');
				// biome-ignore lint/style/noVar: <explanation>
				var otherTextField = parentDiv.querySelector('input[type="text"]');
				// biome-ignore lint/style/noVar: <explanation>
				var isSubCategory = parentDiv.closest(".dropdown-options") !== null;

				// biome-ignore lint/style/noVar: <explanation>
				var itemName = checkbox.nextElementSibling.textContent;
				if (
					otherTextField &&
					otherTextField.style.display !== "none" &&
					otherTextField.value.trim() !== ""
				) {
					itemName = otherTextField.value;
				}

				// biome-ignore lint/style/noVar: <explanation>
				var quantity = quantitySelect ? quantitySelect.value : "";
				// biome-ignore lint/style/noVar: <explanation>
				var datePeremption = dateInput ? dateInput.value : "";

				if (
					!isSubCategory &&
					parentDiv.querySelector(".dropdown-options input:checked")
				) {
					return null;
				}

				return {
					name: itemName,
					quantity: quantity,
					datePeremption: datePeremption,
				};
			})
			.filter((item) => item !== null && item.name.trim() !== "");

		allSelectedItems = allSelectedItems.concat(selectedItems);
	});

	allSelectedItems = allSelectedItems.filter(
		(item, index, self) =>
			index ===
			self.findIndex(
				(i) =>
					i.name === item.name &&
					i.quantity === item.quantity &&
					i.datePeremption === item.datePeremption,
			),
	);

	if (allSelectedItems.length > 0) {
		displayDiv.innerHTML =
			// biome-ignore lint/style/useTemplate: <explanation>
			"<p>Je donne :</p><ul>" +
			allSelectedItems
				.map(
					(item) =>
						`<li>${item.name} ${item.quantity ? `- ${item.quantity}` : ""} ${item.datePeremption ? `- ${item.datePeremption}` : ""}</li>`,
				)
				.join("") +
			"</ul>";
	} else {
		displayDiv.innerHTML = "<p>Aucune sélection</p>";
	}
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

	document.getElementById("validate-comment").addEventListener("click", () => {
		const message = document.getElementById("msg").value;

		if (message.trim() !== "") {
			const commentDiv = document.getElementById("comment");
			const newComment = document.createElement("p");
			newComment.textContent = message;
			commentDiv.appendChild(newComment);
			document.getElementById("msg").value = "";
		} else {
			alert("Veuillez entrer un commentaire avant de valider.");
		}
	});
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

// Écouteur d'événement pour le bouton de validation de don
// document
// 	.getElementById("validate-donation")
// 	.addEventListener("click", (event) => {
// 		event.preventDefault(); // Empêche le comportement par défaut du formulaire

// 		const selectedQuartier = document.getElementById("quartier").value;
// 		const date = document.getElementById("date").value;
// 		const time = document.getElementById("time").value;
// 		const message = document.getElementById("msg").value;

// 		if (!selectedQuartier) {
// 			alert("Veuillez sélectionner un quartier !");
// 			return;
// 		}

// 		if (!date) {
// 			alert("Veuillez sélectionner une date !");
// 			return;
// 		}

// 		const donationConfirmation = document.getElementById(
// 			"donationConfirmation",
// 		);

// 		// Récupération des éléments sélectionnés
// 		var divIds = [
// 			"vegetable-list",
// 			"fruit-list",
// 			"fresh-list",
// 			"milk-list",
// 			"keep-list",
// 			"condiment-list",
// 		];
// 		var displayId = "selected-items"; // ID où les éléments sélectionnés sont affichés

// 		displaySelectedItemsFromMultipleDivs(divIds, displayId); // Récupérer les éléments sélectionnés

// 		// Ajouter les éléments sélectionnés à la confirmation de don
// 		const selectedItemsList = displayDiv.innerHTML; // Récupérer la liste affichée
// 		donationConfirmation.innerHTML = `
//       <h3>Merci pour votre don !</h3>
//       <p>Je donne dans le quartier de ${selectedQuartier} le ${date} à ${time ? time : "Heure non spécifiée"}</p>
//       <p>Commentaire : ${message.trim() !== "" ? message : "Aucun commentaire fourni."}</p>
//       <p>Éléments sélectionnés : ${selectedItemsList}</p> <!-- Ajout des éléments sélectionnés -->
//     `;

// 		// Réinitialiser le formulaire
// 		document.getElementById("quartier").value = "#";
// 		document.getElementById("date").value = "";
// 		document.getElementById("time").value = "";
// 		document.getElementById("msg").value = "";
// 	});
// Récupérer les dons existants ou initialiser un tableau vide
document
	.getElementById("validate-donation")
	.addEventListener("click", (event) => {
		event.preventDefault(); // Empêche le comportement par défaut du formulaire

		const selectedQuartier = document.getElementById("quartier").value;
		const date = document.getElementById("date").value;
		const time = document.getElementById("time").value;
		const message = document.getElementById("msg").value;

		if (!selectedQuartier) {
			alert("Veuillez sélectionner un quartier !");
			return;
		}

		if (!date) {
			alert("Veuillez sélectionner une date !");
			return;
		}

		const donationConfirmation = document.getElementById(
			"donationConfirmation",
		);

		// Récupération des éléments sélectionnés
		var divIds = [
			"vegetable-list",
			"fruit-list",
			"fresh-list",
			"milk-list",
			"keep-list",
			"condiment-list",
		];
		var displayId = "selected-items"; // ID où les éléments sélectionnés sont affichés

		// Récupérer les éléments sélectionnés
		const selectedItems = displaySelectedItemsFromMultipleDivs(
			divIds,
			displayId,
		);

		// Créer un objet pour le don actuel
		const currentDonation = {
			quartier: selectedQuartier,
			date: date,
			time: time,
			message: message,
			selectedItems: selectedItems, // Assurez-vous que cela retourne une chaîne ou un tableau
		};

		// Récupérer les dons existants ou initialiser un tableau vide
		const existingDonations =
			JSON.parse(localStorage.getItem("donations")) || [];

		// Ajouter le don actuel au tableau des dons existants
		existingDonations.push(currentDonation);

		// Sauvegarder le tableau mis à jour dans localStorage
		localStorage.setItem("donations", JSON.stringify(existingDonations));

		// Afficher la confirmation de don
		donationConfirmation.innerHTML = `
	  <h3>Merci pour votre don !</h3>
	  <p>Je donne dans le quartier de ${selectedQuartier} le ${date} à ${time ? time : "Heure non spécifiée"}</p>
	  <p>Commentaire : ${message.trim() !== "" ? message : "Aucun commentaire fourni."}</p>
	  <p>Éléments sélectionnés : ${selectedItems}</p>
	`;

		// Réinitialiser le formulaire
		document.getElementById("quartier").value = "#";
		document.getElementById("date").value = "";
		document.getElementById("time").value = "";
		document.getElementById("msg").value = "";
	});

document
	.getElementById("validate-donation")
	.addEventListener("click", (event) => {
		event.preventDefault();

		// Collecter les données du formulaire
		const selectedQuartier = document.getElementById("quartier").value;
		const date = document.getElementById("date").value;
		const time = document.getElementById("time").value;
		const message = document.getElementById("msg").value;

		// Vérification des champs requis
		if (!selectedQuartier || !date) {
			alert("Veuillez remplir tous les champs requis !");
			return;
		}

		// Créer un objet pour le don
		const donationData = {
			quartier: selectedQuartier,
			date: date,
			time: time,
			message: message,
			selectedItems: displayDiv.innerHTML, // Assurez-vous que displayDiv est bien défini
		};

		// Récupérer les données existantes du localStorage
		const existingDonations =
			JSON.parse(localStorage.getItem("donations")) || [];
		existingDonations.push(donationData);

		// Sauvegarder les données mises à jour dans le localStorage
		localStorage.setItem("donations", JSON.stringify(existingDonations));
		console.log("Dons enregistrés :", existingDonations); // Ajoutez ce log pour vérifier
	});

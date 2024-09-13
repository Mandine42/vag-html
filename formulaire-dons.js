document.addEventListener("DOMContentLoaded", () => {
	// Gestion de l'affichage des options supplémentaires
	const toggleDropdowns = document.querySelectorAll(".toggle-dropdown");
	toggleDropdowns.forEach((toggle) => {
		toggle.addEventListener("change", function () {
			const target = document.getElementById(this.dataset.target);
			if (this.checked) {
				target.style.display = "block";
			} else {
				target.style.display = "none";
			}
		});
	});

	// Affichage de la date de péremption si la case est cochée
	const dateCheckboxes = document.querySelectorAll(".date-peremption");
	dateCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener("change", function () {
			const dateInput = document.getElementById(
				this.id.replace("Checkbox", ""),
			);
			dateInput.style.display = this.checked ? "block" : "none";
		});
	});
});

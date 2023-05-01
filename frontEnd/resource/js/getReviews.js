//console.log("getReviews.js loaded");

const getAllReviewsPath = './backEnd/controller/formController.php';

/**
 * Get all reviews from the API
 */

// Retrieve the array of reviews from the API
fetch(getAllReviewsPath)
    .then(response => response.json())
    .then(data => {
        // Display the array of reviews in the HTML
        const container = document.getElementById("container");
        afficherAvis(container, data);

        // Sort the reviews by descending note on click on the "Trier par date" button
        const triDateBtn = document.getElementById("tri-date");
        triDateBtn.addEventListener("click", () => {
            const avisTries = trierAvisParDate(data);
            container.innerHTML = "";
            afficherAvis(container, avisTries);
        });

        // Sort the reviews by descending note on click on the "Trier par note" button
        const triNoteBtn = document.getElementById("tri-note");
        triNoteBtn.addEventListener("click", () => {
            const noteSelectionnee = document.getElementById("select-note").value;
            const avisFiltres = filtrerAvisParNote(data, noteSelectionnee);
            const avisTries = trierAvisParNoteDecroissante(avisFiltres);
            container.innerHTML = "";
            afficherAvis(container, avisTries);
        });


        // Filter the reviews by note on change of selection in the dropdown list
        const selectNote = document.getElementById("select-note");
        selectNote.addEventListener("change", () => {
            const noteSelectionnee = selectNote.value;
            const avisFiltres = filtrerAvisParNote(data, noteSelectionnee);
            container.innerHTML = "";
            afficherAvis(container, avisFiltres);
        });


    });

/**
 * Display reviews in the HTML
 * @param container
 * @param avis
 */

// Function to display reviews in the HTML
function afficherAvis(container, avis) {
    avis.forEach(avis => {
        // Create a p element for the email, pseudo, note, comment and date
        const div = document.createElement("div");
        div.className = "avis";

        const pEmail = document.createElement("p");
        pEmail.textContent = "Email : " + avis.email;

        const pPseudo = document.createElement("p");
        pPseudo.textContent = "Pseudo : " + avis.pseudo;

        const pNote = document.createElement("p");
        pNote.textContent = "Note : " + avis.note;

        const pCommentaire = document.createElement("p");
        pCommentaire.textContent = "Commentaire : " + avis.commentaire;

        const pDate = document.createElement("p");
        pDate.textContent = "Date : " + new Date(avis.timestamp).toLocaleString();

        // Add the p elements to the div
        div.appendChild(pEmail);
        div.appendChild(pPseudo);
        div.appendChild(pNote);
        div.appendChild(pCommentaire);
        div.appendChild(pDate);

        // Add the div to the container
        container.appendChild(div);
    });
}

/**
 * Sort reviews by date
 * @param avis
 * @returns {*}
 */
// Function to sort reviews by date
function trierAvisParDate(avis) {
    return avis.sort((a, b) => b.timestamp - a.timestamp);
}

/**
 * Filter reviews by note
 * @param avis
 * @param note
 * @returns {*}
 */
// Function to filter reviews by note
function filtrerAvisParNote(avis, note) {
    if (!note) {
        return avis;
    }
    return avis.filter(avis => avis.note == note);
}

/**
 * Sort reviews by descending note
 * @param data
 * @returns {*}
 */
// Function to sort reviews by descending note
function trierAvisParNoteDecroissante(data) {
    // Utiliser la méthode sort() pour trier les avis par note décroissante
    const avisTries = data.sort((a, b) => b.note - a.note);
    return avisTries;
}


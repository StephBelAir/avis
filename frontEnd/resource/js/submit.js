// console.log("submit.js loaded");

// Select the form
const form = document.querySelector('form[name="form"]');

// Select the required fields
const emailInput = document.querySelector('#email');
const pseudoInput = document.querySelector('#pseudo');
const noteInput = document.querySelector('#note');
const commentaireInput = document.querySelector('#commentaire');

// Select the submit button
const submitButton = document.querySelector('input[type="submit"]');

// Disable the submit button on page load
submitButton.disabled = true;

// Add an event listener on each required field
emailInput.addEventListener('input', checkFields);
pseudoInput.addEventListener('input', checkFields);
noteInput.addEventListener('input', checkFields);
commentaireInput.addEventListener('input', checkFields);

/**
 * Check if all required fields are filled
 * If so, enable the submit button
 * If not, disable the submit button
 * @return {void}
 *
 */

function checkFields() {
    // Check if all fields are filled
    if (emailInput.value.trim() !== '' && pseudoInput.value.trim() !== '' && noteInput.value.trim() !== '' && commentaireInput.value.trim() !== '') {
    // Enable the submit button
        submitButton.disabled = false;
    } else {
    // Disable the submit button
        submitButton.disabled = true;
    }
}

// Add an event listener on form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche l'envoi normal du formulaire

    // Get form data
    const formData = new FormData(form);

    // Convert data to JSON object
    const review = {};
    review['timestamp'] = new Date().getTime(); // Ajout de la propriété timestamp
    formData.forEach((value, key) => { review[key] = value });
    const jsonReview = JSON.stringify(review);

    // Send data using Fetch
    fetch('http://localhost/avis/backEnd/controller/formController.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonReview
    })
        .then(response => {
            if (response.ok) {
                // Show success message
                // console.log("jsonReview")
                // console.log(jsonReview)
                alert('Votre avis a été publié avec succès !');
                // Reset the form
                form.reset();
                // Reload the page
                location.reload();
            } else {
                // Show error message
                alert('Une erreur est survenue. Veuillez réessayer plus tard.');
            }
        })
        .catch(error => {
            // Show error message
            // console.log(jsonReview)
            alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        });
});

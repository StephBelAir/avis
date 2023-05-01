console.log("getReviews.js loaded");

const getAllReviewsPath = 'http://localhost/avis/backEnd/controller/formController.php';

// Récupérer le tableau des avis depuis l'API
fetch (getAllReviewsPath)
    .then (response => response.json ())
    .then (data => {
        // Convertir les chaînes de date en objets Date
        const avis = data.map(avis => {
            return {...avis, date: new Date(avis.timestamp)};
        });

        // Trier le tableau par date ou par note selon le choix de l'utilisateur
        // Par défaut, on trie par date
        let critere = "date";
        avis.sort(function (a, b) {
            return a[critere] - b[critere];
        });

        // Afficher le tableau des avis dans le HTML
        const container = document.getElementById("container");
        avis.forEach(avis => {
            // Créer un élément div pour chaque avis
            const div = document.createElement("div");
            div.className = "avis";

            // Créer un élément p pour l'email
            const pEmail = document.createElement("p");
            pEmail.textContent = "Email : " + avis.email;

            // Créer un élément p pour le pseudo
            const pPseudo = document.createElement("p");
            pPseudo.textContent = "Pseudo : " + avis.pseudo;

            // Créer un élément p pour la note
            const pNote = document.createElement("p");
            pNote.textContent = "Note : " + avis.note;

            // Créer un élément p pour le commentaire
            const pCommentaire = document.createElement("p");
            pCommentaire.textContent = "Commentaire : " + avis.commentaire;

            // Créer un élément p pour la date
            const pDate = document.createElement("p");
            pDate.textContent = "Date : " + avis.date.toLocaleString();

            // Ajouter les éléments p au div
            div.appendChild(pEmail);
            div.appendChild(pPseudo);
            div.appendChild(pNote);
            div.appendChild(pCommentaire);
            div.appendChild(pDate);

            // Ajouter le div au container
            container.appendChild(div);
        });

        // Récupérer les boutons de tri
        const triDate = document.getElementById("tri-date");
        const triNote = document.getElementById("tri-note");

        // Ajouter des écouteurs d'événements aux boutons de tri
        triDate.addEventListener("click", function () {
            // Changer le critère de tri à date
            critere = "date";
            // Trier le tableau par date en ordre croissant
            avis.sort(function (a, b) {
                return a.date - b.date;
            });
            // Vider le container
            container.innerHTML = "";
            // Afficher le tableau trié dans le HTML
            avis.forEach(avis => {
                // Créer un élément div pour chaque avis
                const div = document.createElement("div");
                div.className = "avis";

                // Créer un élément p pour l'email
                const pEmail = document.createElement("p");
                pEmail.textContent = "Email : " + avis.email;

                // Créer un élément p pour le pseudo
                const pPseudo = document.createElement("p");
                pPseudo.textContent = "Pseudo : " + avis.pseudo;

                // Créer un élément p pour la note
                const pNote = document.createElement("p");
                pNote.textContent = "Note : " + avis.note;

                // Créer un élément p pour le commentaire
                const pCommentaire = document.createElement("p");
                pCommentaire.textContent = "Commentaire : " + avis.commentaire;

                // Créer un élément p pour la date
                const pDate = document.createElement("p");
                pDate.textContent = "Date : " + avis.date.toLocaleString();

                // Ajouter les éléments p au div
                div.appendChild(pEmail);
                div.appendChild(pPseudo);
                div.appendChild(pNote);
                div.appendChild(pCommentaire);
                div.appendChild(pDate);

                // Ajouter le div au container
                container.appendChild(div);
            });
        });
    })
    .catch (error => console.error (error));


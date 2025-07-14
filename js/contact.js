// js/contact.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const formMessages = document.getElementById('form-messages');
    const prenomInput = document.getElementById('prenom');
    const nomInput = document.getElementById('nom');
    const sujetInput = document.getElementById('sujet');
    const messageInput = document.getElementById('message');

    // Fonction pour afficher un message
    function displayMessage(type, message) {
        formMessages.textContent = message;
        formMessages.className = 'form-messages ' + type; // Ajoute la classe pour le style (succès/erreur)
        formMessages.style.display = 'block'; // S'assure que le message est visible

        // Cache le message après 5 secondes
        setTimeout(() => {
            formMessages.style.display = 'none';
            formMessages.textContent = '';
            formMessages.className = 'form-messages';
        }, 5000);
    }

    // Fonction de validation du formulaire
    form.addEventListener('submit', function(event) {
        // Empêche la soumission par défaut du formulaire (qui rechargerait la page)
        event.preventDefault();

        // Réinitialise les messages précédents
        formMessages.style.display = 'none';
        formMessages.textContent = '';
        formMessages.className = 'form-messages';

        let isValid = true;
        let errorMessage = '';

        // Validation des champs obligatoires
        if (prenomInput.value.trim() === '') {
            isValid = false;
            errorMessage += 'Le prénom est requis. ';
        }
        if (nomInput.value.trim() === '') {
            isValid = false;
            errorMessage += 'Le nom est requis. ';
        }
        if (sujetInput.value.trim() === '') {
            isValid = false;
            errorMessage += 'Le sujet est requis. ';
        }
        if (messageInput.value.trim() === '') {
            isValid = false;
            errorMessage += 'Le message est requis. ';
        }

        if (!isValid) {
            displayMessage('error', errorMessage);
            return; // Arrête la fonction si la validation échoue
        }

        // Si tout est valide, vous pouvez ici simuler une soumission ou appeler un service
        displayMessage('success', 'Votre message a été envoyé avec succès !');

        // Vous pouvez vider le formulaire après la soumission réussie
        form.reset();

        // *** IMPORTANT ***
        // Pour une vraie soumission, vous devrez remplacer le "displayMessage" et "form.reset()"
        // par une requête asynchrone (Fetch API) vers un service comme Formspree.io
        // ou votre propre backend. Par exemple :
        /*
        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                displayMessage('success', 'Votre message a été envoyé avec succès !');
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        displayMessage('error', data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        displayMessage('error', 'Oups ! Une erreur est survenue lors de l\'envoi du message.');
                    }
                })
            }
        })
        .catch(error => {
            displayMessage('error', 'Oups ! Une erreur réseau est survenue. Veuillez réessayer.');
        });
        */
    });
});
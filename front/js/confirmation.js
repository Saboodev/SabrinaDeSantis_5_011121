// Création des variables params et id qui vont extraire l'id de l'URL
const params = new URL(window.location.href).searchParams;
const id = params.get("id");

// On injecte le numéro de commande dans le DOM
const orderId = document.getElementById('orderId');
orderId.innerHTML = id;

// On vide le localStorage à l'issue
localStorage.clear();
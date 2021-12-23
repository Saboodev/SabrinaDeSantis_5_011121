// Création des variables param et id qui recherchent l'id dans un lien
let param = new URL(location.href).searchParams;
let id = param.get("id");

// On crée les variables des différentes données à traiter
let productImg = document.createElement("img");
document.querySelector(".item__img").appendChild(productImg);
let productTitle = document.querySelector("#title");
let productDescription = document.querySelector("#description");
let productPrice = document.querySelector("#price");
let productSelect = document.querySelector("#colors");

// On joue les fonctions qui sont détaillées ensuite
getProduct();

// On appelle l'id de la page
function getProduct() {
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(function (response) {
            return response.json();
        })
        .catch(function (err) { 
        let productLocation = document.querySelector(".item");
        productLocation.innerHTML = "Nous ne parvenons pas à afficher votre produit";
        })

        // Organiser les données des produits
        .then(function (apiResponse) {
            let canape = apiResponse;
            // console.log(canape);
            productImg.src = canape.imageUrl;
            productTitle.innerHTML = canape.name;
            productPrice.innerHTML = canape.price;
            productDescription.innerHTML = canape.description;

            let choiceColor = canape.colors;
            for (let i = 0; i < choiceColor.length; i++) {
                let option = choiceColor[i];
                productColor = document.createElement("option");
                productColor.textContent = option;
                productColor.value = option;
                productSelect.appendChild(productColor);
            }
        })
        .catch((err) => console.log('Erreur : ' +err));
};

// *************** Gestion du localStorage *************

add ();

// Création fonction d'ajout de produit
function add() {
    let addToCart = document.querySelector("#addToCart");

    // Création d'une confirmation quand produit ajouté au panier
    function confirmation() {
        if (window.confirm(`Votre produit a bien été ajouté au panier
Consulter le panier OK ou Poursuivre vos achats Annuler`)) {
            window.location.href = "cart.html";
        }
    }

    // Ecouter le bouton d'envoi et envoyer le panier
    addToCart.addEventListener("click", (e) => {
        e.preventDefault();
        let productQuantity = document.querySelector("#itemQuantity");
        productQuantity ++;

        // On récupère les valeurs, si quantité > 0
        if (productQuantity > 0 && productQuantity < 100) {
            let cart = {
                color: (document.querySelector("#colors").selectedOptions[0].value),
                quantity: parseFloat(document.querySelector("#quantity").value),
                _id: id,
            };
            addToCart.innerText = `Ajouté !`;
            let addProduct = JSON.parse(localStorage.getItem("purchase"));

            // Si produit déjà enregistré dans le LS, on ajoute le produit 
            if (localStorage.getItem("purchase") != null) {
                addProduct.push(cart);
                localStorage.setItem("purchase", JSON.stringify(addProduct));
                confirmation();  

            // Si pas de produit dans localStorage, on le crée          
            }else {  
                addProduct = [];
                addProduct.push(cart);
                localStorage.setItem("purchase", JSON.stringify(addProduct));
                confirmation ();
            }     
        }
    })
}
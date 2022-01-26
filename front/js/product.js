// Création des variables param et id qui recherchent l'id dans un lien
let params = new URL(location.href).searchParams;
let id = params.get("id");

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
async function getProduct() {
    await fetch(`http://localhost:3000/api/products/${id}`)
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
            productImg.src = canape.imageUrl;
            productImg.alt = "Photographie d'un canapé";
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
    

    // *************** Gestion du localStorage *************    
    add ();

    // Création fonction d'ajout de produit
    function add() {
        let addToCart = document.querySelector("#addToCart");

        // Ecouter le bouton d'envoi et envoyer le panier
        addToCart.addEventListener("click", (e) => {
            e.preventDefault();
            let colorOption = (document.querySelector("#colors").selectedOptions[0].value);
            let productQuantity = parseInt(document.querySelector("#quantity").value, 10); 

            // On récupère les valeurs, si quantité > 0
            if (productQuantity > 0 && productQuantity < 100) {
                let product = {
                    color: colorOption,
                    quantity: parseInt(productQuantity, 10),
                    _id: id,
                    name: canape.name,
                    price: canape.price,
                    img: canape.imageUrl,
                };
                addToCart.innerText = `Ajouté !`;
                setTimeout(function (){
                    addToCart.innerText = "Ajouter au panier";
                }, 4000);
                let cart = JSON.parse(localStorage.getItem("purchase"));
                // si le panier est null on a un tableau vide
                if (cart == null){
                    cart = [];
                }
   
                let foundElement = null; 
                // On crée une boucle forEach dans le panier pour chercher dans chaque élément 
                cart.forEach(element => {
                    // on crée une condition si on a le même id et même couleur que les éléments du panier
                    if (id == element._id && colorOption == element.color) {
                        // on stocke l'élément dans la variable foundElement
                        foundElement = element;
                    }
                });
                // si foundElement trouvé on ajoute la nouvelle quantité à l'ancienne
                if (foundElement != null) {
                    foundElement.quantity = foundElement.quantity + productQuantity;
                }else { 
                    // sinon on push le panier dans le LS
                    cart.push(product);
                }
                // on envoie les éléments du panier dans le LS
                localStorage.setItem("purchase", JSON.stringify(cart));
            }       
        })
    }
})
.catch((err) => console.log('Erreur : ' +err));
};

// Création de boutons de navigation

let navigateContainer = document.createElement("div");
document.querySelector(".item__content").appendChild(navigateContainer);
navigateContainer.classList.add("navigate__container");
navigateContainer.style.display = "flex";
navigateContainer.style.justifyContent = "space-around";
navigateContainer.style.margin = "1rem";

let returnIndex = document.createElement("a");
navigateContainer.appendChild(returnIndex);
returnIndex.href = "index.html";
returnIndex.innerText = `Retour aux produits`;
returnIndex.classList.add("return__link");
returnIndex.style.textDecoration = "none";
returnIndex.style.color = "white";

let returnCart = document.createElement("a");
navigateContainer.appendChild(returnCart);
returnCart.href = "cart.html";
returnCart.innerText = `Aller au panier`; 
returnCart.classList.add("return__link");
returnCart.style.textDecoration = "none";
returnCart.style.color = "white";


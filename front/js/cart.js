let panier = JSON.parse(localStorage.getItem("purchase"));
displayCart ();

async function getProductPrice(id) {
    return fetch(`http://localhost:3000/api/products/${id}`)
        .then(function (response) {
            return response.json();
        })
        .catch(function (err) { 
        let productLocation = document.querySelector("cartDescriptionPrice");
        productLocation.innerHTML = "Nous ne parvenons pas à afficher le prix de votre produit";
        })
        // retourner le prix du canapé
        .then(function (apiResponse) {
            let canape = apiResponse;
            return canape.price;
    });
}


function displayCart () {
    this.addedCart= [];
    // Si le LS contient un produit
    if (localStorage.getItem("purchase")) {
        for (let product in panier) {
        // Création des éléments constituant le panier
        let cart__item = document.createElement("article");
        document.querySelector("#cart__items").appendChild(cart__item);
        cart__item.classList.add("cart__item");
                    
        let cartImg = document.createElement("div");
        cart__item.appendChild(cartImg);
        cartImg.classList.add("cart__item__img");

        let productImg = document.createElement("img");
        cartImg.appendChild(productImg);
        productImg.src = panier[product].img;
        productImg.alt = "Photographie d'un canapé";

        let cartItemContent = document.createElement("div");
        document.querySelector("#cart__items").appendChild(cartItemContent);
        cartItemContent.classList.add("cart__item__content");

        let cartDescription = document.createElement("div");
        cartItemContent.appendChild(cartDescription);
        cartDescription.classList.add("cart__item__content__description");

        let cartDescriptionTitle = document.createElement("h2");
        cartDescription.appendChild(cartDescriptionTitle);
        cartDescriptionTitle.innerHTML = panier[product].name;
        
        let cartDescriptionColor = document.createElement("p");
        cartDescription.appendChild(cartDescriptionColor);
        cartDescriptionColor.innerHTML = panier[product].color;

        let cartDescriptionPrice = document.createElement("p");
        cartDescription.appendChild(cartDescriptionPrice);
        let price = getProductPrice(panier[product]._id)
        .then((apiResponse)=> 
        {
            cartDescriptionPrice.innerHTML = apiResponse + '€';

            let cartSettings = document.createElement("div");
            cartItemContent.appendChild(cartSettings);
            cartSettings.classList.add("cart__item__content__settings");

            let cartSettingsQuantity = document.createElement("div");
            cartSettings.appendChild(cartSettingsQuantity);
            cartSettingsQuantity.classList.add("cart__item__content__settings__quantity");

            let cartQuantity = document.createElement("p");
            cartSettingsQuantity.appendChild(cartQuantity);
            cartQuantity.innerHTML = `Qté :`;
            
            let cartInput = document.createElement("input");
            cartInput.type = "number";
            cartInput.name = "itemQuantity";
            cartInput.min = "1";
            cartInput.max = "100";
            cartInput.dataset.idElement = panier[product]._id;
            cartInput.dataset.color = panier[product].color;
            cartSettingsQuantity.appendChild(cartInput);
            cartInput.classList.add("itemQuantity");
            cartInput.value = panier[product].quantity;

            let cartDelete = document.createElement("div");
            cartSettings.appendChild(cartDelete);
            cartDelete.classList.add("cart__item__content__settings__delete");

            let cartDeleteItem = document.createElement("p");
            cartDelete.appendChild(cartDeleteItem);
            cartDeleteItem.dataset.idElement = panier[product]._id;
            cartDeleteItem.dataset.color = panier[product].color;
            cartDeleteItem.classList.add("deleteItem");
            cartDeleteItem.innerText = `Supprimer`;
            
            // Gestion des quantités à afficher
            let totalQuantity = document.querySelector("#totalQuantity");
            let totalPrice = document.querySelector("#totalPrice");
            let quantity = parseInt(cartInput.value, 10);

            // On créé les écouteurs une fois
            if (panier) {               
                let itemQuantity = document.querySelectorAll(".itemQuantity");
                    itemQuantity.forEach(element => {  
                        element.addEventListener('change', function (changeInput) 
                        {
                            id = element.dataset.idElement;
                            color = element.dataset.color;
                            quantity = parseInt(element.value, 10);
                            // Creer la même boucle que la maj de l'ajout au panier
                            let foundElement = []; 
                            // On crée une boucle forEach dans le panier pour chercher dans chaque élément 
                            panier.forEach(element => {
                                // on crée une condition si on a le même id et même couleur que les éléments du panier
                                if (id == element._id && color == element.color) {
                                    // on stocke l'élément dans la variable foundElement
                                    foundElement = element;
                                }
                            });
                            // si foundElement trouvé on ajoute la nouvelle quantité à l'ancienne
                            if (foundElement != null) {
                                foundElement.quantity = quantity;
                                console.log(foundElement);
                            }else { 
                                // sinon on push le panier dans le LS
                                panier.push(product);
                                console.log(panier);
                            }
                            // on envoie les éléments du panier dans le LS
                            localStorage.setItem("purchase", JSON.stringify(panier));
                            totalQuantity.innerText = foundElement.quantity;
                            maj_total();
                        })  
                    })

                    let deleteBtn = document.querySelectorAll(".deleteItem");
                    deleteBtn.forEach(element =>{
                        element.addEventListener('click', function (e) {
                            e.preventDefault();
                            let supId = panier[product]._id;
                            let supColor = panier[product].color;
                            panier = panier.filter(p => p._id !== supId || p.color !== supColor);
                            console.log(panier);
                            localStorage.setItem('purchase', JSON.stringify(panier));
                            location.reload();
                        })   
                    })
            }
            maj_total(); // une fois les écouteurs créés, on calcule une première fois le total

            /** FONCTION QUI SERT A METTRE A JOUR LE TOTAL */
            // on l'appelle à chaque modification dans un écouteur
            function maj_total ()
            {
                if (panier) 
                {               
                    // Gestion des qtés et du prix total
                    let priceTotal = 0;
                    let quantityTotal = 0;
                    panier.forEach(element => {
                        quantityTotal += element.quantity;
                        let price = getProductPrice(element._id) // on va rechercher le prix dans l'API
                        .then((apiResponse)=> 
                        {
                            priceTotal += apiResponse * element.quantity;
                            //console.log(priceTotal);
                            totalQuantity.innerText = quantityTotal;
                            totalPrice.innerText = priceTotal; 
                        }
                        );
                    })  
                        
                }
            }  
        });
    }    

    let clearCart = document.createElement("a");
        document.querySelector(".cart__price").appendChild(clearCart);
        clearCart.classList.add("deleteAll");
        clearCart.innerText = "Vider le panier";
        clearCart.style.textDecoration = "none";
        clearCart.style.display = "block";
        clearCart.style.cursor = "pointer";
        clearCart.style.textAlign = "center";
        clearCart.style.color = "white";
        document.querySelector(".deleteAll").addEventListener("click", function(){
            localStorage.clear();
            location.reload ();
        })
}

if(panier == null) {
    let cartNull = document.createElement("p");
    document.querySelector("#cart__items").appendChild(cartNull);
    cartNull.innerText = `Votre panier est vide`;
}

// ********** Traitement des données formulaire

let form = document.querySelector(".cart__order__form");

// ****** Ecoute de la modification des input formulaire
form.firstName.addEventListener('change', function (){
    validText(this);
});

form.lastName.addEventListener('change', function (){
    validText(this);
});

form.address.addEventListener('change', function (){
    validAddress(this);
});

form.city.addEventListener('change', function (){
    validText(this);
});

form.email.addEventListener('change', function (){
    validEmail(this);
});

// RETOURNE VRAI SI C'EST VALIDE, FAUX SINON
const validText = function(inputText) {
    // RegExp pour la validation du prénom
    // La RegExp accepte minuscules, point, espace, accents, tiret entre 2 et 25 caractères toutes casses
    let textRegExp = new RegExp ('^[a-z.\'\s éêèàëÉÈÊË\-]{1,25}$', 'gi');
    // On récupère le p sous l'input
    let pMsg = inputText.nextElementSibling;
     // On définit un msg si false
 
    if(textRegExp.test(inputText.value) == false){
        if (pMsg != null) 
        {
        pMsg.innerHTML = "Données incorrectes";
        pMsg.style.color = "red";
        pMsg.style.fontWeight = "bold";
        }
        return false ; 
    } else {
        if (pMsg != null) 
        {
        pMsg.innerHTML = "*";
        pMsg.style.color = "green";
        pMsg.style.fontWeight = "bold";
        }
        return true ; 
    }
}

// RETOURNE VRAI SI C'EST VALIDE, FAUX SINON
const validAddress = function(inputAddress) {
    // RegExp pour la validation du mail
    let addressRegExp = new RegExp ('^[a-zA-ZéêèàëÉÈÊË0-9.,-\s ]{2,90}$', 'g');
    // On récupère le p sous l'input
    let pMsg = inputAddress.nextElementSibling;

    // On définit un msg si false
    if(addressRegExp.test(inputAddress.value) == false){
        if (pMsg != null) 
        {
            pMsg.innerHTML = "Données incorrectes";
            pMsg.style.color = "red";
            pMsg.style.fontWeight = "bold";
        }
        return false ; 
    } else {
        if (pMsg != null) 
        {
            pMsg.innerHTML = "*";
            pMsg.style.color = "green";
            pMsg.style.fontWeight = "bold"; 
        }
        return true ;
       
    }
};

// RETOURNE VRAI SI C'EST VALIDE, FAUX SINON
const validEmail = function(inputEmail) {
    // RegExp pour la validation du mail
    let emailRegExp = new RegExp ('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    // On récupère le p sous l'input
    let pMsg = inputEmail.nextElementSibling;

    // On définit un msg si false
    if(emailRegExp.test(inputEmail.value) == false){
        if (pMsg != null) 
        {
            pMsg.innerHTML = "Données incorrectes";
            pMsg.style.color = "red";
            pMsg.style.fontWeight = "bold";
        }
        return false ; 
    } else {
        if (pMsg != null) 
        {
            pMsg.innerHTML = "*";
            pMsg.style.color = "green";
            pMsg.style.fontWeight = "bold"; 
        }
        return true ;
    }
};

let submitBtn = document.querySelector(".cart__order__form__submit");

submitBtn.addEventListener("click", function(e){
    e.preventDefault(); 
    
    // CONDITIONS POUR VALIDER LA COMMANDE
    let form = document.querySelector(".cart__order__form");
    if(validText (form.firstName)  
    && validText (form.lastName)   
    && validAddress (address)      
    && validText (form.city)       
    && validEmail (email))
    {
        
        let result = true;
        let itemQuantity = document.querySelectorAll(".itemQuantity");
        itemQuantity.forEach(element => {
            if (element.value < 1 || element.value > 100) {
                result = false;
            }
        });
        console.log(result);
        if (result) {
        
            let contacts = {
                firstName : document.querySelector("#firstName").value,
                lastName : document.querySelector("#lastName").value,
                address : document.querySelector("#address").value,
                city : document.querySelector("#city").value,
                email : document.querySelector("#email").value,
            }
            console.log(contacts);
            let products = [];
            for (product of panier) {
                products.push(product._id);
            }
            console.log(products);
            let order = {
                contact: contacts,
                products: products,
            }
            const sendOrder = async function () {
                const options = {
                    method: "POST",
                    body: JSON.stringify(order),
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json"
                    },
                }
                fetch("http://localhost:3000/api/products/order", options)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    localStorage.clear();
                    localStorage.setItem("orderID", data.orderId);
                    window.location.href = 'confirmation.html?id='+ data.orderId;
                })
                .catch((err) => console.log('Erreur : ' +err));
            }
            sendOrder(order);
        }
}
})
}
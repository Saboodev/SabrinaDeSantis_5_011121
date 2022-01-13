let addProduct = JSON.parse(localStorage.getItem("purchase"));
// console.log(addProduct);
let cartOrder =`http://localhost:3000/api/products/order`;

addedCart ();

function addedCart () {
    this.addedCart= [];
    // Si le LS contient un produit
    if (localStorage.getItem("purchase")) {
        for (let product in addProduct) {
        let cart__item = document.createElement("article");
        document.querySelector("#cart__items").appendChild(cart__item);
        cart__item.classList.add("cart__item");
                    
        let cartImg = document.createElement("div");
        cart__item.appendChild(cartImg);
        cartImg.classList.add("cart__item__img");

        let productImg = document.createElement("img");
        cartImg.appendChild(productImg);
        productImg.src = addProduct[product].img;

        let cartItemContent = document.createElement("div");
        document.querySelector("#cart__items").appendChild(cartItemContent);
        cartItemContent.classList.add("cart__item__content");

        let cartDescription = document.createElement("div");
        cartItemContent.appendChild(cartDescription);
        cartDescription.classList.add("cart__item__content__description");

        let cartDescriptionTitle = document.createElement("h2");
        cartDescription.appendChild(cartDescriptionTitle);
        cartDescriptionTitle.innerHTML = addProduct[product].name;
        
        let cartDescriptionColor = document.createElement("p");
        cartDescription.appendChild(cartDescriptionColor);
        cartDescriptionColor.innerHTML = addProduct[product].color;

        let cartDescriptionPrice = document.createElement("p");
        cartDescription.appendChild(cartDescriptionPrice);
        cartDescriptionPrice.innerHTML = addProduct[product].price + '€';

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
        cartInput.dataset.idElement = addProduct[product]._id;
        cartInput.dataset.color = addProduct[product].color;
        cartSettingsQuantity.appendChild(cartInput);
        cartInput.classList.add("itemQuantity");
        cartInput.value = addProduct[product].quantity;

        let cartDelete = document.createElement("div");
        cartSettings.appendChild(cartDelete);
        cartDelete.classList.add("cart__item__content__settings__delete");

        let cartDeleteItem = document.createElement("p");
        cartDelete.appendChild(cartDeleteItem);
        cartDeleteItem.dataset.idElement = addProduct[product]._id;
        cartDeleteItem.dataset.color = addProduct[product].color;
        cartDeleteItem.classList.add("deleteItem");
        cartDeleteItem.innerText = `Supprimer`;
      
        let totalQuantity = document.querySelector("#totalQuantity");
        let totalPrice = document.querySelector("#totalPrice");
        let quantity = cartInput.value;
        console.log(quantity);
        const total = () => {
            let quantityTotal = 0;
            let priceTotal = 0;
            if (addProduct) {
                // cartInput.addEventListener('change', function (e) {
                //     e.preventdefault;
                //     console.log(cartInput.value)
                //     localStorage.getItem("purchase");
                //     addProduct.push(cartInput.value);
                //     console.log(addProduct);
                // })
                addProduct.forEach(element => {  
                    // // cartInput.addEventListener('change', function () {
                        // quantityTotal.remove(cartInput.value);
                    // //     quantity += this.value;
                    // //     quantity +=  element.quantity;
                    //     console.log(element.quantity);
                    // // })  
                    quantityTotal += element.quantity;
                    priceTotal += element.price * element.quantity;
                    totalQuantity.innerText = quantityTotal;
                    totalPrice.innerText = priceTotal;  
                })
            }
        }     
        total();
        };
    }
    let itemQuantity = document.querySelectorAll(".itemQuantity");
        itemQuantity.forEach(element => {  
            element.addEventListener('change', function () {
                id = element.dataset.idElement;
                color = element.dataset.color;
                quantity = element.value;
                // Creer la même boucle que la maj de l'ajout au panier
                console.log(id + " " + color);
            })  
        })

    let deleteBtn = document.querySelectorAll(".deleteItem");
        deleteBtn.forEach(element =>{
            element.addEventListener('click', function () {
                id = element.dataset.idElement;
                color = element.dataset.color;
                console.log(id + " " + color);
            })   
        })
}

if(addProduct == null) {
    let cartNull = document.createElement("p");
    document.querySelector("#cart__items").appendChild(cartNull);
    cartNull.innerText = `Votre panier est vide`;
}

// ********** Traitement des données formulaire

const contactOrder = {
    firstName : document.querySelector("#firstName").value,
    lastName : document.querySelector("#lastName").value,
    address : document.querySelector("#address").value,
    city : document.querySelector("#city").value,
    email : document.querySelector("#email").value,
}
console.log(contactOrder);

let form = document.querySelector(".cart__order__form");

// ****** Ecoute de la modification des input formulaire
form.firstName.addEventListener('change', function (){
    validFirstName(this);
});

form.lastName.addEventListener('change', function (){
    validLastName(this);
});

form.address.addEventListener('change', function (){
    validAddress(this);
});

form.city.addEventListener('change', function (){
    validCity(this);
});

form.email.addEventListener('change', function (){
    validEmail(this);
});

// *******validation des données du formulaire

const validFirstName = function(inputFirstName) {
    // RegExp pour la validation du prénom
    let firstNameRegExp = new RegExp ('^[a-zA-Z.-\s ]{2,25}$', 'g');
    // On récupère le p sous l'input
    let pMsg = inputFirstName.nextElementSibling;
     // On définit un msg si false
     if(firstNameRegExp.test(inputFirstName.value) == false){
        pMsg.innerHTML = "Données incorrectes";
        pMsg.style.color = "red";
        pMsg.style.fontWeight = "bold";
     } else {
        pMsg.innerHTML = "*";
        pMsg.style.color = "green";
        pMsg.style.fontWeight = "bold";
     }
}

const validLastName = function(inputLastName) {
    // RegExp pour la validation du nom
    let lastNameRegExp = new RegExp ('^[a-zA-Z.-\s ]{2,25}$', 'g');
    // On récupère le p sous l'input
    let pMsg = inputLastName.nextElementSibling;
     // On définit un msg si false
     if(lastNameRegExp.test(inputLastName.value) == false){
        pMsg.innerHTML = "Données incorrectes";
        pMsg.style.color = "red";
        pMsg.style.fontWeight = "bold";
     } else {
        pMsg.innerHTML = "*";
        pMsg.style.color = "green";
        pMsg.style.fontWeight = "bold";
     }
}

const validAddress = function(inputAddress) {
    // RegExp pour la validation de l'adresse
    let addressRegExp = new RegExp ('^[a-zA-Z0-9.-\s ]{2,90}$', 'g');
    // On récupère le p sous l'input
    let pMsg = inputAddress.nextElementSibling;
     // On définit un msg si false
     if(addressRegExp.test(inputAddress.value) == false){
        pMsg.innerHTML = "Données incorrectes";
        pMsg.style.color = "red";
        pMsg.style.fontWeight = "bold";
     } else {
        pMsg.innerHTML = "*";
        pMsg.style.color = "green";
        pMsg.style.fontWeight = "bold";
     }
}

const validCity = function(inputCity) {
    // RegExp pour la validation de la ville
    let cityRegExp = new RegExp ('^[a-zA-Z.-\s ]{2,25}$', 'g');
    // On récupère le p sous l'input
    let pMsg = inputCity.nextElementSibling;
     // On définit un msg si false
     if(cityRegExp.test(inputCity.value) == false){
        pMsg.innerHTML = "Données incorrectes";
        pMsg.style.color = "red";
        pMsg.style.fontWeight = "bold";
     } else {
        pMsg.innerHTML = "*";
        pMsg.style.color = "green";
        pMsg.style.fontWeight = "bold";
     }
}

const validEmail = function(inputEmail) {
    // RegExp pour la validation du mail
    let emailRegExp = new RegExp ('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    // On récupère le p sous l'input
    let pMsg = inputEmail.nextElementSibling;

    // On définit un msg si false
    if(emailRegExp.test(inputEmail.value) == false){
        pMsg.innerHTML = "Données incorrectes";
        pMsg.style.color = "red";
        pMsg.style.fontWeight = "bold";
    } else {
        pMsg.innerHTML = "*";
        pMsg.style.color = "green";
        pMsg.style.fontWeight = "bold"; 
    }
};

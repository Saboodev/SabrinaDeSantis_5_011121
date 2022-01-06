let addProduct = JSON.parse(localStorage.getItem("purchase"));
console.log(addProduct);
let cartOrder =`http://localhost:3000/api/products/order`;

addedCart ();

function addedCart () {
    // Si le LS contient un produit
    if (localStorage.getItem("purchase")) {
        let i= 0;
        for (let product in addProduct) {
        let cart__item = document.createElement("article");
        document.querySelector("#cart__items").appendChild(cart__item);
        cart__item.classList.add("cart__item");
                    
        let cartImg = document.createElement("div");
        cart__item.appendChild(cartImg);
        cartImg.classList.add("cart__item__img");

        let productImg = document.createElement("img");
        cartImg.appendChild(productImg);
        productImg.src = addProduct[product].imageUrl;

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
        cartDescriptionColor.innerHTML = addProduct[product].color.value;

        let cartDescriptionPrice = document.createElement("p");
        cartDescription.appendChild(cartDescriptionPrice);
        cartDescriptionPrice.innerHTML = addProduct[product].price;

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
        cartSettingsQuantity.appendChild(cartInput);
        cartInput.value = addProduct[product].quantity;

        let cartDelete = document.createElement("div");
        cartSettings.appendChild(cartDelete);
        cartDelete.classList.add("cart__item__content__settings__delete");

        let cartDeleteItem = document.createElement("p");
        cartDelete.appendChild(cartDeleteItem);
        cartDeleteItem.classList.add("cart__item__content__settings__delete");
        cartDeleteItem.innerText = `Supprimer`;
        };
    }
}

if(addProduct == null) {
    let cartNull = document.createElement("p");
    document.querySelector("#cart__items").appendChild(cartNull);
    cartNull.innerText = `Votre panier est vide`;
}

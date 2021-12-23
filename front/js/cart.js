let infoProducts = JSON.parse(localStorage.getItem("purchase"));

addedCart ();

function addedCart () {
    console.log("coucou");
    // Si le LS contient un produit
    if (localStorage.getItem("purchase")) {
        for (let product in infoProducts) {
        let cart__item = document.createElement("article");
        document.querySelector("#cart__items").appendChild(cart__item);
        cart__item.classList.add("cart__item");
                    
        let cartImg = document.createElement("div");
        cart__item.appendChild(cartImg);
        cartImg.classList.add("cart__item__img");

        let productImg = document.createElement("img");
        cart__item__img.appendChild(productImg);
        productImg.src = infoProducts[product].imageUrl;

        let cartItemContent = document.createElement("div");
        cart__items.appendChild(cartItemContent);
        cartItemContent.classList.add("cart__item__content");

        let cartDescription = document.createElement("div");
        cart__item__content.appendChild(cartDescription);
        cartDescription.classList.add("cart__item__content__description");

        let cartDescriptionTitle = document.createElement("h2");
        cart__item__content__description.appendChild(cartDescriptionTitle);
        cartDescriptionTitle.innerHTML = infoProducts[product].name;
        
        let cartDescriptionColor = document.createElement("p");
        cart__item__content__description.appendChild(cartDescriptionColor);
        cartDescriptionColor.innerHTML = infoProducts[product].colors;

        let cartDescriptionPrice = document.createElement("p");
        cart__item__content__description.appendChild(cartDescriptionPrice);
        cartDescriptionPrice.innerHTML = infoProducts[product].price;

        let cartSettings = document.createElement("div");
        cart__item__content.appendChild(cartSettings);
        cartSettings.classList.add("cart__item__content__settings");

        let cartSettingsQuantity = document.createElement("div");
        cart__item__content__settings.appendChild(cartSettingsQuantity);
        cartSettingsQuantity.classList.add("cart__item__content__settings__quantity");

        let cartQuantity = document.createElement("p");
        cart__item__content__settings__quantity.appendChild(cartQuantity);
        cartQuantity.innerHTML = `Qté : + infoProducts[product].quantity`;

        let cartDelete = document.createElement("div");
        cart__item__content__settings.appendChild(cartDelete);
        cartDelete.classList.add("cart__item__content__settings__delete");

        let cartDeleteItem = document.createElement("p");
        cart__item__content__settings__delete.appendChild(cartDeleteItem);
        cartDeleteItem.classList.add("cart__item__content__settings__delete");
        cartDeleteItem.innerText = `Supprimer`;
        };
    }
}

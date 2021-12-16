let param = new URL(location.href).searchParams;
let id = param.get("id");

// On crée les variables des différentes données à traiter
let productImg = document.createElement("img");
document.querySelector(".item__img").appendChild(productImg);
let productTitle = document.querySelector("#title");
let productDescription = document.querySelector("#description");
let productPrice = document.querySelector("#price");
let productSelect = document.querySelector("#colors");

getProduct();

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
            console.log(canape);
            productImg.src = canape.imageUrl;
            productTitle.innerHTML = canape.name;
            productPrice.innerHTML = canape.price;
            productDescription.innerHTML = canape.description;

            let choiceColor = canape.colors;
            for (let i = 0; i < choiceColor.length; i++) {
                let option = choiceColor[i];
                console.log(option);
                productColor = document.createElement("option");
                productColor.textContent = option;
                productColor.value = option;
                productSelect.appendChild(productColor);
            }  
        })
        .catch((err) => console.log('Erreur : ' +err));
        }
    
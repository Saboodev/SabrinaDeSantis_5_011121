let url = 'http://localhost:3000/api/products';

productsList();

// Récupérer les produits depuis l'API

async function productsList() {
    await fetch(url)
        .then(function (response) {
            return response.json();
        })
        .catch(function (err) { 
            let productLocation = document.querySelector(".items");
            productLocation.innerHTML = "Nous ne parvenons pas à afficher vos produits";
        })

        // Organiser les données des produits
        .then(function (apiResponse) {
            const canape = apiResponse;
            console.log(canape);
            for (let article in canape) {
                let productLink = document.createElement("a");
                document.querySelector(".items").appendChild(productLink);
                productLink.href = `product.html?id=${apiResponse[article]._id}`;
                productLink.classList.add("link");
            
                let articleContainer = document.createElement("article");
                productLink.appendChild(articleContainer);
                articleContainer.classList.add("container");
               
                let productImg = document.createElement("img");
                articleContainer.appendChild(productImg);
                productImg.src = apiResponse[article].imageUrl;
                productImg.alt = apiResponse[article].altTxt;

                let productTitle = document.createElement("h3");
                articleContainer.appendChild(productTitle);
                productTitle.classList.add("productName");
                productTitle.innerHTML = apiResponse[article].name;

                let productDescribe = document.createElement("p");
                articleContainer.appendChild(productDescribe);
                productDescribe.classList.add("productDescription");
                productDescribe.innerHTML = apiResponse[article].description;
            }
    });
}

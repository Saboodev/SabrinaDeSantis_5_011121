/**
 * Gère la page d'accueil 
 */

 fetch("http://localhost:3000/api/products")
    .then( data => data.json())
    .then( jsonListProduct => {
        for(let jsonProduct of jsonListProduct){
            let article = new article(jsonProduct);
            document.querySelector(".container").innerHTML +=
        };
 });

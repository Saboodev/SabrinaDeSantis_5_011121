    let canapeData = [];
    
    const fetchProduct = async () => {
        await fetch('http://localhost:3000/api/products')
        .then((res) => res.json())
        .then((promise) => {
            canapeData = promise
            console.log(canapeData);
        })

    };
        
    

    fetchProduct();

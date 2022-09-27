const form = document.querySelector('#productsForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(form);
    let obj = {};
    data.forEach((value,key) => obj[key]=value);
    fetch('api/sessions/products',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(result => result.json()).then(json => console.log(json))
})

// fetch("/api/products")
// .then(res => res.json() )
// .then(data => {
//     writeHTML(data)
// })

// function writeHTML(data) {
//     data.products.forEach(product => {
//         console.log(product.name);
//     })
// }
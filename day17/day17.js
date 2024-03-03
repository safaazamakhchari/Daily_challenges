const express = require('express');
const app = express();
const PORT = 3000;
let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];

app.get('/products', (req, res) => {
   res.send(products);
});



app.get('/products/search', (req, res) => {
    const { minPrice, maxPrice } = req.query;    
    let filteredProducts = products
    if (minPrice && maxPrice) {
        filteredProducts = filteredProducts.filter(product =>
            product.price >= parseFloat(minPrice) && product.price <= parseFloat(maxPrice)
        ); 
}
    if (filteredProducts.length>0){
        res.send(filteredProducts);
    }else{
        res.send('Not Found');
    }
});

app.post('/products' , (req,res,next)=>{
 const newProduct=getElementById(products,req.body.id);
 if(!newProduct){
    next({code:404,msg:'The Product is not found.'})
    }else{
        products.push(newProduct);
        res.statusCode=201;
        res.send(newProduct);
        }
});

app.put( '/products/:id', (req,res,next)=>{
const {id}=req.params;
let index=products.findIndex((p)=> p.id===parseInt(id));
if (!index){
    return next({code:404, msg:"This product does not exist."})
    }
    let updateProd={...products[index], ...req.body};
    delete updateProd.id;
    for(let key in updateProd){
        if(updateProd[key]==='')delete updateProd[key];
        }
    products[index]=updateProd;
    res.statusCode=200;
    res.send(updateProd);
    });

app.delete ('/products/:id',(req,res)=>{
    const id=req.params.id;
    const index = getItemIndex(products,id);
    if(index === -1)
    return res.sendStatus(404);  
else {
    products.splice(index,1);
    res.send(products[index]);}
    });

app.get('/products/:id', (req, res) => {
    res.send(getElementById(req.params.id, products));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});




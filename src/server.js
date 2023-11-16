import {ProductManager} from "./productManager.js";
import express from "express";

const app = express()
const PORT= 8080

app.use(express.urlencoded({extended:true}))

const productManager= new ProductManager("./src/Productos.json")
// console.log(productManager.getProducts());

app.get("/products", (req,res)=>{
    const products= productManager.getProducts()
    const limit= req.query.limit
    if(limit){
        res.json(products.slice(0,limit))
    }else{
        res.json(products)
    }
    
})

app.get("/products/:id", (req,res)=>{
    const product= productManager.getProductsById(Number(req.params.id))

    if(!product){
        console.log("Producto no encontrado");
      
        res.json({error: "Ha ocurrido un error"})
    }else{
        res.json(product)
    }   
})


app.listen(PORT,()=>{
    console.log("Server is listening on port" + PORT);
})
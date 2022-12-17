import express from "express"
import productManager from "./ProductManager.js"


const app = express()

app.get("/", (request, response) =>{
   response.send("<h1 style='color:pink;'>Bienvenid@ a Shanti</h1>") 
})

app.get("/producto/:id", async (request,response) =>{
    const {id} = request.params
    const products = await productManager.getProducts()
    const product = products.find (prod => prod.id === id)

    if(!product){
        return response.send("User Not Found")
    }

    response.json(product)

    })

app.get("*", (request,response)=>{
    response.send("error")
})

app.listen(8080, ()=>console.log("listening on port 8080"))

 
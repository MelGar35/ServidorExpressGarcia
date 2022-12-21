import express from "express"
import ProductManager from "./ProductManager.js"


const app = express()

app.use(express.urlencoded({extended:true}))


app.get("/", (request, response) =>{
   response.send("<h1 style='color:pink;'>Bienvenid@ a Shanti</h1>") 
})

app.get('/products',  (request,response) => {
    let limit = parseInt(request.query.limit)
   try {
    if (limit === 0 || !limit) {
       response.json(ProductManager.getProducts())
    } else {
       const arrayOriginal = ProductManager.getProducts()
      let arrayConLimite = arrayOriginal.slice(0,limit) 
      response.json(arrayConLimite)
    }
   } catch (error) {
     console.log("Error", error)
     response.send("Ha ocurrido un error")
   }
    
  })

app.get("/products/:pid", async (request,response) =>{
    const {id} = parseInt(request.params)
    const products = await ProductManager.getProducts(id)
    const product = products.find (prod => prod.id === id)

    if(!product){
        return response.send("Product Not Found")
    }

    response.json(product)

    })

app.get("*", (request,response)=>{
    response.send("Error, Not found")
})

app.listen(8080, ()=>console.log("listening on port 8080"))

 
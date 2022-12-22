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
    const pid = parseInt(request.params.pid)
    const result = await ProductManager.getProductById(pid)
    console.log(result)
    response.json(result || {"Error" : "Product Not Found"})
})

app.get("*", (request,response)=>{
    response.send("Error, Page not found")
})

app.listen(8080, ()=>console.log("listening on port 8080"))

 
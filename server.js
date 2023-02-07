import express from "express"
import handlebars from "express-handlebars"
import __dirname from "./dirname.js"
import productRoutes from "./src/routes/products.routes.js"
import cartRoutes from "./src/routes/carts.routes.js"
import viewRoutes from "./src/routes/views.routes.js"
import mongoose from "mongoose"
import Handlebars from "handlebars"
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import path from "path"

const app = express()

//Mongo Atlas
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://Meli:Melisa537@noeserver.c5gx1p7.mongodb.net/Shanti?retryWrites=true&w=majority', (error) => {
  if(error) {
    console.log('Error al conectar a Mongo Atlas', error);
  } else {
    console.log('Conectado a Mongo Atlas');
  }
})

//Handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
  
app.set('views', __dirname + '/src/views')
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '/src/public')));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
  

//Routes
app.use('/', viewRoutes) 
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)



//Port
app.listen(8080, ()=>console.log("listening on port 8080"))


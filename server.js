import express from "express"
import handlebars from "express-handlebars"
import __dirname from "./dirname.js"
import productRoutes from "./src/routes/products.routes.js"
import cartRoutes from "./src/routes/carts.routes.js"
import viewRoutes from "./src/routes/views.routes.js"
import mongoose from "mongoose"
import Handlebars from "handlebars"
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'

const app = express()

//MongoDB local
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/Shanti', (error) => {
  if(error) {
    console.log('Error al conectar a MongoDB', error);
  } else {
    console.log('Conectado a MongoDB');
  }
})

//Handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
  
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
  

//Routes
app.use('/', viewRoutes) 
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)



//Port
app.listen(8080, ()=>console.log("listening on port 8080"))


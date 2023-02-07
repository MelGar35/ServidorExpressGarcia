import {Router} from 'express'
import productsDao from "../daos/products.dao.js"
import cartDao from "../daos/cart.dao.js"

const router = Router()

router.get('/products', async (req, res) => {

  let limit = 3; 
  let query = req.query.query || null
  let sort = parseInt(req.query.sort)
  let page = parseInt(req.query.page)

  try {
    let result = await productsDao.getProducts(limit, JSON.parse(query), sort, page)
    res.render('products',{result})
  } catch (error) {
    res.json({ message: 'Ha ocurrido un error, verifique los datos ingresados' })
  }
})

router.get('/carts/:cid', async (req, res) => {

  const cid = (req.params.cid)
  try {
    let result = await cartDao.getCartById(cid)
    console.log(result.products)
    res.render('cart', {result})
  } catch (error) {
    res.json({ error })
  }
})


export default router;
import {Router} from 'express'
import productsDao from "../daos/products.dao.js"

const router = Router()

router.get('/', async (req,res) => {
  const products = await productsDao.getProducts();
  res.render('index', {title: "Home", products})
})

router.get('/edit/:id', async (req, res) => {
  const product = await productsDao.getProductById(req.params.id);
  res.render('edit', { title: "Edit", product });
})

export default router;
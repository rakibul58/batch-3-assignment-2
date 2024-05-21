import express from 'express'
import { ProductControllers } from './product.controller'

const router = express.Router()

router
  .route('/')
  .get(ProductControllers.getProducts)
  .post(ProductControllers.createProduct)
router
  .route('/:productId')
  .get(ProductControllers.getProductByProductId)
  .put(ProductControllers.updateProductByProductId)

export const ProductRoutes = router

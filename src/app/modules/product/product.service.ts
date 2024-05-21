import { TProduct } from './product.interface'
import { Product } from './product.model'

// creates a product on database
const createProductIntoDB = async (productData: TProduct) => {
  const product = new Product(productData)
  const result = await product.save()
  return result
}

// gets all products from database
const getProductsFromDB = async (filter: object) => {
  const result = await Product.find(filter)
  return result
}

// gets a product from database
const getProductByProductIdFromDB = async (productId: string) => {
  const result = await Product.findById(productId)
  return result
}

// exporting services
export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getProductByProductIdFromDB,
}

import { TProduct } from './product.interface'
import { Product } from './product.model'

// creates a product on database
const createProductIntoDB = async (productData: TProduct) => {
  const product = new Product(productData)
  const result = await product.save()
  return result
}

// exporting services
export const ProductServices = {
  createProductIntoDB,
}

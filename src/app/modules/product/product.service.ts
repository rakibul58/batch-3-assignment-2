import mongoose from 'mongoose'
import { TProduct } from './product.interface'
import { Product } from './product.model'
const { ObjectId } = mongoose.Types

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

// gets a product from database
const updateProductByProductIdInDB = async (
  productId: string,
  updateData: object,
) => {
  const updateResult = await Product.updateOne(
    { _id: new ObjectId(productId) },
    { $set: updateData },
    {
      runValidators: true,
    },
  )
  const updatedData = await Product.findById(productId)
  return { updateResult, updatedData }
}

// exporting services
export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getProductByProductIdFromDB,
  updateProductByProductIdInDB,
}

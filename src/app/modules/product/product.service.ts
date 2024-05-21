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
const getProductsFromDB = async (filter: object, matchTerm: string) => {
  const result = await Product.find({
    ...filter,
    // matches search term with the following field
    $or: [
      { name: { $regex: matchTerm, $options: 'i' } },
      { description: { $regex: matchTerm, $options: 'i' } },
      { category: { $regex: matchTerm, $options: 'i' } },
      { tags: { $regex: matchTerm, $options: 'i' } },
      { 'variants.type': { $regex: matchTerm, $options: 'i' } },
      { 'variants.value': { $regex: matchTerm, $options: 'i' } },
    ],
  })
  return result
}

// gets a product from database
const getProductByProductIdFromDB = async (productId: string) => {
  const result = await Product.findById(productId)
  return result
}

// updates a product from database
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

// deletes a product from db
const deleteProductByProductIdInDB = async (productId: string) => {
  const deleteResult = await Product.deleteOne({ _id: new ObjectId(productId) })
  const deletedData = await Product.findOne({ _id: new ObjectId(productId) })
  return { deleteResult, deletedData }
}

// exporting services
export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getProductByProductIdFromDB,
  updateProductByProductIdInDB,
  deleteProductByProductIdInDB,
}

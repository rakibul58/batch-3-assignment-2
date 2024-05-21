import { Product } from '../product/product.model'
import { TOrder } from './order.interface'
import { Order } from './order.model'

// creates an order in db
const createAnOrderInDB = async (orderData: TOrder) => {
  const { productId, quantity, price } = orderData
  const productData = await Product.findById(productId)
  let createResult = null
  let updateResult = null
  // checking if the product is in the product collection
  if (productData == null) {
    return {
      productData,
      createResult,
      updateResult,
      message: 'Product not found!',
    }
  }
  // checking if the product is in the product collection
  if (productData.price !== price) {
    return {
      productData,
      createResult,
      updateResult,
      message: 'Product price is not correct!',
    }
  }
  // checking if product is inStock
  if (!productData?.inventory?.inStock) {
    return {
      productData,
      createResult,
      updateResult,
      message: 'Product is not in stock!',
    }
  }
  // checking if requested quantity is available in inventory
  if (productData?.inventory.quantity - quantity < 0) {
    return {
      productData,
      createResult,
      updateResult,
      message: 'Requested quantity is not available!',
    }
  }
  // Creates the order
  createResult = await Order.create(orderData)

  if (createResult._id) {
    updateResult = await Product.findByIdAndUpdate(productId, {
      $set: {
        'inventory.inStock':
          quantity - productData.inventory.quantity === 0 ? false : true,
        // after updating quantity if the quantity becomes zero in stock will be false else true
      },
      $inc: {
        'inventory.quantity': -quantity,
        // decrementing quantity from inventory
      },
    })
  }
  return {
    productData,
    createResult,
    updateResult,
    message: 'Order created successfully!',
  }
}

// exporting services
export const OrderServices = {
  createAnOrderInDB,
}

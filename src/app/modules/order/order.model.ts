import { model, Schema } from 'mongoose'
import { TOrder } from './order.interface'

//Schema for order collection
const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required.'],
      lowercase: true,
      minlength: [3, 'Not a valid email.'],
    },
    productId: {
      type: String,
      required: [true, 'Product id is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
      trim: true,
      min: [0, 'Price can not be negative.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      trim: true,
      min: [1, 'Have to order at least one product.'],
    },
  },
  {
    timestamps: true,
  },
)

// Exporting Order model
export const Order = model<TOrder>('Order', orderSchema)

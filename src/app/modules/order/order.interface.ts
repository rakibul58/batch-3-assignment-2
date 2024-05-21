import { Schema } from 'mongoose'

// Type of orders
export type TOrder = {
  email: string
  productId: Schema.Types.ObjectId
  price: number
  quantity: number
}

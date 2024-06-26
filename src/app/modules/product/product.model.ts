import { Schema, model } from 'mongoose'
import { TInventory, TProduct, TVariant } from './product.interface'

//Schema for variant field
const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    trim: true,
    required: [true, 'Variant type is Required.'],
    maxlength: [20, "Variant type can't be over 20 characters."],
    minlength: [2, "Variant type can't be under 2 characters."],
  },
  value: {
    type: String,
    trim: true,
    required: [true, 'Variant value is Required'],
    maxlength: [20, "Variant value can't be over 20 characters."],
    minlength: [1, "Variant value can't be under 1 characters."],
  },
})

//schema for inventory field
const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, 'Inventory Quantity is Required.'],
    min: [0, 'Quantity can not be negative'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'inStock is Required.'],
  },
})

//schema of product
const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required.'],
      maxlength: [50, "Name can't be over 50 characters."],
      minlength: [2, "Name can't be under 2 characters."],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [400, "Description can't be over 400 characters."],
      minlength: [2, "Description can't be under 2 characters."],
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: [0, "Price can't be negative."],
    },
    category: {
      type: String,
      trim: true,
      required: [true, 'Category is required.'],
      maxlength: [50, "Category can't be over 50 characters."],
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [20, "Tag can't be over 20 characters."],
      },
    ],
    variants: [
      {
        type: variantSchema,
        required: true,
      },
    ],
    inventory: {
      type: inventorySchema,
      required: true,
    },
  },
  {
    timestamps: true, // creates timestamps
  },
)

// Exporting product model
export const Product = model<TProduct>('Product', productSchema)

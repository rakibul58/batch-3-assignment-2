import { z } from 'zod'

//validation for variant field
const variantValidationSchema = z.object({
  type: z
    .string({ required_error: 'Variant type is required.' })
    .trim()
    .min(2, 'Variant type must be between 2 and 20 characters.')
    .max(20, 'Variant type must be between 2 and 20 characters.'),
  value: z
    .string({ required_error: 'Variant value is required.' })
    .trim()
    .min(1, 'Variant value must be between 1 and 20 characters.')
    .max(20, 'Variant value must be between 1 and 20 characters.'),
})

//validation for inventory field
const inventoryValidationSchema = z.object({
  quantity: z
    .number({ required_error: 'Inventory Quantity is required.' })
    .min(0, 'Quantity can not be negative'),
  inStock: z.boolean({ required_error: 'Inventory inStock is required.' }),
})

//validation for product model
export const productValidationSchema = z.object({
  name: z
    .string({ required_error: 'Name is Required.' })
    .trim()
    .min(2, 'Name must be between 2 and 50 characters.')
    .max(50, 'Name must be between 2 and 50 characters.'),
  description: z
    .string({ required_error: 'Description is Required.' })
    .trim()
    .min(2, 'Description must be between 2 and 400 characters.')
    .max(400, 'Description must be between 2 and 400 characters.'),
  price: z
    .number({ required_error: 'Price is required.' })
    .positive({ message: "Price can't be negative." }),
  category: z
    .string({ required_error: 'Category is required.' })
    .trim()
    .max(50, 'Category cannot be over 50 characters.'),
  tags: z
    .array(
      z
        .string({ required_error: 'Tag is required.' })
        .trim()
        .max(20, 'Tag cannot be over 20 characters'),
    )
    .min(1, 'Add at least one tag.'),
  variants: z
    .array(variantValidationSchema)
    .min(1, 'Add at least one variant.'),
  inventory: inventoryValidationSchema,
})

//exporting productValidationSchema
export default productValidationSchema

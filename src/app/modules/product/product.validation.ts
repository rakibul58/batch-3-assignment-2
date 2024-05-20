import { z } from 'zod'

const variantValidationSchema = z.object({
  type: z
    .string({ required_error: 'Variant type is required.' })
    .trim()
    .min(2, 'Variant type must be between 2 and 20 characters.')
    .max(20, 'Variant type must be between 2 and 20 characters.'),
  value: z
    .string({ required_error: 'Variant value is required.' })
    .trim()
    .min(2, 'Variant value must be between 2 and 20 characters.')
    .max(20, 'Variant value must be between 2 and 20 characters.'),
})

const inventoryValidationSchema = z.object({
  quantity: z
    .number({ required_error: 'Inventory Quantity is required.' })
    .positive('Quantity must be at least 1'),
  inStock: z.boolean().default(true).optional(),
})

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
  tags: z.array(
    z
      .string({ required_error: 'Tag is required.' })
      .trim()
      .max(20, 'Tag cannot be over 20 characters'),
  ),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
})

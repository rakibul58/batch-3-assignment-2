import { z } from 'zod'
//validation for variant field
const orderValidationSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .trim()
    .toLowerCase()
    .email('Not a valid email.'),
  productId: z.string({ required_error: 'Product id is required.' }),
  price: z
    .number({ required_error: 'Price is required.' })
    .min(0, 'Price can not be negative.'),
  quantity: z
    .number({ required_error: 'Quantity is required.' })
    .min(1, 'Have to order at least one product.'),
})

//exporting productValidationSchema
export default orderValidationSchema

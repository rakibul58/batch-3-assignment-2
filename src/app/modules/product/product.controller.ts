import { Request, Response } from 'express'
import productValidationSchema from './product.validation'
import { ProductServices } from './product.service'

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body
    const zodParsedData = productValidationSchema.parse(productData)
    const result = await ProductServices.createProductIntoDB(zodParsedData)
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

export const ProductControllers = {
  createProduct,
}

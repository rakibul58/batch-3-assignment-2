import { Request, Response } from 'express'
import productValidationSchema from './product.validation'
import { ProductServices } from './product.service'

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body
    // sending product data to zod validation
    const zodParsedData = productValidationSchema.parse(productData)
    // if validation is successful then sending the data to product services
    const result = await ProductServices.createProductIntoDB(zodParsedData)
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Couldn't create the product",
      error,
    })
  }
}

const getProducts = async (req: Request, res: Response) => {
  try {
    const query = req.query
    const result = await ProductServices.getProductsFromDB(query)
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch the products',
      error,
    })
  }
}

const getProductByProductId = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.getProductByProductIdFromDB(productId)
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: result,
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Product not found!',
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Product not found!',
      error,
    })
  }
}

// exporting controllers
export const ProductControllers = {
  createProduct,
  getProducts,
  getProductByProductId,
}

import { Request, Response } from 'express'
import productValidationSchema from './product.validation'
import { ProductServices } from './product.service'

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body
    // sending product data to zod validation
    const zodParsedData = productValidationSchema.parse(productData)
    //checking quantity and inStock
    if (
      zodParsedData.inventory.quantity === 0 &&
      zodParsedData.inventory.inStock === true
    ) {
      return res.status(500).json({
        success: false,
        message: 'inStock can not be true if quantity  zero',
      })
    }
    if (
      zodParsedData.inventory.quantity > 0 &&
      zodParsedData.inventory.inStock === false
    ) {
      return res.status(500).json({
        success: false,
        message: 'inStock can not be false if quantity is more than zero',
      })
    }
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
      message: 'Something went wrong!',
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
      message: 'Could not fetch the products!',
      error,
    })
  }
}

const getProductByProductId = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.getProductByProductIdFromDB(productId)
    //checks if data is null
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

const updateProductByProductId = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const updateData = req.body
    const quantity = updateData['inventory.quantity']
    const inStock = updateData['inventory.inStock']

    //checking quantity and inStock
    if (quantity === 0 && inStock === true) {
      return res.status(500).json({
        success: false,
        message: 'inStock can not be true if quantity  zero',
      })
    }
    if (quantity > 0 && inStock === false) {
      return res.status(500).json({
        success: false,
        message: 'inStock can not be false if quantity is more than zero',
      })
    }

    // will update inStock according to the quantity
    if ('inventory.quantity' in updateData && quantity === 0) {
      updateData['inventory.inStock'] = false
    }
    if ('inventory.quantity' in updateData && quantity > 0) {
      updateData['inventory.inStock'] = true
    }
    // will make quantity 0 if inStock is false
    if ('inventory.inStock' in updateData && inStock === false) {
      updateData['inventory.quantity'] = 0
    }

    let result
    result = await ProductServices.updateProductByProductIdInDB(
      productId,
      updateData,
    )
    // if quantity is 0 then inStock is false
    if (
      'inventory.inStock' in updateData &&
      inStock === true &&
      result.updatedData?.inventory.quantity === 0
    ) {
      updateData['inventory.inStock'] = false
      result = await ProductServices.updateProductByProductIdInDB(
        productId,
        updateData,
      )
    }
    if (result.updateResult.modifiedCount) {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result.updatedData,
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
      message: 'Something went wrong!',
      error,
    })
  }
}

// exporting controllers
export const ProductControllers = {
  createProduct,
  getProducts,
  getProductByProductId,
  updateProductByProductId,
}

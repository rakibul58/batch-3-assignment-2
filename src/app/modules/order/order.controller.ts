import { Request, Response } from 'express'
import { OrderServices } from './order.service'
import orderValidationSchema from './order.validation'

const createAnOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body
    const zodParsedData = await orderValidationSchema.parse(orderData)
    const result = await OrderServices.createAnOrderInDB(zodParsedData)
    // if product is not available
    if (result?.productData == null) {
      return res.status(500).json({
        success: false,
        message: result?.message,
      })
    }
    // checking if order is created and product is updated
    if (result?.createResult !== null && result.updateResult !== null) {
      res.status(200).json({
        success: true,
        message: result?.message,
        data: result.createResult,
      })
    } else {
      res.status(500).json({
        success: false,
        message: result?.message,
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

const getOrders = async (req: Request, res: Response) => {
  try {
    const query = req.query
    const result = await OrderServices.getOrdersFromDB(query)
    if ('email' in query && result) {
      return res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      })
    }
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Orders not found!',
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order not found!',
      error,
    })
  }
}

//exporting order controllers
export const OrderControllers = {
  createAnOrder,
  getOrders,
}

import { Request, Response } from 'express'
import { OrderServices } from './order.service'

const createAnOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body
    const result = await OrderServices.createAnOrderInDB(orderData)
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

//exporting order controllers
export const OrderControllers = {
  createAnOrder,
}

import express from 'express'
import { OrderControllers } from './order.controller'

const router = express.Router()

router.route('/').post(OrderControllers.createAnOrder)

export const OrderRoutes = router

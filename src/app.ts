import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'
import { OrderRoutes } from './app/modules/order/order.route'
const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

//application routes
app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoutes)

// root Route
app.get('/', (req: Request, res: Response) => {
  res.send('Assignment 2 Server is running!')
})

// Handles if an unauthorized route is hit
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

export default app

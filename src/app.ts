import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

//application routes

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

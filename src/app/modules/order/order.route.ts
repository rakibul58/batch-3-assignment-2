import express from 'express'

const router = express.Router()

router.route('/').get()

export const OrderRoutes = router

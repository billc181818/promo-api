const express = require('express')
const router = express.Router()
const { applyPromotions } = require('../services/payment/promotion')
const cartSchema = require('../schemas/cartSchema')

router.get('/health', (req, res) => {
  try {
    res.status(200).json({
      message: 'The API is healthy and running.',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Health Check Error.' })
  }
})

router.post('/promoCheckout', async (req, res) => {
  try {
    const cart = req.body.cart

    const { error } = cartSchema.validate(cart)
    if (error) {
      throw new Error(`Invalid cart data: ${error.message}`)
    }

    const promotionPrice = await applyPromotions(cart)
    res.status(200).json({
      price: promotionPrice,
    })
  } catch (err) {
    console.error('Error in /promoCheckout endpoint:', err)

    let statusCode = 500
    let message = 'An error occurred.'

    if (err.message === 'Insufficient Inventory') {
      statusCode = 400
      message = 'Insufficient Inventory'
    } else if (err.message.includes('Invalid cart data:')) {
      statusCode = 400
      message = 'Invalid cart data'
    }

    res.status(statusCode).json({
      message: `Error: ${message}`,
      error: err.message,
    })
  }
})

module.exports = router

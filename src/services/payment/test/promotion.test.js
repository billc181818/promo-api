const { applyPromotions } = require('../promotion')

describe('promotions test', () => {
  test('should apply promotion to a cart with one Macbook Pro and one Raspberry Pi B for the price of one Macbook', () => {
    const cart = [
      {
        sku: '43N23P', //MacBook Pro id
        qty: 1,
      },
      {
        sku: '234234', //Raspberry pi id
        qty: 1,
      },
    ]

    const promotionPrice = applyPromotions(cart)
    expect(promotionPrice).toEqual(5399.99)
  })

  test('should apply promotion to a cart with 3 Macbook Pro and 3 Raspberry Pi B for the price of 3 Macbook', () => {
    const cart = [
      {
        sku: '43N23P', //MacBook Pro id
        qty: 3,
      },
      {
        sku: '234234', //Raspberry pi id
        qty: 3,
      },
    ]

    const promotionPrice = applyPromotions(cart)
    const expectedPrice = 16199.97 // $5399.99  * 3: should only pay for MacBook Pros and get 3 free Raspberry pi
    expect(promotionPrice).toEqual(expectedPrice)
  })

  test('should apply promotion to a cart with 3 Google Homes for the price of 2', () => {
    const cart = [
      {
        sku: '120P90', //google home id
        qty: 3,
      },
    ]

    const promotionPrice = applyPromotions(cart)
    const expectedPrice = 99.98 // $49.99  * 2
    expect(promotionPrice).toEqual(expectedPrice)
  })
  test('should apply promotion to a cart with 6 Google Homes for the price of 4', () => {
    const cart = [
      {
        sku: '120P90', //google home id
        qty: 6,
      },
    ]

    const promotionPrice = applyPromotions(cart)
    const expectedPrice = 199.96 // $49.99  * 4
    expect(promotionPrice).toEqual(expectedPrice)
  })
  test('promotion of buy 3 and paid with the price of 2 does not apply if cart contain 2 Google Homes', () => {
    const cart = [
      {
        sku: '120P90', //google home id
        qty: 2,
      },
    ]

    const promotionPrice = applyPromotions(cart)
    const expectedPrice = 99.98 // $49.99  * 2
    expect(promotionPrice).toEqual(expectedPrice)
  })
  test('promotion of buy 3 and paid with the price of 2 only applies to first 3 item if cart contain 5 Google Homes', () => {
    const cart = [
      {
        sku: '120P90', //google home id
        qty: 5,
      },
    ]

    const promotionPrice = applyPromotions(cart)
    const expectedPrice = 199.96 // $49.99  * 4 : essentially you will only get 1 free google home
    expect(promotionPrice).toEqual(expectedPrice)
  })
  test('should apply promotion to a cart with 3 Alexa Speakers with a 10% discount', () => {
    const cart = [
      {
        sku: 'A304SD', //Alexa speaker id
        qty: 3,
      },
    ]

    const promotionPrice = applyPromotions(cart)
    const expectedPrice = 295.65 // $109.5  * 3 * 90%
    expect(promotionPrice).toEqual(expectedPrice)
  })

  test('should apply promotion to a cart with 5 Alexa Speakers with a 10% discount', () => {
    const cart = [
      {
        sku: 'A304SD', //Alexa speaker id
        qty: 5,
      },
    ]

    const promotionPrice = applyPromotions(cart)
    const expectedPrice = 492.75 // $109.5  * 5 * 90%
    expect(promotionPrice).toEqual(expectedPrice)
  })
  test('promotion of 10% discount does not apply to a cart with 2 Alexa Speakers', () => {
    const cart = [
      {
        sku: 'A304SD', //Alexa speaker id
        qty: 2,
      },
    ]

    const promotionPrice = applyPromotions(cart)
    const expectedPrice = 219 // $109.5  * 2 - no discount
    expect(promotionPrice).toEqual(expectedPrice)
  })
  it('should handles cart with no promotions', () => {
    const cart = [{ sku: '234234', qty: 2 }]
    const expectedPrice = 60 // $30 * 2
    const promotionPrice = applyPromotions(cart)
    expect(promotionPrice).toEqual(expectedPrice)
  })
  test('should handle sku that does not exists', () => {
    const cart = [{ sku: 'invalid_sku', qty: 1 }]
    expect(applyPromotions(cart)).toEqual(0)
  })
  test('should handle promotions not in promotion rules', () => {
    const cart = [
      { sku: '43N23P', qty: 2, promotions: [{ type: 'fake_promotion' }] },
    ]
    const expectedPrice = 10739.98 // $5399.99 * 2 - ($30 * 2)
    expect(applyPromotions(cart)).toEqual(expectedPrice)
  })
  test('should handle item with zero quantity', () => {
    const cart = [
      { sku: '120P90', qty: 1 },
      { sku: '234234', qty: 0 },
    ]
    expect(applyPromotions(cart)).toEqual(49.99)
  })
  test('should return error message if item in cart is out of stock', () => {
    const cart = [{ sku: '120P90', qty: 11 }]
    try {
      applyPromotions(cart)
    } catch (error) {
      expect(error.message).toEqual('Insufficient Inventory')
    }
  })
  test('should apply multiple promotions correctly', () => {
    const cart = [
      { sku: '43N23P', qty: 1 }, //MacBook Pro id
      { sku: '120P90', qty: 3 }, //google home id
      { sku: 'A304SD', qty: 4 }, //Alexa speaker id
      { sku: '234234', qty: 2 }, //Raspberry pi id
    ]

    const macPrice = 5399.99
    const googleHomePrice = 49.99 * 2
    const alexaPrice = 109.5 * 4 * 0.9
    const raspPrice = 30
    const expectedTotalPrice =
      macPrice + googleHomePrice + alexaPrice + raspPrice

    expect(applyPromotions(cart)).toEqual(Number(expectedTotalPrice.toFixed(2)))
  })
})

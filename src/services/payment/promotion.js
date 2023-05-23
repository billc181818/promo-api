const inventory = require('../../data/inventories')
const promotionRule = require('../../data/promotionRules')

function applyPromotions(cart) {
  const items = cart.map((item) => {
    const { sku, qty } = item
    const { name, price } = inventory[sku] || {}
    const promotions = promotionRule[sku] || []
    return { sku, name, price, qty, promotions }
  })

  const inventoryMap = new Map(Object.entries(inventory))

  const totalPrice = items.reduce((acc, item) => {
    const discountedPrice = applyPromotionsToItem(item, inventoryMap)
    return acc + discountedPrice
  }, 0)

  return Number.isNaN(totalPrice) ? 0 : Number(totalPrice.toFixed(2))
}

function getGiftPrice(sku, inventoryMap) {
  const { price } = inventoryMap.get(sku) || {}
  return price || 0
}

function applyPromotionsToItem(item, inventoryMap) {
  const { price, qty, promotions } = item
  let discountedPrice = price * qty

  const inventoryItem = inventoryMap.get(item.sku)
  if (inventoryItem && qty > inventoryItem.qty) {
    throw new Error('Insufficient Inventory')
  }

  for (const promotion of promotions) {
    switch (promotion.type) {
      case 'free_gift_with_purchase':
        discountedPrice -= getGiftPrice(promotion.gift_sku, inventoryMap) * qty
        console.log(
          `Applied free gift promotion to SKU ${item.sku} - Discounted Price: ${discountedPrice}`
        )

        break
      case 'buy_x_get_y_free':
        const required_qty = promotion.required_qty
        const free_qty = promotion.free_qty
        discountedPrice -= price * Math.floor(qty / required_qty) * free_qty
        console.log(
          `Applied buy X get Y free promotion to SKU ${item.sku} - Discounted Price: ${discountedPrice}`
        )

        break
      case 'percentage_discount':
        if (qty >= promotion.required_qty) {
          discountedPrice *= 1 - promotion.discount_percentage / 100
        }
        console.log(
          `Applied percentage discount promotion to SKU ${item.sku} - Discounted Price: ${discountedPrice}`
        )

        break
      default:
        break
    }
  }

  return discountedPrice
}

module.exports = {
  applyPromotions,
}

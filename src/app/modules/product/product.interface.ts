// Type of variant
export type TVariant = {
  type: string
  value: string
}

// Type of inventory
export type TInventory = {
  quantity: number
  inStock: boolean
}

// Type of products
export type TProduct = {
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  variants: TVariant[]
  inventory: TInventory
}

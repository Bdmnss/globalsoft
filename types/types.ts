export interface Category {
  slug: string
  name: string
  url: string
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  sku: string
  weight: number
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  returnPolicy: string
  minimumOrderQuantity: number
  images: string[]
  thumbnail: string
}

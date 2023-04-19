export class Filter {
  query: string = ""
  brands: Array<string> = []
  priceRange: string = ''
  category: string = ''
}

export class Product {
  image: string
  name: string
  description: string
  category: string
  price: number
  rate: number
  off: number
  id: string

  constructor(image: string, name: string, description: string, category:string, price: number, rate: number, off: number) {
    this.image = image
    this.name = name
    this.description = description
    this.category = category
    this.price = price
    this.rate = rate
    this.off = off
    this.id = '' + Math.random().toString().slice(2)
  }
}
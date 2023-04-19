import { defineStore } from "pinia";
import { Product } from '@/utils/classes'

class CartItem {
  product: Product
  private _count: number = 1

  constructor(product: Product) {
    this.product = product
  }
  
  set count(count: number) {
    count = Math.round(count)
    if(count > 1) {
      this._count = count
    }
  }
  get count() {
    return this._count
  }
}

export const useSystemStore = defineStore("system", () => {
  const dialogVisible = ref(false)
  const myCart = ref<Array<CartItem>>([])
  const cartItemsCount = ref(0)

  function addToMyCart(product: Product) {
    const found = myCart.value.find(item => item.product.id == product.id)

    if(found) {
      found.count++
    } else {
      const cartItem = new CartItem(product)
      myCart.value.push(cartItem)
    }
  }
  
  function updateCartItemsCount() {
    cartItemsCount.value = myCart.value.reduce((acc, curValue) => {
      return acc + curValue.count
    }, 0)
  }

  watch(myCart, updateCartItemsCount, {deep: true})

  return {
    dialogVisible,
    myCart,
    cartItemsCount,
    addToMyCart
  }
})
import { createContext, useContext, useEffect, useState } from 'react'

// Контекст — «общая переменная» для всех компонентов внутри <CartProvider>.
// Без него корзину пришлось бы передавать пропсами через каждый уровень.
const CartContext = createContext(null)

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('cart')) ?? []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  // Функция в useState вызывается один раз — при первом рендере.
  const [items, setItems] = useState(loadCart)

  // Эффект срабатывает после каждого изменения items и сохраняет корзину.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  function add(product) {
    setItems((prev) => {
      const found = prev.find((item) => item.id === product.id)
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        )
      }
      const { id, name, price, image } = product
      return [...prev, { id, name, price, image, qty: 1 }]
    })
  }

  function changeQty(id, delta) {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0),
    )
  }

  function remove(id) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Производные значения не храним в состоянии — считаем на каждом рендере.
  const count = items.reduce((sum, item) => sum + item.qty, 0)
  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0)

  return (
    <CartContext.Provider value={{ items, add, changeQty, remove, count, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

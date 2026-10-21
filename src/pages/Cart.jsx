import { Link } from 'react-router-dom'
import { formatPrice } from '../api.js'
import { useCart } from '../cart.jsx'

export default function Cart() {
  const { items, changeQty, remove, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="container state">
        <h1 className="page-title">Корзина пуста</h1>
        <p>Загляните в каталог — там как раз всё, что пора сеять.</p>
        <Link className="btn" to="/catalog">Перейти в каталог</Link>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="page-title">Корзина</h1>

      <ul className="cart">
        {items.map((item) => (
          <li className="cart__item" key={item.id}>
            <img src={item.image} alt="" />
            <Link to={`/product/${item.id}`} className="cart__name">{item.name}</Link>
            <div className="qty">
              <button aria-label="Меньше" onClick={() => changeQty(item.id, -1)}>−</button>
              <span>{item.qty}</span>
              <button aria-label="Больше" onClick={() => changeQty(item.id, 1)}>+</button>
            </div>
            <span className="cart__sum">{formatPrice(item.price * item.qty)}</span>
            <button className="link-btn" onClick={() => remove(item.id)}>Удалить</button>
          </li>
        ))}
      </ul>

      <p className="cart__total">Итого: <strong>{formatPrice(total)}</strong></p>
    </div>
  )
}

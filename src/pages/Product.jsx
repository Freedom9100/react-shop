import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct, formatPrice } from '../api.js'
import { useCart } from '../cart.jsx'
import SowCalendar, { Legend } from '../components/SowCalendar.jsx'

export default function Product() {
  const { id } = useParams() // id берётся из адреса /product/:id
  const { items, add } = useCart()
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ok | notfound | error

  // id в зависимостях: перешли на другой товар — эффект запустится снова.
  useEffect(() => {
    getProduct(id)
      .then((data) => {
        if (!data) return setStatus('notfound')
        setProduct(data)
        setStatus('ok')
      })
      .catch(() => setStatus('error'))
  }, [id])

  if (status === 'loading') return <p className="container state">Загружаем…</p>
  if (status === 'error') return <p className="container state">Сервер не отвечает. Запущен ли <code>npm run server</code>?</p>
  if (status === 'notfound') {
    return (
      <div className="container state">
        <p>Такого товара нет.</p>
        <Link className="btn" to="/catalog">В каталог</Link>
      </div>
    )
  }

  const inCart = items.find((item) => item.id === product.id)

  return (
    <div className="container product">
      <figure className="product__photo">
        <img src={product.image} alt={product.name} />
        <figcaption>
          Фото: <a href={product.photo} target="_blank" rel="noreferrer">Wikimedia Commons</a>
        </figcaption>
      </figure>

      <div className="product__info">
        <p className="product__back"><Link to="/catalog">Каталог</Link> / {product.category}</p>
        <h1>{product.name}</h1>
        <p className="product__latin">{product.latin}</p>
        <p className="product__desc">{product.description}</p>

        <h2 className="product__subtitle">Когда сеять</h2>
        <SowCalendar sow={product.sow} harvest={product.harvest} big />
        <Legend />

        <div className="product__buy">
          <p className="product__price">{formatPrice(product.price)}</p>
          <button className="btn" onClick={() => add(product)}>В корзину</button>
          {inCart && (
            <p className="product__incart">
              В корзине: {inCart.qty} шт. · <Link to="/cart">Перейти в корзину</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

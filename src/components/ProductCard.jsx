import { Link } from 'react-router-dom'
import { formatPrice } from '../api.js'
import SowCalendar from './SowCalendar.jsx'

// Компонент получает товар через пропсы и ничего не знает о том, откуда он взялся.
export default function ProductCard({ product }) {
  return (
    <article className="card">
      <Link to={`/product/${product.id}`} className="card__link">
        <img className="card__img" src={product.image} alt={product.name} loading="lazy" />
        <h3 className="card__title">{product.name}</h3>
      </Link>
      <SowCalendar sow={product.sow} harvest={product.harvest} />
      <p className="card__price">{formatPrice(product.price)}</p>
    </article>
  )
}

import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../cart.jsx'

export default function Header() {
  const { count } = useCart()

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="logo">Сеялка</Link>
        {/* NavLink сам добавляет класс active ссылке текущей страницы */}
        <nav className="nav">
          <NavLink to="/" end>Главная</NavLink>
          <NavLink to="/catalog">Каталог</NavLink>
          <NavLink to="/cart">
            Корзина {count > 0 && <span className="badge">{count}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <Link to="/" className="logo">Сеялка</Link>
          <p>Редкие семена и календарь посева к каждому сорту.</p>
        </div>
        <nav className="footer__nav">
          <Link to="/">Главная</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/cart">Корзина</Link>
        </nav>
        <p className="footer__note">
          Фото —{' '}
          <a href="https://commons.wikimedia.org" target="_blank" rel="noreferrer">Wikimedia Commons</a>,
          лицензии CC; ссылка на источник фото — на странице товара.
        </p>
      </div>
    </footer>
  )
}

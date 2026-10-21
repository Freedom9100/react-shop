import { Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'

// Шапка и подвал стоят вне <Routes>, поэтому они одинаковые на всех страницах,
// а между ними меняется только содержимое по адресу.
export default function App() {
  return (
    <>
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="*"
            element={
              <div className="container state">
                <h1>Такой страницы нет</h1>
                <Link className="btn" to="/">На главную</Link>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

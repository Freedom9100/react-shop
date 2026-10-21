import { useEffect, useState } from 'react'
import { getProducts } from '../api.js'
import ProductCard from '../components/ProductCard.jsx'
import { Legend } from '../components/SowCalendar.jsx'

export default function Catalog() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Состояние фильтров
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Все')
  const [sort, setSort] = useState('')

  // Пустой массив зависимостей [] — эффект выполнится один раз, при появлении страницы.
  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  // Список категорий собираем из самих товаров; Set убирает повторы.
  const categories = ['Все', ...new Set(products.map((p) => p.category))]

  // Отфильтрованный список не храним в состоянии — он вычисляется из products и фильтров.
  const query = search.trim().toLowerCase()
  const visible = products
    .filter((p) => category === 'Все' || p.category === category)
    .filter((p) => p.name.toLowerCase().includes(query))
    .sort((a, b) => {
      if (sort === 'asc') return a.price - b.price
      if (sort === 'desc') return b.price - a.price
      return 0
    })

  function reset() {
    setSearch('')
    setCategory('Все')
    setSort('')
  }

  return (
    <div className="container">
      <h1 className="page-title">Каталог семян</h1>

      <div className="filters">
        <input
          type="search"
          className="filters__search"
          placeholder="Поиск: томат, базилик…"
          aria-label="Поиск по товарам"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="chips" role="group" aria-label="Категория">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <select aria-label="Сортировка по цене" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Без сортировки</option>
          <option value="asc">Сначала дешевле</option>
          <option value="desc">Сначала дороже</option>
        </select>
      </div>

      <Legend />

      {loading && <p className="state">Загружаем семена…</p>}
      {error && <p className="state">Сервер не отвечает. Запустите <code>npm run server</code> и обновите страницу.</p>}

      {!loading && !error && visible.length === 0 && (
        <div className="state">
          <p>По запросу «{search}» ничего не нашлось.</p>
          <button className="btn" onClick={reset}>Сбросить фильтры</button>
        </div>
      )}

      <div className="grid">
        {visible.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}

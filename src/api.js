// Адрес json-server (npm run server). Все запросы к «бэкенду» идут сюда.
export const API = 'http://localhost:3000'

// Локально (npm run dev) товары отдаёт json-server. На GitHub Pages сервера нет:
// при сборке db.json копируется к сайту, и товары читаются из него как из файла.
const LOCAL = import.meta.env.DEV

async function load(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(res.status)
  return res.json()
}

export async function getProducts() {
  if (LOCAL) return load(`${API}/products`)
  return (await load('db.json')).products
}

// Возвращает null, если такого товара нет.
export async function getProduct(id) {
  if (!LOCAL) return (await getProducts()).find((p) => p.id === Number(id)) ?? null
  const res = await fetch(`${API}/products/${id}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(res.status)
  return res.json()
}

export const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

export const formatPrice = (rub) => `${rub.toLocaleString('ru-RU')} ₽`

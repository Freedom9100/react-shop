import { useState } from 'react'
import { Link } from 'react-router-dom'
import { API, MONTHS } from '../api.js'
import SowCalendar, { Legend } from '../components/SowCalendar.jsx'

// Культуры для календаря в баннере — просто массив, рендерим через map.
const BANNER_ROWS = [
  { name: 'Перец', sow: [1, 2], harvest: [8, 10] },
  { name: 'Томат', sow: [2, 3], harvest: [7, 9] },
  { name: 'Базилик', sow: [3, 4], harvest: [6, 8] },
  { name: 'Настурция', sow: [5, 5], harvest: [6, 9] },
]

export default function Home() {
  return (
    <>
      <section className="banner">
        <div className="container banner__inner">
          <div className="banner__text">
            <h1>Сей&nbsp;вовремя&nbsp;— собирай с&nbsp;запасом</h1>
            <p>Редкие сорта томатов, перцев, зелени и цветов. У каждого пакетика — свой календарь: видно, когда сеять и когда ждать урожай.</p>
            <Link to="/catalog" className="btn">Перейти в каталог</Link>
          </div>

          <div className="banner__cal" aria-label="Календарь посева">
            <div className="banner__row banner__months" aria-hidden="true">
              <span />
              <div className="cal">
                {MONTHS.map((m) => <span key={m}>{m[0]}</span>)}
              </div>
            </div>
            {BANNER_ROWS.map((row) => (
              <div className="banner__row" key={row.name}>
                <span>{row.name}</span>
                <SowCalendar sow={row.sow} harvest={row.harvest} />
              </div>
            ))}
            <Legend />
          </div>
        </div>
      </section>

      <Subscribe />
    </>
  )
}

function Subscribe() {
  // Управляемый инпут: значение поля живёт в состоянии React.
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  async function handleSubmit(e) {
    e.preventDefault() // иначе браузер перезагрузит страницу
    setStatus('sending')
    try {
      const res = await fetch(`${API}/subscribers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, date: new Date().toISOString() }),
      })
      if (!res.ok) throw new Error(res.status)
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="container subscribe">
      <div>
        <h2>Напомним, когда пора сеять</h2>
        <p>Одно письмо в начале каждого месяца: что сеять сейчас и что из новинок появилось в лавке.</p>
      </div>

      {status === 'done' ? (
        <p className="subscribe__done" role="status">Готово! Первое письмо придёт в начале следующего месяца.</p>
      ) : (
        <form className="subscribe__form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="visually-hidden">Ваша почта</label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@mail.ru"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn" disabled={status === 'sending'}>
            {status === 'sending' ? 'Отправляем…' : 'Подписаться'}
          </button>
          {status === 'error' && (
            <p className="form-error" role="alert">Не получилось отправить: сервер не отвечает. Запущен ли npm run server?</p>
          )}
        </form>
      )}
    </section>
  )
}

import { MONTHS } from '../api.js'

const inRange = (month, [from, to]) => month >= from && month <= to
const NOW = new Date().getMonth() + 1 // текущий месяц, 1–12

// Полоса из 12 месяцев: жёлтым — когда сеять, зелёным — когда собирать.
// big — крупный вариант с подписями месяцев для страницы товара.
export default function SowCalendar({ sow, harvest, big = false }) {
  const label = `Посев: ${MONTHS[sow[0] - 1]}–${MONTHS[sow[1] - 1]}, ` +
    `урожай: ${MONTHS[harvest[0] - 1]}–${MONTHS[harvest[1] - 1]}`

  return (
    <div className={big ? 'cal cal--big' : 'cal'} role="img" aria-label={label}>
      {MONTHS.map((name, i) => {
        const month = i + 1
        let type = ''
        if (inRange(month, sow)) type = 'sow'
        else if (inRange(month, harvest)) type = 'harvest'

        return (
          <div key={name} className={`cal__cell ${type} ${month === NOW ? 'now' : ''}`}>
            {big && <span>{name.slice(0, 3)}</span>}
          </div>
        )
      })}
    </div>
  )
}

// Подпись к цветам календаря
export function Legend() {
  return (
    <p className="legend">
      <span className="legend__sow">посев</span>
      <span className="legend__harvest">урожай</span>
      <span className="legend__now">сейчас</span>
    </p>
  )
}

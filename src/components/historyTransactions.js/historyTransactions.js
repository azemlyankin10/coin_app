import { el } from "redom";
import { router } from "../../..";

const historyTransactionsComponent = (account, data, click) => {
  let table
  const tableContainer = el('div', {class: 'table'}, [
    el('h2', {class: 'table__title'}, 'История переводов'),
    table = el('table', [
      el('tr', {class: 'table__header'}, [
        el('th', 'Счёт отправителя'),
        el('th', 'Счёт получателя'),
        el('th', 'Сумма'),
        el('th', 'Дата'),
      ]),
      data.slice(-10).reverse().map(element => {
        const date = new Date(element.date)
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        const year = date.getFullYear()

        return el('tr', [
                el('td', element.from),
                el('td', element.to),
                el('td', {
                    style: {color: `${element.from === account ? '#FD4E5D' : '#76CA66'}`}
                  },
                 `${element.from === account ? '-' : '+'} ${element.amount} ₽`
                ),
                el('td', `${day}.${month}.${year}`)
               ])
      })
    ])
  ])
  click ? table.addEventListener('click', () => router.navigate(`/history${location.search}`)) : null
  return tableContainer
}

export default historyTransactionsComponent

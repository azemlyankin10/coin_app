import { el } from "redom";

const historyTransactionsComponent = (data) => {
  const tableContainer = el('div', {class: 'table'}, [
    el('table', [
      el('tr', [
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
                el('td', {style: {color: `${element.amount > 0 ? '#76CA66' : '#FD4E5D'}`}}, `${element.amount > 0 ? '+' : ''} ${element.amount} ₽`),
                el('td', `${day}.${month}.${year}`)
               ])
      })
    ])
  ])
  return tableContainer
}

export default historyTransactionsComponent

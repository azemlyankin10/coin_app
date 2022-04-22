import SimpleBar from 'simplebar'

import { el, mount, setChildren } from "redom"
const currencyDashboard = ({title, data, all = false, soketURL = false}) => {
  const li = (code, amount, id = false) => {
    return el('li', {id: `${id ? id : ''}`, class: 'currencyDashboard__li'}, [
      el('span', {class: 'currencyDashboard__li-name'}, code),
      el('span', {class: 'currencyDashboard__li-dots'}),
      el('span', {class: 'currencyDashboard__li-count'}, amount)
    ])
  }
  const dashboard = el('div', {class: `currencyDashboard ${all ? 'currencyDashboard-all' : ''}`},
    el('h2', {class: 'currencyDashboard__title'}, title)
  )
  const list = el('ul', {class: 'currencyDashboard__list'})
  if(!soketURL) {
    setChildren(list, [
      data.map(element => li(element.code, element.amount))
    ])
  } else {
    const socket = new WebSocket(soketURL)
    const createdElements = []
    socket.onmessage = function(e) {
      if(location.pathname !== '/currency') return socket.close()
      const elem = JSON.parse(e.data)
      if(elem.type !== 'EXCHANGE_RATE_CHANGE') return

      if(createdElements.includes(`${elem.from}-${elem.to}`)) {
        const createdElem = document.getElementById(`${elem.from}-${elem.to}`)
        createdElem.children[2].textContent = elem.rate
        createdElem.classList.remove('up')
        createdElem.classList.remove('down')
        createdElem.classList.add(`${elem.change === 1 ? 'up' : 'down'}`)
      } else {
        const newElem = li(`${elem.from}/${elem.to}`, elem.rate, `${elem.from}-${elem.to}`)
        newElem.classList.add(`${elem.change === 1 ? 'up' : 'down'}`)
        mount(list, newElem)
        createdElements.push(`${elem.from}-${elem.to}`)
      }
    }
  }
  mount(dashboard, list)

  const update = (newData) => {
    list.innerHTML = ''
    setChildren(list, [
      newData.map(element => li(element.code, element.amount))

    ])
  }
  new SimpleBar(list);

  return { dashboard, update }
}
export default currencyDashboard
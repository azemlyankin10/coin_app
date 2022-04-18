import { URL } from "../.."

export default class BaseComponent {
  constructor() {
    this.key = sessionStorage.getItem('coin_key') || null
    this.payload = []
  }

  getKey(objLoginData) {
    return fetch(`${URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objLoginData)
    }).then(res => res.json())

  }

  getData(key) {
    return fetch(`${URL}/accounts`, {headers: {Authorization: `Basic ${key}`}})
            .then(res => res.json())
  }

  getDetail(id, key) {
    return fetch(`${URL}/account/${id}`, {headers: {Authorization: `Basic ${key}`}})
            .then(res => res.json())
  }

  createNewBill(key) {
    return fetch(`${URL}/create-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${key}`
      },
    }).then(res => res.json())
  }

  getCorrectDate(date) {
    const monthName = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    date = new Date(date)
    const day = date.getDate()
    let month = monthName[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
  }

  getSortBills(data) {
    const step1 = data.filter(el => {
      const ms = new Date() - 86400000 * 30 * 6
      const date = new Date(ms).setDate(1)
      if(date < new Date(el.date)) return el
    })

    const step2 = []
    let subArray = []
    for(let i = 0; i < step1.length - 1; i++) {
      if(step1[i] === step1[step1.length - 2] && subArray.length > 0) step2.push(subArray)
      let x = new Date(step1[i].date).getMonth()
      let y = new Date(step1[i + 1].date).getMonth()
      if(x === y) subArray.push(step1[i])
      else {
        step2.push(subArray)
        subArray = []
      }
    }

    const currentSum = step2.map(el => {
      const count =  el.reduce((accum, currentValue) => {
        return accum + Number(currentValue.amount)
      }, 0)
      return Math.round(count)
    })

    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
    const currentMonths = step2.map(el => {
      const index = new Date(el[0].date).getMonth()
      return months[index]
    })



    return {currentSum, currentMonths}
  }
}

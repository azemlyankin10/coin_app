import { URL } from "../.."
import toast from "./toast/toast"

export default class BaseComponent {
  constructor() {
    this.key = sessionStorage.getItem('coin_key') || null
    this.payload = []
  }

  async getKey(objLoginData) {
    try {
      const res = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objLoginData)
      })
      return await res.json()
    } catch (error) {
      toast(error.message, 'error')
    }


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

  transfer(objData, key) {
    return fetch(`${URL}/transfer-funds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${key}`
      },
      body: JSON.stringify(objData)
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

  getSortBills(data, countMonth) {
    const transactionsArray = data.transactions
    //получает массив транзакций за countMonth мес.
    const step1 = transactionsArray.filter(el => {
      const ms = new Date() - 86400000 * 30 * countMonth
      const date = new Date(ms).setDate(1)
      if(date < new Date(el.date)) return el
    })

    //получаем отсортированный массив помесячно
    const step2 = []
    let subArray = []
    if(step1.length === 1) step2.push([step1[0]])
    else {
      for(let i = 1; i < step1.length; i++) {
        const x = new Date(step1[i - 1].date).getMonth()
        const y = new Date(step1[i].date).getMonth()
        if(i === step1.length - 1) {
          if(x !== y) step2.push([step1[i]])
          else if(x === y) {
            subArray.push(step1[i])
            step2.push(subArray)
          }
        }
        if(x === y) subArray.push(step1[i - 1])
        else {
          if(subArray.length === 0) subArray.push(step1[i - 1])
          step2.push(subArray)
          subArray = []
        }
      }
    }

    // считаем сумму каждого месяца
    const currentSum = step2.map(el => {
      const count = el.reduce((accum, currentValue) => {
        let result = data.account === currentValue.from
                    ? accum - Number(currentValue.amount)
                    : accum + Number(currentValue.amount)
        return result
      }, 0)
      return Math.round(count)
    })

    const comeSum = step2.map(el => {
      const count = el.reduce((accum, currentValue) => {
        let result = data.account === currentValue.to
                    ? accum + Number(currentValue.amount)
                    : accum
        return result
      }, 0)
      return Math.round(count)
    })

    const outSum = step2.map(el => {
      const count = el.reduce((accum, currentValue) => {
        let result = data.account === currentValue.from
                    ? accum + Number(currentValue.amount)
                    : accum
        return result
      }, 0)
      return Math.round(count)
    })

    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
    const currentMonths = step2.map(el => {
      const index = new Date(el[0].date).getMonth()

      return months[index]
    })


    return {comeSum, outSum, currentSum, currentMonths}
  }
}

export default class BaseComponent {
  constructor() {
    this.key = sessionStorage.getItem('coin_key') || null
    this.payload = []
  }

  getKey(url, objLoginData) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objLoginData)
    }).then(res => res.json())

  }

  getData(url, key) {
    return fetch(url, {headers: {Authorization: `Basic ${key}`}})
            .then(res => res.json())
  }

  getCorrectDate(date) {
    date = new Date(date)
    const day = date.getDate()
    let month = date.getMonth() + 1
    const year = date.getFullYear()
    switch (month) {
      case 1:
        month = 'января'
        break
      case 2:
        month = 'февраля'
        break
      case 3:
        month = 'марта'
        break
      case 4:
        month = 'апреля'
        break
      case 5:
        month = 'мая'
        break
      case 6:
        month = 'июня'
        break
      case 7:
        month = 'июля'
        break
      case 8:
        month = 'августа'
        break
      case 9:
        month = 'сентября'
        break
      case 10:
        month = 'октября'
        break
      case 11:
        month = 'ноября'
        break
      case 12:
        month = 'декабря'
        break
    }

    return `${day} ${month} ${year}`
  }


}

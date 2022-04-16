export default class BaseComponent {
  constructor() {

  }

  getKey(url, objLoginData) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objLoginData)
    }).then(res => res.json())
      // .then(res => res)
  }

  getData(url, key) {
    return fetch(url, {headers: {Authorization: `Basic ${key}`}})
            .then(res => res.json())
  }

}

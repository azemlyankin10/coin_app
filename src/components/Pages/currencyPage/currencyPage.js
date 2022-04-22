import { el, mount } from 'redom'
import { router, SOKET_URL } from '../../../..'
import { getMyCurrency, getCurrencyNames, changeCurrency } from '../../Api'
import changeCurrencyComponent from '../../changeCurrencyComponent/changeCurrencyComponent'
import currencyDashboard from '../../currencyDashboard/currencyDashboard'
import popup from '../../popup/popup'
import toast from '../../toast/toast'

export default class CurrencyPage {
  constructor(apiKey) {
    this.apiKey = apiKey
  }
  async render() {
    if(!this.apiKey) return router.navigate('/auth')

    const myCurrencyData = await getMyCurrency(this.apiKey)
            .then(res => {
              if(res.error) toast(res.error, 'error')
              else return Object.values(res.payload)
            })
    const allCurrencyNames = await getCurrencyNames()
                             .then(res => {
                                if(res.error) toast(res.error, 'error')
                                else return res.payload
                             })

    const container = el('main', {class: 'main container currency'},
      el('h1', {class: 'title currency__title'}, 'Валютный обмен')
    )
    const myCurrencyDashboard = currencyDashboard({
      title: 'Ваши валюты',
      data: myCurrencyData
    })
    const changeCurrencyForm = changeCurrencyComponent(allCurrencyNames, () => {
      const elementsForm = changeCurrencyForm.children[1].elements
      const modal = popup(
        'Подтверждение транзанции',
        `Вы действительно хотите произвести обмен ${elementsForm.sum.value} ${elementsForm.from.value} в ${elementsForm.to.value}`,
        async () => {
          const newData = await changeCurrency(
            {
              from: elementsForm.from.value,
              to: elementsForm.to.value,
              amount: elementsForm.sum.value
            },
            this.apiKey
          ).then(res => {
            if(res.error) toast(res.error, 'error')
            else return Object.values(res.payload)
          })
          if(newData) {
            myCurrencyDashboard.update(newData)
            elementsForm.sum.value = ''
            modal.remove()
            toast('Обмен прошёл успешно', 'success')
          }
        }
      )
    })
    const grid = el('div', {class: 'currency__grid'}, [
      myCurrencyDashboard.dashboard,
      currencyDashboard({
       title: 'Изменение курсов в реальном времени',
       all: true,
       soketURL: `${SOKET_URL}/currency-feed`,
      }).dashboard,
      changeCurrencyForm
    ])

    mount(container, grid)
    return container
  }
}

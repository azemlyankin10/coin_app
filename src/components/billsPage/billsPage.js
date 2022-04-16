import Choices from "choices.js";
import { el, mount, setChildren } from "redom";
import router, { URL } from "../../..";
import BaseComponent from "../BaseComponent";

export default class BillsPage extends BaseComponent {
  constructor() {
    super()
  }

  card(number, sum, lastTransaction) {
    const card = el('div', {class: 'grid-card-bills__card bills-card'}, [
      el('h2', {class: 'bills-card__title'}, number),
      el('span', {class: 'bills-card__subtitle'}, sum),
      el('div', {class: 'bills-card__footer'}, [
        el('p', {class: 'bills-card__footer-title'}, [
          'Последняя транзакция:',
          el('span', {class: 'bills-card__footer-subtitle'}, lastTransaction)
        ]),
        el('button', {class: 'btn bills-card__btn btn--normal'}, 'Открыть')
      ])
    ])
    return card
  }

  gridCards(data) {
    const container = el('div', {class: 'grid-card-bills'})
    setChildren(container, [
      data.map(el => {
        const { account, balance, transactions } = el
        const lastTransaction = this.getCorrectDate(transactions[transactions.length - 1].date)
        return this.card(account, `${balance} ₽`, lastTransaction)
      })
    ])
    return container
  }

  async render() {
    if(!this.key) return router.navigate('/auth')

    const data = this.payload.length < 0
    ? this.payload
    : await this.getData(`${URL}/accounts`, this.key)
            .then(res => {
              this.payload = res.payload
              if(res.error) throw TypeError = res.error
              else return res.payload
            })

    let domSelect
    const page = el('section', {class: 'section-bills'},
      el('div', {class: 'container section-bills__container'}, [
        el('form', {class: 'form form-bills'}, [
          el('div', {class: 'form-bills__container'}, [
            el('label', {class: 'form__title form-bills__title'}, 'Ваши счета'),
            domSelect = el('select', {class: 'form-bills__select'}, [
              el('option', {value: ''}, 'Сортировка'),
              el('option', {value: 'number'}, 'По номеру'),
              el('option', {value: 'bill'}, 'По балансу'),
              el('option', {value: 'last'}, 'По последней транзакции'),
            ])
          ]),
          el('button', {class: 'btn form-bills__btn btn--normal'}, [
            el('span', {class: 'form-bills__btn-icon'},),
            'Создать новый счёт'
          ])
        ]),
        this.gridCards(data)
      ])
    )

    new Choices(domSelect, {
      searchEnabled: false,
      itemSelectText: '',
      allowHTML: true
    })

    return page
  }
}

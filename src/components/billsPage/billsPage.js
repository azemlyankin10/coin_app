import Choices from "choices.js";
import { el, mount, setChildren } from "redom";
import { router } from "../../..";
import BaseComponent from "../BaseComponent";
import toast from "../toast/toast";

const LINK_FOR_DETAIL_PAGE = '/detail'

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
          lastTransaction ? 'Последняя транзакция:' : 'Транзакций не совершалось',
          el('span', {class: 'bills-card__footer-subtitle'}, lastTransaction)
        ]),
        el('a', {href: `${LINK_FOR_DETAIL_PAGE}?id=${number}`, 'data-navigo': '', class: 'btn bills-card__btn btn--normal'}, 'Открыть')
      ])
    ])
    return card
  }

  gridCards(data) {
    const container = el('div', {class: 'grid-card-bills'})
    setChildren(container, [
      data.map(el => {
        const { account, balance, transactions } = el
        const lastTransaction = transactions.length > 0 ? this.getCorrectDate(transactions[0].date) : false
        return this.card(account, `${balance} ₽`, lastTransaction)
      })
    ])

    this.cardsContainer = container
    return container
  }

  async render() {
    if(!this.key) return router.navigate('/auth')

    const data = this.payload.length < 0
    ? this.payload
    : await this.getData(this.key)
            .then(res => {
              this.payload = res.payload
              if(res.error) throw TypeError = res.error
              else return res.payload
            })

    toast('Авторизация пройшла успешно', 'success')

    const domSelect = el('select', {class: 'form-bills__select'}, [
      el('option', {value: ''}, 'Сортировка'),
      el('option', {value: 'number'}, 'По номеру'),
      el('option', {value: 'bill'}, 'По балансу'),
      el('option', {value: 'last'}, 'По последней транзакции'),
    ])
    const createNewbillBtn = el('button', {type: 'button', class: 'btn form-bills__btn btn--normal'}, [
      el('span', {class: 'form-bills__btn-icon'}),
      'Создать новый счёт'
    ])
    const page = el('main', {class: 'section-bills'},
      el('div', {class: 'container section-bills__container'}, [
        el('form', {class: 'form form-bills'}, [
          el('div', {class: 'form-bills__container'}, [
            el('label', {class: 'form__title title form-bills__title'}, 'Ваши счета'),
            domSelect
          ]),
          createNewbillBtn
        ]),
        this.gridCards(data)
      ])
    )

    new Choices(domSelect, {
      searchEnabled: false,
      itemSelectText: '',
      allowHTML: true
    })

    createNewbillBtn.addEventListener('click', () => {
      this.createNewBill(this.key).then(res => {
        if(res.error) return toast(error, 'error')
        const { account, balance } = res.payload
        mount(this.cardsContainer, this.card(account, `${balance} ₽`, false))
        toast('Баланс успешно создан', 'success')
      })
    })

    return page
  }
}

import Choices from "choices.js";
import { el, mount, setChildren } from "redom";
import { router } from "../../../..";
import { createNewBill, getData } from "../../Api";
import { getCorrectDate } from "../../commonFunctions";
import popup from "../../popup/popup";
import toast from "../../toast/toast";

const LINK_FOR_DETAIL_PAGE = '/detail'

export default class BillsPage {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  card(number, sum, lastTransaction) {
    const card = el('div', {class: 'grid-card-bills__card bills-card'}, [
      el('h2', {class: 'bills-card__title'}, number),
      el('span', {class: 'bills-card__subtitle'}, sum),
      el('div', {class: 'bills-card__footer'}, [
        el('p', {class: 'bills-card__footer-title'}, [
          lastTransaction ? 'Последняя транзакция:' : '',
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
        const lastTransaction = transactions.length > 0 ? getCorrectDate(transactions[0].date) : false
        return this.card(account, `${balance.toFixed(2)} ₽`, lastTransaction)
      })
    ])

    this.cardsContainer = container
    return container
  }

  async render() {
    if(!this.apiKey) return router.navigate('/auth')

    const data = await getData(this.apiKey)
      .then(res => {
        if(res.error) throw TypeError = res.error
        else return res.payload
      })


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

    const page = el('main', {class: 'main section-bills'},
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

    domSelect.addEventListener('change', e => {
      let sortedData
      switch (e.target.value) {
        case 'number':
          sortedData = data.sort((a, b) => a.account - b.account).reverse()
          break
        case 'bill':
          sortedData = data.sort((a, b) => a.balance - b.balance).reverse()
          break
        case 'last':
          sortedData = data.sort((a, b) => {
            let one = a.transactions.length > 0
                      ? new Date(a.transactions[a.transactions.length - 1].date)
                      : new Date('01/01/1970')
            let two = b.transactions.length > 0
                      ? new Date(b.transactions[b.transactions.length - 1].date)
                      : new Date('01/01/1970')
            return one - two
          }).reverse()
          break
      }
      this.cardsContainer.innerHTML = ''
      sortedData.map(elem => {
        const { account, balance, transactions } = elem
        const lastTransaction = transactions.length > 0 ? getCorrectDate(transactions[0].date) : false
        return mount(this.cardsContainer, this.card(account, `${balance.toFixed(2)} ₽`, lastTransaction))
      })

    })

    createNewbillBtn.addEventListener('click', () => {
      const modal = popup('Подтвердите действие', 'Для создания нового счёта, нажмите "ОК"', () => {
          createNewBill(this.apiKey).then(res => {
          if(res.error) return toast(error, 'error')
          const { account, balance } = res.payload
          mount(this.cardsContainer, this.card(account, `${balance.toFixed(2)} ₽`, false))
          modal.remove()
          toast('Баланс успешно создан', 'success')
        })
      })
    })

    return page
  }
}

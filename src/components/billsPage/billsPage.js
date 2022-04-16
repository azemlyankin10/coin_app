import Choices from "choices.js";
import { el, mount } from "redom";
import BaseComponent from "../BaseComponent";

export default class BillsPage extends BaseComponent {
  constructor(data) {
    super()
    this.data = data
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

  gridCards() {
    const container = el('div', {class: 'grid-card-bills'})
    mount(container, this.card('123456788932021', '3 523 ₽', '21 августа 2021'))

    mount(container, this.card('123456788932021', '3 523 ₽', '21 августа 2021'))

    mount(container, this.card('123456788932021', '3 523 ₽', '21 августа 2021'))

    mount(container, this.card('123456788932021', '3 523 ₽', '21 августа 2021'))

    mount(container, this.card('123456788932021', '3 523 ₽', '21 августа 2021'))


    return container
  }

  render() {
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
        this.gridCards()
      ])
    )

    new Choices(domSelect, {
      searchEnabled: false,
      itemSelectText: '',
      allowHTML: true
    })

    // console.log(this.getData('http://localhost:3000/accounts', 'ZGV2ZWxvcGVyOnNraWxsYm94'));
    console.log(this.getKey('http://localhost:3000/login', {
      login: "developer",
      password: "skillbox"
    }));

// console.log(this.a());
    return page
  }
}

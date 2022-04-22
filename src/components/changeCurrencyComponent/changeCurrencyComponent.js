import Choices from "choices.js"
import JustValidate from "just-validate"
import { el, mount, setChildren } from "redom"

const changeCurrencyComponent = (currencys, callback) => {
  const container = el('div', {class: 'changeCurrencyComponent'},
    el('h2', {class: 'changeCurrencyComponent__title'}, 'Обмен валюты')
  )
  const form = el('form', {class: 'changeCurrencyComponent__form'})
  const from = el('select', {id: 'from'})
  const to = el('select', {id: 'to'})
  const sum = el('input', {type: 'number', id: 'sum', class: 'changeCurrencyComponent__input'})
  const block = el('div', {class: 'changeCurrencyComponent__form-left'}, [
    el('div', {class: 'changeCurrencyComponent__input-container'}, [
      el('span', {class: 'changeCurrencyComponent__input-title'}, 'Из'),
      from
    ]),
    el('div', {class: 'changeCurrencyComponent__input-container'}, [
      el('span', {class: 'changeCurrencyComponent__input-title'}, 'в'),
      to
    ]),
    el('div', {class: 'changeCurrencyComponent__input-container'}, [
      el('span', {class: 'changeCurrencyComponent__input-title'}, 'Сумма'),
      sum
    ]),
  ])
  const btn = el('button', { class: 'changeCurrencyComponent__form-btn btn--normal'}, 'Обменять')

  setChildren(form, [block, btn])
  mount(container, form)

  const currencysArr = currencys.map(el => {
    return {value: el, label: el}
  })

  new Choices(from, {
    searchEnabled: false,
    itemSelectText: '',
    allowHTML: true,
    choices: currencysArr
  })

  new Choices(to, {
    searchEnabled: false,
    itemSelectText: '',
    allowHTML: true,
    choices: currencysArr
  })

  const validation = new JustValidate(form)
  validation
  .addField('#to', [
    {
      rule: 'required'
    }
  ])
    .addField('#from', [
      {
        rule: 'required'
      }
    ])
    .addField('#sum', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле',
      },
      {
        validator: (value) => {
          if(value < 1) return false
          return true
        },
        errorMessage: 'Введите коректное значение суммы',
      },
      {
        validator: (value) => {
          if(value.includes('.')) return false
          return true
        },
        errorMessage: 'Введите целое число',
      },
      {
        validator: (value, fields) => {
          if(fields['#from'].elem.value === fields['#to'].elem.value) return false
          return true
        },
        errorMessage: 'Выберите разные валюты'
      }
    ])
    .onSuccess(callback)

  return container
}

export default changeCurrencyComponent

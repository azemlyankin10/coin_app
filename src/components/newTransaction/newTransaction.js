import { el, setChildren } from "redom"
import JustValidate from 'just-validate';

const LOCAL_STORAGE = 'coin_bills_transfers'

const newTansactionComponent = () => {
  const form = el('form', {class: 'form form-transaction'})
  const title = el('h2', {class: 'form__title form-transaction__title'}, 'Новый перевод')
  const inputNumber = el('input', {type: 'number', id: 'billNumber', name: 'bill', autocomplete: 'off', class: 'form__input form-transaction__input', placeholder: 'Введите номер счета получателя'})
  inputNumber.addEventListener('click', () => formNumberContainer.classList.add('active'))
  window.addEventListener('click', e => {
    if(e.target !== dropdown && e.target !== inputNumber) return formNumberContainer.classList.remove('active')
  })

  const transferedNumber = localStorage.getItem(LOCAL_STORAGE)
                           ? localStorage.getItem(LOCAL_STORAGE)
                           .trim()
                           .split(',')
                           .reverse()
                           .filter(el => el.length > 0)
                           .filter((item, index, arr) => arr.indexOf(item) === index)
                           : []

  const dropdown = el('ul', {class: 'form-transaction__input-dropdown-list'}, [
    transferedNumber.map(num => {
      const btn = el('li', {class: 'form-transaction__input-dropdown-item'},
        el('button', {type: 'button', class: 'form-transaction__input-dropdown-button'}, num)
      )
      btn.addEventListener('click', () => {
        inputNumber.value = btn.textContent
        formNumberContainer.classList.remove('active')
      })
      return btn
    })
  ])

  const formNumberContainer = el('div', {class: 'form-transaction__input-container', id: 'dropbox-container'}, [
    el('label', {class: 'form__label form-transaction__label'}, 'Номер счёта получателя'),
    el('div', {class: 'form-transaction__input-dropdown-container'}, [
      inputNumber,
      dropdown
    ])
  ])
  const inputTotal = el('input', {type: 'number', id: 'totalSum', name: 'sum', class: 'form__input form-transaction__input', placeholder: 'Введите сумму'})
  const formTotalContainer = el('div', {class: 'form-transaction__input-container'}, [
    el('label', {class: 'form__label form-transaction__label'}, 'Сумма перевода'),
    inputTotal
  ])
  const btn = el('button', {type: 'submit', class: 'btn form__btn form-transaction__btn btn--normal'}, 'Отправить')

  setChildren(form, [
    title,
    formNumberContainer,
    formTotalContainer,
    btn
  ])

  const validation = new JustValidate(form)
  validation
    .addField('#billNumber', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле',
      },
      {
        rule: 'minLength',
        value: 20,
        errorMessage: 'Слишком мало символов'
      },
      {
        rule: 'maxLength',
        value: 35,
        errorMessage: 'Слишком много символов'
      },
    ])
    .addField('#totalSum', [
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
    ])
    .onSuccess((e) => {
      let localStore = localStorage.getItem(LOCAL_STORAGE) || ''
      localStore += e.target.elements.bill.value + ','
      localStorage.setItem(LOCAL_STORAGE, localStore)

    })

  return form
}

export default newTansactionComponent

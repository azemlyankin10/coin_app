import { el, mount } from "redom";
import JustValidate from 'just-validate';
import { router} from "../../../..";
import { getKey } from "../../Api";
import toast from "../../toast/toast";
import Loaders from "../../loaders-skeleton/loaders";

const SESSION_STORAGE = 'coin_key'

export default class Auth {

  form() {
    const auth = el('div', {class: 'auth'})
    const form = el('form', {class: 'form-auth form'}, [
      el('h2', {class: 'form__title form-auth__title'}, 'Вход в аккаунт'),
      el('div', {class: 'form-auth__input-container'}, [
        el('label', {class: 'form__lable form-auth__lable'}, 'Логин'),
        el('input', {type: 'text', class: 'form__input form-auth__input', placeholder: 'Введите логин', name: 'login', id: 'login'})
      ]),
      el('div', {class: 'form-auth__input-container'}, [
        el('label', {class: 'form__lable form-auth__lable'}, 'Пароль'),
        el('input', {type: 'password', class: 'form__input form-auth__input', placeholder: 'Введите пароль', name: 'password', id: 'password'})
      ]),
      el('button', {class: 'btn form__btn form-auth__btn btn--normal'}, 'Войти')
    ])


    const validation = new JustValidate(form);
    validation
      .addField('#login', [
        {
          rule: 'required',
          errorMessage: 'Обязательное поле',
        },
        {
          rule: 'minLength',
          value: 6,
          errorMessage: 'Логин должен содержать минимут 6 символов'
        },
        {
          rule: 'maxLength',
          value: 12,
          errorMessage: 'Логин должен содержать максимум 12 символов'
        },
      ])
      .addField('#password', [
        {
          rule: 'required',
          errorMessage: 'Обязательное поле',
        },
        {
          rule: 'minLength',
          value: 6,
          errorMessage: 'Пароль должен состоять минимум с 6 символов'
        },
        {
          rule: 'maxLength',
          value: 12,
          errorMessage: 'Пароль должен содержать максимум 12 символов'
        },
      ])
      .onSuccess(async e => {
        const loader = new Loaders()
        loader.authLoader()
        const login = e.target.elements.login.value
        const password = e.target.elements.password.value
        await getKey({ login, password })
          .then(res => {
            const { error, payload } = res
            if(!error && payload) {
              // apiKey = payload.token
              sessionStorage.setItem(SESSION_STORAGE, payload.token)
              router.navigate('/bills')
            } else {
              toast(error, 'error')
            }
          })
        loader.remove()
      })

    mount(auth, form)
    return auth
  }
}


import { el } from "redom";

export default class Auth {

  get form() {
    const auth = el('div', {class: 'auth'},
      el('form', {class: 'form-auth form'}, [
        el('h2', {class: 'form__title form-auth__title'}, 'Вход в аккаунт'),
        el('div', {class: 'form-auth__input-container'}, [
          el('label', {class: 'form__lable form-auth__lable'}, 'Логин'),
          el('input', {type: 'text', class: 'form__input form-auth__input', placeholder: 'Введите логин'})
        ]),
        el('div', {class: 'form-auth__input-container'}, [
          el('label', {class: 'form__lable form-auth__lable'}, 'Пароль'),
          el('input', {type: 'text', class: 'form__input form-auth__input', placeholder: 'Введите пароль'})
        ]),
        el('button', {class: 'btn form__btn form-auth__btn btn--normal'}, 'Войти')
      ])
    )

    return auth
  }
}

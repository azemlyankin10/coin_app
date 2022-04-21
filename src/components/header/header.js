import { el } from "redom"
import logo from '../../assets/img/logo.png'

export default class Header {
  constructor (buttons) {
    this.buttons = buttons
  }

  createNavigation() {
    let burger
    const navigation = el('nav', {class: 'header__nav nav'}, [
      burger = el('button', {type: 'button', class: 'nav__burger burger-menu'}, [
        el('span', {class: 'burger-menu__line'}, ''),
        el('span', {class: 'burger-menu__line'}, ''),
        el('span', {class: 'burger-menu__line'}, '')
      ]),
      el('div', {class: 'nav__btn-group'}, [
        el('a', {class: 'btn nav__btn btn--outline'}, 'Банкоматы'),
        el('a', {href: '/bills', class: `btn nav__btn btn--outline ${location.pathname === '/bills' ? 'active' : ''}`}, 'Счета'),
        el('a', {class: 'btn nav__btn btn--outline'}, 'Валюта'),
        el('a', {href: '/auth', 'data-navigo': '', class: 'btn nav__btn btn--outline'}, 'Выйти'),
      ])]
    )

    burger.addEventListener('click', () => burger.classList.toggle('active'))
    return navigation
  }

  createHeader() {
    const header = el('header', {class: 'header'},
      el('div', {class: 'container header__container'},
        [
          el('a', {href: '/', 'data-navigo': '', class: 'header__logo-link'},
            el('img', {src: logo, alt: 'logo', class: 'header__logo-img'})
          ),
          this.buttons ? this.createNavigation() : null
        ]
      )
    )

    return header
  }
}


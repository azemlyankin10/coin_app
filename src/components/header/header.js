import { el } from "redom"
import logo from '../../assets/img/logo.png'

export default class Header {
  constructor (buttons) {
    this.buttons = buttons
  }

  createNavigation() {
    const burger = el('button', {type: 'button', class: 'nav__burger burger-menu'}, [
      el('span', {class: 'burger-menu__line'}, ''),
      el('span', {class: 'burger-menu__line'}, ''),
      el('span', {class: 'burger-menu__line'}, '')
    ])
    const navBtns = el('div', {class: 'nav__btn-group'}, [
      el('a', {href: '/atm', class: `btn nav__btn btn--outline ${location.pathname === '/atm' ? 'active' : ''}`}, 'Банкоматы'),
      el('a', {href: '/bills', class: `btn nav__btn btn--outline ${location.pathname === '/bills' ? 'active' : ''}`}, 'Счета'),
      el('a', {href: '/currency', class: `btn nav__btn btn--outline ${location.pathname === '/currency' ? 'active' : ''}`}, 'Валюта'),
      el('a', {href: '/auth', class: 'btn nav__btn btn--outline'}, 'Выйти'),
    ])
    const navigation = el('nav', {class: 'header__nav nav'}, [burger, navBtns])

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


import { el, mount, setChildren } from "redom";

export default class Loaders {

  remove() {
    this.loader.remove()
  }

  authLoader() {
    const loader = el('div', {class: 'loader-skeleton container'},
      [
        el('div', {class: 'loader-skeleton__auth-container'},
          el('div', {class: 'loader-skeleton__auth'})
        )
      ]
    )
    this.loader = loader
    return mount(document.querySelector('.app'), loader)
  }

  billsLoader() {
    const loader = el('div', {class: 'bills-page-skeleton-loader container'})
    const header = el('div', {class: 'bills-page-skeleton-loader__header'}, [
      el('span', {class: 'bills-page-skeleton-loader__header-logo'}),
      el('ul', {class: 'bills-page-skeleton-loader__header-buttons'}, [
        el('li', {class: 'bills-page-skeleton-loader__header-btn'}),
        el('li', {class: 'bills-page-skeleton-loader__header-btn'}),
        el('li', {class: 'bills-page-skeleton-loader__header-btn'}),
        el('li', {class: 'bills-page-skeleton-loader__header-btn'}),
      ])
    ])
    const main = el('div', {class: 'bills-page-skeleton-loader__main'})
    const form = el('div', {class: 'bills-page-skeleton-loader__main-form'}, [
      el('span', {class: 'bills-page-skeleton-loader__main-title'}),
      el('span', {class: 'bills-page-skeleton-loader__main-input'}),
      el('span', {class: 'bills-page-skeleton-loader__main-btn'}),
    ])
    const grid = el('div', {class: 'bills-page-skeleton-loader__main-grid'})
    for(let i = 0; i < 6; i++) {
      const card = el('div', {class: 'bills-page-skeleton-loader__main-card'}, [
        el('span', {class: 'bills-page-skeleton-loader__main-card-title'}),
        el('span', {class: 'bills-page-skeleton-loader__main-card-subtitle'}),
        el('span', {class: 'bills-page-skeleton-loader__main-card-btn'}),
      ])
      mount(grid, card)
    }
    setChildren(main, [form, grid])
    setChildren(loader, [header, main])

    this.loader = loader
    return mount(document.querySelector('.app'), loader)
  }


}

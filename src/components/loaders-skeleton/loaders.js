import { el, mount, setChildren } from "redom";

export default class Loaders {

  headerLoader() {
    const header = el('div', {class: 'loader__header'}, [
      el('span', {class: 'loader__header-logo'}),
      el('ul', {class: 'loader__header-buttons'}, [
        el('li', {class: 'loader__header-btn'}),
        el('li', {class: 'loader__header-btn'}),
        el('li', {class: 'loader__header-btn'}),
        el('li', {class: 'loader__header-btn'}),
      ])
    ])

    return header
  }

  remove() {
    document.body.style.overflow = 'visible'
    this.loader.remove()
  }

  authLoader() {
    document.body.style.overflow = 'hidden'
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
    document.body.style.overflow = 'hidden'
    const loader = el('div', {class: 'bills-page-skeleton-loader container'})
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
    setChildren(loader, [this.headerLoader(), main])

    this.loader = loader
    return mount(document.querySelector('.app'), loader)
  }

  billsDetailLoader() {
    document.body.style.overflow = 'hidden'
    const loader = el('div', {class: 'bil-deteil-loader container'})
    const topSide = el('div', {class: 'bil-deteil-loader__top'}, [
      el('div', {class: 'bil-deteil-loader__top-left'}),
      el('div', {class: 'bil-deteil-loader__top-right'}),
    ])
    const main = el('div', {class: 'bil-deteil-loader__main'}, [
      el('span', {class: 'bil-deteil-loader__main-1'}),
      el('span', {class: 'bil-deteil-loader__main-2'}),
      el('span', {class: 'bil-deteil-loader__main-3'}),
    ])
    setChildren(loader, [this.headerLoader(), topSide, main])
    this.loader = loader
    return mount(document.querySelector('.app'), loader)
  }

  billHistoryLoader() {
    document.body.style.overflow = 'hidden'
    const loader = el('div', {class: 'bil-history bil-deteil-loader container'})
    const topSide = el('div', {class: 'bil-deteil-loader__top'}, [
      el('div', {class: 'bil-deteil-loader__top-left'}),
      el('div', {class: 'bil-deteil-loader__top-right'}),
    ])
    const main = el('div', {class: 'bil-deteil-loader__main'}, [
      el('span', {class: 'bil-deteil-loader__main-1'}),
      el('span', {class: 'bil-deteil-loader__main-2'}),
      el('span', {class: 'bil-deteil-loader__main-3'}),
    ])
    setChildren(loader, [this.headerLoader(), topSide, main])
    this.loader = loader
    return mount(document.querySelector('.app'), loader)
  }

  currencyPageLoader() {
    document.body.style.overflow = 'hidden'
    const loader = el('div', {class: 'container currency-loader'}, [
      this.headerLoader(),
      el('span', {class: 'currency-loader__block-1'}),
      el('span', {class: 'currency-loader__block-2'}),
      el('span', {class: 'currency-loader__block-3'}),
    ])

    this.loader = loader

    return mount(document.querySelector('.app'), loader)
  }

  mapPageLoader() {
    document.body.style.overflow = 'hidden'
    const loader = el('div', {class: 'container map-loader'}, [
      this.headerLoader(),
      el('span', {class: 'map-loader__block-1'}),
      el('span', {class: 'map-loader__block-2'})
    ])

    this.loader = loader

    return mount(document.querySelector('.app'), loader)
  }

}

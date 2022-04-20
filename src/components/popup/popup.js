import { el, mount, setChildren } from "redom"

const popup = (title, textContent, callback) => {
  const popup = el('div', {class: 'popup'})
  const popupContainer = el('div', {class: 'popup__container'})
  const closeBtn = el('button', {type: 'button', class: 'popup__btn-close'})
  const header = el('div', {class: 'popup__header'}, [
    el('span', {class: 'popup__title'}, title),
    closeBtn
  ])
  const text = el('p', {class: 'popup__text'}, textContent)
  const footer = el('div', {class: 'popup__footer'})
  const cancelBtn = el('button', {type: 'button', class: 'popup__footer-btn popup__footer-btn--cancel btn'}, 'Отменить')
  const successBtn = el('button', {type: 'button', class: 'popup__footer-btn popup__footer-btn--ok btn btn--normal'}, 'ОК')
  setChildren(footer, [cancelBtn, successBtn])
  setChildren(popupContainer, [header, text, footer])
  mount(popup, popupContainer)

  mount(document.body, popup)

  window.addEventListener('click', e => {
    if(e.target === popup || e.target === closeBtn || e.target === cancelBtn) {
      remove()
    }
  })
  successBtn.addEventListener('click', callback)

  function remove() {
    return popup.remove()
  }

  return {remove}
}
export default popup

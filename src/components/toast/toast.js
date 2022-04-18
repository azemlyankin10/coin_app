import { el, mount } from "redom"

const toast = (text, status) => {
  const closeBtn = el('button', {type: 'button', class: 'toast__close'})
  const toast = el('div', {class: `toast ${status}`}, [
    el('p', {class: 'toast__content'}, text),
    closeBtn
  ])

  closeBtn.addEventListener('click', () => {
    toast.remove()
  })

  setTimeout(() => {
    toast.remove()
  }, 4000)

  const toastContainer = el('div', {class: 'toast-container'})

  if(document.querySelector('.toast-container')) return mount(document.querySelector('.toast-container'), toast)

  mount(toastContainer, toast)
  return mount(document.body, toastContainer)
}

export default toast

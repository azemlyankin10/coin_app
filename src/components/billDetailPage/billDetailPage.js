import { el, mount, setChildren } from "redom";
import { router } from "../../..";
import BaseComponent from "../BaseComponent";
import graphComponent from "../graph/graph";
import historyTransactionsComponent from "../historyTransactions.js/historyTransactions";
import TansactionComponent, { LOCAL_STORAGE } from "../newTransaction/newTransaction";
import popup from "../popup/popup";
import toast from "../toast/toast";

const transactionComponent = new TansactionComponent()
export default class BillDetailPage extends BaseComponent {
  constructor(id) {
    super()
    this.id = id
  }

  async render() {
    if(!this.key) return router.navigate('/auth')
    const data = await this.getDetail(this.id, this.key)
    if(data.error) toast(data.error, 'error')

    const billDetailPage = el('main', {class: 'main bill-detail-page container'})
    const headBtn = el('a', {href: '/bills', 'data-navigo': '', class: 'bill-detail-page__btn btn btn--normal'}, [
      el('span', {class: 'bill-detail-page__btn-icon'}),
      'Вернуться назад'
    ])
    const balanceDom = el('span', {class: 'bill-detail-page__total'}, `${data.payload.balance.toFixed(2)} ₽`)
    const billDetailPageHeader = el('div', {class: 'bill-detail-page__head'}, [
      el('div', {class: 'bill-detail-page__head-left'}, [
        el('h1', {class: 'bill-detail-page__title title'}, 'Просмотр счёта'),
        el('span', {class: 'bill-detail-page__bill-number'}, `№ ${data.payload.account}`)
      ]),
      el('div', {class: 'bill-detail-page__head-right'}, [
        headBtn,
        el('div', {class: 'bill-detail-page__total-container'}, [
          el('span', {class: 'bill-detail-page__total-title'}, 'Баланс'),
          balanceDom
        ])
      ])
    ])

    const transactionForm = transactionComponent.form(() => {
      const modal = popup(
        'Подтверждение транзанции',
        `Вы действительно хотите перевести ${transactionForm.elements.sum.value} ₽ на счёт № ${transactionForm.elements.bill.value}`,
        async () => {
        const newData = await this.transfer(
          {
            from: data.payload.account,
            to: transactionForm.elements.bill.value,
            amount: transactionForm.elements.sum.value,
          },
          this.key)
        if(newData.error) return toast(newData.error, 'error')

        balanceDom.textContent = newData.payload.balance.toFixed(2)
        this.graph.remove()
        this.graph = graphComponent(this.getSortBills(newData.payload))
        mount(billDetailPageMainContent, this.graph)
        this.dashboard.remove()
        this.dashboard = historyTransactionsComponent(newData.payload.account, newData.payload.transactions)
        mount(billDetailPageMainContent, this.graph)
        mount(billDetailPageMainContent, this.dashboard)
        toast('Транзакция пройшла успешно', 'success')

        let localStore = localStorage.getItem(LOCAL_STORAGE) || ''
        localStore += transactionForm.elements.bill.value + ','
        localStorage.setItem(LOCAL_STORAGE, localStore)
        transactionComponent.updeteDropdown()
        transactionForm.elements.bill.value = ''
        transactionForm.elements.sum.value = ''
        modal.remove()
      })
    })

    this.graph = graphComponent(this.getSortBills(data.payload))
    this.dashboard = historyTransactionsComponent(data.payload.account, data.payload.transactions)
    const billDetailPageMainContent = el('div', {class: 'bill-detail-page__main-content'}, [transactionForm, this.graph, this.dashboard])

    setChildren(billDetailPage, [
      billDetailPageHeader,
      billDetailPageMainContent
    ])
    return billDetailPage
  }
}

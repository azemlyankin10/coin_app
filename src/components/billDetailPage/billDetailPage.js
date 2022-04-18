import { el, setChildren } from "redom";
import { router } from "../../..";
import BaseComponent from "../BaseComponent";
import graphComponent from "../graph/graph";
import historyTransactionsComponent from "../historyTransactions.js/historyTransactions";
import newTansactionComponent from "../newTransaction/newTransaction";
import toast from "../toast/toast";

export default class BillDetailPage extends BaseComponent {
  constructor(id) {
    super()
    this.id = id
  }

  async render() {
    // if(!this.key) return router.navigate('/auth')
    const data = await this.getDetail(this.id, this.key)
    if(data.error) toast(data.error)

    // console.log();


    const billDetailPage = el('main', {class: 'bill-detail-page container'})
    const headBtn = el('button', {class: 'bill-detail-page__btn btn btn--normal'}, [
      el('span', {class: 'bill-detail-page__btn-icon'}),
      'Вернуться назад'
    ])
    const billDetailPageHeader = el('div', {class: 'bill-detail-page__head'}, [
      el('div', {class: 'bill-detail-page__head-left'}, [
        el('h1', {class: 'bill-detail-page__title title'}, 'Просмотр счёта'),
        el('span', {class: 'bill-detail-page__bill-number'}, `№ ${data.payload.account}`)
      ]),
      el('div', {class: 'bill-detail-page__head-right'}, [
        headBtn,
        el('div', {class: 'bill-detail-page__total-container'}, [
          el('span', {class: 'bill-detail-page__total-title'}, 'Баланс'),
          el('span', {class: 'bill-detail-page__total'}, `${data.payload.balance} ₽`)
        ])
      ])
    ])

    const billDetailPageMainContent = el('div', {class: 'bill-detail-page__main-content'}, [
      newTansactionComponent(),
      graphComponent(this.getSortBills(data.payload.transactions)),
      historyTransactionsComponent(data.payload.transactions)
    ])

    setChildren(billDetailPage, [
      billDetailPageHeader,
      billDetailPageMainContent
    ])
    return billDetailPage
  }
}

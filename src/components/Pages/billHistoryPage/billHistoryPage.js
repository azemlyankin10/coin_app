import { el, setChildren } from "redom";
import { getDetail } from "../../Api";
import { getSortBills } from "../../commonFunctions";
import { balanceGraphComponent, transactionsGraphComponent } from "../../graph/graph";
import historyTransactionsComponent from "../../historyTransactions.js/historyTransactions";
import toast from "../../toast/toast";
import Sortable from 'sortablejs'

const MONTH = 11

export default class BillHistoryPage {
  constructor(apiKey, id) {
    this.apiKey = apiKey
    this.id = id
  }

  async render() {
    if(!this.apiKey) return router.navigate('/auth')
    const data = await getDetail(this.id, this.apiKey)
    if(data.error) toast(data.error, 'error')

    const page = el('main', {class: 'main bill-history-page bill-detail-page container'})
    const header = el('div', {class: 'bill-detail-page__head'}, [
      el('div', {class: 'bill-detail-page__head-left'}, [
        el('h1', {class: 'bill-detail-page__title title'}, 'История баланса'),
        el('span', {class: 'bill-detail-page__bill-number'}, `№ ${data.payload.account}`)
      ]),
      el('div', {class: 'bill-detail-page__head-right'}, [
        el('a', {href: `/detail?id=${this.id}`, 'data-navigo': '', class: 'bill-detail-page__btn btn btn--normal'}, [
          el('span', {class: 'bill-detail-page__btn-icon'}),
          'Вернуться назад'
        ]),
        el('div', {class: 'bill-detail-page__total-container'}, [
          el('span', {class: 'bill-detail-page__total-title'}, 'Баланс'),
          el('span', {class: 'bill-detail-page__total'}, `${data.payload.balance.toFixed(2)} ₽`)
        ])
      ])
    ])

    const graphBalance = balanceGraphComponent(getSortBills(data.payload, MONTH))
    const graphTransactons = transactionsGraphComponent(getSortBills(data.payload, MONTH))
    const dashboard = historyTransactionsComponent(data.payload.account, data.payload.transactions)

    setChildren(page, [header, graphBalance, graphTransactons, dashboard])

    new Sortable(page)

    return page
  }
}

import './index.scss'
import Navigo from 'navigo';
import { mount } from 'redom';

import Auth from './src/components/Pages/auth/auth';
import Header from "./src/components/header/header";
import BillsPage from './src/components/Pages/billsPage/billsPage';
import BillDetailPage from './src/components/Pages/billDetailPage/billDetailPage';
import Loaders from './src/components/loaders-skeleton/loaders';
import BillHistoryPage from './src/components/Pages/billHistoryPage/billHistoryPage';
import CurrencyPage from './src/components/Pages/currencyPage/currencyPage';

export const URL = 'http://localhost:3000'
export const SOKET_URL = 'ws://localhost:3000'

console.log(apiKey);
const app = document.querySelector('.app')
const loader = new Loaders()
let apiKey
export const router = new Navigo("/");
router
  .on('/', () => router.navigate('/bills'))
  .on("/bills", async () => {
    apiKey = sessionStorage.getItem('coin_key')
    document.title = 'COIN-счета'
    app.innerHTML = ''
    loader.billsLoader()
    mount(app, new Header(true).createHeader())
    mount(app, await new BillsPage(apiKey).render())
    setTimeout(() => loader.remove(), 1000)

  })
  .on("/auth", () => {
    document.title = 'COIN-авторизация'
    app.innerHTML = ''
    mount(app, new Header().createHeader())
    mount(app, new Auth().form())
  })
  .on('/detail?:id', async (data) => {
    apiKey = sessionStorage.getItem('coin_key')
    document.title = `COIN-№${data.params.id}`
    app.innerHTML = ''
    loader.billsDetailLoader()
    mount(app, new Header(true).createHeader())
    mount(app, await new BillDetailPage(apiKey, data.params.id).render())
    setTimeout(() => loader.remove(), 1000)

  })
  .on('/history?:id', async (data) => {
    apiKey = sessionStorage.getItem('coin_key')
    document.title = `COIN-№${data.params.id}`
    app.innerHTML = ''
    loader.billHistoryLoader()
    mount(app, new Header(true).createHeader())
    mount(app, await new BillHistoryPage(apiKey, data.params.id).render())
    setTimeout(() => loader.remove(), 1000)
  })
  .on('/currency', async () => {
    apiKey = sessionStorage.getItem('coin_key')
    document.title = 'COIN-currency'
    app.innerHTML = ''
    loader.currencyPageLoader()
    mount(app, new Header(true).createHeader())
    mount(app, await new CurrencyPage(apiKey).render())
    setTimeout(() => loader.remove(), 1000)
  })
  .resolve();







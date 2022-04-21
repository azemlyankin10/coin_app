import './index.scss'
import Navigo from 'navigo';
import { mount } from 'redom';

import Auth from './src/components/Pages/auth/auth';
import Header from "./src/components/header/header";
import BillsPage from './src/components/Pages/billsPage/billsPage';


import BillDetailPage from './src/components/Pages/billDetailPage/billDetailPage';
import Loaders from './src/components/loaders-skeleton/loaders';
import BillHistoryPage from './src/components/Pages/billHistoryPage/billHistoryPage';

export const URL = 'http://localhost:3000'

const app = document.querySelector('.app')
const loader = new Loaders()
export const router = new Navigo("/");

router
  .on('/', () => router.navigate('/bills'))
  .on("/bills", async () => {
    document.title = 'COIN-счета'
    app.innerHTML = ''
    loader.billsLoader()
    mount(app, new Header(true).createHeader())
    mount(app, await new BillsPage().render())
    setTimeout(() => loader.remove(), 1000)

  })
  .on("/auth", () => {
    document.title = 'COIN-авторизация'
    app.innerHTML = ''
    mount(app, new Header().createHeader())
    mount(app, new Auth().form())
  })
  .on('/detail?:id', async (data) => {
    document.title = `COIN-№${data.params.id}`
    app.innerHTML = ''
    loader.billsDetailLoader()
    mount(app, new Header(true).createHeader())
    mount(app, await new BillDetailPage(data.params.id).render())
    setTimeout(() => loader.remove(), 1000)

  })
  .on('/history?:id', async (data) => {
    document.title = `COIN-№${data.params.id}`
    app.innerHTML = ''
    loader.billHistoryLoader()
    mount(app, new Header(true).createHeader())
    mount(app, await new BillHistoryPage(data.params.id).render())
    setTimeout(() => loader.remove(), 1000)
  })
  .resolve();








import './index.scss'
import Navigo from 'navigo';
import { mount } from 'redom';

import Auth from './src/components/auth/auth';
import Header from "./src/components/header/header";
import BillsPage from './src/components/billsPage/billsPage';


import BillDetailPage from './src/components/billDetailPage/billDetailPage';
import Loaders from './src/components/loaders-skeleton/loaders';
// import popup from './src/components/popup/popup';

export const URL = 'http://localhost:3000'

const app = document.querySelector('.app')

export const router = new Navigo("/");

router
  .on('/', () => router.navigate('/bills'))
  .on("/bills", async () => {
    document.title = 'COIN-счета'
    app.innerHTML = ''
    const loader = new Loaders()
    loader.billsLoader()
    mount(app, new Header(true).createHeader())
    mount(app, await new BillsPage().render())
    setTimeout(() => loader.remove(), 1000)

  })
  .on("/auth", () => {
    // console.log(popup());
    document.title = 'COIN-авторизация'
    app.innerHTML = ''
    mount(app, new Header().createHeader())
    mount(app, new Auth().form())
  })
  .on('/detail?:id', async (data) => {
    document.title = `COIN-№${data.params.id}`
    app.innerHTML = ''
    mount(app, new Header(true).createHeader())
    mount(app, await new BillDetailPage(data.params.id).render())
  })
  .resolve();







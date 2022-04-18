
import './index.scss'
import Navigo from 'navigo';
import { mount } from 'redom';

import Auth from './src/components/auth/auth';
import Header from "./src/components/header/header";
import BillsPage from './src/components/billsPage/billsPage';


import BillDetailPage from './src/components/billDetailPage/billDetailPage';

export const URL = 'http://localhost:3000'

const app = document.querySelector('.app')

export const router = new Navigo("/");

router
  .on("/", async () => {
    app.innerHTML = ''
    mount(app, new Header(true).createHeader())
    mount(app, await new BillsPage().render())
  })
  .on("/auth", () => {

    app.innerHTML = ''
    mount(app, new Header().createHeader())
    mount(app, new Auth().form)
  })
  .on('/detail?:id', async (data) => {
    app.innerHTML = ''
    mount(app, new Header(true).createHeader())
    mount(app, await new BillDetailPage(data.params.id).render())
  })
  .resolve();







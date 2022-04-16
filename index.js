import Navigo from 'navigo';

import Auth from './src/components/auth/auth';
import Header from "./src/components/header/header";
import BillsPage from './src/components/billsPage/billsPage';


import './index.scss'

export const URL = 'http://localhost:3000'

const router = new Navigo("/");


window.addEventListener("load", () => {
  const app = document.querySelector('.app')

  router
    .on("/", async () => {
      app.innerHTML = ''
      app.append(new Header(true).createHeader())
      app.append(await new BillsPage().render())
    })
    .on("/auth", () => {
      app.innerHTML = ''
      app.append(new Header().createHeader())
      app.append(new Auth().form)
    })

    .resolve();



})


export default router

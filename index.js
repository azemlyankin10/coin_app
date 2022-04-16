import Navigo from 'navigo';

import Auth from './src/components/auth/auth';
import Header from "./src/components/header/header";
import BillsPage from './src/components/billsPage/billsPage';


import './index.scss'

window.addEventListener("load", () => {
  const app = document.querySelector('.app')
  const router = new Navigo("/");

  router
    .on("/", () => {
      app.innerHTML = ''
      app.append(new Header(true).createHeader())
      app.append(new BillsPage().render())
    })
    .on("/auth", () => {
      app.innerHTML = ''
      app.append(new Header().createHeader())
      app.append(new Auth().form)
    })

    .resolve();



})



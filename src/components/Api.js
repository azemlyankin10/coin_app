import { URL } from "../.."
import toast from "./toast/toast"

// POST
export const getKey = async objLoginData => {
  try {
    const res = await fetch(`${URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objLoginData)
    })
    return await res.json()
  } catch (error) {
    toast(error.message, 'error')
  }
}

export const createNewBill = key => {
  return fetch(`${URL}/create-account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${key}`
    },
  }).then(res => res.json())
}

export const transfer = (objData, key) => {
  return fetch(`${URL}/transfer-funds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${key}`
    },
    body: JSON.stringify(objData)
  }).then(res => res.json())
}

export const changeCurrency = (objData, key) => {
  return fetch(`${URL}/currency-buy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${key}`
    },
    body: JSON.stringify(objData)
  }).then(res => res.json())
}

// GET
export const getData = key => {
  return fetch(`${URL}/accounts`, {headers: {Authorization: `Basic ${key}`}})
    .then(res => res.json())
}

export const getDetail = (id, key) => {
  return fetch(`${URL}/account/${id}`, {headers: {Authorization: `Basic ${key}`}})
    .then(res => res.json())
}

export const getMyCurrency = key => {
  return fetch(`${URL}/currencies`, {headers: {Authorization: `Basic ${key}`}})
    .then(res => res.json())
}

export const getCurrencyNames = () => {
  return fetch(`${URL}/all-currencies`)
    .then(res => res.json())
}

export const getBanks = () => {
  return fetch(`${URL}/banks`)
    .then(res => res.json())
}


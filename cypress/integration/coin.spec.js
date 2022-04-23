/// <reference types="cypress" />
describe('Coin test', () => {

  it('Ввод не сущеcтвующих логина и пароля', () => {
    cy.visit('localhost:8080/auth')
    cy.get('#login').type('falsevalue')
    cy.get('#password').type('falsevalue')
    cy.contains('Войти').click()
    cy.get('.toast').should('have.class', 'error')
  })

  it('Ввод существующего логина и пароля', () => {
    cy.visit('localhost:8080/auth')
    cy.get('#login').type('developer')
    cy.get('#password').type('skillbox')
    cy.contains('Войти').click()
    cy.get('main').should('have.class', 'section-bills')
  })

  it('Создание нового счёта', () => {
    cy.visit('localhost:8080/bills')
    cy.get('.form-bills__btn').click()
    cy.get('.popup__footer-btn--ok').click()
    cy.get('.toast').should('have.class', 'success')
  })

  it('Переход на детальную страницу счета и успешный перевод средств', () => {
    cy.visit('localhost:8080/bills')
    cy.get('.bills-card__btn:first').click()
    cy.get('#billNumber').type('61253747452820828268825011')
    cy.get('#totalSum').type('10')
    cy.get('.form-transaction__btn').click()
    cy.get('.popup__footer-btn--ok').click()
    cy.get('.toast').should('have.class', 'success')
  })

  it('Проверка валидации формы нового перевода', () => {
    cy.get('.form-transaction__btn').click()
    cy.get('.just-validate-error-label:first').should('have.text', 'Обязательное поле')

  })

  it('Попытка перевода недостающих средств', () => {
    cy.visit('localhost:8080/bills')
    cy.get('.bills-card__btn:first').click()
    cy.get('#billNumber').type('61253747452820828268825011')
    cy.get('#totalSum').type('1000000000000000000000000000000')
    cy.get('.form-transaction__btn').click()
    cy.get('.popup__footer-btn--ok').click()
    cy.get('.toast').should('have.class', 'error')
  })

  it('Удачный обмен валют', () => {
    cy.visit('localhost:8080/currency')
    cy.get('.choices:first').click()
    cy.get('#choices--from-item-choice-2').click()
    cy.get('#sum').type('1')
    cy.get('.changeCurrencyComponent__form-btn').click()
    cy.get('.popup__footer-btn--ok').click()
    cy.get('.toast').should('have.class', 'success')
  })

  it('Попытка произвести обмен одинаковой валюты', () => {
    cy.visit('localhost:8080/currency')
    cy.get('#sum').type('1')
    cy.get('.changeCurrencyComponent__form-btn').click()
    cy.get('.just-validate-error-label').should('have.text', 'Выберите разные валюты')
  })

  it('Попытка обмена недостающих средств', () => {
    cy.visit('localhost:8080/currency')
    cy.get('.choices:first').click()
    cy.get('#choices--from-item-choice-2').click()
    cy.get('#sum').type('10000000000000000000')
    cy.get('.changeCurrencyComponent__form-btn').click()
    cy.get('.popup__footer-btn--ok').click()
    cy.get('.toast').should('have.class', 'error')
  })
})

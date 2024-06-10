describe('Northwind sovellus', function () {

  beforeEach(function () {
      cy.visit('http://localhost:5174/')
      cy.get('#userName').type('teppo')
      cy.get('#password').type('testaaja')
      cy.get('#login').click()
  })

  it('Postaus sivu avautuu ja näyttää datarivejä', function () {
    cy.visit('http://localhost:5174/posts')
    cy.contains('Post from typicode')
    cy.contains('User:')
  })

  it('Laskurin testausta', function () {
    cy.get('#Laskuri').click()
    cy.contains('0')
    cy.get('#Plu').click()
    cy.get('#Plu').click()
    cy.get('#Plu').click()
    cy.get('#Mii').click()
    cy.get('#Reset').click()
    cy.contains('0')
  })

  it('Asiakas sivun näyttö ja datan lataus', function () {
    cy.visit('http://localhost:5174/customers')
    cy.get('#customer').click()
    cy.contains('Saippuakauppa')
  })

  it('Lisäys formi aukaisu', function () {
    cy.visit('http://localhost:5174/customers')
    cy.contains('Add new').click()
    cy.contains('Customer add')
    cy.contains('save')
})

})
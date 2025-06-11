/// <reference path="../support/commands.d.ts" />

// cypress/support/commands.js

// ... outros comandos, como signup, etc.

Cypress.Commands.add('guiLogin', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  // Intercepta as requisições para esperar depois do login
  cy.intercept('GET', '**/notes').as('getNotes')

  // Acessa a página de login
  cy.visit('/login')

  // Preenche os campos de login
  cy.get('#email').type(username)
  cy.get('#password').type(password, { log: false }) // evita exibir a senha no log
  cy.contains('button', 'Login').click()

  // Espera a resposta da API e verifica se está na página correta
  cy.wait('@getNotes', { timeout: 10000 })
  cy.contains('h1', 'Your Notes').should('be.visible')
})

Cypress.Commands.add('sessionLogin', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  // Define uma função de login para usar dentro do cy.session
  const login = () => {
    cy.guiLogin(username, password)
  }

  // Reutiliza a sessão de login com base no nome de usuário
  cy.session(username, login)
})

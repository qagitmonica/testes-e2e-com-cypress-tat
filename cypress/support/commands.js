// ✅ Exibe no console se os comandos personalizados foram carregados
console.log('✅ Comandos personalizados carregados')

// ✅ Importa dependência de iframe (deve vir primeiro!)
import 'cypress-iframe'

// ✅ Comando para login via interface
Cypress.Commands.add('guiLogin', (
    username = Cypress.env('USER_EMAIL'),
    password = Cypress.env('USER_PASSWORD')
) => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.visit('/login')
    cy.get('#email').type(username)
    cy.get('#password').type(password, { log: false })
    cy.contains('button', 'Login').click()
    cy.wait('@getNotes')
    cy.contains('h1', 'Your Notes').should('be.visible')
})

// ✅ Comando para login com cache de sessão
Cypress.Commands.add('sessionLogin', (
    username = Cypress.env('USER_EMAIL'),
    password = Cypress.env('USER_PASSWORD')
) => {
    const login = () => cy.guiLogin(username, password)
    cy.session(username, login)
})

// ✅ Comando para preencher o formulário de configurações e submeter
Cypress.Commands.add('fillSettingsFormAndSubmit', () => {
    cy.visit('/settings')
    cy.get('#storage').type('1')
    cy.get('#name').type('Mary Doe')

    // Garante que o iframe foi carregado
    cy.frameLoaded('.card-field iframe')
    cy.iframe('.card-field iframe').as('iframe')

    cy.get('@iframe').find('[name="cardnumber"]').type('4242424242424242')
    cy.get('@iframe').find('[name="exp-date"]').type('1271')
    cy.get('@iframe').find('[name="cvc"]').type('123')
    cy.get('@iframe').find('[name="postal"]').type('12345')

    cy.contains('button', 'Purchase').click()
})

// ✅ Comando para criar uma nota
Cypress.Commands.add('createNote', (noteDescription) => {
    cy.visit('/notes/new')
    cy.get('#content').type(noteDescription)
    cy.contains('button', 'Create').click()
})

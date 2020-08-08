describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#username').invoke('attr', 'placeholder').should('contain', 'username')
    cy.get('#password').invoke('attr', 'placeholder').should('contain', 'password')

    cy.get('form').as('theForm')
      .find('button')
      .contains('Login')
  })
})
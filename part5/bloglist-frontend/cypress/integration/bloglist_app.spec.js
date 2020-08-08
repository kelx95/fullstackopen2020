const { func } = require("prop-types")

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    //create a new user
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: "UserTest",
      password: "testtest",
      name: "User"
    })
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

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('UserTest')
      cy.get('#password').type('testtest')
      cy.get('button').click()
      cy.contains('User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('UserTest')
      cy.get('#password').type('xxxxx')
      cy.get('button').click()
      cy.get('.error').should('contain', 'wrong username or password')
        .and('have.css', 'border', '3px solid rgb(255, 0, 0)')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'background-color', 'rgb(211, 211, 211)')

    })
  })
})
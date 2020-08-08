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
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: "UserTest2",
      password: "testtest2",
      name: "User2"
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

  describe.only('When logged id', function () {
    beforeEach(function () {
      //log in user here
      cy.login({ username: 'UserTest', password: 'testtest' })
      cy.createBlog({ title: 'title1', author: 'author1', url: 'url1', likes: 1 })
    })

    it('A blog can be created', function () {
      cy.contains('create new').click()
      cy.get('#title').type('test-title')
      cy.get('#author').type('test-author')
      cy.get('#url').type('test-url')
      cy.get('#create').click()
      cy.get('.error').should('contain', 'a new blog test-title by test-author added')
        .and('have.css', 'border', '3px solid rgb(0, 128, 0)')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'background-color', 'rgb(211, 211, 211)')

      cy.get('.container').contains('test-title').parent().find('.view').click()
      cy.get('.viewSection')
        .contains('test-author')
        .contains('test-url')

    })

    it.only('A blog can be liked', function () {
      cy.contains('view').click()
      cy.get('.like')
        .click()
      cy.get('.like').parent().contains('2')
    })

  })
})
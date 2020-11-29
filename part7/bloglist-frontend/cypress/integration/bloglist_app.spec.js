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
      cy.createBlog({ title: 'title2', author: 'author2', url: 'url2', likes: 1 })
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

    })

    it('A blog can be liked', function () {
      cy.contains('view').click()
      cy.get('.like')
        .click()
      cy.get('.like').parent().contains('2')
    })

    it('The user who created a blog can delete it', function () {
      cy.contains('view').click()
      cy.contains('title1')
      cy.get('.delete').click()
      cy.get('html').should('not.contain', 'title1')

      cy.contains('logout').click()
      cy.login({ username: 'UserTest2', password: 'testtest2' })
      cy.contains('view').click()
      cy.get('.delete').click()

      cy.get('.error').should('contain', 'Something went wrong blog page will refresh')
        .and('have.css', 'border', '3px solid rgb(255, 0, 0)')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'background-color', 'rgb(211, 211, 211)')
    })

    it.only('Blogs are ordered according to likes', function () {
      cy.createBlog({ title: 'title3', author: 'author1', url: 'url1', likes: 1 })
      cy.createBlog({ title: 'title4', author: 'author2', url: 'url2', likes: 30 })
      cy.createBlog({ title: 'title5', author: 'author3', url: 'url3', likes: 20 })

      cy.get('.container').then(blogs => {
        for (let blog of blogs) {
          cy.get(blog).find('.view').click()
        }
      })

      cy.get('.viewSection').then(blogs => {
        console.log(blogs)
        cy.wrap(blogs[0]).should('contain', 30)
        cy.wrap(blogs[1]).should('contain', 20)
        cy.wrap(blogs[2]).should('contain', 1)
        cy.wrap(blogs[3]).should('contain', 1)
        cy.wrap(blogs[4]).should('contain', 1)
      })
    })
  })
})
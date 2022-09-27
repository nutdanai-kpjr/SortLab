/// <reference types="cypress" />


// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Init test', () => {
  beforeEach(() => {

    // Cypress starts out with a blank slate for each test
    // so we must tell it p to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit(Cypress.config().baseUrl)
  })

  it('1. Interactions are visible', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('[data-cy="play-button"]').should('be.visible')
    cy.get('[data-cy="stop-button"]').should('be.visible')
    cy.get('[data-cy="reset-button"]').should('be.visible')
    cy.get('[data-cy="audio-button"]').should('be.visible')
    cy.get('[data-cy="explain-button"]').should('be.visible')
    cy.get('[data-cy="algorithm-dropdown"]').should('be.visible')
    cy.get('[data-cy="speed-slider"]').should('be.visible')
    cy.get('[data-cy="size-slider"]').should('be.visible')
    cy.get('[data-cy="bar-0"]').should('be.visible')





  })

  
})

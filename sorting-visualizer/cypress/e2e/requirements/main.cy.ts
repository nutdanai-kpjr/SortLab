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
  before(() => {

    // Cypress starts out with a blank slate for each test
    // so we must tell it p to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit(Cypress.config().baseUrl)
  })

  it('1. Interactions are visible', () => {
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
  it('2. Default size are 20', () => {
    cy.get('[data-cy="size-slider"]').contains('Array Size : 20')

    cy.get('[data-cy="bar-19"]').should('be.visible')
  })
  it('3. Default speed is 0.2 sec/step', () => {
    cy.get('[data-cy="speed-slider"]').contains('Speed : 0.2')
  })
  it('4. Default algorithm is Bubble sort', () => {
    cy.get('[data-cy="algorithm-dropdown"]').contains('Bubble Sort')
  })
  it('5. Default color are all primary', () => {
    for ( let i = 0 ; i<20 ; i++){
      cy.get('[data-cy="bar-'+i+'"]').should('have.css', 'background-color', 'rgb(129, 138, 216)')
    }
  })
  it('6. Default audio is on', () => {
    cy.get('[alt="Audio On Button"]').should('be.visible')
  })
  it('7. Default explain is on', () => {
    cy.get('[alt="Show Explain Text Button"]').should('be.visible')
  }
  )

  it('8. Size Slider is adjustable', () => {
  
    const arrows = '{leftarrow}'.repeat(10); 
    cy.get('[data-cy="size-slider"] > .slider > .customSlider-thumb').focus().realType(
arrows
    );
    cy.get('[data-cy="size-slider"]').contains('Array Size : 10')
  }
  )
  it('9. Speed Slider is adjustable', () => {
    const currentValue  = 200;
    const targetValue = 10;
    const decrement = 1;
    const steps = (  currentValue-targetValue) / decrement;
    const arrows = '{leftarrow}'.repeat(steps); 
    cy.get('[data-cy="speed-slider"] > .slider > .customSlider-thumb').focus().realType(
arrows
    );
    cy.get('[data-cy="speed-slider"]').contains('Speed : 0.01')
  }
  )


  it('10. Reset button should reset all item to primary color', () => {
    cy.get('[data-cy="reset-button"]').click()
    for ( let i = 0 ; i<10 ; i++){
      cy.get('[data-cy="bar-'+i+'"]').should('have.css', 'background-color', 'rgb(129, 138, 216)')
    }
  })
  it('11. Audio button should toggleable', () => {
    cy.get('[data-cy="audio-button"]').click()
    cy.get('[alt="Audio Off Button"]').should('be.visible')
    cy.get('[data-cy="audio-button"]').click()
  })
  it('12. Explain Text button should toggleable', () => {
    cy.get('[data-cy="explain-button"]').click()
    cy.get('[alt="Hide Explain Text Button"]').should('be.visible')
    cy.get('[data-cy="explain-button"]').click()
  })

  it('13. All Sort algorithm should return green array', () => {
    // cy.get('[data-cy="algorithm-dropdown"]').click()
    cy.get('[data-cy="algorithm-dropdown"]').find('option').each(($el, index, $list) => {
      const sortingAlgorithm = $el.text()
      cy.get('[data-cy="algorithm-dropdown"]').select(sortingAlgorithm)
      cy.get('[data-cy="play-button"]').click()
      cy.wait(3000)
      for ( let i = 0 ; i<10 ; i++){
        cy.get('[data-cy="bar-'+i+'"]').should('have.css', 'background-color', 'rgb(76, 175, 80)')
      }
      cy.get('[data-cy="reset-button"]').click()
    })
  })

  it('14. Can extend to 100 array size', () => {
    cy.get('[data-cy="size-slider"]').find('button').click()
    const arrows = '{rightarrow}'.repeat(90); 
    cy.get('[data-cy="size-slider"] > .slider > .customSlider-thumb').focus().realType(
arrows
    );
    cy.get('[data-cy="size-slider"]').contains('Array Size : 100')
  })

  
})
export {};
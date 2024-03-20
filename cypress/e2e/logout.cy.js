describe('Log out from Paylocity Benefits Dashboard', () => {

    let data
    before(() => {
        cy.fixture('benefits').then((empData) => {
            data = empData
        })
    })

    it('Logout from the application', () => {

        //login to the application using custom command 
        /* cy.loginViaUI(data.login.Username, data.login.Password)
        cy.log('Login successful')*/

        //Logging in via is much faster than from UI. This is a custom command
        cy.loginViaAPI(data.login.Username, data.login.Password)
        cy.log('Login successful')


        //click on Log out
        cy.contains('a', 'Log Out')
            .click()


        cy.location('pathname')
            .should('include', '/LogIn')
        cy.log('Successfully logged out')
    })
})
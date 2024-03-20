/* Cypress.Commands.add('loginViaUI', (Username, Password) => {

    cy.visit('/Prod/Account/Login')

    cy.get("#Username")
        .type(Username)

    cy.get("#Password")
        .type(Password, { log: false })

    cy.contains('button', 'Log In')
        .click()

    cy.location('pathname')
        .should('include', '/Benefits')

    cy.contains('Paylocity Benefits Dashboard')
        .should('be.visible')
    }) */

Cypress.Commands.add('loginViaAPI', (Username, Password) => {
    cy.request({
        method: 'POST',
        url: '/Prod/Account/Login',
        body: {
            Username,
            Password
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then((response) => {
            expect(response.status).to.eq(200)
            cy.visit('/Prod/Benefits')
        })
})
Cypress.Commands.add('totalRows', () => {
    cy.get('table#employeesTable > tbody')
        .find('tr', { timeout: 10000 })
})

Cypress.Commands.add('openAddEmpDialog', () => {

    //Click on 'Add Employee' button present below the dashboard
    cy.contains('button', 'Add Employee')
        .should('be.visible')
        .click()

    //Verify if Add Employee dialog opens
    cy.get('#employeeModal')
        .find('div.modal-dialog')
        .should('be.visible')

})

Cypress.Commands.add('openUpdateEmpDialog', () => {

    //Get the first row of the table and click on the edit icon 
    cy.totalRows()
        .eq(0).within(() => {
            cy.get('td')
                .children('i')
                .first()
                .click()
        })
    //})

    //Verify if Update Employee dialog opens
    cy.get('#employeeModal')
        .find('div.modal-dialog')
        .should('be.visible')
})

Cypress.Commands.add('openDeleteEmpDialog', () => {
    cy.reload()
    //Get the first row of the table and click on the edit icon   
    cy.totalRows()
        .eq(0).within(() => {
            cy.get('td')
                .children('i')
                .last()
                .click()
            // })
        })

    //Verify if Delete Employee dialog opens
    cy.get('div#deleteModal')
        .find('h5.modal-title')
        .should('have.text', 'Delete Employee')

    //Verify the text in the body of the dialog
    cy.get('div#deleteModal')
        .find('div.modal-body').within(() => {
            cy.get('div.col-sm-12')
                .should('include.text', 'Delete employee record for')
        })
})



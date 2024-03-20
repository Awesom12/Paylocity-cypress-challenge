describe('Update employee of Paylocity Benefits Dashboard', () => {

    let data
    before(() => {
        cy.fixture('benefits').then((empData) => {
            data = empData
        })
    })

    it('Updates an employee', () => {

        //login to the application using custom command 
        /* cy.loginViaUI(data.login.Username, data.login.Password)
        cy.log('Login successful') */

        //Logging in via is much faster than from UI. This is a custom command
        cy.loginViaAPI(data.login.Username, data.login.Password)
        cy.log('Login successful')


        //Verify if the employees table is visible
        cy.get('table#employeesTable')
            .should('be.visible')

        //Verify if the employees table consists of any rows
        cy.totalRows()
            .its('length')
            .should('be.greaterThan', 1)

        //Get the id of the employee in the first row before updating. cy.totalRows() is a custom command 
        let empId1
        cy.totalRows()
            .eq(0).find('td')
            .first().as('firstRow')

        cy.get('@firstRow')
            .then((id) => {
                empId1 = id.text()
                cy.log("Id of the emp in the first row: " + empId1);
            })


        //Click on the edit icon on the first row of employee table and open Update Employee dialog
        cy.openUpdateEmpDialog()
        cy.log('Dialog to update the employee has opened')

        //Enter firstName on Add Employee dialog
        cy.get('#firstName')
            .clear()
            .type(data.update.firstName)

        //Enter lastName
        cy.get('#lastName')
            .clear()
            .type(data.update.lastName)

        //Enter dependants
        cy.get('#dependants')
            .clear()
            .type(data.update.dependants)

        //Click on 'Update' button on the dialog
        cy.get('#updateEmployee')
            .click()

        //Verify that the dialog is no longer visible
        cy.get('#employeeModal')
            .should('not.be.visible')

        //Verify that the id of the employee in the first row after updating is same as the one before updating it.
        let empId2
        cy.get('@firstRow')
            .then((id) => {
                empId2 = id.text()
                expect(empId2).to.eq(empId1)
            })

        //Verify the first row of the table now contains the updated firstname
        cy.get('tbody')
            .find('tr')
            .eq(0)
            .should('include.text', data.update.firstName)
        cy.log('Updating the employee is successful')

        //Open Update Employee dialog again
        cy.openUpdateEmpDialog()
        cy.log('Dialog to update the employee has opened to check if Cancel button works')

        //Verify if 'Cancel' button works
        cy.contains('button', 'Cancel')
            .click()

        //Open Update Employee dialog again
        cy.openUpdateEmpDialog()
        cy.log('Dialog to update the employee has opened to check if close button works')

        //Verify if 'Close' button works
        cy.get('#employeeModal')
            .find('button.close')
            .click()

    })
})
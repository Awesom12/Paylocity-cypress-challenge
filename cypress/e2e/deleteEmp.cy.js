describe('Update employee of Paylocity Benefits Dashboard', () => {

    let data
    before(() => {
        cy.fixture('benefits').then((empData) => {
            data = empData
        })
    })

    it('Delete an employee record', () => {

        //login to the application using custom command 
        /* cy.loginViaUI(data.login.Username, data.login.Password)
        cy.log('Login successful') */

        //Logging in via is much faster than from UI. 
        //cy.loginViaAPI is a custom command        
        cy.loginViaAPI(data.login.Username, data.login.Password)
        cy.log('Login successful')


        //Verify if the employees table is visible
        cy.get('table#employeesTable')
            .should('be.visible')

        //Verify if the employees table consists of any rows
        cy.get('table#employeesTable tr')
            .its('length')
            .should('be.greaterThan', 1)
        cy.log('Employee table has more than 1 record')

        //Get the number of rows in the employees table 
        let rowCnt
        cy.totalRows()
            .then((row) => {
                //row.length will give you the row count
                rowCnt = row.length
                cy.log("Total number of rows: " + rowCnt);
            })

        //Get the id of the employee in the first row before deletion
        cy.totalRows()
            .eq(0).find('td')
            .first().as('firstRow')

        let empId1
        cy.get('@firstRow')
            .then((id) => {
                empId1 = id.text()
                cy.log("Id of the emp in the first row: " + empId1);
            })

        //Click on the edit icon on the first row of employee table and open Delete Employee dialog
        cy.openDeleteEmpDialog()
        cy.log('Delete dialog opened')

        //Click on 'Delete' button to delete an employee record
        cy.get('button#deleteEmployee')
            .click()
        cy.log('clicked on delete button')

        //Verify that the Delete dialog is no longer visible
        cy.get('div#deleteModal')
            .should('not.be.visible')

        //After deleting an employee reload the page, so that the data in the emp table gets rendered properly  
        cy.reload()

        //Verify that the current number of rows in the table is decreased by 1.
        let currentRowCnt
        cy.totalRows()
            .then((row) => {
                currentRowCnt = row.length
                expect(currentRowCnt).to.eq(rowCnt - 1)
            })

        //Verify that the id of the emp in the first row after deletion is not the same as the id of the emp before deletion
        let empId2
        cy.get('@firstRow')
            .then((id) => {
                empId2 = id.text()
                expect(empId2).not.to.eq(empId1)
            })

        //Open Delete Employee dialog again
        cy.openDeleteEmpDialog()
        cy.log('Delete dialog opened to check if the Cancel button works')

        //Verify if 'Cancel' button works
        cy.get('button#deleteEmployee')
            .next('button')
            .click()

        //Verify that the Delete dialog is no longer visible
        cy.get('div#deleteModal')
            .should('not.be.visible')

        //Open Delete Employee dialog again
        cy.openDeleteEmpDialog()
        cy.log('Delete dialog opened to check if the Close button works')

        //Verify if 'Close' button works
        cy.get('#deleteModal')
            .find('button.close')
            .click()

        //Verify that the Delete dialog is no longer visible
        cy.get('div#deleteModal')
            .should('not.be.visible')

    })
})
describe('Add Employee to Paylocity Benefits Dashboard', () => {

  let data
  before(() => {
    cy.fixture('benefits').then((empData) => {
      data = empData
    })
  })

  it('Adds an employee', () => {

    //login to the application using custom command 
    // cy.loginViaUI(data.login.Username, data.login.Password)
    // cy.log('Login successful')

    //Logging in via is much faster than from UI. This is a custom command
    cy.loginViaAPI(data.login.Username, data.login.Password)
    cy.log('Login successful')

    //Verify if the employees table is visible
    cy.get('table#employeesTable')
      .should('be.visible')

    //Get the number of rows in the employees table. cy.totalRows() is a custom command 
    let rowCnt
    cy.totalRows()
      .then((row) => {
        //row.length will give you the row count
        rowCnt = row.length
        cy.log("Total number of rows: " + rowCnt);
      })

    //Click on 'Add Employee' button and open Add Employee dialog 
    //'openAddEmpDialog' is a custom command
    cy.openAddEmpDialog()
    cy.log('Add Employee dialog is opened')

    //Verify if the employees table is not focused
    cy.get('table#employeesTable')
      .should('not.be.focused')

    //Enter firstName on Add Employee dialog
    cy.get('#firstName')
      .type(data.add.firstName)

    //Enter lastName
    cy.get('#lastName')
      .type(data.add.lastName)

    //Enter dependants
    cy.get('#dependants')
      .type(data.add.dependants)

    //Click on 'Add' button on 'Add Employee dialog'
    cy.get('#addEmployee')
      .click()

    //Verify that 'Add Employee dialog' is not visible
    cy.get('#employeeModal')
      .should('not.be.visible')

    //reload the page, to load all the employees in the table   
    cy.reload()

    //Verify that the current number of rows in the table is increased by 1.
    let currentRowCnt
    //cy.get('@totalRows')

    cy.totalRows()
      .then((row) => {
        currentRowCnt = row.length
        expect(currentRowCnt).to.eq(rowCnt + 1)
      })
    //})
    cy.log('Successfully added the employee')

    //click on 'Add Employee' button again
    cy.openAddEmpDialog()
    cy.log('Opened Add Employee dialog to check if Cancel button works')

    //Verify if 'Cancel' button works
    cy.contains('button', 'Cancel')
      .click()

    //Verify that 'Add Employee dialog' is no longer visible
    cy.get('#employeeModal')
      .should('not.be.visible')

    //click on 'Add Employee' button again
    cy.openAddEmpDialog()
    cy.log('Opened Add Employee dialog to check if close button works')

    //Verify if 'Close' button works
    cy.get('#employeeModal')
      .find('button.close')
      .click()

    //Verify that 'Add Employee dialog' is not visible
    cy.get('#employeeModal')
      .should('not.be.visible')
  })
})
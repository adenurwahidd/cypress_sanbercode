const directoryElementsLocator = require('../../fixtures/pageElements/directoryElements.json')

export class pageDirectoryMenuAction {
    VisitDirectoryMenu(){
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0').as('EmployeeLimit')
        
        cy.get(directoryElementsLocator.data.directoryMenu_locator).click()

        cy.wait('@EmployeeLimit').then((interception)=>{
            expect(interception.response.statusCode).to.eq(200)
        })    
    }

    cekVisibilityEmployeeNameField(){
        cy.xpath(directoryElementsLocator.data.employeeName_locator).should('be.visible')
    }

    cekVisibilityJobTitleDropdownList(){
        cy.xpath(directoryElementsLocator.data.jobTitile_locator).should('be.visible')
    }

    cekVisibilityLocationDropdownList(){
        cy.get(directoryElementsLocator.data.location_locator).should('be.visible')
    }

    cekVisibilityResetButton(){
        cy.xpath(directoryElementsLocator.data.reset_locator).should('be.visible')
    }

    cekVisibilitySearchButton(){
        cy.xpath(directoryElementsLocator.data.search_locator).should('be.visible')
    }

    searchWithValidInput(empName,empNameAuto,jobTitle,location) {
        cy.xpath(directoryElementsLocator.data.employeeName_locator).clear().type(empName)
        cy.get('.oxd-autocomplete-dropdown').should('be.visible').contains(empNameAuto).click()
        cy.xpath(directoryElementsLocator.data.jobTitile_locator).click()
        cy.contains(jobTitle).click()

        cy.get(directoryElementsLocator.data.location_locator).click()
        cy.contains(location).click()

        cy.xpath(directoryElementsLocator.data.search_locator).click()
    }

    clickResetButton(){
        cy.xpath(directoryElementsLocator.data.employeeName_locator).clear().type('Peter')
        cy.get('.oxd-autocomplete-dropdown').should('be.visible').contains("Peter Mac Anderson").click()
        cy.xpath(directoryElementsLocator.data.jobTitile_locator).click()
        cy.contains("Chief Financial Officer").click()

        cy.get(directoryElementsLocator.data.location_locator).click()
        cy.contains("Canadian Regional HQ").click()
        cy.xpath(directoryElementsLocator.data.reset_locator).click()

        cy.xpath(directoryElementsLocator.data.employeeName_locator).should('be.empty')
    }

    searchWithInvalidEmpployeeName(employeeName) {
        cy.xpath(directoryElementsLocator.data.employeeName_locator).clear().type(employeeName)
        cy.xpath(directoryElementsLocator.data.search_locator).click()
    }

    getInvalidMessage(msg){
        cy.xpath(directoryElementsLocator.data.msgInvalidName_locator).should('contain.text',msg)
    }

    getRecordFoundMessage(msg){
        cy.get(directoryElementsLocator.data.msgSearchResult_locator).should('include.text', msg)
    }

    searchWithJobTitleOnly(jobTitle) {
        cy.xpath(directoryElementsLocator.data.jobTitile_locator).click()
        cy.contains(jobTitle).click()

        cy.xpath(directoryElementsLocator.data.search_locator).click()
    }

    searchWithLocationOnly(location) {
        cy.get(directoryElementsLocator.data.location_locator).click()
        cy.contains(location).click()

        cy.xpath(directoryElementsLocator.data.search_locator).click()
    }
    
}
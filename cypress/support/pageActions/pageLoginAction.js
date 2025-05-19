const logiElementsLocator = require('../../fixtures/pageElements/loginElements.json')
export class pageLoginActions{
    //Untuk mengunjungi login page
    VisitLoginPage(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    //Input Username di halaman Login
    InputUsername(usernamee){
        cy.get(logiElementsLocator.data.username_locator).clear().type(usernamee)
    }

    //Input Password di halaman login
    InputPassword(passwordd){
        cy.get(logiElementsLocator.data.password_locator).clear().type(passwordd)
    }

    ClickSubmitButton(){
        cy.get(logiElementsLocator.data.submit_locator).should('be.visible')
        cy.get(logiElementsLocator.data.submit_locator).click()
    }

    MessageLogin(msg){
        cy.xpath(logiElementsLocator.data.messageLogin_locator).should('contain.text',msg)
    }

    Login(usernamee,passwordd){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

        //intercept
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummaryReq')
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/buzz/feed?limit=5&offset=0&sortOrder=DESC&sortField=share.createdAtUtc').as('feedReq')
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit').as('employeeSubunitReq')
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations').as('employeeLocReq')
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts').as('shortcutReq')
        
        this.InputUsername(usernamee)
        this.InputPassword(passwordd)
        this.ClickSubmitButton()

        cy.wait('@actionSummaryReq').then((interception)=>{
            expect(interception.response.statusCode).to.eq(200)
        })
        cy.wait('@feedReq').then((interception)=>{
            expect(interception.response.statusCode).to.eq(200)
        })
        // cy.wait('@employeeLeavesReq').then((interception)=>{
        //     expect(interception.response.statusCode).to.eq(200)
        // })  
        cy.wait('@employeeSubunitReq').then((interception)=>{
            expect(interception.response.statusCode).to.eq(200)
        }) 
        cy.wait('@employeeLocReq').then((interception)=>{
            expect(interception.response.statusCode).to.eq(200)
        }) 
        cy.wait('@shortcutReq').then((interception)=>{
            expect(interception.response.statusCode).to.eq(200)
        })
       
        cy.url().should('include','dashboard')
    }

}


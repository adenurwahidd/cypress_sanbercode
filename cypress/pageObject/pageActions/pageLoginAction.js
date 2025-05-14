
const logiElementsLocator = require('../pageElements/loginElements.json')
export class pageLoginActions{

    VisitLoginPage(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }
    GeInputUsername(usernamee){
        cy.get(logiElementsLocator.data.username_locator).clear().type(usernamee)
    }

    GetInputPassword(passwordd){
        cy.get(logiElementsLocator.data.password_locator).clear().type(passwordd)
    }

    GetClickSubmitButton(){
        cy.get(logiElementsLocator.data.submit_locator).should('be.visible')
        cy.get(logiElementsLocator.data.submit_locator).click()
    }

    GetMessageLogin(msg){
        cy.xpath(logiElementsLocator.data.messageLogin_locator).should('contain.text',msg)
    }

}
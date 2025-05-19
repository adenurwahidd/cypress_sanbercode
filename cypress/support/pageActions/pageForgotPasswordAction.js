const forgotElementsLocator = require('../../fixtures/pageElements/forgotPasswordElements.json')

export class pageForgotPasswordAction{
    VisitForgotPasswordPage(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.xpath(forgotElementsLocator.data.forgot_locator).should('be.visible')
        cy.xpath(forgotElementsLocator.data.forgot_locator).click()
    }

    VisitRequestPasswordReset(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode')
    }
    
    CancelForgotPassword(){
        this.VisitRequestPasswordReset()
        cy.xpath(forgotElementsLocator.data.cancel_locator).should('be.visible')
        cy.xpath(forgotElementsLocator.data.cancel_locator).click()
        cy.url().should('include','auth/login')
    }

    ForgotPassword(usernamefrgt){
        this.VisitRequestPasswordReset()
        cy.xpath(forgotElementsLocator.data.usernamefrgt_locator).should('be.visible')
        cy.xpath(forgotElementsLocator.data.usernamefrgt_locator).clear().type(usernamefrgt)
    }

    ClickSubmitButton(){
        cy.xpath(forgotElementsLocator.data.submit_locator).should('be.visible')
        cy.xpath(forgotElementsLocator.data.submit_locator).click()
    }

    GetMessageResetPasword(msg){
        cy.xpath(forgotElementsLocator.data.messageForgot_locator).should('contain.text',msg)
    }

    GetUrlAfterReset(){
        cy.url().should('include','auth/sendPasswordReset') 
    }

    GetRequiredMsg(msg){
        cy.get(forgotElementsLocator.data.requiredMsg_locator).should('contain.text',msg)
    }
    
}
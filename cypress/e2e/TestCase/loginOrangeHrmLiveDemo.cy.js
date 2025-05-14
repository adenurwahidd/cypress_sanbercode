/// <reference types="Cypress" />

import { pageLoginActions } from "../../pageObject/pageActions/pageLoginAction.js"

const loginActions = new pageLoginActions
describe('Login', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })
    //Verify access to the login page
    it('TC_001-VerifyAcessToTheLoginPage', () => {
        cy.url().should('include','auth/login')       
    })
    
    //TC_002 Username Can Input the letter, number and character
    it('TC_002_VerifyInputTheLetter,NumberandSpecialCharacter', () => {
        loginActions.GeInputUsername('Adm1*&^73')
    })

    //TC_003 Input space character at the first username field
    it('TC_003_VerifyInputSpaceAtTheFirstField', () => { 
        loginActions.GeInputUsername(' ')
    })
    
    //TC_004 Ensure the username field must filled and cannot be empty when move to password field
    it('TC_004_EnsureUsernameFieldFilled', () => {
        
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear() 
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').clear()
    })

    //TC_005 Password was hidden
    it('TC_005_PasswordWasHidden', () => {
        
        loginActions.GetInputPassword('admin123')
    })

    //TC_006 Ensure the submit button is visible / clickable
    it('TC_006_SubmitButtonIsClickable', () => {
        cy.get('button[type="submit"]').should('be.visible')
    })


    //TC_007 Input with valid credential
    it('TC_007_LoginSuccessful', () => {
        
        loginActions.GeInputUsername('admin')
        loginActions.GetInputPassword('admin123')
        loginActions.GetClickSubmitButton()
        cy.url().should('include','dashboard')
    })
    
    //TC_008 Input with Invalid username and Valid password
    it('TC_008_LoginUnsuccessfulInvalidUsername', () => { 
        
        loginActions.GeInputUsername('aadmin')
        loginActions.GetInputPassword('admin123')
        loginActions.GetClickSubmitButton()
        loginActions.GetMessageLogin('Invalid credentials')
    })

    //TC_009 Input with valid username and invalid password
    it('TC_009_LoginUnsuccessfulInvalidPassword', () => { 
        
        loginActions.GeInputUsername('admin')
        loginActions.GetInputPassword('admin1234')
        loginActions.GetClickSubmitButton()
        loginActions.GetMessageLogin('Invalid credentials')
    })

    //TC_010 Input without username and password
    it('TC_010_LoginUnsuccessfulNoInputUsernameAndPassword', () => { 
        
        // loginActions.GeInputUsername('aadmin')
        // loginActions.GetInputPassword('admin123')
        loginActions.GetClickSubmitButton()
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('contain','Required')
        cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain','Required')
        //loginActions.GetMessageLogin('Invalid credentials')
    })

    //TC_011 Input with unregistered account
    it('TC_011_LoginUnsuccessfulUnregisteredAccount', () => { 
        
        loginActions.GeInputUsername('jhon')
        loginActions.GetInputPassword('jhon123')
        loginActions.GetClickSubmitButton()
        loginActions.GetMessageLogin('Invalid credentials')
    })

    //TC_012 Input with unregistered account
    it('TC_012_LoginSuccessfulWithEnter', () => { 
        loginActions.GeInputUsername('admin')
        loginActions.GetInputPassword('admin123{enter}')
        cy.url().should('include','dashboard')       
    })

})
/// <reference types="Cypress" />

import { pageLoginActions } from "../../support/pageActions/pageLoginAction.js"

const loginActions = new pageLoginActions
describe('Login', () => {

    beforeEach(() => {
        loginActions.VisitLoginPage()
    })
    //TC 001 - Verify access to the login page
    it('TC 001 - Verify Acess To The Login Page', () => {
        cy.url().should('include','auth/login')       
    })
    
    //TC 002 Username Can Input the letter, number and character
    it('TC 002 - Verify Input The Letter, Number and Special Character', () => {
        loginActions.InputUsername('Adm1*&^73')
    })

    //TC 003 Input space character at the first username field
    it('TC 003 - Verify Input Space At The First Field', () => { 
        loginActions.InputUsername(' ')
    })

    //TC 004 Password was hidden
    it('TC 004 - Password Was Hidden', () => {
        loginActions.InputPassword('admin123')
    })

    
    //TC 005 Input with valid credential
    it('TC 005 - Login Successful', () => {
        loginActions.Login("admin","admin123")
    })
    
    //TC 006 Input with Invalid username and Valid password
    it('TC 006 - Login Unsuccessful Invalid Username', () => { 
        loginActions.InputUsername('aadmin')
        loginActions.InputPassword('admin123')
        loginActions.ClickSubmitButton()
        loginActions.MessageLogin('Invalid credentials')
    })

    //TC 007 Input with valid username and invalid password
    it('TC 007 - Login Unsuccessful Invalid Password', () => { 
        loginActions.InputUsername('admin')
        loginActions.InputPassword('admin1234')
        loginActions.ClickSubmitButton()
        loginActions.MessageLogin('Invalid credentials')
    })

    //TC 008 Input without username and password
    it('TC 008 - Login Unsuccessful No Input Username And Password', () => { 
        loginActions.ClickSubmitButton()
    })

    //TC 009 Input with unregistered account
    it('TC 009 - Login Unsuccessful Unregistered Account', () => { 
        loginActions.InputUsername('jhon')
        loginActions.InputPassword('jhon123')
        loginActions.ClickSubmitButton()
        loginActions.MessageLogin('Invalid credentials')
    })

    //TC 010 Login successful with enter
    it('TC 010 - Login Successful With Enter', () => { 
        loginActions.InputUsername('admin')
        loginActions.InputPassword('admin123{enter}')      
    })

})
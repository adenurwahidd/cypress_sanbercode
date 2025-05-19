/// <reference types="Cypress" />

import { pageForgotPasswordAction } from "../../support/pageActions/pageForgotPasswordAction.js"

const forgotPasswordAction = new pageForgotPasswordAction

describe('Forgot Password', () => {
    
    //TC 001 Verify forgot password button
    it('TC 001 - Verify Forgot Password Page', () => {
        forgotPasswordAction.VisitForgotPasswordPage()       
    })
    
    //TC 002 Reset Password With Valid Username
    it('TC 002 - Reset Password With Valid Username', () => { 
        forgotPasswordAction.ForgotPassword('username')
        forgotPasswordAction.ClickSubmitButton()
        forgotPasswordAction.GetUrlAfterReset()
        forgotPasswordAction.GetMessageResetPasword('Reset Password link sent successfully')
    })

    //TC 003 Reset Password Without Username
    it('TC 003 - Reset Password Without Username', () => { 
        forgotPasswordAction.VisitRequestPasswordReset()
        forgotPasswordAction.ClickSubmitButton()
        forgotPasswordAction.GetRequiredMsg("Required")
    })

    //TC 004 Cancel reset password
    it('TC 004 - Cancel Reset Password', () => { 
        forgotPasswordAction.VisitRequestPasswordReset()
        forgotPasswordAction.CancelForgotPassword()
    })
})
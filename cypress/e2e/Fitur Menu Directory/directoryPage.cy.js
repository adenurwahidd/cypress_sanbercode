/// <reference types="Cypress" />

import { pageLoginActions } from "../../support/pageActions/pageLoginAction.js"
import { pageDirectoryMenuAction } from "../../support/pageActions/pageDirectoryMenuAction.js"

const loginActions = new pageLoginActions
const directoryMenuActions = new pageDirectoryMenuAction

describe('Directory Menu', () => {
    beforeEach(() => {
        loginActions.Login('admin','admin123')
    })

    //TC_001_Access directory menu on dashboard
    it('TC 001 - Access directory menu on dashboard', () => {
        directoryMenuActions.VisitDirectoryMenu()    
    })

    //TC_002_Check visibility employee name
    it('TC 002 - Check visibility employee name', () => {
        directoryMenuActions.VisitDirectoryMenu() 
        directoryMenuActions.cekVisibilityEmployeeNameField()    
    })

    //TC_003_Check visibility dropdown list of job title 
    it('TC 003 - Check visibility dropdown list of job title ', () => {
        directoryMenuActions.VisitDirectoryMenu() 
        directoryMenuActions.cekVisibilityJobTitleDropdownList()    
    })

    //TC_004_Check visibility dropdown list of location
    it('TC 004 - Check visibility dropdown list of location', () => {
        directoryMenuActions.VisitDirectoryMenu() 
        directoryMenuActions.cekVisibilityLocationDropdownList()    
    })

    //TC_005_Check visibility reset button
    it('TC 005 - Check visibility reset button', () => {
        directoryMenuActions.VisitDirectoryMenu() 
        directoryMenuActions.cekVisibilityResetButton()    
    })

    //TC_006_Check visibility search button
    it('TC 006 - Check visibility search button', () => {
        directoryMenuActions.VisitDirectoryMenu() 
        directoryMenuActions.cekVisibilitySearchButton()    
    })

    //TC_007_Successful search with valid input
    it('TC 007 Successful search with valid input', () => {
        directoryMenuActions.VisitDirectoryMenu() 
        directoryMenuActions.searchWithValidInput("Peter","Peter Mac Anderson","Chief Financial Officer","New York Sales Office")    
    })

    //TC_008_Reset Button
    it('TC 008 - Reset Button', () => {
        directoryMenuActions.VisitDirectoryMenu() 
        directoryMenuActions.clickResetButton()    
    })

    //TC_009_Unsuccessful search with invalid employee name
    it('TC 009 - Unsuccessful search with invalid employee name', () => {
        directoryMenuActions.VisitDirectoryMenu() 
        directoryMenuActions.searchWithInvalidEmpployeeName("Steven")  
        directoryMenuActions.getInvalidMessage('Invalid')  
    })

    //TC_010_Search with valid job title returns records
    it('TC 010 - Search with valid job title returns records', () => {
        directoryMenuActions.VisitDirectoryMenu() 
        directoryMenuActions.searchWithJobTitleOnly("Chief Financial Officer")
        directoryMenuActions.getRecordFoundMessage("Record Found")
    })

    //TC_011_Search with valid job title returns no records
    it('TC 011 - Search with valid job title returns no records', () => {
        directoryMenuActions.VisitDirectoryMenu() 
        directoryMenuActions.searchWithJobTitleOnly("Chief Executive Officer")
        directoryMenuActions.getRecordFoundMessage("No Records Found")
    })

    //TC_012_Search with valid location returns records
    it('TC 012 - Search with valid location returns records', () => {
        directoryMenuActions.VisitDirectoryMenu() 
        directoryMenuActions.searchWithLocationOnly("New York Sales Office")
        directoryMenuActions.getRecordFoundMessage("Records Found")
    })

    //TC 013 - Search with valid location returns no records
    it('TC 013 - Search with valid location returns no records', () => {
        directoryMenuActions.VisitDirectoryMenu() 
        directoryMenuActions.searchWithLocationOnly("HQ - CA, USA")
        directoryMenuActions.getRecordFoundMessage("No Records Found")
    })
})
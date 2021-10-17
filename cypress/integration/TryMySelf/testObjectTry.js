import { navigateTo } from "../../support/page_objects/navigationPage"
import { onFormLayoutPage } from "../../support/page_objects/formLayoutPage"
import { onDatePickerPage } from "../../support/page_objects/datePickerPage"
import { onSmartTable } from "../../support/page_objects/smartTablePage"


describe('Test with Page Object', () => {

    beforeEach('Open App', () => {
        cy.openHomePage()
    })

    // Menu
    //     navigateTo.stepperPage()
    //     navigateTo.accordionPage()
    //     navigateTo.formLayoutsPage()
    //     navigateTo.datePickerPage()
    //     navigateTo.dialogPage()
    //     navigateTo.windowPage()
    //     navigateTo.popoverPage()
    //     navigateTo.toastrPage()
    //     navigateTo.tooltipPage()
    //     navigateTo.calendarPage()
    //     navigateTo.smartTablePage()
    //     navigateTo.treeGridPage()

    it('Verify navigation across the pages', () => {
        // navigateTo.stepperPage()
    })

    it.only(' Submit inline', () => {
        // navigateTo.formLayoutsPage()
        // onFormLayoutPage.submitInlineForm('test', 'test@test.com')
        // onFormLayoutPage.submitBasicForm('test', 'test')

        // navigateTo.datePickerPage()
        // onDatePickerPage.commonDatePicker(20)
        // onDatePickerPage.rangeDatePicker(1, 15)

        navigateTo.smartTablePage()
        onSmartTable.updateAgeByFirstName('Otto', 20)
        onSmartTable.addNewData(69, 'first', 'last', 'fu', 'fu@fu.com', 33)
        onSmartTable.deleteRowByIndex(0)

    })

})
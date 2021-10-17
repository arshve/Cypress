
function selectGroupMenu(groupName){
    cy.contains('a', groupName).then( menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
            if( attr.includes('chevron-left')){
                cy.contains(groupName).click()
            }
        })
    })
}

export class NavigationPage{

    stepperPage(){
        selectGroupMenu('Layout')
        cy.contains('Stepper').click()
    }
    
    accordionPage(){
        selectGroupMenu('Layout')
        cy.contains('Accordion').click()
    }

    formLayoutsPage(){
        selectGroupMenu('Form')
        cy.contains('Form Layouts').click()
    }

    datePickerPage(){
        selectGroupMenu('Form')
        cy.contains('Datepicker').click()
    }

    dialogPage(){
        selectGroupMenu('Modal & Overlays')
        cy.contains('Dialog').click()
    }

    windowPage(){
        selectGroupMenu('Modal & Overlays')
        cy.contains('Window').click()
    }

    popoverPage(){
        selectGroupMenu('Modal & Overlays')
        cy.contains('Popover').click()
    }

    toastrPage(){
        selectGroupMenu('Modal & Overlays')
        cy.contains('Toastr').click()
    }
    
    tooltipPage(){
        selectGroupMenu('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

    calendarPage(){
        selectGroupMenu('Extra Components')
        cy.contains('Calendar').click()
    }

    smartTablePage(){
        selectGroupMenu('Tables & Data')
        cy.contains('Smart Table').click()
    }

    treeGridPage(){
        selectGroupMenu('Tables & Data')
        cy.contains('Tree Grid').click()
    }

        


}

export const navigateTo = new NavigationPage()
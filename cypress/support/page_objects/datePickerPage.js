function selectDatFromCurrent(day){
    let date = new Date()
    date.setDate(date.getDate() + day)
    let futureDay = date.getDate()
    let futureMonth = (date.toLocaleDateString('default', {month: 'short'}))
    let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()

    cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then( dateAttr => {
        if(!dateAttr.includes(futureMonth)){
            cy.get('[data-name="chevron-right"]').click()
            selectDatFromCurrent(day)
        } else {
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }
    })
    return dateAssert
}

export class datePickerPage{

    commonDatePicker(dayFromToday){
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()

            let dateAssert = selectDatFromCurrent(dayFromToday)
            cy.log(dateAssert)

            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
        })
    }

    rangeDatePicker(from, to){
        cy.contains('nb-card', 'Datepicker With Range').find('input').then( input => {
            cy.wrap(input).click()

            let dateAssertFrom = selectDatFromCurrent(from)
            let dateAssertTo= selectDatFromCurrent(to)
            const finalDate = dateAssertFrom+" - "+dateAssertTo
            cy.log(finalDate)

            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
        })
    }
}

export const onDatePickerPage = new datePickerPage()
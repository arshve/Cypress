

export class SmartTable{

    updateAgeByFirstName(name, age){
        cy.get('tbody').contains('tr', name).then( action => {
            cy.wrap(action).find('.nb-edit').click()
            cy.wrap(action).find('[placeholder="Age"]').clear().type(age)
            cy.wrap(action).find('.nb-checkmark').click()
            cy.wrap(action).find('.ng-star-inserted').should('contain', age)
        })
    }

    addNewData(id, firstName, lastName, userName, email, age){
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( plus => {
            cy.wrap(plus).find('[placeholder="ID"]').type(id)
            cy.wrap(plus).find('[placeholder="First Name"]').type(firstName)
            cy.wrap(plus).find('[placeholder="Last Name"]').type(lastName)
            cy.wrap(plus).find('[placeholder="Username"]').type(userName)
            cy.wrap(plus).find('[placeholder="E-mail"]').type(email)
            cy.wrap(plus).find('[placeholder="Age"]').type(age)
            cy.wrap(plus).find('.nb-checkmark').click()

            cy.get('tbody tr').first().find('td').then( check =>{

                cy.wrap(check).eq(1).should('contain', id)
                cy.wrap(check).eq(2).should('contain', firstName)
                cy.wrap(check).eq(3).should('contain', lastName)
                cy.wrap(check).eq(4).should('contain', userName)
                cy.wrap(check).eq(5).should('contain', email)
                cy.wrap(check).eq(6).should('contain', age)
            }) 
        })
    }

    deleteRowByIndex(index){
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(index)).to.be.calledWith('Are you sure you want to delete?')
        })
    }


}

export const onSmartTable = new SmartTable()
/// <reference types="cypress" />

const { time } = require("console")


describe('Try Cypress', () => {

    it('first test', () => {

        let radio = "Option 1"

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy=imputEmail1]').type('email@gmail.com')
        cy.get('#inputPassword2').type('password')
        cy.get('nb-radio-group').contains(radio).click()


        cy.get('[data-cy="signInGrid"]').click()

    })

    it('Then & Wrap', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            const formOne = firstForm.find('[for="inputEmail1"]').text()
            const formTwo = firstForm.find('[for="inputPassword2"]').text()
            expect(formOne).to.equal('Email')
            expect(formTwo).to.equal('Password')
        })

        cy.contains('nb-card', 'Basic form').then(type =>{
            const email = type.find('#exampleInputEmail1')
            const pass = type.find('#exampleInputPassword1')
            cy.wrap(email).type("email")
            cy.wrap(pass).type("Password")
        })
    })

    it('Invoke', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Basic form').then(type =>{
            const email = type.find('#exampleInputEmail1')
            const pass = type.find('#exampleInputPassword1')
            const check = type.find('.custom-checkbox')
            cy.wrap(email).type("email")
            cy.wrap(pass).type("Password")
            cy.wrap(check).click()
            cy.wrap(check).invoke('attr', 'class').should('contain', 'checked')
        })

    })

    it('Assert', () =>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( inp => {
            cy.wrap(inp).click()
            cy.get('nb-calendar-picker').contains('20').click()
            cy.wrap(inp).invoke('prop', 'value').should('contain', 'Oct 20, 2021')
        })
    })

    it('Radio [Check]', () =>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type=radio]').then( rBut =>{
            cy.wrap(rBut)
                .first()
                .check({force: true})
                .should('be.checked')
            cy.wrap(rBut)
                .eq(1) // Equal Index [x]
                .check({force: true})
            cy.wrap(rBut)
                .first()
                .should('not.be.checked')
            cy.wrap(rBut)
                .eq(2)
                .should('be.disabled')
        })

    })

    it('Checkbox ', () =>{
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').check({force: true})
    })

    it('Dropdown', () => {
        cy.visit('/')

        // cy.get('nav nb-select').click()
        // cy.get('nb-option').contains('Dark').click()

        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        cy.get('nav nb-select').then( dropDown =>{
            cy.wrap(dropDown).click()
            cy.get('.options-list nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim()

                const col = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)",
                }
                cy.wrap(listItem).click()
                cy.wrap(dropDown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', col[itemText])
                if( index < 3){
                    cy.wrap(dropDown).click()
                }

            })
        })
    })

    it('Tables', () =>{
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        cy.get('tbody').contains('tr', 'Snow').then( action => {
            cy.wrap(action).find('.nb-edit').click()
            cy.wrap(action).find('[placeholder="Age"]').clear().type('22')
            cy.wrap(action).find('.nb-checkmark').click()
            cy.wrap(action).find('.ng-star-inserted').should('contain', '22')
        })

        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( plus => {
            cy.wrap(plus).find('[placeholder="ID"]').type('99')
            cy.wrap(plus).find('[placeholder="First Name"]').type('Farid')
            cy.wrap(plus).find('[placeholder="Last Name"]').type('Evan')
            cy.wrap(plus).find('[placeholder="Username"]').type('farvan')
            cy.wrap(plus).find('[placeholder="E-mail"]').type('farvan@gmail.com')
            cy.wrap(plus).find('[placeholder="Age"]').type('24')
            cy.wrap(plus).find('.nb-checkmark').click()

            cy.get('tbody tr').first().find('td').then( check =>{

                cy.wrap(check).should('contain', '99')
                cy.wrap(check).should('contain', 'Farid')
                cy.wrap(check).should('contain', 'Evan')
                cy.wrap(check).should('contain', 'farvan')
                cy.wrap(check).should('contain', 'farvan@gmail.com')
                cy.wrap(check).should('contain', '24')
            }) 
        })

        const age = [20, 30, 40]
        cy.wrap(age).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)

            cy.wait(500)
            cy.get('tbody tr').each( tRow => {
                cy.wrap(tRow).find('td').eq(6).should('contain', age)
            })  
        })
    })
    
    it('DatePicker', () => {

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
                    cy.get('nb-calendar-picker').contains(futureDay).click()
                }
            })
            return dateAssert
        }

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()

            let dateAssert = selectDatFromCurrent(Math.floor(Math.random() * 100))
            cy.log(dateAssert)

            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
        })
        
    })

    it('tools tip', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default')
            .click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')

    })

    it.only('Handling Alert', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // 1
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // })

        // 2
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        // 3
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false)

    })
    
})
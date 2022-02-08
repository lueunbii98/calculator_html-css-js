const calculator = document.querySelector('.calculator') //Returns the first element that match the CSS selectors
const keys = calculator.querySelector('.calculator__keys') //Returns the element with the CSS class "calculator__keys"
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', e => { //Attaches an event handler to the element. (HTML DOM event, function)
    if (e.target.matches('button')){ //target, reference the element that dispatch the event
        const key = e.target
        const action = key.dataset.action //dataset provides access to custom data attributes on elements
        const keyContent = key.textContent //the key pressed text
        const displayedNum = display.textContent //the display number
        const previousKeyType = calculator.dataset.previousKeyType //previous key

        // Removing .is-depressed class
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

        if (!action){ //Number keys, doesn't have action attribute
            if (displayedNum === '0' || previousKeyType === 'operator'){
                display.textContent = keyContent // replacing the text on the display
                //calculator.dataset.previousKeyType = 'number'
            } else {
                display.textContent = displayedNum + keyContent
            }
        }

        if (action === 'add' || action ==='subtract' || action === 'multiply' || action === 'divide'){
            key.classList.add('is-depressed')
            //Custom attribute
            calculator.dataset.previousKeyType = 'operator'

            //saving the 1st number and the operator
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
        }
        if (action === 'decimal'){
            display.textContent = displayedNum + '.'
        }
        if (action === 'clear'){
            console.log('clear key!')
        }
        if (action === 'calculate'){
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            
            //displaying the result
            //display.textContent =  calculate(firstValue, operator, secondValue)
        }
    }
})
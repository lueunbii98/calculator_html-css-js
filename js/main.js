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
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'){
                display.textContent = keyContent // replacing the text on the display
                calculator.dataset.previousKeyType = 'number'
            } else {
                display.textContent = displayedNum + keyContent
            }
        }

        if (action === 'add' || action ==='subtract' || action === 'multiply' || action === 'divide'){
            key.addEventListener('click', e => {
                key.style.animation = '' // reseting the animation by setting it as nothin in every click
                setTimeout(() => key.style.animation = 'feedback 100ms 1 linear', 5) // then loading the animation again
            })

            // Evaluating if the calculation is needed 
            
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            // There is always a second value if there is a first and an operator

            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate'){
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue

                // Updating firstValue to the new calculated value
                calculator.dataset.firstValue = calcValue
            }
            else {
                calculator.dataset.firstValue = displayedNum
            }

            key.classList.add('is-depressed')

            //Custom attribute
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
        }
        if (action === 'decimal'){
            if (previousKeyType === 'operator' || previousKeyType === 'calculate'){ //check if the previous key was an operator
                display.textContent = '0.'
            }
            else if (!displayedNum.includes('.') ){ // check if there's alredy a dot
                display.textContent = displayedNum + '.'
                calculator.dataset.previousKeyType = 'decimal'
            }
        }
        if (action === 'clear'){
            // reseting the calculator if the user hits AC
            if (key.textContent = 'AC'){
                calculator.dataset.firstValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.secondValue = ''
                calculator.dataset.previousKeyType = ''
            }
            else{
                key.textContent = 'AC'
            }
            display.textContent = '0'

            calculator.dataset.previousKeyType = 'clear'
        }
        if (action === 'calculate'){
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum
            
            if (firstValue) { //check if there is a first value
                if (previousKeyType === 'calculate'){ //checking if the user is hiting equal again
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
                
                //displaying the result
                display.textContent =  calculate(firstValue, operator, secondValue)
            }

            // saving the second value in case the user hits equal key again
            calculator.dataset.modValue = secondValue

            calculator.dataset.previousKeyType = 'calculate'
        }

        // Change clear button if necesary
        if (action !== 'clear'){
            const clearButton =  calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }
    }
})

//Function to calculate the result
const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)
    if (operator === 'add') return firstNum + secondNum
    if (operator === 'subtract') return firstNum - secondNum
    if (operator === 'multiply') return firstNum * secondNum
    if (operator === 'divide') return firstNum / secondNum
}
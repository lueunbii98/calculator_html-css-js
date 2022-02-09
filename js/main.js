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

            if (firstValue && operator && previousKeyType !== 'operator'){
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
            if (!displayedNum.includes('.')){ // check if there's alredy a dot
                display.textContent = displayedNum + '.'
                calculator.dataset.previousKeyType = 'decimal'
            }
            else if (previousKeyType === 'operator'){ //check if the previous key was an operator
                display.textContent = '0.'
            }
        }
        if (action === 'clear'){
            console.log('clear key!')
            calculator.dataset.previousKeyType = 'clear'
        }
        if (action === 'calculate'){
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            
            //displaying the result
            display.textContent =  calculate(firstValue, operator, secondValue)
            calculator.dataset.previousKeyType = 'calculate'
        }
    }
})

//Function to calculate the result
const calculate = (n1, operator, n2) => {
    let result = ''

    if (operator === 'add'){
        result = parseFloat(n1) + parseFloat(n2)
    }
    else if (operator === 'subtract'){
        result = parseFloat(n1) - parseFloat(n2)
    }
    else if (operator === 'multiply'){
        result = parseFloat(n1) * parseFloat(n2)
    }
    else if (operator === 'divide'){
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result
}
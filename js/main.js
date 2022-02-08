const calculator = document.querySelector('.calculator') //Returns the first element that match the CSS selectors
const keys = calculator.querySelector('.calculator__keys') //Returns the element with the CSS class "calculator__keys"

keys.addEventListener('click', e => { //Attaches an event handler to the element. (HTML DOM event, function)
    if (e.target.matches('button')){ //target, reference the element that dispatch the event
        const key = e.target
        const action = key.dataset.action //dataset provides access to custom data attributes on elements
        
        if (!action){
            console.log('number key!')
        }
        if (action === 'add' || action ==='subtract' || action === 'multiply' || action === 'divide'){
            console.log('operator key!')
        }
        if (action === 'decimal'){
            console.log('decimal key!')
        }
        if (action === 'clear'){
            console.log('clear key!')
        }
        if (action === 'calculate'){
            console.log('equal key!')
        }
    }
})
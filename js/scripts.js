const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button')

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ''
    }

    // mostra o digito na tela da calculadora
    addDigit(digit){
        // checa se a operação atual já possui um ponto
        if(digit === '.' && this.currentOperationText.innerText.includes('.')){
            return
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    // processa todas as operações da calculadora
    processOperation(operation){
        // checa se o valor de current está vazio
        if(this.currentOperationText.innerText === '' && operation !== 'C'){
            
            // mudança de operação
            if(this.previousOperationText.innerText !== ''){
                this.changeOperation(operation)
            }
            return
        }

        // captura os valores de current e previous
        let operationValue
        const previous = +this.previousOperationText.innerText.split(' ')[0]
        const current = +this.currentOperationText.innerText

        switch(operation){
            case '+':
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case '-':
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
            break
            case '/':
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
            break
            case '*':
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
            break
            case 'DEL':
                this.processDelOperator()
            break
            case 'CE':
                this.processClearCurrentOperation()
            break
            case 'C':
                this.processClearAllOperation()
            break
            case '=':
                this.processEqualOperator()
            break
            default:
                return
        }
    }

    // muda os valores da tela da calculadora
    updateScreen(operationValue = null, operation = null, current = null, previous = null){
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        }else{
            // checa se o valor é zero, se for, adiciona ao current
            if(previous === 0) { 
                operationValue = current 
            }

            // adiciona valor de current para previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ''
        }
    }

    // muda a operação matemática
    changeOperation(operation){
        const mathOperations = ['*' , '/', '+', '-']

        if(!mathOperations.includes(operation)){
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

    // apaga o ultimo digito
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    // limpa a tela da calculadora da operação atual
    processClearCurrentOperation(){
        this.currentOperationText.innerText = ''
    }

    // limpa toda a operação da tela da calculadora
    processClearAllOperation(){
        this.currentOperationText.innerText = ''
        this.previousOperationText.innerText = ''
    }

    // processa as operações
    processEqualOperator(){
        const operation =  previousOperationText.innerText.split(' ')[1]

        this.processOperation(operation)
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach(btn => {
    btn.addEventListener('click', e => {
        const value = e.target.innerText

        if(+value >= 0 || value === '.'){
            calc.addDigit(value)
        }else{
            calc.processOperation(value)
        }
    })
})
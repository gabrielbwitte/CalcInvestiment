import { generateReturnsArray } from './src/investmenstGoals';

const form = document.getElementById('investment-form');
//const calculateButton = document.getElementById('calculate-results');



function renderProgression(evt){
    evt.preventDefault();
    //const staringAmount = Number(form['starting-amount'].value);

    const staringAmount = Number(document.getElementById('starting-amount').value.replace(",","."));
    const additionalContribution = Number(document.getElementById('additional-contribution').value.replace(",","."));
    const timeAmount = Number(document.getElementById('time-amount').value);
    const timeAmountPeriod = document.getElementById('time-amount-period').value;
    const returnRatePeriod = document.getElementById('evaluation-period').value;
    const returnRate = Number(document.getElementById('return-rate').value).replace(",",".");
    const taxRate = Number(document.getElementById('tax-rate').value).replace(",",".");

    const returnArray = generateReturnsArray(staringAmount, timeAmount, timeAmountPeriod, additionalContribution, returnRate, returnRatePeriod)


    console.log(returnArray);
} 

function validateInput(evt) {
    if(evt.target.value === ''){
        return;
    }

    const { parentElement } = evt.target;
    const grandParentElement = evt.target.parentElement.parentElement;
    const inputValue = evt.target.value.replace(",",".");

    if(isNaN(inputValue) || Number(inputValue) <= 0){
        const errorTextElement = document.createElement('p');
        errorTextElement.classList.add('text-red-500');
        errorTextElement.innerText = "Insira um valor numérico e maior que zero";

        parentElement.classList.add('error');
        grandParentElement.appendChild(errorTextElement);

    }
}

for(const formElement of form){
    if(formElement.tagName === 'INPUT' && formElement.hasAttribute('name')){
        formElement.addEventListener('blur', validateInput)
    }
}
form.addEventListener('submit', renderProgression);
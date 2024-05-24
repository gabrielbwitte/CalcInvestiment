import { generateReturnsArray } from './src/investmenstGoals';
import { Chart } from 'chart.js/auto';

const finalMoneyChart = document.getElementById('final-money-distribuion');
const progressionChart = document.getElementById('progression');

const form = document.getElementById('investment-form');
const clearFormButton = document.getElementById('clear-form');



function renderProgression(evt){
    evt.preventDefault();
    if(document.querySelector('.error')){
        return;
    }

    const staringAmount = Number(document.getElementById('starting-amount').value.replace(",","."));
    const additionalContribution = Number(document.getElementById('additional-contribution').value.replace(",","."));
    const timeAmount = Number(document.getElementById('time-amount').value);
    const timeAmountPeriod = document.getElementById('time-amount-period').value;
    const returnRatePeriod = document.getElementById('evaluation-period').value;
    const returnRate = Number(document.getElementById('return-rate').value.replace(",","."));
    const taxRate = Number(document.getElementById('tax-rate').value.replace(",","."));

    const returnArray = generateReturnsArray(staringAmount, timeAmount, timeAmountPeriod, additionalContribution, returnRate, returnRatePeriod)


    //console.log(returnArray);

    new Chart(finalMoneyChart, {
        
            type: 'doughnut',
            data: {
                labels: [
                  'Red',
                  'Blue',
                  'Yellow'
                ],
                datasets: [{
                  label: 'My First Dataset',
                  data: [300, 50, 100],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                  hoverOffset: 4
                }],
              },
          
    })
} 

function clearForm(){
    form['starting-amount'].value = '';
    form['additional-contribution'].value = '';
    form['time-amount'].value = '';
    form['return-rate'].value = '';
    form['tax-rate'].value = '';

    const errorInputContainers = document.querySelectorAll('.error');

    for(const errorInputContainer of errorInputContainers){
        errorInputContainer.classList.remove('error');
        errorInputContainer.parentElement.querySelector('p').remove();
    }
}

function validateInput(evt) {
    if(evt.target.value === ''){
        return;
    }

    const { parentElement } = evt.target;
    const grandParentElement = evt.target.parentElement.parentElement;
    const inputValue = evt.target.value.replace(",",".");

    if(!parentElement.classList.contains('error') && (isNaN(inputValue) || Number(inputValue) <= 0)){
        console.log('error');
        const errorTextElement = document.createElement('p');
        errorTextElement.classList.add('text-red-500');
        errorTextElement.innerText = "Insira um valor numérico e maior que zero";

        parentElement.classList.add('error');
        grandParentElement.appendChild(errorTextElement);

    } else if(parentElement.classList.contains('error') && !isNaN(inputValue) && Number(inputValue) > 0){
        parentElement.classList.remove('error');
        grandParentElement.querySelector('p').remove();
    }
}

for(const formElement of form){
    if(formElement.tagName === 'INPUT' && formElement.hasAttribute('name')){
        formElement.addEventListener('blur', validateInput)
    }
}
form.addEventListener('submit', renderProgression);

clearFormButton.addEventListener('click', clearForm);
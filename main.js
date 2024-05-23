import { generateReturnsArray } from './src/investmenstGoals';

const form = document.getElementById('investment-form');
//const calculateButton = document.getElementById('calculate-results');



function renderProgression(evt){
    evt.preventDefault();
    //const staringAmount = Number(form['starting-amount'].value);

    const staringAmount = Number(document.getElementById('starting-amount').value);
    const additionalContribution = document.getElementById('additional-contribution').value;
    const timeAmount = Number(document.getElementById('time-amount').value);
    const timeAmountPeriod = document.getElementById('time-amount-period').value;
    const returnRatePeriod = document.getElementById('evaluation-period').value;
    const returnRate = Number(document.getElementById('return-rate').value);
    const taxRate = Number(document.getElementById('tax-rate').value);

    const returnArray = generateReturnsArray(staringAmount, timeAmount, timeAmountPeriod, additionalContribution, returnRate, returnRatePeriod)


    console.log(returnArray);
} 

form.addEventListener('submit', renderProgression);
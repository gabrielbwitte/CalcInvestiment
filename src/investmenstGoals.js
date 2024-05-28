function converToMontlyReturRate(yearlyReturnRate){
    return yearlyReturnRate ** (1/12);
}

export function generateReturnsArray(
    staringAmount = 0, 
    timeHorizon = 0, 
    timePeriod = 'monthly', 
    mothlyContribution = 0, 
    returnRate = 0,
     returnTimeFrame = 'monthly'
    ){
        if(!timeHorizon || !staringAmount) {
            throw new Error('Investimento inicial e prazo devem ser preenchidos com valores positivos');
        }

        const finalReturnRate = returnTimeFrame === 'monthly' ? 1 + returnRate / 100: converToMontlyReturRate(1 + returnRate / 100);

        const fianlTimeHorizon = timePeriod === 'monthly' ? timeHorizon: timeHorizon * 12;

        const referenceInvestmentObject = {
            investedAmount: staringAmount,
            interesReturns: 0,
            totalInteresReturns: 0,
            month: 0,
            totalAmount: staringAmount,
        };

        const returnsArray = [referenceInvestmentObject];
        for(let timeReference = 1; timeReference <= fianlTimeHorizon; timeReference++) {
            const totalAmount = (returnsArray[timeReference - 1].totalAmount * finalReturnRate) + mothlyContribution;
            const interesReturns = returnsArray[timeReference - 1].totalAmount * (finalReturnRate - 1);
            const investedAmount = staringAmount + mothlyContribution * timeReference;
            const totalInteresReturns = totalAmount - investedAmount;

            returnsArray.push({
            investedAmount,
            interesReturns,
            totalInteresReturns,
            month: timeReference,
            totalAmount,
            })
        }
        return returnsArray;
}
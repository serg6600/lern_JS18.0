'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function(){
        do {
            money = prompt('Ваш месячный доход?');
        } while(!isNumber(money));
};

start();

let appData = {
    income:{},
    addIncome:[],
    expenses:{},
    addExpenses:[],
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            for (let i = 0; i<2; i++) {
                let temp = prompt('Введите обязательную статью расходов?');
                    let checkPrompt = 0;
                    do{
                        checkPrompt = prompt('Во сколько это обойдется?');
                    } while(!isNumber(checkPrompt));
                appData.expenses[temp] = Number(checkPrompt);

            }
    }
};

appData.asking();

appData.budget = money;
appData.budgetDay = 0;
appData.budgetMonth = 0;
appData.expensesMonth = 0;

appData.getExpensesMonth = function(){
    let sum = 0;
    for (let key in appData.expenses) {
        sum += appData.expenses[key];     
    }
    return sum;
};

appData.expensesMonth = appData.getExpensesMonth();

appData.getBudget = function(money, expensesMonth){
    return (money - expensesMonth);
};

appData.budgetMonth = appData.getBudget(money, appData.expensesMonth);

appData.getTargetMonth = function(){
    return appData.mission/appData.budgetMonth;
};

appData.budgetDay = appData.budgetMonth/30;

appData.getStatisIncome = function(){
    if (appData.budgetDay > 1200) {
        return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay > 600) {
        return ('У вас средний уровень дохода');
    } else if (appData.budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay < 0) {
        return ('Что-то пошло не так');
    }
};

console.log('Расходы за месяц: ', appData.expensesMonth);

if (Math.ceil(appData.getTargetMonth()) > 0 && isFinite(Math.ceil(appData.getTargetMonth()))) {
    console.log('Цель будет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяца(ев)');
} else {
    console.log('Цель не будет достигнута');
}

console.log('Уровень дохода: ', appData.budget);

for(let key in appData){
    console.log('Наша программа включает в себя данные: ' + key + ' ' + appData[key]);
}

console.log(appData);
'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function(){
        do {
            money = prompt('Ваш месячный доход?', '50000');
        } while(!isNumber(money));
};

start();

let appData = {
    income:{},
    addIncome:[],
    expenses:{},
    addExpenses:[],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budget: money,
    budgetMonth: 0,
    budgetDay: 0,
    expensesMonth: 0,
    asking: function(){
        if (confirm('Есть ли у вас дополнительный источник заработка?')){
            let cashIncome = 0;
            let itemIncome = '';
                do{
                    itemIncome = prompt('Какой у вас дополнительный заработок?','Таксую');
                } while(isNumber(itemIncome));
                do {
                    cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
                } while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i<2; i++) {
            let itemExpenses = '';
            do{
                itemExpenses = prompt('Введите обязательную статью расходов?');
            } while (isNumber(itemExpenses));
            let valueExpenses = 0;
            do{
                valueExpenses = prompt('Во сколько это обойдется?', 2500);
            } while(!isNumber(valueExpenses));
            appData.expenses[itemExpenses] = Number(valueExpenses);
        }
    },
    getInfoDeposit: function(){
        if (appData.deposit){
            do{
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(appData.percentDeposit));
            do{
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while(!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getInfoDeposit();

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

appData.budgetMonth = appData.getBudget(appData.budget, appData.expensesMonth);

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

console.log('Наша программа включает в себя данные:');

for(let key in appData){
    console.log(key, appData[key]);
}

let addExpensesString = '';
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

for(let item of appData.addExpenses){
    addExpensesString += capitalizeFirstLetter(item) + ', ';
}

console.log(addExpensesString.slice(0, -2));

let calculate = document.getElementById('start'),
    btnPlus1 = document.getElementsByTagName('button')[0],
    btnPlus2 = document.getElementsByTagName('button')[1],
    checkDeposit = document.querySelector('#deposit-check'),
    addIncomeItems = document.querySelectorAll('.additional_income-item'),

    budgetMonthValue = document.getElementsByClassName('budget_month-value'),
    budgetDayValue = document.getElementsByClassName('budget_day-value'),
    expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
    additionalExpensesValue= document.getElementsByClassName('additional_expenses-value'),
    incomePeriodValue = document.getElementsByClassName('income_period-value'),
    targetMonthValue = document.getElementsByClassName('target_month-value'),
    
    inputMoney = document.querySelector('.salary-amount'),
    incomeTitle = document.getElementsByClassName('income-title')[1],
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.getElementsByClassName('expenses-title')[1],
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');

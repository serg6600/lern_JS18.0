'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let calculate = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    checkDeposit = document.querySelector('#deposit-check'),
    addIncomeItems = document.querySelectorAll('.additional_income-item'),

    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue= document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    
    inputMoney = document.querySelector('.salary-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');

let appData = {
    income:{},
    incomeMonth: 0,
    addIncome:[],
    expenses:{},
    addExpenses:[],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetMonth: 0,
    budgetDay: 0,
    expensesMonth: 0,
    start: function(){
        appData.budget = +inputMoney.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
        periodSelect.addEventListener('input', appData.calcSavedMoney);
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
            if (!isNumber(itemExpenses) && isNumber(cashExpenses) && itemExpenses !== ''){
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;
            if (!isNumber(itemIncome) && itemIncome !== '' && isNumber(cashIncome)){
                appData.income[itemIncome] = +cashIncome;
                appData.incomeMonth += +cashIncome;
            }
        });
    },
    getExpensesMonth: function(){
        let sum = 0;
    for (let key in appData.expenses) {
        sum += appData.expenses[key];     
    }
    appData.expensesMonth = sum;
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.round(appData.budgetMonth/30);
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        addIncomeItems.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue); 
            }
        });
    },
    getTargetMonth: function(){
        return targetAmount.value/appData.budgetMonth;
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
    changePeriodAmount: function(){
        periodAmount.textContent = periodSelect.value;
    },
    calcSavedMoney: function(){
        incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
    }
};

/* appData.getInfoDeposit();

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

if (Math.ceil(appData.getTargetMonth()) > 0 && isFinite(Math.ceil(appData.getTargetMonth()))) {
    console.log('Цель будет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяца(ев)');
} else {
    console.log('Цель не будет достигнута');
} */

let blockCalculate = function(){
    if (isNumber(inputMoney.value)){
        calculate.disabled = false;
    } else{
        calculate.disabled = true;
    }
};

calculate.disabled = true;

calculate.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.changePeriodAmount);

inputMoney.addEventListener('input', blockCalculate);
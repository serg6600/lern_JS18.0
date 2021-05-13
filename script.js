'use strict';

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const calculate = document.getElementById('start'),
    resetButton = document.getElementById('cancel'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    checkDeposit = document.querySelector('#deposit-check'),
    addIncomeItems = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    inputMoney = document.querySelector('.salary-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

class AppData {
    constructor(){
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetMonth = 0;
        this.budgetDay = 0;
        this.expensesMonth = 0;
        this.reset();
    }
    start(){
        this.budget = +inputMoney.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        this.blockInputsAndChangeButton();
    }
    showResult(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.budgetMonth * periodSelect.value;
        periodSelect.addEventListener('input', this.calcSavedMoney.bind(this));
    }
    addIncomeBlock(){
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }
    addExpensesBlock(){
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }
    getExpenses(){
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
            if ((cashExpenses && itemExpenses === '') || isNumber(itemExpenses) || (!isNumber(cashExpenses) && cashExpenses !== '')){
                alert('Необходимо ввести корректные данные!');
                item.querySelector('.expenses-amount').value = '';
                item.querySelector('.expenses-title').value = '';
            }
            if (!isNumber(itemExpenses) && isNumber(cashExpenses) && itemExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    }
    getIncome(){
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;
            if ((cashIncome && itemIncome === '') || isNumber(itemIncome) || (!isNumber(cashIncome) && cashIncome !== '')){
                alert('Необходимо ввести корректные данные!');
                item.querySelector('.income-amount').value = '';
                item.querySelector('.income-title').value = '';
            }
            if (!isNumber(itemIncome) && itemIncome !== '' && isNumber(cashIncome)) {
                this.income[itemIncome] = +cashIncome;
                this.incomeMonth += +cashIncome;
            }
        });
    }
    getExpensesMonth(){
        let sum = 0;
        for (let key in this.expenses) {
            sum += this.expenses[key];
        }
        this.expensesMonth = sum;
    }
    getBudget(){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.round(this.budgetMonth / 30);
    }
    getAddExpenses(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome(){
        addIncomeItems.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }
    getTargetMonth(){
        return targetAmount.value / this.budgetMonth;
    }
    getInfoDeposit(){
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(this.moneyDeposit));
        }
    }
    changePeriodAmount(){
        periodAmount.textContent = periodSelect.value;
    }
    calcSavedMoney(){
        incomePeriodValue.value = this.budgetMonth * periodSelect.value;
    }
    blockInputsAndChangeButton(){
        inputMoney.disabled = true;
        incomeItems.forEach(function (item) {
            item.querySelector('.income-title').disabled = true;
            item.querySelector('.income-amount').disabled = true;
        });
        addIncomeItems.forEach(function (item) {
            item.disabled = true;
        });
        expensesItems.forEach(function (item) {
            item.querySelector('.expenses-title').disabled = true;
            item.querySelector('.expenses-amount').disabled = true;
        });
        additionalExpensesItem.disabled = true;
        targetAmount.disabled = true;
        calculate.style.display = 'none';
        resetButton.style.display = 'block';
        incomePlus.disabled = true;
        expensesPlus.disabled = true;
        checkDeposit.disabled = true;
        resetButton.addEventListener('click', this.reset.bind(this));
    }
    reset(){
        calculate.disabled = true;
        inputMoney.disabled = false;
        inputMoney.value = '';
        for (let i = 1; incomeItems.length > i; i++) {
            incomeItems[i].remove();
        }
        incomeItems[0].querySelector('.income-title').disabled = false;
        incomeItems[0].querySelector('.income-title').value = '';
        incomeItems[0].querySelector('.income-amount').disabled = false;
        incomeItems[0].querySelector('.income-amount').value = '';
        addIncomeItems.forEach(function (item) {
            item.disabled = false;
            item.value = '';
        });
        for (let i = 1; expensesItems.length > i; i++) {
            expensesItems[i].remove();
        }
        expensesItems[0].querySelector('.expenses-title').disabled = false;
        expensesItems[0].querySelector('.expenses-title').value = '';
        expensesItems[0].querySelector('.expenses-amount').disabled = false;
        expensesItems[0].querySelector('.expenses-amount').value = '';
        additionalExpensesItem.disabled = false;
        additionalExpensesItem.value = '';
        targetAmount.disabled = false;
        targetAmount.value = '';
        calculate.style.display = 'block';
        incomePlus.style.display = 'block';
        expensesPlus.style.display = 'block';
        periodSelect.value = 1;
        periodAmount.textContent = 1;
        resetButton.style.display = 'none';
        incomePlus.disabled = false;
        expensesPlus.disabled = false;
        checkDeposit.disabled = false;
    
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetMonth = 0;
        this.budgetDay = 0;
        this.expensesMonth = 0;
    }
    blockCalculate(){
        if (isNumber(inputMoney.value)) {
            calculate.disabled = false;
        } else {
            calculate.disabled = true;
        }
    }
    EventListeners(){
        calculate.addEventListener('click', this.start.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
        incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
        periodSelect.addEventListener('input', this.changePeriodAmount);
        inputMoney.addEventListener('input', this.blockCalculate.bind(this));
    }
}

const appData = new AppData();
appData.EventListeners();
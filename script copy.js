'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let calculate = document.getElementById('start'),
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
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');

let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetMonth: 0,
    budgetDay: 0,
    expensesMonth: 0,
    start: function () {
        this.budget = +inputMoney.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();
        this.blockInputsAndChangeButton();
    },
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.budgetMonth * periodSelect.value;
        periodSelect.addEventListener('input', this.calcSavedMoney.bind(this));
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
            if (!isNumber(itemExpenses) && isNumber(cashExpenses) && itemExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        }, this);
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;
            if (!isNumber(itemIncome) && itemIncome !== '' && isNumber(cashIncome)) {
                this.income[itemIncome] = +cashIncome;
                this.incomeMonth += +cashIncome;
            }
        }, this);
    },
    getExpensesMonth: function () {
        let sum = 0;
        for (let key in this.expenses) {
            sum += this.expenses[key];
        }
        this.expensesMonth = sum;
    },
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.round(this.budgetMonth / 30);
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    },
    getAddIncome: function () {
        addIncomeItems.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this);
    },
    getTargetMonth: function () {
        return targetAmount.value / this.budgetMonth;
    },
    getInfoDeposit: function () {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(this.moneyDeposit));
        }
    },
    changePeriodAmount: function () {
        periodAmount.textContent = periodSelect.value;
    },
    calcSavedMoney: function () {
        incomePeriodValue.value = this.budgetMonth * periodSelect.value;
    },
    blockInputsAndChangeButton: function () {
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
    },
    reset: function () {
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
        this.changePeriodAmount();
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
};

let blockCalculate = function () {
    if (isNumber(inputMoney.value)) {
        calculate.disabled = false;
    } else {
        calculate.disabled = true;
    }
};

calculate.addEventListener('click', appData.start.bind(appData));

expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));

incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));

periodSelect.addEventListener('input', appData.changePeriodAmount);

inputMoney.addEventListener('input', blockCalculate);
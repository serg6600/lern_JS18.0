'use strict';
let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;
let period = 12;

let start = function(){
    do {
            money = prompt('Ваш месячный доход?');
    } while(!isNumber(money));

};

start();

let showTypeOf = function(data){
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];
/*
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('А это во сколько это обойдется?');
*/

const getExpensesMonth = function(){
    let sum = 0;
    let checkPrompt;
    for (let i = 0; i<2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
            do{
                checkPrompt = prompt('Во сколько это обойдется?');
            } while(!isNumber(checkPrompt));
        sum += Number(checkPrompt);
        console.log('sum: ', sum);
        
    }
    return sum;
};

let expensesAmounth = getExpensesMonth();

console.log('getExpensesMonth: ', expensesAmounth);

console.log('Возможные расходы', addExpenses.toLowerCase().split(', '));

const getAccumulatedMonth = function(){
    return (money - expensesAmounth);
};

let accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function(){
    return mission/accumulatedMonth;
};

let targetMonth = Math.ceil(getTargetMonth());

if (targetMonth > 0 && isFinite(targetMonth)) {
    console.log('Цель будет достигнута за: ' + targetMonth + ' месяца(ев)');
} else {
    console.log('Цель не будет достигнута');
}

let budgetDay = accumulatedMonth/30;

console.log('budgetDay: ', budgetDay);

let getStatisIncome = function(){
    if (budgetDay > 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay > 600) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
        return ('Что-то пошло не так');
    }
};

console.log(getStatisIncome());

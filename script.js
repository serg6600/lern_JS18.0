'use strict';
let money = +prompt('Ваш месячный доход?');
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;
let period = 12;

let showTypeOf = function(data){
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('А это во сколько это обойдется?');

const getExpensesMonth = function(){
    return (amount1 + amount2);
};

console.log('getExpensesMonth: ', getExpensesMonth());

console.log('Возможные расходы', addExpenses.toLowerCase().split(', '));

const getAccumulatedMonth = function(){
    return (money-getExpensesMonth());
};

let accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function(){
    return mission/accumulatedMonth;
};

console.log('getTargetMonth: ', Math.ceil(getTargetMonth()));

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

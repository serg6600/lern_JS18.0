let money = 100000;
let income = 'фриланс';
let addExpenses = 'Аренда, Еда, Отдых, Обучение';
let deposit = false;
let mission = 1000000;
let period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей/долларов/гривен/юани');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money/30;

console.log(budgetDay);

money = prompt('Ваш месячный доход?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('А это во сколько это обойдется?');

let budgetMonth = Number(money) - Number(amount1) - Number(amount2);
console.log(budgetMonth);

let missionTime = mission/budgetMonth;
console.log(Math.ceil(missionTime));

budgetDay = budgetMonth/30;
console.log(Math.ceil(budgetDay));

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
    console.log('Что-то пошло не так');
}
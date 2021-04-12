'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

alert('Загадывание случайного числа от 1 до 100');

function checking(){
    const x = 93;
    let number = prompt('Угадай число от 1 до 100');
    if (number === null){
        alert('Игра окончена');
    } else if (!isNumber(number)) {
        alert('Введи число!');
        checking();
    } else if (x > number){
        alert('Загаданное число больше');
        checking();
    } else if (x < number) {
        alert('Загаданное число меньше');
        checking();
    } else if (x === Number(number)){
        alert('Поздравляю, Вы угадали!!!');
    }
}

checking();



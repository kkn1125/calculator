/**
 * 1. eval 함수 써서 calculate 함수만 작성 (같이)
 * 2. separate, plus, minus, multiply, divide, ordered, brackets 함수화
 * 3. 작성 (따로)
 */

const signs = ["+", "-", "*", "/", "(", ")", "="];
const result = document.querySelector("#result");

window.addEventListener("keyup", e => {
    if (e.key.toLowerCase() !== "enter") return;

    result.value = calculate(result.value);
});

/**
 * ========================================================
 *                      Main Methods
 * ========================================================
 */

/**
 * 계산하는 기능
 * @param {string} string 
 * @returns {int|float}
 * @example
 * // "5+6-9*3"
 */
function calculate(string) {
    return eval(string);
}

/**
 * ========================================================
 *                      Sub Methods
 * ========================================================
 */

/**
 * 더하는 기능
 * @author ohoraming
 * @since v0.1.0
 */
function plus() {

}

/**
 * 빼는 기능
 * @author kimson
 * @since v0.1.0
 */
function minus() {

}

/**
 * 곱하기 기능
 * @author ohoraming
 * @since v0.1.0
 */
function multiply() {

}

/**
 * 나누기 기능
 * @author kimson
 * @since v0.1.0
 */
function divide() {

}

const arithmeticOrderConvetion = ["*", "/", "+", "-"];

const calculator = {};

let index = 0;
let hasMultiOrDivideFlag = true;

function 연산(current, next, sign) {
    switch (sign) {
        case "*": return current * next;
        case "/": return current / next;
        case "+": return current + next;
        case "-": return current - next;
    }
}

function 갈아끼우기(sample, absolute, calcuated, name) {
    sample.splice(absolute, 1);
    sample.splice(absolute, 1, {
        num: calcuated,
        name: name,
    });
}

arithmeticOrderConvetion.forEach(sign => {
    calculator[sign] = function (sample, absolute, cNum, nNum, cName, nName, index) {
        const calced = 연산(parseFloat(cNum), parseFloat(nNum), cName);
        갈아끼우기(sample, absolute, calced, nName);
        index--;
    }
});

/**
 * 연산기호를 구분 함
 * @example
 * "3*5+6-9*3"
 *                                    ┌---------┐
 *                          ┌---------┐
 *                ┌---------┐
 * 첫 번째 방법 : "5", "+", "6", "-", "9", "*", "3"
 * 두 번째 방법 : [
 *    {
 *      num: 5,
 *      next: "+"
 *    },
 *    {
 *      num: 6,
 *      next: "-"
 *    },
 *    {
 *      num: 9,
 *      next: "*"
 *    },
 *    {
 *      num: 3,
 *      next: null
 *    }
 * ]
 */
function separateStringBySign() {

}

function lastCalculator(signs) {
    while(signs.length > 1) {
        const absolute = index%(signs.length-1);
        const current = signs[absolute];
        const next = signs[absolute+1];
        
        hasMultiOrDivideFlag = signs.some(item =>
            item.name === "*" ||
            item.name === "/");
            
        if(hasMultiOrDivideFlag) {
            if(current.name === "*" || current.name === "/") {
                calculator[current.name](signs, absolute, current.num, next.num, current.name, next.name, index);
            }
        } else {
            calculator[current.name](signs, absolute, current.num, next.num, current.name, next.name, index);
        }
    
        index++;
    
        if(index > 100 || signs.length === 1) break;
    };

    return signs;
}
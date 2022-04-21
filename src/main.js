/**
 * (5+9)+((8/(9*3))-1)*(5-9*(5+3))
 * 1. eval 함수 써서 calculate 함수만 작성 (같이)
 * 2. separate, plus, minus, multiply, divide, ordered, brackets 함수화
 * 3. 작성 (따로)
 */

const MASTER_REGEXP = /\([\d\+\*\-\/]+\)/;
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
function separateStringBySign(string) {
    const arr = [];
    const source = string.match(/([\d\.]+|[\+\-\*\/])/g);

    for(let i=0; i<source.length; i+=2) {
        arr.push({
            num: source[i],
            next: source[i+1]
        });
    }

    return arr;
}

function lastCalculator(signs) {
    while(signs.length > 1) {
        const absolute = index%(signs.length-1);
        const current = signs[absolute];
        const next = signs[absolute+1];

        hasMultiOrDivideFlag = signs.some(item =>
            item.next === "*" ||
            item.next === "/");
            
        if(hasMultiOrDivideFlag) {
            if(current.next === "*" || current.next === "/") {
                calculator[current.next](signs, absolute, current.num, next.num, current.next, next.next, index);
            }
        } else {
            calculator[current.next](signs, absolute, current.num, next.num, current.next, next.next, index);
        }
    
        index++;
    
        if(index > 100 || signs.length === 1) break;
    };

    return signs;
}

let test = "(5+9)+((8/(9*3))-1)*(5-9*(5+3))";

function 괄호잡기() {
    while (test.indexOf("(")>-1 && test.indexOf(")")>-1) {
        let stack = [];

        for(let idx in test) {
            const word = test[idx];
    
            if(word === "(") {
                stack.push([parseInt(idx), true]);
            } else if(word === ")") {
                stack.push([parseInt(idx), false]);
            }
        }

        for(let id=0; id<stack.length-1; id++) {
            const flag1 = stack[id];
            const flag2 = stack[id+1];
            const [idx1, bool1] = flag1;
            const [idx2, bool2] = flag2;
    
            if(bool1 && !bool2) {
                const 알멩이 = test.slice(idx1+1, idx2);
                const middle = separateStringBySign(알멩이);
                // console.table(middle)
                const result = lastCalculator(middle).pop().num;
                const front = test.slice(0, idx1);
                const back = test.slice(idx2+1);
                
                test = front+result+back;
                break;
            }
        }
    }

    let temps = [];
    
    let cc = 0;

    while(test.length>0) {
        // console.log(test)
        const lastS = test.indexOf("*", 1);
        const lastD = test.indexOf("/", 1);
        const lastP = test.indexOf("+", 1);
        const lastM = test.indexOf("-", 1);
        let min = Math.min(...[lastS,lastD,lastP,lastM].filter(x=>x!=-1));
        
        temps.push(test.slice(0, min));
        temps.push(test.slice(min, min+1));
        test = test.slice(min+1);

        if(min == Infinity) break;

        cc++;

        if(cc>50) break;
    }

    temps = temps.filter(x=>x);

    let converted = [];

    for(let i=0; i<temps.length; i+=2) {
        converted.push({
            num: temps[i],
            next: temps[i+1]
        });
    }

    return lastCalculator(converted);
}

const 진짜끝 = 괄호잡기();
// console.log(진짜끝)
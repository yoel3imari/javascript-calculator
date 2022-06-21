/* 
    Explain fnctions and varibles names

    slctOne : fnct selct one element from the DOM using e as a selector
    slctAll : fnct selct All element from the DOM using e as a selector
    newElm: fnct create new element 
    isNumber: fnct verify if the char giving is a number
    optionMathFnct: fnct relate evey optin with its mathematic approach and return erro when the result is Nan
    optionInsideBrkt: fnct that solve Ln(), e(), cos, sin, tan, √(), log()
    powerCaseOpt: fnct that solve power function ()^() and ()²
    calculate: fnct that verify if the formula has any special Math function, calculate each one of them if there is any, and return the final result


*/

function slctOne(e) {
    return document.querySelector(e);
}

function slctAll(e) {
    return document.querySelectorAll(e);
}

function newElm(elm, content) {
    var e = document.createElement(elm);
    e.textContent = content;
    return e;
}

function isNumber(char) {
    if (typeof char !== 'string') {
        return false;
    }

    if (char.trim() === '') {
        return false;
    }

    return !isNaN(char);
}

function optionMathFnct(opt, op) {
    switch (opt) {
        case "ln":
            var r = Math.log(op[0]);
            if (isNaN(r))
                return Error("20:Uncorrect value passed to ln()");
            return r;

        case "log":
            var r = Math.log10(op[0]);
            if (isNaN(r))
                return Error("26:Uncorrect value passed to log()");
            return r;

        case "e":
            return Math.exp(op[0]);

        case "sin":
            var r = Math.sin(op[0]);
            if (isNaN(r))
                return Error("35:Uncorrect value passed to sin()");
            return r;

        case "cos":
            var r = Math.cos(op[0]);
            if (isNaN(r))
                return Error("35:Uncorrect value passed to sin()");
            return r;

        case "tan":
            var r = Math.tan(op[0]);
            if (isNaN(r))
                return Error("44:Uncorrect value passed to tan()");
            return r;

        case "√":
            var r = Math.sqrt(op[0]);
            if (isNaN(r))
                return Error("50:Uncorrect value passed to √()");
            return r;
        case "p":
            var r = Math.pow(op[0], op[1]);
            if (isNaN(r))
                return Error("55:Uncorrect value passed to ()p()");
            return r

        default:
            break;
    }
}

function optionInsideBraket(opt, equation) {
    console.log("opt: " + opt + " equation: " + equation);
    var indexOfOpt = equation.indexOf(opt);
    // first bracket pos
    var posFirstBrkt = indexOfOpt + opt.length;
    // second bracket pos
    if (equation[indexOfOpt + opt.length + 1] == ")") {
        // inside brackets is empty ()
        throw new Error("65:A function is empty! " + opt);
    }
    var afterFirstBrkt = equation.slice(posFirstBrkt + 1);
    var toArray = afterFirstBrkt.split('');
    var posScndBrkt = -1;
    var countOpenBrkt = 0;
    for (let i = 0; i < toArray.length; i++) {
        if (toArray[i] == ")") {
            if (countOpenBrkt == 0) {
                posScndBrkt = posFirstBrkt + i + 1;
                break;
            } else {
                countOpenBrkt -= 1;
                continue;
            }
        }
        if (toArray[i] == "(") ++countOpenBrkt;
    }
    if (posScndBrkt == -1) {
        // no closing bracket
        throw new Error("95:A closing bracket is missing! opt: " + opt);
    }


    var beforeOpt = equation.slice(0, indexOfOpt);
    var insideBrkt = equation.slice(posFirstBrkt + 1, posScndBrkt);
    var afterOpt = equation.slice(posScndBrkt + 1);

    var op = calculate(insideBrkt)

    var braketBefore = (isNumber(equation[posFirstBrkt - opt.length - 1])) ? "*(" : "(";
    var braketAfter = (isNumber(equation[posScndBrkt + 1])) ? ")*" : ")";

    var ans = beforeOpt + braketBefore + optionMathFnct(opt, [op]) + braketAfter + afterOpt;
    console.log("answer => " + ans);
    return ans;

}

// power function should be like (base)p(power) : (2)p(4) = 2^4 = 16
function powerCaseOpt(opt, equation) {
    var indexOfOpt = equation.indexOf(opt);
    console.log("opt: " + opt + " equation : " + equation + " indexOf: " + indexOfOpt);
    // get the base
    var baseScndBrkt = indexOfOpt - 1;
    var beforeScndBrkt = equation.slice(0, baseScndBrkt);
    if (equation[baseScndBrkt - 1] == "(") {
        // no closing bracket
        throw new Error("107:A function parameter is empty!" + opt);
    }
    var toArray = beforeScndBrkt.split('');
    var baseFirstBrkt = -1;
    var countClosedBrkt = 0;
    for (let i = toArray.length; i >= 0; i--) {
        if (toArray[i] == "(") {
            if (countClosedBrkt == 0) {
                baseFirstBrkt = i;
                break;
            } else {
                countClosedBrkt -= 1;
                continue;
            }
        }
        if (toArray[i] == ")") ++countClosedBrkt;
    }
    if (baseFirstBrkt == -1) {
        // no openning bracket
        throw new Error("126:A openning bracket is missing!" + opt);
    }

    // get the power
    var powerFirstBrkt = indexOfOpt + 1;
    var afterFirstBrkt = equation.slice(powerFirstBrkt + 1);
    // get second braket
    if (equation[indexOfOpt + opt.length + 1] == ")") {
        // no closing bracket
        throw new Error("139:A function parameter is empty!" + opt);
    }
    var toArray = afterFirstBrkt.split('');
    var powerScndBrkt = -1;
    var countOpenBrkt = 0;
    for (let i = 1; i < toArray.length; i++) {
        if (toArray[i] == ")") {
            if (countOpenBrkt == 0) {
                powerScndBrkt = powerFirstBrkt + i + 1;
                break;
            } else {
                countOpenBrkt -= 1;
                continue;
            }
        }
        if (toArray[i] == "(") ++countOpenBrkt;
    }
    if (powerScndBrkt == -1) {
        // no closing bracket
        throw new Error("158:A closing bracket is missing!" + opt);
    }

    var power = equation.slice(powerFirstBrkt + 1, powerScndBrkt);
    var base = equation.slice(baseFirstBrkt + 1, baseScndBrkt);

    console.log("base => " + base + " power => " + power);

    base = calculate(base);
    power = calculate(power);

    var afterPower = equation.slice(powerScndBrkt + 1);
    var beforePower = equation.slice(0, baseFirstBrkt);

    var braketBefore = (isNumber(equation[baseFirstBrkt - 1])) ? "*(" : "(";
    var braketAfter = (isNumber(equation[powerScndBrkt + 1])) ? ")*" : ")";

    var ans = beforePower + braketBefore + optionMathFnct(opt, [base, power]) + braketAfter + afterPower;
    console.log("answer => " + ans);
    return ans;
}

function calculate(equation) {
    try {
        if (
            equation.indexOf("ln") == -1 &
            equation.indexOf("log") == -1 &
            equation.indexOf("e") == -1 &

            equation.indexOf("sin") == -1 &
            equation.indexOf("cos") == -1 &
            equation.indexOf("tan") == -1 &

            equation.indexOf("p") == -1 &
            equation.indexOf("√") == -1
        ) {
            // eval is very dangious because
            // it allows malisious script to be executed

            //return eval(equation.toString());

            return new Function('return ' + equation.toString())()
        }

        TODO:
        // define every opt position one by one
        // find second bracket
        // calculate what is inside (recursion)
        // replace opt with value
        // roll it again till all opt are replaced with there value
        if (equation.indexOf("p") != -1) {
            equation = powerCaseOpt("p", equation);
        }

        if (equation.indexOf("ln") != -1) {
            equation = optionInsideBraket("ln", equation);
        }

        if (equation.indexOf("log") != -1) {
            equation = optionInsideBraket("log", equation);
        }

        if (equation.indexOf("e") != -1) {
            equation = optionInsideBraket("e", equation);
        }

        if (equation.indexOf("√") != -1) {
            equation = optionInsideBraket("√", equation);
        }

        if (equation.indexOf("tan") != -1) {
            equation = optionInsideBraket("tan", equation);
        }

        if (equation.indexOf("sin") != -1) {
            equation = optionInsideBraket("sin", equation);
        }

        if (equation.indexOf("cos") != -1) {
            equation = optionInsideBraket("cos", equation);
        }

        return calculate(equation).toString();
    } catch (error) {
        console.log("An error has occured: [" + error + " ]");
        return "Error";
    }
}

const input = slctOne('#input');
const result = slctOne('#result');
const history = slctOne('#history');

slctAll('.btn').forEach(elm => {
    elm.addEventListener('click', function () {
        // get action from the elm clicked (this)
        var action = this.getAttribute("data-value").toLowerCase();
        // what action do we have
        switch (action) {
            case "=":
                if (input.innerText == "")
                    break;
                // solve op
                var equation = input.getAttribute("data-equation");
                var solved = calculate(equation);
                if (
                    solved == "Infinity" ||
                    solved == "-Infinity"
                ) {
                    solved = "Error 2";
                }
                result.innerText = solved;
                // record op in history
                history.prepend(newElm('p', equation + " = " + solved));
                // clear op input
                input.setAttribute("data-equation", "");
                input.innerText = "";
                break;

            case "ac":
                // clear all
                input.setAttribute("data-equation", "");
                input.innerText = "";
                result.innerText = "";
                break;

            default:
                // clear result
                if (result.innerText != "") {
                    result.innerText = "";
                }
                // add symbol|number to op input
                var show = this.getAttribute('data-show').toLowerCase();
                input.innerText = input.innerText + show.toString();

                var opt = input.getAttribute("data-equation").toLowerCase() + this.getAttribute('data-value').toLowerCase();;
                input.setAttribute("data-equation", opt);
                break;
        }
    })
});

slctAll('.opt').forEach(elm => {
    elm.addEventListener('click', function () {
        var show = this.getAttribute('data-show').toLowerCase();
        input.innerText = input.innerText + show.toString();

        var opt = this.getAttribute('data-option').toLowerCase();
        opt = input.getAttribute("data-equation").toLowerCase() + opt;
        input.setAttribute("data-equation", opt);
    });
})

// bind keyboard to numbers
document.addEventListener('keydown', function (e) {
    switch (e.keyCode) {

        // clear all
        case 46:
        case 8:
            slctOne('.ac').click();
            break;

        case 48:
        case 96:
            slctOne('.zero').click();
            break;

        case 49:
        case 97:
            slctOne('.one').click();
            break;

        case 50:
        case 98:
            slctOne('.two').click();
            break;

        case 51:
        case 99:
            slctOne('.three').click();
            break;

        case 52:
        case 100:
            slctOne('.four').click();
            break;

        case 53:
        case 101:
            slctOne('.five').click();
            break;

        case 54:
        case 102:
            slctOne('.six').click();
            break;

        case 55:
        case 103:
            slctOne('.seven').click();
            break;

        case 56:
        case 104:
            slctOne('.eight').click();
            break;

        case 57:
        case 105:
            slctOne('.nine').click();
            break;

        case 110:
            slctOne('.dot').click();
            break;

        //+
        case 107:
            slctOne('.plus').click();
            break;

        //*
        case 106:
            slctOne('.multp').click();
            break;

        //-
        case 109:
            slctOne('.minus').click();
            break;

        // ÷
        case 111:
            slctOne('.frct').click();
            break;

        // (
        case 219:
            slctOne('.leftb').click();
            break;

        // )
        case 221:
            slctOne('.rightb').click();
            break;
        // =
        case 13:
        case 187:
            slctOne('.equals').click();
            break;

        default:
            return;
    }
})

slctOne('#mode').addEventListener("click", () => {
    var mode = slctOne("body").getAttribute("data-mode");
    var swtch = (mode == "dark")?"light":"dark";
    slctOne("body").setAttribute("class", swtch + "-mode");
    slctOne("body").setAttribute("data-mode", swtch);
})
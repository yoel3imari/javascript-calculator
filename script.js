function slctOne(e) {
    return document.querySelector(e);
}

function slctAll(e) {
    return document.querySelectorAll(e);
}

function calculate(equation) {
    console.log(equation);
    if (equation.indexOf('(') == -1) {
        try {
            return eval(equation.toString());
        } catch (error) {
            console.log("An error has occured: [" + error + " ]");
            return "Error";
        }
    }
    else {
        // get the equation inside brackets and solve it
        // find the pair brackets position

        // first brackets
        var firstBracket = equation.indexOf('(');
        /* console.log("first bracket: " + firstBracket); */
        // memorise the part before 1st brackets
        // verify if there is something before 1st bracket

        var partBeforeBracket = (firstBracket > 0)? equation.slice(0, firstBracket) : "" ;

        // second brackets
        // if there is no 2nd bracket return error
        if (equation.indexOf(')') == -1) {
            console.log("Second Bracket missing");
            return "Typing Error";
        }
        var secondBracket = equation.length - 1 - equation.split('').reverse().join('').indexOf(")");
        /* console.log("second bracket: " + secondBracket); */

        // if inside brackets is empty or brackets are misordered return error
        if( (secondBracket - firstBracket) <= 1 ) {
            console.log("Brackets missorder or Inside brackets empty");
            return "Typing Error";
        }

        // brackets content
        var insideBrackets = equation.slice(firstBracket + 1, secondBracket);
        /* console.log("inside bracket: " + insideBrackets); */
        // memorize content after 2nd brackets
        // verify if there is something

        var partAfterBracket = (secondBracket < equation.length - 1)? equation.slice(secondBracket+1) : "" ;
        
        // redo the process till there is no brackets left
        return calculate(partBeforeBracket + '' + calculate(insideBrackets).toString() + '' + partAfterBracket);
    }
}

const input = slctOne('#input');
const result = slctOne('#result');

slctAll('.btn').forEach(elm => {
    elm.addEventListener('click', function () {

        //console.log("i clicked on " + this.getAttribute("data-value") );

        var action = this.getAttribute("data-value").toLowerCase();
        switch (action) {
            case "=":
                result.innerText = calculate(input.innerText);
                break;

            case "ac":
                input.innerText = "";
                result.innerText = ""
                break;

            default:
                input.innerText = input.innerText + action.toString();
                break;
        }
    })
});

// bind keyboard to numbers
document.addEventListener('onKeyPress', function (e) {
    switch (e.keyCode) {

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

        case 190:
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

        // clear all
        case 67:
            slctOne('.ac').click();
            break;

        // =
        case 13:
            slctOne('.equals').click();
            break;

        // =
        case 187:
            slctOne('.equals').click();
            break;

        default: return;
    }
})
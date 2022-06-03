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

function calculate(equation) {
    try {
        return eval(equation.toString());
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
                result.innerText = calculate(input.innerText);
                // record op in history
                history.prepend(newElm('p', input.innerText + " = " + result.innerText));
                // clear op input
                input.innerText = "";
                break;

            case "ac":
                // clear all
                input.innerText = "";
                result.innerText = "";
                break;

            default:
                // add symbol|number to op input
                input.innerText = input.innerText + action.toString();
                break;
        }
    })
});

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

        // =
        case 13:
        case 187:
            slctOne('.equals').click();
            break;

        default:
            return;
    }
})
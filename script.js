const baseUrl = "http://localhost:8000/";
var game;

if (localStorage.getItem("game")) {
    document.getElementById("btn-load-game").removeAttribute("disabled")
}


function enableRow(row) {
    var row = document.getElementById("guess-" + row);
    for (let i = 1; i <= 6; i++) {
        row.elements["letter-" + i].removeAttribute("disabled");
        row.elements["letter-" + i].removeAttribute("not-in-word");
        row.elements["letter-" + i].removeAttribute("in-word");
        row.elements["letter-" + i].removeAttribute("correct");
    }
    row.elements["letter-1"].focus();
}

function disableRow(row) {
    var row = document.getElementById("guess-" + row);
    for (let i = 1; i <= 6; i++) {
        row.elements["letter-" + i].setAttribute("disabled", true);
    }
}

async function startGame() {
    try {
        const response = await fetch(baseUrl + "game/start", {
            method: "POST"
        });

        var elements = document.getElementsByTagName("input");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].type == "text") {
                elements[i].setAttribute("disabled", true)
                elements[i].value = "";
            }
        }
        enableRow(1);

        const id = await response.json();

        localStorage.setItem("game", id);
    } catch (error) {
        console.log(error);
    }
}

async function loadGame() {
    //todo
}

async function guess(event, row) {
    event.preventDefault();
    var guess = document.getElementById("guess-" + row);
    var word = ""
    for (let i = 1; i <= 6; i++) {
        var letter = guess.elements["letter-" + i];
        if (!letter.value) {
            letter.focus()
            return;
        }
        word += letter.value;
    }

    try {
        const response = await fetch(baseUrl + `game/${localStorage.getItem("game")}/guess?guess=${word}`, {
            method: "POST"
        });

        const result = await response.json();

        disableRow(row);

        var won = true;
        for (let i = 0; i < 6; i++) {
            var positionResult = result[i];
            if (positionResult == -1) {
                guess.elements["letter-" + (i + 1)].setAttribute("not-in-word", true);
                won = false;
            } else if (positionResult == 0) {
                guess.elements["letter-" + (i + 1)].setAttribute("in-word", true);
                won = false;
            } else if (positionResult == 1) {
                guess.elements["letter-" + (i + 1)].setAttribute("correct", true);
            }
        }

        if (row < 6 && !won) {
            enableRow(row + 1);
        } else {
            if (won) {
                // todo
            } else {
                // todo
            }
        }

    } catch (error) {
        console.log(error);
    }

}

function validateChar(input) {
    if (input.value) {
        input.value = input.value.substr(input.value.length - 1).toLowerCase();
    }
}

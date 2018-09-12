let wordChoices = ["cowboy", "tombstone", "horse", "war", "noose", "horse", "rifle"];
let wrongCount;
let rightCount;
let wordSuccess = [];
let wordFail = [];
let wordF = [];
let printSuccess;
let guess;
let winS = 0;
let word;
let guessLe;
let lastword;
let playsound;
let keyclick = 1;
function random() {

    return wordChoices[Math.floor(Math.random() * wordChoices.length)];
}
reset()
function reset() {
    word = ""
    word = random()

    if (word === lastword) {
        word = random()

    };
    console.log(word);
    keyclick = 1;
    wordSuccess.length = 0;
    wordFail.length = 0;
    wordFail = [];
    wordF.length = 0;
    wrongCount = 0;
    rightCount = 0;
    guessLe = 7;
    printSuccess = "_ ";
    playSound = 0;
    printSuccess = printSuccess += printSuccess.repeat(word.length - 1);
    printStuff("winCo", winS);
    printStuff("wrongP", wordFail);
    printStuff("guessL", guessLe);
    printStuff("photo", "<img class = 'photoSize' src='assets/images/photo1.jpg' alt='tuco'>");
    printStuff("wordP", printSuccess)

};

function success() {
    keyclick = 0;
    printStuff("photo", "<img class = 'photoSize' src='assets/images/success.gif' alt='tuco'>")
    setTimeout(reset, 19000);
}
function fail() {
    printStuff("photo", "<img class = 'photoSize' src='assets/images/sadhill.jpg' alt='tuco'>")
    setTimeout(reset, 4000);
}

function wordCheck(pass, str) {
    return (pass).includes(str)
};

function printStuff(firs, sec) {
    document.getElementById(firs).innerHTML = sec;
};

printStuff("wordP", printSuccess);
document.onkeyup = function (event) {
    guess = event.key;
    if (keyclick === 1) {

        if (playSound === 0) {
            playSound++
            var audio = new Audio('assets/images/sound.mp3');
            audio.play();
        }
        if (guess.search(/[^a-z]+/i) === -1 && guess.length === 1) {
            if (wordCheck(wordSuccess, guess) || wordCheck(wordFail, guess)) {
                alert("this letter was already guessed");
            }
            else {

                if (wordCheck(word, guess)) {
                    wordSuccess.push(guess);
                    rightCount = rightCount + word.split(guess).length - 1

                }
                else {
                    wordFail.push(guess);
                    wordF.push(guess + " ")
                    wrongCount++;
                    printStuff("photo", "<img class = 'photoSize' src='assets/images/noose1.gif' alt='tuco'>");
                    printStuff("wrongP", wordF);
                    guessLe--;
                    printStuff("guessL", guessLe);
                    if (wrongCount === 7) {
                        keyclick=0;
                        fail()
                    }
                }
            }
            printSuccess = "";

            for (var i = 0; i < word.length; i++) {

                if (wordCheck(wordSuccess, word.charAt(i))) {
                    printSuccess = printSuccess += (" " + word.charAt(i));
                }
                else {
                    printSuccess = printSuccess += " _";
                }
            }
            printStuff("wordP", printSuccess);

            if (rightCount === word.length) {
                winS++;
                lastword = word;
                keyclick = 0;
                setTimeout(success, 500);
            }
        }
        else {
            alert("characters only")
        };
    };
};
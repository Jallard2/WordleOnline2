

class GuessChecking {
    initialize() {
        const Modes = {
            Hosted: "Hosted",
            Computer: "Computer"
        }
        this.mode = Modes.Hosted;
        this.word = wordPicker().toUpperCase();
    }

    wordPicker() {
        return "Roate";
    }

    userGuess(guess) {
        if (this.guessNumber <= 6) {
            this.guess = guess.toUpperCase();
            this.guessNumber++;
            this.guessChecking();
            console.log("\n");
        }
    }

    occurance(array, value){
        var n = 0;
        for (var i = 0; i < array.length; i++) {
            if (array[i] == value) {
                n++
            }
        }
        return n;
    }
}

let gc = new GuessChecking();
gc.initialize();



const practiceTime = 4000; // Milliseconds
const belt = "yellow";
const data = {
    tecniques: {
        "cross": "yellow",
        "jab": "yellow"
    },
    combos: {
        yellow: [
            "cross, jab",
            "cross, jab, cross, jab"
        ],
        orange: [
            "cross, jab, knee"
        ]
    }
};


// TEXT
let textNode = document.querySelector("#current-combo");

// SPEECH
var synth = window.speechSynthesis;

const coachUser = combo => {
    textNode.innerText = combo;
    synth.speak(new SpeechSynthesisUtterance(combo));
}


// LOOP THE COMBO MOVES
const nextCombo = (current) => {
    setTimeout(() => {
        if (current >= data.combos[belt].length) {
            coachUser("WELL DONE!");
        } else {
            const combo = data.combos[belt][current];
            coachUser(combo);
            nextCombo(current +1)
        }
    }, practiceTime);
}

nextCombo(0);

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
        if (current >= data.combos[belt].length) {
            coachUser("WELL DONE!");
        } else {
            const combo = data.combos[belt][current];
            coachUser(combo);
            setTimeout(nextCombo.bind(null, current +1), practiceTime);
        }
}

function startTraining() {
    nextCombo(0);
    document.querySelector(".wait-for-user").style.display = "none";
}

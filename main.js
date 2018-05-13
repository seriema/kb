const data = {
    tecniques: {
        "cross": "yellow",
        "jab": "yellow"
    },
    combos: {
        yellow: [
            "jab, cross",
            "jab, cross, jab, cross",
            "jab, cross, hook",
            "jab, cross, hook, cross",
            "low hook, high hook, cross",
            "jab, cross, roundhouse",
            "front kick, roundhouse",
            "jab, cross, knee",
            "jab, cross, knee, elbow",
            "jab, uppercut, knee"
        ],
        orange: [
            "jab, rear hand hook, lead hand uppercut",
            "lead hand hook, cross, lead hand hook",
            "jab, cross, change guard, cross",
            "lead hand uppercut, lead hand hook, cross",
            "rear hand uppercut, lead hand hook, cross",
            "jab, lead hand backfist, cross",
            "jab, cross, lead foot roundhouse",
            "jab, cross, lead hand hook, back foot roundhouse",
            "jab, cross, back foot roundhouse, lead knee",
            "jab, front kick, cross, lead hand hook",
            "jab, cross, sidekick",
            "jab, cross, knee",
            "jab, cross, axe kick",
            "jab, cross, roundhouse"
        ]
    }
};

// CONFIG
const practiceTimeNode = document.querySelector("#practice-time");
const waitForUserNode = document.querySelector(".wait-for-user");

// TEXT
const textNode = document.querySelector("#current-combo");

// SPEECH
var synth = window.speechSynthesis;

const coachUser = combo => {
    textNode.innerHTML = combo.split(", ").join("<br>");
    synth.speak(new SpeechSynthesisUtterance(combo));
}


// LOOP THE COMBO MOVES
const nextCombo = (current, belt, practiceTime) => {
        if (current >= data.combos[belt].length) {
            coachUser("WELL DONE!");
        } else {
            if (current < 0) {
                coachUser("Get ready!");
                setTimeout(nextCombo.bind(null, current + 1, belt, practiceTime), 3000);
            } else {
                const combo = data.combos[belt][current];
                coachUser(combo);
                setTimeout(nextCombo.bind(null, current + 1, belt, practiceTime), practiceTime);
            }
        }
}

function startTraining(belt) {
    const practiceTime = parseInt(practiceTimeNode.value, 10) * 1000;
    nextCombo(-1, belt, practiceTime);
    waitForUserNode.style.display = "none";
}
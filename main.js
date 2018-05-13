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
            "jab, rear hand hook, leading hand uppercut",
            "leading hand hook, cross, leading hand hook",
            "jab, cross, change guard, cross",
            "leading hand uppercut, leading hand hook, cross",
            "rear hand uppercut, leading hand hook, cross",
            "jab, leading hand backfist, cross",
            "jab, cross, leading foot roundhouse",
            "jab, cross, leading hand hook, back foot roundhouse",
            "jab, cross, back foot roundhouse, leading knee",
            "jab, front kick, cross, leading hand hook",
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
const synth = window.speechSynthesis;
const englishVoice = synth.getVoices().filter(voice => voice.lang.startsWith("en-") && voice.localService)[0]; // The first English voice that runs locally is enough.

// MAIN LOGIC

// Update screen and speak
const coachUser = combo => {
    // Break up into paragraphs for better readability
    textNode.innerHTML = combo
        .split(", ")
        .map(technique => `<p>${technique}</p>`)
        .join("");

    // Speak with an English voice, otherwise defaults in other languages will make it incomprehensible.
    const utterance = new SpeechSynthesisUtterance(combo);
    utterance.voice = englishVoice;
    synth.speak(utterance);
}

// Loop the combo moves
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
